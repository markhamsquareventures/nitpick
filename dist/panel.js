(()=>{var de,q,ze,Ct,z,De,Be,We,ge,oe,Z,Ke,ye,ve,be,Et,le={},ce=[],Lt=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,pe=Array.isArray;function O(t,e){for(var a in e)t[a]=e[a];return t}function xe(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function $t(t,e,a){var r,s,o,l={};for(o in e)o=="key"?r=e[o]:o=="ref"?s=e[o]:l[o]=e[o];if(arguments.length>2&&(l.children=arguments.length>3?de.call(arguments,2):a),typeof t=="function"&&t.defaultProps!=null)for(o in t.defaultProps)l[o]===void 0&&(l[o]=t.defaultProps[o]);return se(t,l,r,s,null)}function se(t,e,a,r,s){var o={type:t,props:e,key:a,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:s??++ze,__i:-1,__u:0};return s==null&&q.vnode!=null&&q.vnode(o),o}function w(t){return t.children}function ie(t,e){this.props=t,this.context=e}function K(t,e){if(e==null)return t.__?K(t.__,t.__i+1):null;for(var a;e<t.__k.length;e++)if((a=t.__k[e])!=null&&a.__e!=null)return a.__e;return typeof t.type=="function"?K(t):null}function Rt(t){if(t.__P&&t.__d){var e=t.__v,a=e.__e,r=[],s=[],o=O({},e);o.__v=e.__v+1,q.vnode&&q.vnode(o),qe(t.__P,o,e,t.__n,t.__P.namespaceURI,32&e.__u?[a]:null,r,a??K(e),!!(32&e.__u),s),o.__v=e.__v,o.__.__k[o.__i]=o,Je(r,o,s),e.__e=e.__=null,o.__e!=a&&Ve(o)}}function Ve(t){if((t=t.__)!=null&&t.__c!=null)return t.__e=t.__c.base=null,t.__k.some(function(e){if(e!=null&&e.__e!=null)return t.__e=t.__c.base=e.__e}),Ve(t)}function Oe(t){(!t.__d&&(t.__d=!0)&&z.push(t)&&!ue.__r++||De!=q.debounceRendering)&&((De=q.debounceRendering)||Be)(ue)}function ue(){try{for(var t,e=1;z.length;)z.length>e&&z.sort(We),t=z.shift(),e=z.length,Rt(t)}finally{z.length=ue.__r=0}}function Ge(t,e,a,r,s,o,l,c,d,u,p){var h,i,f,g,_,y,m=r&&r.__k||ce,v=e.length;for(d=Mt(a,e,m,d,v),h=0;h<v;h++)(f=a.__k[h])!=null&&(i=f.__i!=-1&&m[f.__i]||le,f.__i=h,y=qe(t,f,i,s,o,l,c,d,u,p),g=f.__e,f.ref&&i.ref!=f.ref&&(i.ref&&we(i.ref,null,f),p.push(f.ref,f.__c||g,f)),_==null&&g!=null&&(_=g),4&f.__u?(d=Qe(f,d,t),i.__e&&(i.__e=null)):typeof f.type=="function"&&y!==void 0?d=y:g&&(d=g.nextSibling),f.__u&=-7);return a.__e=_,d}function Mt(t,e,a,r,s){var o,l,c,d,u,p=a.length,h=p,i=0;for(t.__k=new Array(s),o=0;o<s;o++)(l=e[o])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=t.__k[o]=se(null,l,null,null,null):pe(l)?l=t.__k[o]=se(w,{children:l},null,null,null):l.constructor===void 0&&l.__b>0?l=t.__k[o]=se(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):t.__k[o]=l,d=o+i,l.__=t,l.__b=t.__b+1,c=null,(u=l.__i=Nt(l,a,d,h))!=-1&&(h--,(c=a[u])&&(c.__u|=2)),c==null||c.__v==null?(u==-1&&(s>p?i--:s<p&&i++),typeof l.type!="function"&&(l.__u|=4)):u!=d&&(u==d-1?i--:u==d+1?i++:(u>d?i--:i++,l.__u|=4))):t.__k[o]=null;if(h)for(o=0;o<p;o++)(c=a[o])!=null&&(2&c.__u)==0&&(c.__e==r&&(r=K(c)),Ze(c,c));return r}function Qe(t,e,a){var r,s;if(typeof t.type=="function"){for(r=t.__k,s=0;r&&s<r.length;s++)r[s]&&(r[s].__=t,e=Qe(r[s],e,a));return e}t.__e!=e&&(e&&t.type&&!e.parentNode&&(e=K(t)),e=a.insertBefore(t.__e,e||null));do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function Nt(t,e,a,r){var s,o,l,c=t.key,d=t.type,u=e[a],p=u!=null&&(2&u.__u)==0;if(u===null&&c==null||p&&c==u.key&&d==u.type)return a;if(r>(p?1:0)){for(s=a-1,o=a+1;s>=0||o<e.length;)if((u=e[l=s>=0?s--:o++])!=null&&(2&u.__u)==0&&c==u.key&&d==u.type)return l}return-1}function Ue(t,e,a){e[0]=="-"?t.setProperty(e,a??""):t[e]=a==null?"":typeof a!="number"||Lt.test(e)?a:a+"px"}function re(t,e,a,r,s){var o,l;e:if(e=="style")if(typeof a=="string")t.style.cssText=a;else{if(typeof r=="string"&&(t.style.cssText=r=""),r)for(e in r)a&&e in a||Ue(t.style,e,"");if(a)for(e in a)r&&a[e]==r[e]||Ue(t.style,e,a[e])}else if(e[0]=="o"&&e[1]=="n")o=e!=(e=e.replace(Ke,"$1")),l=e.toLowerCase(),e=l in t||e=="onFocusOut"||e=="onFocusIn"?l.slice(2):e.slice(2),t.l||(t.l={}),t.l[e+o]=a,a?r?a[Z]=r[Z]:(a[Z]=ye,t.addEventListener(e,o?be:ve,o)):t.removeEventListener(e,o?be:ve,o);else{if(s=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=a??"";break e}catch{}typeof a=="function"||(a==null||a===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&a==1?"":a))}}function je(t){return function(e){if(this.l){var a=this.l[e.type+t];if(e[oe]==null)e[oe]=ye++;else if(e[oe]<a[Z])return;return a(q.event?q.event(e):e)}}}function qe(t,e,a,r,s,o,l,c,d,u){var p,h,i,f,g,_,y,m,v,L,E,F,N,A,H,j,P=e.type;if(e.constructor!==void 0)return null;128&a.__u&&(d=!!(32&a.__u),o=[c=e.__e=a.__e]),(p=q.__b)&&p(e);e:if(typeof P=="function"){h=l.length;try{if(v=e.props,L=P.prototype&&P.prototype.render,E=(p=P.contextType)&&r[p.__c],F=p?E?E.props.value:p.__:r,a.__c?m=(i=e.__c=a.__c).__=i.__E:(L?e.__c=i=new P(v,F):(e.__c=i=new ie(v,F),i.constructor=P,i.render=Pt),E&&E.sub(i),i.state||(i.state={}),i.__n=r,f=i.__d=!0,i.__h=[],i._sb=[]),L&&i.__s==null&&(i.__s=i.state),L&&P.getDerivedStateFromProps!=null&&(i.__s==i.state&&(i.__s=O({},i.__s)),O(i.__s,P.getDerivedStateFromProps(v,i.__s))),g=i.props,_=i.state,i.__v=e,f)L&&P.getDerivedStateFromProps==null&&i.componentWillMount!=null&&i.componentWillMount(),L&&i.componentDidMount!=null&&i.__h.push(i.componentDidMount);else{if(L&&P.getDerivedStateFromProps==null&&v!==g&&i.componentWillReceiveProps!=null&&i.componentWillReceiveProps(v,F),e.__v==a.__v||!i.__e&&i.shouldComponentUpdate!=null&&i.shouldComponentUpdate(v,i.__s,F)===!1){e.__v!=a.__v&&(i.props=v,i.state=i.__s,i.__d=!1),e.__e=a.__e,e.__k=a.__k,e.__k.some(function(I){I&&(I.__=e)}),ce.push.apply(i.__h,i._sb),i._sb=[],i.__h.length&&l.push(i),c=K(a);break e}i.componentWillUpdate!=null&&i.componentWillUpdate(v,i.__s,F),L&&i.componentDidUpdate!=null&&i.__h.push(function(){i.componentDidUpdate(g,_,y)})}if(i.context=F,i.props=v,i.__P=t,i.__e=!1,N=q.__r,A=0,L)i.state=i.__s,i.__d=!1,N&&N(e),p=i.render(i.props,i.state,i.context),ce.push.apply(i.__h,i._sb),i._sb=[];else do i.__d=!1,N&&N(e),p=i.render(i.props,i.state,i.context),i.state=i.__s;while(i.__d&&++A<25);i.state=i.__s,i.getChildContext!=null&&(r=O(O({},r),i.getChildContext())),L&&!f&&i.getSnapshotBeforeUpdate!=null&&(y=i.getSnapshotBeforeUpdate(g,_)),H=p!=null&&p.type===w&&p.key==null?Ye(p.props.children):p,c=Ge(t,pe(H)?H:[H],e,a,r,s,o,l,c,d,u),i.base=e.__e,e.__u&=-161,i.__h.length&&l.push(i),m&&(i.__E=i.__=null)}catch(I){if(l.length=h,e.__v=null,d||o!=null){if(I.then){for(e.__u|=d?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;o!=null&&(o[o.indexOf(c)]=null),e.__e=c}else if(o!=null)for(j=o.length;j--;)xe(o[j])}else e.__e=a.__e;e.__k==null&&(e.__k=a.__k||[]),I.then||Xe(e),q.__e(I,e,a)}}else o==null&&e.__v==a.__v?(e.__k=a.__k,e.__e=a.__e):c=e.__e=At(a.__e,e,a,r,s,o,l,d,u);return(p=q.diffed)&&p(e),128&e.__u?void 0:c}function Xe(t){t&&(t.__c&&(t.__c.__e=!0),t.__k&&t.__k.some(Xe))}function Je(t,e,a){for(var r=0;r<a.length;r++)we(a[r],a[++r],a[++r]);q.__c&&q.__c(e,t),t.some(function(s){try{t=s.__h,s.__h=[],t.some(function(o){o.call(s)})}catch(o){q.__e(o,s.__v)}})}function Ye(t){return typeof t!="object"||t==null||t.__b>0?t:pe(t)?t.map(Ye):t.constructor!==void 0?null:O({},t)}function At(t,e,a,r,s,o,l,c,d){var u,p,h,i,f,g,_,y=a.props||le,m=e.props,v=e.type;if(v=="svg"?s="http://www.w3.org/2000/svg":v=="math"?s="http://www.w3.org/1998/Math/MathML":s||(s="http://www.w3.org/1999/xhtml"),o!=null){for(u=0;u<o.length;u++)if((f=o[u])&&"setAttribute"in f==!!v&&(v?f.localName==v:f.nodeType==3)){t=f,o[u]=null;break}}if(t==null){if(v==null)return document.createTextNode(m);t=document.createElementNS(s,v,m.is&&m),c&&(q.__m&&q.__m(e,o),c=!1),o=null}if(v==null)y===m||c&&t.data==m||(t.data=m);else{if(o=v=="textarea"&&m.defaultValue!=null?null:o&&de.call(t.childNodes),!c&&o!=null)for(y={},u=0;u<t.attributes.length;u++)y[(f=t.attributes[u]).name]=f.value;for(u in y)f=y[u],u=="dangerouslySetInnerHTML"?h=f:u=="children"||u in m||u=="value"&&"defaultValue"in m||u=="checked"&&"defaultChecked"in m||re(t,u,null,f,s);for(u in m)f=m[u],u=="children"?i=f:u=="dangerouslySetInnerHTML"?p=f:u=="value"?g=f:u=="checked"?_=f:c&&typeof f!="function"||y[u]===f||re(t,u,f,y[u],s);if(p)c||h&&(p.__html==h.__html||p.__html==t.innerHTML)||(t.innerHTML=p.__html),e.__k=[];else if(h&&(t.innerHTML=""),Ge(e.type=="template"?t.content:t,pe(i)?i:[i],e,a,r,v=="foreignObject"?"http://www.w3.org/1999/xhtml":s,o,l,o?o[0]:a.__k&&K(a,0),c,d),o!=null)for(u=o.length;u--;)xe(o[u]);c&&v!="textarea"||(u="value",v=="progress"&&g==null?t.removeAttribute("value"):g!=null&&(g!==t[u]||v=="progress"&&!g||v=="option"&&g!=y[u])&&re(t,u,g,y[u],s),u="checked",_!=null&&_!=t[u]&&re(t,u,_,y[u],s))}return t}function we(t,e,a){try{if(typeof t=="function"){var r=typeof t.__u=="function";r&&t.__u(),r&&e==null||(t.__u=t(e))}else t.current=e}catch(s){q.__e(s,a)}}function Ze(t,e,a){var r,s;if(q.unmount&&q.unmount(t),(r=t.ref)&&(r.current&&r.current!=t.__e||we(r,null,e)),(r=t.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(o){q.__e(o,e)}r.base=r.__P=r.__n=null}if(r=t.__k)for(s=0;s<r.length;s++)r[s]&&Ze(r[s],e,a||typeof t.type!="function");a||xe(t.__e),t.__c=t.__=t.__e=void 0}function Pt(t,e,a){return this.constructor(t,a)}function et(t,e,a){var r,s,o,l;e==document&&(e=document.documentElement),q.__&&q.__(t,e),s=(r=typeof a=="function")?null:a&&a.__k||e.__k,o=[],l=[],qe(e,t=(!r&&a||e).__k=$t(w,null,[t]),s||le,le,e.namespaceURI,!r&&a?[a]:s?null:e.firstChild?de.call(e.childNodes):null,o,!r&&a?a:s?s.__e:e.firstChild,r,l),Je(o,t,l),t.props.children=null}de=ce.slice,q={__e:function(t,e,a,r){for(var s,o,l;e=e.__;)if((s=e.__c)&&!s.__)try{if((o=s.constructor)&&o.getDerivedStateFromError!=null&&(s.setState(o.getDerivedStateFromError(t)),l=s.__d),s.componentDidCatch!=null&&(s.componentDidCatch(t,r||{}),l=s.__d),l)return s.__E=s}catch(c){t=c}throw t}},ze=0,Ct=function(t){return t!=null&&t.constructor===void 0},ie.prototype.setState=function(t,e){var a;a=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=O({},this.state),typeof t=="function"&&(t=t(O({},a),this.props)),t&&O(a,t),t!=null&&this.__v&&(e&&this._sb.push(e),Oe(this))},ie.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Oe(this))},ie.prototype.render=w,z=[],Be=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,We=function(t,e){return t.__v.__b-e.__v.__b},ue.__r=0,ge=Math.random().toString(8),oe="__d"+ge,Z="__a"+ge,Ke=/(PointerCapture)$|Capture$/i,ye=0,ve=je(!1),be=je(!0),Et=0;var V,k,ke,tt,he=0,ct=[],T=q,at=T.__b,nt=T.__r,rt=T.diffed,ot=T.__c,st=T.unmount,it=T.__;function ee(t,e){T.__h&&T.__h(k,t,he||e),he=0;var a=k.__H||(k.__H={__:[],__h:[]});return t>=a.__.length&&a.__.push({}),a.__[t]}function b(t){return he=1,It(ut,t)}function It(t,e,a){var r=ee(V++,2);if(r.t=t,!r.__c&&(r.__=[a?a(e):ut(void 0,e),function(c){var d=r.__N?r.__N[0]:r.__[0],u=r.t(d,c);d!==u&&(r.__N=[u,r.__[1]],r.__c.setState({}))}],r.__c=k,!k.__f)){var s=function(c,d,u){if(!r.__c.__H)return!0;var p=!1,h=r.__c.props!==c;if(r.__c.__H.__.some(function(f){if(f.__N){p=!0;var g=f.__[0];f.__=f.__N,f.__N=void 0,g!==f.__[0]&&(h=!0)}}),o){var i=o.call(this,c,d,u);return p?i||h:i}return!p||h};k.__f=!0;var o=k.shouldComponentUpdate,l=k.componentWillUpdate;k.componentWillUpdate=function(c,d,u){if(this.__e){var p=o;o=void 0,s(c,d,u),o=p}l&&l.call(this,c,d,u)},k.shouldComponentUpdate=s}return r.__N||r.__}function G(t,e){var a=ee(V++,3);!T.__s&&Se(a.__H,e)&&(a.__=t,a.u=e,k.__H.__h.push(a))}function B(t,e){var a=ee(V++,4);!T.__s&&Se(a.__H,e)&&(a.__=t,a.u=e,k.__h.push(a))}function S(t){return he=5,Ft(function(){return{current:t}},[])}function Ft(t,e){var a=ee(V++,7);return Se(a.__H,e)&&(a.__=t(),a.__H=e,a.__h=t),a.__}function D(){var t=ee(V++,11);if(!t.__){for(var e=k.__v;e!==null&&!e.__m&&e.__!==null;)e=e.__;var a=e.__m||(e.__m=[0,0]);t.__="P"+a[0]+"-"+a[1]++}return t.__}function Ht(){for(var t;t=ct.shift();){var e=t.__H;if(t.__P&&e)try{e.__h.some(fe),e.__h.some(Te),e.__h=[]}catch(a){e.__h=[],T.__e(a,t.__v)}}}T.__b=function(t){k=null,at&&at(t)},T.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),it&&it(t,e)},T.__r=function(t){nt&&nt(t),V=0;var e=(k=t.__c).__H;e&&(ke===k?(e.__h=[],k.__h=[],e.__.some(function(a){a.__N&&(a.__=a.__N),a.u=a.__N=void 0})):(e.__h.some(fe),e.__h.some(Te),e.__h=[],V=0)),ke=k},T.diffed=function(t){rt&&rt(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(ct.push(e)!==1&&tt===T.requestAnimationFrame||((tt=T.requestAnimationFrame)||Dt)(Ht)),e.__H.__.some(function(a){a.u&&(a.__H=a.u,a.u=void 0)})),ke=k=null},T.__c=function(t,e){e.some(function(a){try{a.__h.some(fe),a.__h=a.__h.filter(function(r){return!r.__||Te(r)})}catch(r){e.some(function(s){s.__h&&(s.__h=[])}),e=[],T.__e(r,a.__v)}}),ot&&ot(t,e)},T.unmount=function(t){st&&st(t);var e,a=t.__c;a&&a.__H&&(a.__H.__.some(function(r){try{fe(r)}catch(s){e=s}}),a.__H=void 0,e&&T.__e(e,a.__v))};var lt=typeof requestAnimationFrame=="function";function Dt(t){var e,a=function(){clearTimeout(r),lt&&cancelAnimationFrame(e),setTimeout(t)},r=setTimeout(a,35);lt&&(e=requestAnimationFrame(a))}function fe(t){var e=k,a=t.__c;typeof a=="function"&&(t.__c=void 0,a()),k=e}function Te(t){var e=k;t.__c=t.__(),k=e}function Se(t,e){return!t||t.length!==e.length||e.some(function(a,r){return a!==t[r]})}function ut(t,e){return typeof e=="function"?e(t):e}var dt=`/*
 * Plain CSS, not Tailwind: Tailwind v4 @property rules do not work in a shadow root.
 * The !important on :host wins over a page rule that targets the element, and \`all: initial\`
 * stops inherited page styles. Custom properties still inherit, so every token has a --qa- prefix.
 * The panel is always dark. Every size is on a 4 px grid.
 */
:host {
    all: initial !important;
    display: block !important;
}

.root {
    --qa-space-1: 4px;
    --qa-space-2: 8px;
    --qa-space-3: 12px;
    --qa-space-4: 16px;
    --qa-space-5: 20px;
    --qa-space-6: 24px;
    --qa-target: 44px;
    --qa-target-sm: 32px;
    --qa-card-width: 400px;
    --qa-radius-card: 24px;
    --qa-radius-inner: 16px;
    --qa-radius-control: 12px;
    --qa-radius-small: 8px;
    --qa-radius-box: 4px;
    --qa-radius-full: 9999px;
    --qa-font: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
    --qa-font-mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
    --qa-text-sm: 12px;
    --qa-text-md: 14px;
    --qa-text-lg: 16px;
    --qa-leading-sm: 16px;
    --qa-leading-md: 20px;
    --qa-leading-lg: 24px;
    --qa-canvas: #0c0d10;
    --qa-surface: #16181d;
    --qa-sunken: #111317;
    --qa-raised: #22252c;
    --qa-raised-hover: #2c3039;
    --qa-selected: #3e4555;
    --qa-text: #eceef2;
    --qa-text-muted: #9ba2ae;
    --qa-accent: #a3bcff;
    --qa-light: #eceef2;
    --qa-light-hover: #ffffff;
    --qa-on-light: #0c0d10;
    --qa-success: #74e39d;
    --qa-danger: #ff9e94;
    --qa-danger-hover: #ffb8b0;
    --qa-danger-surface: #3a1c1c;
    --qa-on-danger: #1c0b0a;
    --qa-mail-surface: #f6f7f9;
    --qa-shadow: 0 16px 48px rgb(0 0 0 / 0.36), 0 4px 12px rgb(0 0 0 / 0.24);

    color-scheme: dark;
    font-family: var(--qa-font);
    font-size: var(--qa-text-md);
    line-height: var(--qa-leading-md);
    color: var(--qa-text);
    -webkit-font-smoothing: antialiased;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

:focus-visible {
    outline: 2px solid var(--qa-accent);
    outline-offset: 2px;
}

button,
input,
select {
    font: inherit;
    color: inherit;
}

button {
    cursor: pointer;
}

button:disabled {
    cursor: not-allowed;
}

.icon {
    flex: none;
}

/* The pill, and the round close button that it becomes while the card is open. */

.pill {
    position: fixed;
    right: var(--qa-space-4);
    bottom: var(--qa-space-4);
    z-index: 2147483646;
    display: flex;
    align-items: center;
    gap: var(--qa-space-2);
    height: var(--qa-target);
    max-width: 320px;
    padding: 0 var(--qa-space-3) 0 var(--qa-space-5);
    border: 0;
    border-radius: var(--qa-radius-full);
    background: var(--qa-canvas);
    box-shadow: var(--qa-shadow);
    color: var(--qa-text);
    font-weight: 500;
    white-space: nowrap;
    transition: background-color 120ms ease;
}

.pill:hover {
    background: var(--qa-surface);
}

.pill[data-open='true'] {
    justify-content: center;
    width: var(--qa-target);
    padding: 0;
}

.pill .icon {
    color: var(--qa-text-muted);
}

.pill[data-open='true'] .icon {
    color: var(--qa-text);
}

.pill-brand {
    font-weight: 700;
}

.pill-separator {
    color: var(--qa-text-muted);
}

.pill-name {
    overflow: hidden;
    text-overflow: ellipsis;
}

.pill-round {
    padding: var(--qa-space-1) var(--qa-space-2);
    border-radius: var(--qa-radius-full);
    background: var(--qa-raised);
    font-size: var(--qa-text-sm);
    font-weight: 600;
    line-height: var(--qa-leading-sm);
    font-variant-numeric: tabular-nums;
}

/* The card. */

.card {
    position: fixed;
    right: var(--qa-space-4);
    bottom: 72px;
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    width: min(var(--qa-card-width), calc(100vw - 32px));
    max-height: calc(100vh - 88px);
    border-radius: var(--qa-radius-card);
    background: var(--qa-canvas);
    box-shadow: var(--qa-shadow);
    overflow: clip;
    transform-origin: bottom right;
}

/* A reload that finds the card open shows it only when its data is there, so nothing jumps. */
.card[data-loading='true'] {
    visibility: hidden;
}

.card[data-enter='true'] {
    animation: qa-card-in 180ms cubic-bezier(0.2, 0, 0, 1);
}

@keyframes qa-card-in {
    from {
        opacity: 0;
        transform: translateY(8px) scale(0.98);
    }
}

.card-header {
    flex: none;
    padding: var(--qa-space-3) var(--qa-space-4);
}

.card-header .note {
    margin-top: var(--qa-space-2);
}

/* The header's own pill: smaller than the shared 44 px button, only here (see the confirm's
   Cancel/Close round buttons below, which match it so the row does not resize between steps). */
.card-header .button {
    height: var(--qa-target-sm);
    padding: 0 var(--qa-space-3);
    border-radius: var(--qa-radius-full);
}

.header-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--qa-space-3);
}

.header-title {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    min-width: 0;
}

.title {
    margin: 0;
    overflow: hidden;
    font-size: var(--qa-text-md);
    font-weight: 600;
    line-height: var(--qa-leading-md);
    text-overflow: ellipsis;
    white-space: nowrap;
}

.subtitle {
    margin: 0;
    color: var(--qa-text-muted);
    font-size: var(--qa-text-sm);
    line-height: var(--qa-leading-sm);
    font-variant-numeric: tabular-nums;
}

.subtitle[data-round='open'] {
    color: var(--qa-success);
}

.picker {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 100%;
}

.picker-select {
    min-width: 0;
    max-width: 100%;
    height: var(--qa-leading-md);
    padding: 0 var(--qa-space-6) 0 0;
    border: 0;
    border-radius: var(--qa-radius-small);
    appearance: none;
    background: transparent;
    font-size: var(--qa-text-md);
    font-weight: 600;
    line-height: var(--qa-leading-md);
    text-overflow: ellipsis;
    cursor: pointer;
}

.picker-select option {
    background: var(--qa-surface);
    color: var(--qa-text);
}

.picker .icon {
    position: absolute;
    right: var(--qa-space-1);
    color: var(--qa-text-muted);
    pointer-events: none;
}

.note {
    margin: 0;
    color: var(--qa-text-muted);
    font-size: var(--qa-text-sm);
    line-height: var(--qa-leading-sm);
    overflow-wrap: anywhere;
}

.note code {
    color: var(--qa-text);
}

/* The view between the header and the tab bar: a scroll area, and on Checklist the composer. */

.view {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0;
}

/* position: relative keeps the visually hidden labels inside the scroll area's clip. Overflow-y
   auto also clips overflow-x, so every side needs padding: a top-flush first row would clip the
   top of its own focus ring against this edge, since the ring draws outside the row's own box. */
.scroller {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: var(--qa-space-2);
}

.scroller[data-ready='false'] {
    visibility: hidden;
}

.tabbar {
    flex: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--qa-space-1);
    padding: var(--qa-space-2);
}

.tab {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--qa-space-2);
    height: var(--qa-target);
    border: 0;
    border-radius: var(--qa-radius-control);
    background: transparent;
    color: var(--qa-text-muted);
    font-weight: 500;
}

.tab:hover {
    background: var(--qa-surface);
    color: var(--qa-text);
}

.tab[aria-selected='true'] {
    background: var(--qa-selected);
    color: var(--qa-text);
    font-weight: 600;
}

/* Layout. */

.stack {
    display: flex;
    flex-direction: column;
    gap: var(--qa-space-4);
}

.group {
    display: flex;
    flex-direction: column;
    gap: var(--qa-space-2);
}

.group-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--qa-space-1);
    padding: 0 0 0 var(--qa-space-3);
}

/* The persona actions sit next to a muted heading, so they are quiet until hovered. */
.group-header > .secondary,
.handoff-step > .secondary {
    padding: 0 var(--qa-space-3);
    background: transparent;
}

.group-header > .secondary:hover:enabled,
.handoff-step > .secondary:hover:enabled {
    background: var(--qa-raised);
}

.group-title {
    flex: 1 1 0;
    min-width: 0;
    margin: 0;
    overflow: hidden;
    color: var(--qa-text-muted);
    font-size: var(--qa-text-md);
    font-weight: 600;
    line-height: var(--qa-leading-md);
    text-overflow: ellipsis;
    white-space: nowrap;
}

.retest {
    margin: var(--qa-space-4) 0 0;
    padding: 0 var(--qa-space-3);
    color: var(--qa-accent);
    font-size: var(--qa-text-md);
    font-weight: 600;
    line-height: var(--qa-leading-md);
}

.panel-card {
    display: flex;
    flex-direction: column;
    gap: var(--qa-space-1);
    padding: var(--qa-space-3);
    border-radius: var(--qa-radius-inner);
    background: var(--qa-surface);
}

.item-text {
    margin: 0;
    font-size: var(--qa-text-lg);
    font-weight: 500;
    line-height: var(--qa-leading-lg);
    overflow-wrap: anywhere;
}

/* Text. */

.text {
    margin: 0;
}

.muted {
    color: var(--qa-text-muted);
}

.error {
    color: var(--qa-danger);
    font-weight: 600;
}

code,
.output {
    font-family: var(--qa-font-mono);
    font-size: var(--qa-text-sm);
    line-height: var(--qa-leading-sm);
}

.output {
    max-height: 240px;
    margin: 0;
    overflow: auto;
    padding: var(--qa-space-3);
    border-radius: var(--qa-radius-small);
    background: var(--qa-canvas);
    white-space: pre-wrap;
    overflow-wrap: anywhere;
}

.failure {
    display: flex;
    flex-direction: column;
    gap: var(--qa-space-2);
    padding: var(--qa-space-3);
    border-radius: var(--qa-radius-control);
    background: var(--qa-danger-surface);
}

.link {
    color: var(--qa-accent);
    overflow-wrap: anywhere;
}

.links {
    display: flex;
    flex-direction: column;
    gap: var(--qa-space-2);
    margin: 0;
    padding: 0;
    list-style: none;
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
}

/* Buttons. */

.button {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    gap: var(--qa-space-2);
    height: var(--qa-target);
    padding: 0 var(--qa-space-4);
    border: 0;
    border-radius: var(--qa-radius-control);
    font-weight: 600;
    white-space: nowrap;
    transition: background-color 120ms ease;
}

.button:disabled {
    opacity: 0.5;
}

.secondary {
    background: var(--qa-raised);
    color: var(--qa-text);
}

.secondary:hover:enabled {
    background: var(--qa-raised-hover);
}

.light,
.primary {
    border-radius: var(--qa-radius-full);
    background: var(--qa-light);
    color: var(--qa-on-light);
}

.light:hover:enabled,
.primary:hover:enabled {
    background: var(--qa-light-hover);
}

.danger {
    background: var(--qa-danger);
    color: var(--qa-on-danger);
}

.danger:hover:enabled {
    background: var(--qa-danger-hover);
}

/* The 44px target centers on the nit's first text line (20px). The top and bottom margins are
   (line height - target) / 2, so the target adds no height of its own to a one-line nit; the
   right margin lines the glyph up with the card's edge, the same as the target's own hit area
   past the glyph. */
.icon-button {
    width: var(--qa-target);
    margin: calc((var(--qa-leading-md) - var(--qa-target)) / 2) calc(var(--qa-space-2) * -1)
        calc((var(--qa-leading-md) - var(--qa-target)) / 2) 0;
    padding: 0;
    background: transparent;
    color: var(--qa-text-muted);
}

.icon-button:hover:enabled {
    color: var(--qa-text);
}

.back {
    padding: 0 var(--qa-space-4) 0 var(--qa-space-3);
}

/* The inline two-step confirm. It takes its own line in the row of its button. */

.confirm {
    display: flex;
    flex: 1 1 100%;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--qa-space-2);
    padding: var(--qa-space-2) var(--qa-space-2) var(--qa-space-2) var(--qa-space-3);
    border-radius: var(--qa-radius-control);
    background: var(--qa-raised);
}

.confirm-question {
    flex: 1 1 160px;
    margin: 0;
    font-weight: 500;
}

.confirm-actions {
    display: flex;
    gap: var(--qa-space-2);
}

.confirm .secondary {
    background: var(--qa-raised-hover);
}

.confirm .primary,
.confirm .danger {
    border-radius: var(--qa-radius-control);
}

/* Checklist items: one card per group, one compact row per item. */

.items {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    border-radius: var(--qa-radius-inner);
    background: var(--qa-surface);
    list-style: none;
}

.item-row {
    display: flex;
    align-items: flex-start;
}

/* The glyph is 16 px; the button around it is a 32 px hit area (WCAG 2.2's 24 px minimum, plus
   room to spare). A small top margin lines the box up with the first line of the item text
   instead of the full, possibly-wrapped, text block. */
.box {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--qa-target-sm);
    height: var(--qa-target-sm);
    margin-top: var(--qa-space-2);
    padding: 0;
    border: 0;
    border-radius: var(--qa-radius-control);
    background: transparent;
    color: var(--qa-on-light);
}

.box:disabled {
    opacity: 0.5;
}

.box-glyph {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: var(--qa-radius-box);
    box-shadow: inset 0 0 0 2px var(--qa-text-muted);
    transition:
        background-color 120ms ease,
        box-shadow 120ms ease;
}

.box:hover:enabled .box-glyph {
    box-shadow: inset 0 0 0 2px var(--qa-text);
}

.box[data-status='pass'] .box-glyph {
    background: var(--qa-success);
    box-shadow: none;
}

.box[data-status='fail'] .box-glyph {
    background: var(--qa-danger);
    box-shadow: none;
}

.item-toggle {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    min-width: 0;
    min-height: var(--qa-target);
    margin: 0;
    padding: var(--qa-space-3) var(--qa-space-2) var(--qa-space-3) 0;
    border: 0;
    background: transparent;
    color: var(--qa-text);
    text-align: left;
}

.check-text {
    font-weight: 500;
    overflow-wrap: anywhere;
}

.item-meta {
    color: var(--qa-text-muted);
    font-size: var(--qa-text-sm);
    line-height: var(--qa-leading-sm);
}

.nit-count {
    color: var(--qa-text);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
}

button.item-toggle:hover .check-text {
    text-decoration: underline;
    text-decoration-color: var(--qa-text-muted);
    text-underline-offset: 4px;
}

.goto,
.fill {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--qa-target);
    height: var(--qa-target);
    padding: 0;
    border: 0;
    border-radius: var(--qa-radius-control);
    background: transparent;
    color: var(--qa-text-muted);
    transition: background-color 120ms ease;
}

.goto:hover,
.fill:hover {
    background: var(--qa-raised);
    color: var(--qa-text);
}

/* aria-disabled, not disabled, so that the button keeps the focus while the fill runs. */
.fill[aria-disabled='true'] {
    background: transparent;
    color: var(--qa-text-muted);
    cursor: progress;
    opacity: 0.5;
}

/* The fill notice and the fill failure start at the left edge of the item text, the same as the item error. */
.item-error,
.fill-notice,
.item-failure {
    padding: 0 var(--qa-space-3) var(--qa-space-3) var(--qa-target-sm);
}

/* The live region stays in the tree while it is empty, so that a screen reader announces the first notice. */
.fill-notice:empty {
    padding: 0;
}

.fill-lines {
    display: flex;
    flex-direction: column;
    gap: var(--qa-space-1);
    margin: 0;
    padding: 0;
    color: var(--qa-text-muted);
    font-size: var(--qa-text-sm);
    line-height: var(--qa-leading-sm);
    list-style: none;
    overflow-wrap: anywhere;
}

.fill-summary,
.fill-key {
    color: var(--qa-text);
}

/* The nits of an item and its nit field. The block runs the full width of the card, at the same
   left inset as the box, not indented under the item text. */
.details {
    display: flex;
    flex-direction: column;
    gap: var(--qa-space-3);
    margin: 0 var(--qa-space-2) var(--qa-space-2);
    padding: var(--qa-space-3);
    border-radius: var(--qa-radius-control);
    background: var(--qa-sunken);
}

.details[hidden] {
    display: none;
}

.handoff-step {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--qa-space-2);
    padding: 0 0 0 var(--qa-space-3);
}

/* Nits: a comment list. Each row is one line: the text, then the path, then delete at the
   right. The gap is 24px (not the usual 16px) so a one-line nit's row pitch (its 20px text plus
   the gap) still clears the 44px delete target of the next row; a smaller gap makes the two
   targets overlap. */

.nits {
    display: flex;
    flex-direction: column;
    gap: var(--qa-space-6);
    margin: 0;
    padding: 0;
    list-style: none;
}

.nit {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: var(--qa-space-2);
}

/* The path is a location, not attribution: no avatar, initial, or persona name. It sits inline
   right after the nit text, so a wrap keeps the two together instead of dropping the path to
   its own line. */
.nit-body {
    flex: 1 1 0;
    min-width: 0;
    margin: 0;
    overflow-wrap: anywhere;
}

.avatar {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: var(--qa-radius-full);
    background: var(--qa-selected);
    font-size: var(--qa-text-sm);
    font-weight: 600;
    line-height: var(--qa-leading-sm);
}

.input {
    width: 100%;
    height: var(--qa-target);
    padding: 0 var(--qa-space-3);
    border: 0;
    border-radius: var(--qa-radius-control);
    background: var(--qa-raised);
}

.input::placeholder,
.composer-input::placeholder {
    color: var(--qa-text-muted);
    opacity: 1;
}

.input:disabled,
.composer-input:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.nit-field {
    display: flex;
    flex-direction: column;
    gap: var(--qa-space-2);
}

/* The page-nit composer, pinned under the scroll area. */

.composer {
    position: relative;
    display: flex;
    flex: none;
    flex-direction: column;
    gap: var(--qa-space-2);
    padding: 0 var(--qa-space-2);
}

/* The list fades out above the composer, so the pinned field reads as on top of it. */
.composer::before {
    position: absolute;
    top: -24px;
    right: 0;
    left: 0;
    height: 24px;
    background: linear-gradient(transparent, var(--qa-canvas));
    content: '';
    pointer-events: none;
}

.composer .error {
    padding: 0 var(--qa-space-3);
}

/* position: relative puts this field after the composer's own ::before in paint order (both are
   then ordered by tree position among z-index:auto positioned boxes), so its focus ring draws on
   top of the fade instead of under it. */
.composer-field {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--qa-space-2);
    padding: var(--qa-space-1);
    border-radius: var(--qa-radius-inner);
    background: var(--qa-raised);
}

.composer-field:focus-within {
    outline: 2px solid var(--qa-accent);
    outline-offset: 2px;
}

.composer-input {
    flex: 1 1 0;
    min-width: 0;
    height: var(--qa-target);
    padding: 0 var(--qa-space-3);
    border: 0;
    background: transparent;
}

.composer-input:focus-visible {
    outline: none;
}

.send {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--qa-target);
    height: var(--qa-target);
    padding: 0;
    border: 0;
    border-radius: var(--qa-radius-full);
    background: var(--qa-light);
    color: var(--qa-on-light);
}

.send:disabled {
    background: var(--qa-raised-hover);
    color: var(--qa-text-muted);
}

/* Rows: mails, personas and users. */

.rows {
    display: flex;
    flex-direction: column;
    gap: var(--qa-space-1);
    margin: 0;
    padding: 0;
    list-style: none;
}

.row {
    display: flex;
    align-items: center;
    gap: var(--qa-space-3);
    width: 100%;
    min-height: 60px;
    padding: var(--qa-space-2) var(--qa-space-2) var(--qa-space-2) var(--qa-space-3);
    border: 0;
    border-radius: var(--qa-radius-inner);
    background: var(--qa-surface);
    color: var(--qa-text);
    text-align: left;
    transition: background-color 120ms ease;
}

button.row {
    padding-right: var(--qa-space-3);
}

button.row:hover {
    background: var(--qa-raised);
}

.row .avatar {
    width: 32px;
    height: 32px;
    font-size: var(--qa-text-md);
    line-height: var(--qa-leading-md);
}

.row > .icon {
    color: var(--qa-text-muted);
}

.row-text {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    min-width: 0;
}

.row-title,
.row-meta {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.row-title {
    font-weight: 600;
}

.row-meta {
    color: var(--qa-text-muted);
    font-size: var(--qa-text-sm);
    line-height: var(--qa-leading-sm);
    font-variant-numeric: tabular-nums;
}

.search {
    display: flex;
    align-items: center;
    gap: var(--qa-space-2);
    height: var(--qa-target);
    padding: 0 var(--qa-space-4);
    border-radius: var(--qa-radius-full);
    background: var(--qa-surface);
    color: var(--qa-text-muted);
}

.search:focus-within {
    outline: 2px solid var(--qa-accent);
    outline-offset: 2px;
}

.search-input {
    flex: 1 1 0;
    min-width: 0;
    height: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--qa-text);
}

.search-input:focus-visible {
    outline: none;
}

/* Mail. */

.queue {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--qa-space-3);
}

.figure {
    font-size: var(--qa-text-lg);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
}

.mail-frame {
    width: 100%;
    height: 480px;
    border: 0;
    border-radius: var(--qa-radius-inner);
    background: var(--qa-mail-surface);
}

/* Last in the file, so it wins over each transition above at the same specificity. */
@media (prefers-reduced-motion: reduce) {
    .card[data-enter='true'] {
        animation: none;
    }

    .pill,
    .button,
    .row,
    .goto,
    .box-glyph {
        transition: none;
    }
}
`;var Ut=new URL(".",document.currentScript.src),Ce=class extends Error{constructor(e,a){super(a.message??`The request failed with status ${e}.`),this.data=a}};function jt(){let t=document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);return t?decodeURIComponent(t[1]):""}function Ee(t){return new URL(t,Ut).toString()}async function C(t,{method:e="GET",body:a}={}){let r=await fetch(Ee(t),{method:e,credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json","X-XSRF-TOKEN":jt()},body:a&&JSON.stringify(a)}),s=await r.json().catch(()=>({}));if(!r.ok)throw new Ce(r.status,s);return s}function M(t){let e=Object.values(t.data?.errors??{});return e.length>0?e[0][0]:t.message}var zt=0;function n(t,e,a,r,s,o){e||(e={});var l,c,d=e;if("ref"in d)for(c in d={},e)c=="ref"?l=e[c]:d[c]=e[c];var u={type:t,props:d,key:a,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--zt,__i:-1,__u:0,__source:s,__self:o};if(typeof t=="function"&&(l=t.defaultProps))for(c in l)d[c]===void 0&&(d[c]=l[c]);return q.vnode&&q.vnode(u),u}function te({label:t,ariaLabel:e,focusKey:a,question:r,confirmLabel:s,busyLabel:o,danger:l,disabled:c,triggerClass:d="button secondary",children:u,onConfirm:p}){let[h,i]=b("idle"),f=S(null),g=S(null),_=S(!1),y=D();B(()=>{h==="confirm"&&g.current?.focus(),h==="idle"&&_.current&&(_.current=!1,f.current?.focus())},[h]);let m=()=>{_.current=!0,i("idle")},v=async()=>{i("busy"),await p(),_.current=!0,i("idle")};return h==="idle"?n("button",{ref:f,type:"button",class:d,"aria-label":e,title:e,"data-focus-key":a,disabled:c,onClick:()=>i("confirm"),children:u??t}):n("div",{class:"confirm",role:"group","aria-labelledby":y,onKeyDown:E=>{E.key==="Escape"&&!E.isComposing&&h==="confirm"&&(E.stopPropagation(),m())},children:[n("p",{id:y,class:"confirm-question",children:r}),n("div",{class:"confirm-actions",children:[n("button",{ref:g,type:"button",class:"button secondary",disabled:h==="busy",onClick:m,children:"Cancel"}),n("button",{type:"button",class:`button ${l?"danger":"primary"}`,disabled:h==="busy",onClick:v,children:h==="busy"?o:s})]})]})}var Bt=/^[A-Za-z_][\w-]*(\[[\w-]*\])*$/,Wt=["file","button","submit","reset","image"];function _e(t){try{return[...document.querySelectorAll(t)]}catch{return null}}function Kt(t){if(!Bt.test(t))return _e(t);let e=_e(`[name="${CSS.escape(t)}"]`);return e.length>0?e:_e(`#${CSS.escape(t)}`)}function Vt(t){return!(t instanceof HTMLInputElement)||!["radio","checkbox"].includes(t.type)||t.name===""?[t]:_e(`input[type="${t.type}"][name="${CSS.escape(t.name)}"]`).filter(e=>e.form===t.form)}function Le(t,e){t.checked!==e&&t.click()}function Gt(t,e){if(typeof e!="string")return"This field takes one text value, not a list or true or false.";let a=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(a,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}));let r=s=>s.replaceAll(`\r
`,`
`).replaceAll(/[\r\n]/g,"").trim();return r(t.value)!==r(e)?`The field did not take the value "${e}".`:null}function Qt(t,e){let[a]=t;if(a instanceof HTMLSelectElement&&a.multiple){let r=typeof e=="string"?[e]:e;if(!Array.isArray(r))return"This select takes a list of option values, not true or false.";let s=[...a.options];s.forEach(l=>{l.selected=r.includes(l.value)}),a.dispatchEvent(new Event("input",{bubbles:!0})),a.dispatchEvent(new Event("change",{bubbles:!0}));let o=r.filter(l=>!s.some(c=>c.value===l));return o.length>0?`There is no option with the value "${o.join('", "')}". The other values are selected.`:null}if(a instanceof HTMLSelectElement)return typeof e!="string"?"This select takes one option value, not a list or true or false.":e!==""&&![...a.options].some(r=>r.value===e)?`There is no option with the value "${e}".`:(Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value").set.call(a,e),a.dispatchEvent(new Event("input",{bubbles:!0})),a.dispatchEvent(new Event("change",{bubbles:!0})),null);if(a.type==="radio"){if(typeof e!="string")return"A radio group takes one value, not a list or true or false.";let r=t.find(s=>s.value===e);return r===void 0?`There is no radio with the value "${e}".`:(Le(r,!0),null)}if(a.type==="checkbox"){if(typeof e=="boolean"&&t.length>1)return`This is a group of ${t.length} checkboxes. Use a list of the values to check.`;if(typeof e=="boolean")return Le(a,e),null;let r=typeof e=="string"?[e]:e;t.forEach(o=>Le(o,r.includes(o.value)));let s=r.filter(o=>!t.some(l=>l.value===o));return s.length>0?`There is no checkbox with the value "${s.join('", "')}". The other values are set.`:null}return Gt(a,e)}function pt(t){let e={total:t.length,filled:[],missing:[],problems:[],several:[]};for(let{key:a,value:r}of t){let s=Kt(a);if(s===null){e.problems.push({key:a,message:"The key is not a field name or a valid CSS selector."});continue}if(s.length===0){e.missing.push(a);continue}let o=s.filter(g=>g.getClientRects().length>0),l=s.filter(g=>g.type==="hidden"),c=o.length>0?o:l;if(c.length===0){e.problems.push({key:a,message:"The page has this field, but it is not visible."});continue}let d=[];for(let g of c)d.some(_=>_.includes(g))||d.push(Vt(g));d.length>1&&e.several.push({key:a,count:d.length});let[u]=d,[p]=u;if(!(p instanceof HTMLTextAreaElement||p instanceof HTMLSelectElement||p instanceof HTMLInputElement&&!Wt.includes(p.type))){let g=p instanceof HTMLInputElement?`${p.type} input`:`<${p.localName}> element`;e.problems.push({key:a,message:`Nitpick cannot fill a ${g}.`});continue}let i=Qt(u,r);if(i!==null){e.problems.push({key:a,message:i});continue}let f=r;Array.isArray(r)&&(f=r.length===0?"none":r.join(", ")),typeof r=="boolean"&&(f=r?"checked":"not checked"),r===""&&(f="empty"),p.type==="password"&&(f="(masked)"),e.filled.push({key:a,value:f})}return e}var Xt={arrowRight:n(w,{children:[n("path",{d:"M5 12h14"}),n("path",{d:"m12 5 7 7-7 7"})]}),arrowUp:n(w,{children:[n("path",{d:"m5 12 7-7 7 7"}),n("path",{d:"M12 19V5"})]}),check:n("path",{d:"M20 6 9 17l-5-5"}),chevronDown:n("path",{d:"m6 9 6 6 6-6"}),chevronLeft:n("path",{d:"m15 18-6-6 6-6"}),chevronRight:n("path",{d:"m9 18 6-6-6-6"}),listChecks:n(w,{children:[n("path",{d:"m3 17 2 2 4-4"}),n("path",{d:"m3 7 2 2 4-4"}),n("path",{d:"M13 6h8"}),n("path",{d:"M13 12h8"}),n("path",{d:"M13 18h8"})]}),mail:n(w,{children:[n("rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}),n("path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"})]}),search:n(w,{children:[n("circle",{cx:"11",cy:"11",r:"8"}),n("path",{d:"m21 21-4.3-4.3"})]}),textCursorInput:n(w,{children:[n("path",{d:"M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6"}),n("path",{d:"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7"}),n("path",{d:"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1"}),n("path",{d:"M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1"}),n("path",{d:"M9 6v12"})]}),trash:n(w,{children:[n("path",{d:"M3 6h18"}),n("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),n("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})]}),users:n(w,{children:[n("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),n("circle",{cx:"9",cy:"7",r:"4"}),n("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),n("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),x:n(w,{children:[n("path",{d:"M18 6 6 18"}),n("path",{d:"m6 6 12 12"})]})};function $({name:t,size:e=16}){return n("svg",{class:"icon",width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",children:Xt[t]})}function ft(t,e,a){try{return JSON.parse(t.getItem(`nitpick.${e}`))??a}catch{return a}}function ht(t,e,a){try{if(a===null){t.removeItem(`nitpick.${e}`);return}t.setItem(`nitpick.${e}`,JSON.stringify(a))}catch{}}var $e={read:(t,e)=>ft(localStorage,t,e),write:(t,e)=>ht(localStorage,t,e)},Q={read:(t,e)=>ft(sessionStorage,t,e),write:(t,e)=>ht(sessionStorage,t,e)};function ae(t,e){Q.write("focus",t),location.assign(e)}function U({name:t,ready:e,children:a}){let r=S(null),s=S(!1);return B(()=>{if(!e||s.current)return;s.current=!0,r.current.scrollTop=Q.read(`scroll.${t}`,0);let l=Q.read("focus",null);if(l===null)return;Q.write("focus",null);let c=r.current.getRootNode();c.querySelector(`[data-focus-key="${CSS.escape(l)}"]`)?.focus({preventScroll:!0}),c.activeElement||c.querySelector('[role="tab"][aria-selected="true"]')?.focus({preventScroll:!0})},[e]),n("div",{ref:r,class:"scroller","data-ready":e,onScroll:()=>{s.current&&r.current&&Q.write(`scroll.${t}`,r.current.scrollTop)},children:a})}var Re="Start a round to record results and nits";function ne(t,e){return e==="guest"?"Guest":t.personas.find(a=>a.key===e)?.label??e}function gt({failure:t}){return n("div",{role:"alert",class:"failure",children:[n("p",{class:"text",children:t.message}),t.output&&n("pre",{class:"output",children:t.output})]})}function _t({scenario:t,persona:e,current:a,focusKey:r,onFailure:s}){let[o,l]=b(!1),c=async()=>{l(!0);try{let{redirect:p}=await C("login",{method:"POST",body:{scenario:t.slug,persona:e}});ae(r,p)}catch(p){s({message:M(p)}),l(!1)}},d=e==="guest"?"Log out":`Log in as ${ne(t,e)}`,u=e==="guest"?"Log out":"Log in";return a&&(u="Current"),n("button",{type:"button",class:"button secondary","aria-label":d,title:d,"data-focus-key":r,disabled:o||a,onClick:c,children:u})}function Jt({scenario:t,persona:e,focusKey:a,onFailure:r}){let s=e==="guest"?"Reset, logged out":`Reset as ${ne(t,e)}`,o=e==="guest"?"Reset the database and stay logged out?":`Reset the database and log in as ${ne(t,e)}?`;return n(te,{label:"Reset",ariaLabel:s,focusKey:a,question:o,confirmLabel:"Reset",busyLabel:"Resetting\u2026",danger:!0,onConfirm:async()=>{r(null);try{let{redirect:c}=await C("reset",{method:"POST",body:{scenario:t.slug,persona:e}});ae(a,c)}catch(c){r({message:M(c),output:c.data?.output})}}})}var mt=Promise.resolve();function Me(t){let e=mt.then(t);return mt=e.catch(()=>{}),e}async function vt(t,e,a){return(await Me(()=>C(`rounds/${t.round.id}/nits`,{method:"POST",body:{item_key:e,body:a,url:location.href}}))).round}function Yt({round:t,itemKey:e,label:a,inputRef:r,onRoundChange:s}){let[o,l]=b(""),[c,d]=b(!1),[u,p]=b(null),h=D();return n("form",{class:"nit-field",onSubmit:async f=>{if(f.preventDefault(),o.trim()!==""){d(!0),p(null);try{s(await vt(t,e,o)),l("")}catch(g){p(M(g))}d(!1),r.current?.focus()}},children:[n("label",{class:"visually-hidden",for:h,children:a}),n("input",{ref:r,id:h,class:"input",type:"text",autocomplete:"off",maxLength:2e3,placeholder:"Add a nit\u2026",title:t===null?Re:void 0,value:o,readOnly:c,disabled:t===null,onInput:f=>l(f.currentTarget.value)}),u&&n("p",{role:"alert",class:"text error",children:u})]})}function Ne({round:t,nits:e,onRoundChange:a}){if(e.length===0)return null;let r=s=>async()=>{let o=await Me(()=>C(`rounds/${t.round.id}/nits/${s.id}`,{method:"DELETE"}));a(o.round)};return n("ul",{class:"nits",children:e.map(s=>n("li",{class:"nit",children:[n("p",{class:"nit-body",children:[s.body,"\xA0",n("code",{class:"nit-path muted",children:["(",s.url,")"]})]}),n(te,{ariaLabel:`Delete the nit: ${s.body}`,question:"Delete this nit?",confirmLabel:"Delete",busyLabel:"Deleting\u2026",danger:!0,triggerClass:"button icon-button",onConfirm:r(s),children:n($,{name:"trash"})})]},s.id))})}var Zt={untested:"pass",pass:"fail",fail:"untested"},ea={untested:"press to mark passed",pass:"press to mark failed",fail:"press to clear"},bt={untested:"not tested",pass:"passed",fail:"failed"},me={pass:"check",fail:"x"};function ta(t){return t===1?"1 nit":`${t} nits`}function aa({report:t}){let{total:e,filled:a,problems:r,several:s,missing:o}=t,l=`Filled ${a.length} of ${e} fields.`;return e===0&&(l="The fill has no fields."),n("ul",{class:"fill-lines",children:[n("li",{class:"fill-summary",children:l}),a.map(({key:c,value:d})=>n("li",{children:[n("code",{class:"fill-key",children:c})," ",d]},c)),r.map(({key:c,message:d})=>n("li",{children:[n("code",{class:"fill-key",children:c})," Not filled. ",d]},c)),s.map(({key:c,count:d})=>n("li",{children:[d," matches for ",n("code",{class:"fill-key",children:c}),". Nitpick filled the first."]},c)),o.length>0&&n("li",{children:["Not found:"," ",o.map((c,d)=>n(w,{children:[d>0&&", ",n("code",{class:"fill-key",children:c})]},c))]})]})}function na({scenario:t,item:e,round:a,result:r,onRoundChange:s}){let[o,l]=b(null),[c,d]=b(!1),[u,p]=b(null),[h,i]=b(!1),[f,g]=b(null),[_,y]=b(null),m=S(null),v=S(!1),L=S(!1),E=S(null),F=D(),N=r?.nits??[],A=o??r?.status??"untested",H=Zt[A];B(()=>{c&&L.current&&(L.current=!1,E.current?.focus())},[c]),G(()=>{if(f===null)return;let R=()=>g(null);return document.addEventListener("inertia:navigate",R),document.addEventListener("livewire:navigated",R),()=>{document.removeEventListener("inertia:navigate",R),document.removeEventListener("livewire:navigated",R)}},[f]);let j=async()=>{if(!h){i(!0),g(null),y(null);try{let{fields:R}=await C("fill",{method:"POST",body:{scenario:t.slug,item:e.key}});g(pt(R))}catch(R){y({message:M(R),output:R.data?.output})}i(!1)}},P=async()=>{let R=null;try{let J=await Me(()=>{v.current=!1,R=m.current;let Y=`rounds/${a.round.id}/results/${encodeURIComponent(e.key)}`;return R==="untested"?C(Y,{method:"DELETE"}):C(Y,{method:"PUT",body:{status:R}})});s(J.round)}catch(J){p(M(J))}m.current===R&&l(null)},I=()=>{m.current=H,l(H),p(null),H==="fail"&&c&&E.current?.focus(),H==="fail"&&!c&&(L.current=!0,d(!0)),H==="untested"&&N.length===0&&d(!1),v.current||(v.current=!0,P())};return n("li",{class:"item","data-status":A,children:[n("div",{class:"item-row",children:[n("button",{type:"button",class:"box","data-status":A,"aria-label":`${e.text}, ${bt[A]}, ${ea[A]}`,title:a===null?Re:void 0,disabled:a===null,onClick:I,children:n("span",{class:"box-glyph",children:me[A]&&n($,{name:me[A],size:12})})}),n("button",{type:"button",class:"item-toggle","aria-expanded":c,"aria-controls":F,onClick:()=>d(!c),children:[n("span",{class:"check-text",children:e.text}),(e.setup||N.length>0)&&n("span",{class:"item-meta",children:[e.setup,e.setup&&N.length>0&&" \xB7 ",N.length>0&&n("span",{class:"nit-count",children:ta(N.length)})]})]}),e.fill!==null&&n("button",{type:"button",class:"fill","aria-label":`Fill the form for: ${e.text}`,title:`Fill the form for: ${e.text}`,"aria-disabled":h,onClick:j,children:n($,{name:"textCursorInput"})}),e.url&&n("a",{class:"goto",href:e.url,"aria-label":`Go to ${e.url}`,title:`Go to ${e.url}`,children:n($,{name:"arrowRight"})})]}),e.fill!==null&&n("div",{role:"status",class:"fill-notice",children:f&&n(aa,{report:f})}),_&&n("div",{class:"item-failure",children:n(gt,{failure:_})}),u&&n("p",{role:"alert",class:"text error item-error",children:u}),n("div",{id:F,class:"details",hidden:!c,children:[a&&n(Ne,{round:a,nits:N,onRoundChange:s}),n(Yt,{round:a,itemKey:e.key,label:`Nit on: ${e.text}`,inputRef:E,onRoundChange:s})]})]})}function ra({scenario:t,group:e,index:a,Heading:r,currentEmail:s,itemProps:o}){let[l,c]=b(null),d=e.type==="section",u=d?e.persona:e.items[0].persona,p=h=>({scenario:t,persona:h,current:h!=="guest"&&oa(t,h)===s,focusKey:`login:${a}:${h}`,onFailure:c});return n("section",{class:"group",children:[n("div",{class:"group-header",children:[n(r,{class:"group-title",children:d?ne(t,e.persona):e.title}),d&&n(_t,{...p(e.persona)}),n(Jt,{scenario:t,persona:u,focusKey:`reset:${a}`,onFailure:c})]}),l&&n(gt,{failure:l}),n("ol",{class:"items",children:e.items.map((h,i)=>n(w,{children:[!d&&h.persona!==e.items[i-1]?.persona&&n("li",{class:"handoff-step",children:[n("p",{class:"text muted",children:["As ",ne(t,h.persona)]}),n(_t,{...p(h.persona)})]}),n(na,{scenario:t,item:h,...o(h)})]},h.key))})]})}function oa(t,e){return t.personas.find(a=>a.key===e)?.email}function sa({round:t,onRoundChange:e}){let{results:a,nits:r}=t.orphaned,s=[...new Set([...a.map(o=>o.item_key),...r.map(o=>o.item_key)])].sort();return s.length===0?null:n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Orphaned"})}),n("ul",{class:"items",children:s.map(o=>{let l=a.find(d=>d.item_key===o)?.status??"untested",c=r.filter(d=>d.item_key===o);return n("li",{class:"item",children:[n("div",{class:"item-row",children:[n("span",{class:"box","data-status":l,children:[n("span",{class:"box-glyph",children:me[l]&&n($,{name:me[l],size:12})}),n("span",{class:"visually-hidden",children:bt[l]})]}),n("p",{class:"item-toggle",children:n("code",{class:"check-text",children:o})})]}),c.length>0&&n("div",{class:"details",children:n(Ne,{round:t,nits:c,onRoundChange:e})})]},o)})})]})}function ia({round:t,onRoundChange:e}){let[a,r]=b(""),[s,o]=b(!1),[l,c]=b(null),d=S(null),u=D();return n("form",{class:"composer",onSubmit:async h=>{h.preventDefault(),o(!0),c(null);try{e(await vt(t,null,a)),r("")}catch(i){c(M(i))}o(!1),d.current?.focus()},children:[l&&n("p",{role:"alert",class:"text error",children:l}),n("div",{class:"composer-field",children:[n("label",{class:"visually-hidden",for:u,children:"Page nit"}),n("input",{ref:d,id:u,class:"composer-input",type:"text",autocomplete:"off",maxLength:2e3,placeholder:"Note something on this page\u2026",title:t===null?Re:void 0,value:a,readOnly:s,disabled:t===null,onInput:h=>r(h.currentTarget.value)}),n("button",{type:"submit",class:"send","aria-label":"Add page nit",title:"Add page nit",disabled:s||t===null||a.trim()==="",children:n($,{name:"arrowUp"})})]})]})}function yt({scenarios:t,scenario:e,round:a,ready:r,nextNumber:s,currentEmail:o,onRoundChange:l}){if(t!==null&&e===null)return n(U,{name:"checklist",ready:!0,children:n("p",{class:"text",children:["There are no scenarios yet. Make one with ",n("code",{children:"php artisan make:nitpick-scenario Name"}),"."]})});if(!r)return n(U,{name:"checklist",ready:!1});let c=a?.round.number??s,d=a===null||a.round.scenario===e.slug,u=e.groups.filter(i=>d&&(i.retest===null||i.retest===c)),p=new Map((a?.groups??[]).flatMap(i=>i.items).map(i=>[i.key,i])),h=i=>({round:a,result:p.get(i.key),onRoundChange:l});return n(w,{children:[n(U,{name:"checklist",ready:!0,children:n("div",{class:"stack",children:[u.map((i,f)=>{let g=i.retest!==null&&i.retest!==u[f-1]?.retest;return n(w,{children:[g&&n("h3",{class:"retest",children:["Retest ",i.retest]}),n(ra,{scenario:e,group:i,index:f,Heading:i.retest===null?"h3":"h4",currentEmail:o,itemProps:h})]},f)}),n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Page nits"})}),n("div",{class:"panel-card",children:a&&a.page_nits.length>0?n(Ne,{round:a,nits:a.page_nits,onRoundChange:l}):n("p",{class:"text muted",children:"A page nit is a note on the page, not on an item. Add one below."})})]}),a&&n(sa,{round:a,onRoundChange:l})]})}),n(ia,{round:a,onRoundChange:l})]})}function xt(t){return new Date(t.sent_at).toLocaleString([],{dateStyle:"short",timeStyle:"short"})}function la(t){let e=new Date(t.sent_at);return e.toDateString()===new Date().toDateString()?e.toLocaleTimeString([],{timeStyle:"short"}):e.toLocaleDateString([],{dateStyle:"short"})}function ca({mail:t,onBack:e}){return n("div",{class:"stack",children:[n("div",{children:n("button",{type:"button",class:"button secondary back",onClick:e,children:[n($,{name:"chevronLeft"}),"All mail"]})}),n("div",{class:"panel-card",children:[n("h3",{class:"item-text",children:t.subject||"-"}),n("p",{class:"text muted",children:["To ",t.to," at ",xt(t)]})]}),n("iframe",{class:"mail-frame",sandbox:"",title:`Mail: ${t.subject}`,src:Ee(`mails/${t.id}`)}),n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Links"})}),n("div",{class:"panel-card",children:t.links.length===0?n("p",{class:"text muted",children:"The mail has no links."}):n("ul",{class:"links",children:t.links.map(a=>n("li",{children:n("a",{class:"link",href:a,children:a})},a))})})]})]})}function qt(){let[t,e]=b(null),[a,r]=b(null),[s,o]=b(!1),[l,c]=b(null),[d,u]=b(null),[p,h]=b(null),i=()=>Promise.all([C("mails"),C("queue")]).then(([_,y])=>{e(_.data),r(y.size)}).catch(_=>{e([]),h(M(_))});G(()=>{i()},[]);let f=async()=>{o(!0),c(null),h(null);try{let _=await C("queue",{method:"POST"});_.exit_code!==0&&c(_.output),await i()}catch(_){h(M(_))}o(!1)};return d?n(U,{name:"mail-open",ready:!0,children:n(ca,{mail:d,onBack:()=>u(null)})},"mail-open"):n(U,{name:"mail",ready:t!==null,children:n("div",{class:"stack",children:[n("div",{class:"panel-card queue",children:[n("p",{class:"text","aria-live":"polite",children:[n("span",{class:"figure",children:a??"-"})," queued ",a===1?"job":"jobs"]}),n("button",{type:"button",class:"button light",disabled:s,onClick:f,children:s?"Running\u2026":"Run queue"})]}),p&&n("p",{role:"alert",class:"text error",children:p}),l&&n("div",{role:"alert",class:"failure",children:[n("p",{class:"text",children:"The queue worker failed."}),n("pre",{class:"output",children:l})]}),t?.length===0&&n("p",{class:"text muted",children:"No mail yet. A queued mail shows here after Run queue."}),t?.length>0&&n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Captured mail"})}),n("ul",{class:"rows",children:t.map(_=>n("li",{children:n("button",{type:"button",class:"row",onClick:()=>u(_),children:[n("span",{class:"row-text",children:[n("span",{class:"row-title",children:_.subject||"-"}),n("span",{class:"row-meta",children:[_.to," \xB7"," ",n("time",{dateTime:_.sent_at,title:xt(_),children:la(_)})]})]}),n($,{name:"chevronRight"})]})},_.id))})]})]})},"mail")}function wt({rows:t,currentEmail:e,busy:a,onLogIn:r}){return n("ul",{class:"rows",children:t.map(s=>{let o=s.name||s.email,l=s.email===e;return n("li",{class:"row","data-current":l,children:[n("span",{class:"avatar","aria-hidden":"true",children:o.charAt(0).toUpperCase()}),n("span",{class:"row-text",children:[n("span",{class:"row-title",children:s.name||"-"}),n("span",{class:"row-meta",children:s.email})]}),n("button",{type:"button",class:"button secondary","aria-label":`Log in as ${o}`,title:`Log in as ${o}`,"data-focus-key":`login:${s.email}`,disabled:a||l,onClick:()=>r(s.body,`login:${s.email}`),children:l?"Current":"Log in"})]},s.email)})})}function kt({scenarios:t,scenario:e,user:a}){let[r,s]=b(!1),[o,l]=b(null),[c,d]=b(null),u=S(null),p=D(),h=async(_,y)=>{s(!0),l(null);try{let{redirect:m}=await C("login",{method:"POST",body:_});ae(y,m)}catch(m){l(M(m)),s(!1)}},i=_=>{let y=_.currentTarget.value.trim();if(clearTimeout(u.current),y===""){d(null);return}u.current=setTimeout(()=>{C(`users?search=${encodeURIComponent(y)}`).then(m=>d(m.data)).catch(m=>l(M(m)))},200)},f=(e?.personas??[]).map(_=>({name:_.label,email:_.email,body:{scenario:e.slug,persona:_.key}})),g=(c??[]).map(_=>({..._,body:{email:_.email}}));return n(U,{name:"personas",ready:t!==null,children:n("div",{class:"stack",children:[o&&n("p",{role:"alert",class:"text error",children:o}),n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Personas"})}),t?.length===0&&n("p",{class:"text muted",children:"There are no scenarios yet."}),f.length>0&&n(wt,{rows:f,currentEmail:a?.email,busy:r,onLogIn:h})]}),n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Find a user"})}),n("div",{class:"search",children:[n($,{name:"search"}),n("label",{class:"visually-hidden",for:p,children:"Find a user by email or name"}),n("input",{id:p,class:"search-input",type:"search",autocomplete:"off",onInput:i})]}),c?.length===0&&n("p",{class:"text muted",children:"No user matches."}),c?.length>0&&n(wt,{rows:g,currentEmail:a?.email,busy:r,onLogIn:h})]}),n("div",{children:n("button",{type:"button",class:"button secondary","data-focus-key":"logout",disabled:r||!a||!e,onClick:()=>h({scenario:e?.slug,persona:"guest"},"logout"),children:a?"Log out":"Logged out"})})]})})}var Ae="Alt+Shift+Q",X=[{key:"checklist",label:"Checklist",icon:"listChecks"},{key:"mail",label:"Mail",icon:"mail"},{key:"personas",label:"Personas",icon:"users"}];function Pe(t,e){let[a,r]=b(()=>$e.read(t,e));return[a,o=>{r(o),$e.write(t,o)}]}function ua(t){return!t.isComposing&&t.altKey&&t.shiftKey&&!t.ctrlKey&&!t.metaKey&&t.code==="KeyQ"}function da(t){return t instanceof HTMLElement&&(t.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(t.tagName))}function pa({scenarios:t,scenario:e,round:a,nextNumber:r,onSelectScenario:s,onRoundChange:o}){let[l,c]=b(!1),[d,u]=b(null),[p,h]=b([]),i=D(),f=async()=>{c(!0),u(null);try{let m=await C("rounds",{method:"POST",body:{scenario:e.slug}});h([]),o(m.round)}catch(m){u(M(m))}c(!1)},g=async()=>{u(null);try{let m=await C(`rounds/${a.round.id}`,{method:"PATCH",body:{status:"closed"}});h(m.reports),o(null)}catch(m){u(M(m))}},_=a===null&&t?.length>1,y=t===null?"Loading\u2026":"No scenarios yet";return a!==null?y=`Round ${a.round.number} \xB7 open`:e!==null&&(y=`Round ${r} \xB7 not started`),n("header",{class:"card-header",children:[n("div",{class:"header-row",children:[n("div",{class:"header-title",children:[_?n("div",{class:"picker",children:[n("label",{class:"visually-hidden",for:i,children:"Scenario"}),n("select",{id:i,class:"picker-select",value:e.slug,onChange:m=>s(m.currentTarget.value),children:t.map(m=>n("option",{value:m.slug,children:m.title},m.slug))}),n($,{name:"chevronDown"})]}):n("h2",{class:"title",children:a?.round.title??e?.title??"Nitpick"}),n("p",{class:"subtitle","data-round":a===null?"none":"open",children:y})]}),a===null?n("button",{type:"button",class:"button light",disabled:l||e===null,onClick:f,children:"Start round"}):n(te,{label:"Close round",question:`Close round ${a.round.number} and write the report?`,confirmLabel:"Close round",busyLabel:"Closing\u2026",onConfirm:g})]}),d&&n("p",{role:"alert",class:"note error",children:d}),n("div",{role:"status",children:p.length>0&&n("p",{class:"note",children:["Report written to"," ",p.map(m=>n("code",{children:m},m))]})})]})}function fa(){let[t,e]=Pe("open",!1),[a,r]=Pe("tab","checklist"),[s,o]=Pe("scenario",null),[l,c]=b(null),[d,u]=b(null),[p,h]=b(!1),[i,f]=b({}),[g,_]=b(void 0),y=S(null),m=S(null),v=S(!1),L=S(!1),E=()=>C("user").then(x=>_(x.user)),F=()=>C("round").then(x=>{u(x.round),f(x.next_numbers),h(!0)}),N=x=>{u(x),x===null&&F()},A=x=>{e(!t),L.current=!t,v.current=!t&&x,t&&y.current?.focus()},H=x=>{x.key==="Escape"&&t&&!x.isComposing&&A(!1)};B(()=>{t&&v.current&&(v.current=!1,m.current?.querySelector('[aria-selected="true"]')?.focus())},[t]),G(()=>{C("scenarios").then(x=>c(x.data)),E(),F()},[]);let j=S(A);j.current=A,G(()=>{let x=W=>{!ua(W)||da(W.composedPath()[0])||(W.preventDefault(),j.current(!0))};return document.addEventListener("keydown",x),document.addEventListener("inertia:navigate",E),document.addEventListener("livewire:navigated",E),()=>{document.removeEventListener("keydown",x),document.removeEventListener("inertia:navigate",E),document.removeEventListener("livewire:navigated",E)}},[]);let P=d?.round.scenario??s,I=l?.find(x=>x.slug===P)??l?.[0]??null,R=I?.personas.find(x=>x.email===g?.email),J=g===void 0?"":R?.label??g?.email??"Guest",Y=i[I?.slug]??1,Tt=x=>{let W=X.findIndex(St=>St.key===a),Fe={ArrowRight:1,ArrowLeft:X.length-1,Home:-W,End:X.length-1-W};if(!(x.key in Fe))return;x.preventDefault();let He=X[(W+Fe[x.key])%X.length];r(He.key),m.current.querySelector(`#qa-tab-${He.key}`).focus()};return n(w,{children:[t&&n("section",{id:"qa-card",class:"card","aria-label":"Nitpick","data-enter":L.current,"data-loading":l===null||!p,onKeyDown:H,children:[n(pa,{scenarios:l,scenario:I,round:d,nextNumber:Y,onSelectScenario:o,onRoundChange:N}),n("div",{id:"qa-tabpanel",role:"tabpanel","aria-labelledby":`qa-tab-${a}`,class:"view",children:[a==="checklist"&&n(yt,{scenarios:l,scenario:I,round:d,ready:l!==null&&p,nextNumber:Y,currentEmail:g?.email,onRoundChange:N}),a==="mail"&&n(qt,{}),a==="personas"&&n(kt,{scenarios:l,scenario:I,user:g})]}),n("div",{ref:m,role:"tablist","aria-label":"Nitpick",class:"tabbar",onKeyDown:Tt,children:X.map(x=>n("button",{id:`qa-tab-${x.key}`,type:"button",role:"tab",class:"tab","aria-selected":x.key===a,"aria-controls":"qa-tabpanel",tabIndex:x.key===a?0:-1,onClick:()=>r(x.key),children:[n($,{name:x.icon}),x.label]},x.key))})]}),n("button",{ref:y,type:"button",class:"pill","data-open":t,"aria-expanded":t,"aria-controls":"qa-card","aria-label":t?"Close Nitpick":void 0,"aria-keyshortcuts":Ae,title:t?`Close (${Ae})`:`Nitpick (${Ae})`,onClick:()=>A(!1),onKeyDown:H,children:t?n($,{name:"x",size:20}):n(w,{children:[n("span",{class:"pill-brand",children:"QA"}),n("span",{class:"pill-separator","aria-hidden":"true",children:"\xB7"}),n("span",{class:"pill-name",children:J}),d&&n("span",{class:"pill-round",title:`Round ${d.round.number} is open`,children:["R",d.round.number]}),n($,{name:"chevronRight"})]})})]})}var Ie=class extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;let e=this.attachShadow({mode:"open"}),a=document.createElement("style"),r=document.createElement("div");a.textContent=dt,r.className="root",e.append(a,r),et(n(fa,{}),r)}};customElements.get("nitpick-panel")||customElements.define("nitpick-panel",Ie);document.querySelector("nitpick-panel")||document.documentElement.append(document.createElement("nitpick-panel"));})();
