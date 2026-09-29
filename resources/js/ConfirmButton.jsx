import { useId, useLayoutEffect, useRef, useState } from 'preact/hooks';

/**
 * An inline two-step button. The first press changes the button in place to the question with
 * Cancel and Confirm. Escape and Cancel return to the button. onConfirm handles its own errors.
 */
export function ConfirmButton({ label, ariaLabel, focusKey, question, confirmLabel, busyLabel, danger, disabled, triggerClass = 'button secondary', children, onConfirm }) {
    const [step, setStep] = useState('idle');
    const trigger = useRef(null);
    const cancel = useRef(null);
    const returnFocus = useRef(false);
    const questionId = useId();

    useLayoutEffect(() => {
        if (step === 'confirm') {
            cancel.current?.focus();
        }

        if (step === 'idle' && returnFocus.current) {
            returnFocus.current = false;
            trigger.current?.focus();
        }
    }, [step]);

    const back = () => {
        returnFocus.current = true;
        setStep('idle');
    };

    const confirm = async () => {
        setStep('busy');
        await onConfirm();
        returnFocus.current = true;
        setStep('idle');
    };

    if (step === 'idle') {
        return (
            <button
                ref={trigger}
                type="button"
                class={triggerClass}
                aria-label={ariaLabel}
                title={ariaLabel}
                data-focus-key={focusKey}
                disabled={disabled}
                onClick={() => setStep('confirm')}
            >
                {children ?? label}
            </button>
        );
    }

    const onKeyDown = (event) => {
        if (event.key === 'Escape' && !event.isComposing && step === 'confirm') {
            event.stopPropagation();
            back();
        }
    };

    return (
        <div class="confirm" role="group" aria-labelledby={questionId} onKeyDown={onKeyDown}>
            <p id={questionId} class="confirm-question">
                {question}
            </p>
            <div class="confirm-actions">
                <button ref={cancel} type="button" class="button secondary" disabled={step === 'busy'} onClick={back}>
                    Cancel
                </button>
                <button
                    type="button"
                    class={`button ${danger ? 'danger' : 'primary'}`}
                    disabled={step === 'busy'}
                    onClick={confirm}
                >
                    {step === 'busy' ? busyLabel : confirmLabel}
                </button>
            </div>
        </div>
    );
}
