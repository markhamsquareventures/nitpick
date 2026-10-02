(()=>{var fe,q,Be,$t,B,Oe,We,Ke,be,ie,te,Ge,qe,ye,xe,Rt,ue={},de=[],Mt=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,he=Array.isArray;function z(t,e){for(var n in e)t[n]=e[n];return t}function we(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function Nt(t,e,n){var r,s,o,i={};for(o in e)o=="key"?r=e[o]:o=="ref"?s=e[o]:i[o]=e[o];if(arguments.length>2&&(i.children=arguments.length>3?fe.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(o in t.defaultProps)i[o]===void 0&&(i[o]=t.defaultProps[o]);return le(t,i,r,s,null)}function le(t,e,n,r,s){var o={type:t,props:e,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:s??++Be,__i:-1,__u:0};return s==null&&q.vnode!=null&&q.vnode(o),o}function w(t){return t.children}function ce(t,e){this.props=t,this.context=e}function G(t,e){if(e==null)return t.__?G(t.__,t.__i+1):null;for(var n;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?G(t):null}function At(t){if(t.__P&&t.__d){var e=t.__v,n=e.__e,r=[],s=[],o=z({},e);o.__v=e.__v+1,q.vnode&&q.vnode(o),ke(t.__P,o,e,t.__n,t.__P.namespaceURI,32&e.__u?[n]:null,r,n??G(e),!!(32&e.__u),s),o.__v=e.__v,o.__.__k[o.__i]=o,Je(r,o,s),e.__e=e.__=null,o.__e!=n&&Ve(o)}}function Ve(t){if((t=t.__)!=null&&t.__c!=null)return t.__e=t.__c.base=null,t.__k.some(function(e){if(e!=null&&e.__e!=null)return t.__e=t.__c.base=e.__e}),Ve(t)}function Ue(t){(!t.__d&&(t.__d=!0)&&B.push(t)&&!pe.__r++||Oe!=q.debounceRendering)&&((Oe=q.debounceRendering)||We)(pe)}function pe(){try{for(var t,e=1;B.length;)B.length>e&&B.sort(Ke),t=B.shift(),e=B.length,At(t)}finally{B.length=pe.__r=0}}function Qe(t,e,n,r,s,o,i,l,d,u,p){var m,c,f,h,_,b,g=r&&r.__k||de,y=e.length;for(d=Pt(n,e,g,d,y),m=0;m<y;m++)(f=n.__k[m])!=null&&(c=f.__i!=-1&&g[f.__i]||ue,f.__i=m,b=ke(t,f,c,s,o,i,l,d,u,p),h=f.__e,f.ref&&c.ref!=f.ref&&(c.ref&&Se(c.ref,null,f),p.push(f.ref,f.__c||h,f)),_==null&&h!=null&&(_=h),4&f.__u?(d=Xe(f,d,t),c.__e&&(c.__e=null)):typeof f.type=="function"&&b!==void 0?d=b:h&&(d=h.nextSibling),f.__u&=-7);return n.__e=_,d}function Pt(t,e,n,r,s){var o,i,l,d,u,p=n.length,m=p,c=0;for(t.__k=new Array(s),o=0;o<s;o++)(i=e[o])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i=="string"||typeof i=="number"||typeof i=="bigint"||i.constructor==String?i=t.__k[o]=le(null,i,null,null,null):he(i)?i=t.__k[o]=le(w,{children:i},null,null,null):i.constructor===void 0&&i.__b>0?i=t.__k[o]=le(i.type,i.props,i.key,i.ref?i.ref:null,i.__v):t.__k[o]=i,d=o+c,i.__=t,i.__b=t.__b+1,l=null,(u=i.__i=It(i,n,d,m))!=-1&&(m--,(l=n[u])&&(l.__u|=2)),l==null||l.__v==null?(u==-1&&(s>p?c--:s<p&&c++),typeof i.type!="function"&&(i.__u|=4)):u!=d&&(u==d-1?c--:u==d+1?c++:(u>d?c--:c++,i.__u|=4))):t.__k[o]=null;if(m)for(o=0;o<p;o++)(l=n[o])!=null&&(2&l.__u)==0&&(l.__e==r&&(r=G(l)),et(l,l));return r}function Xe(t,e,n){var r,s;if(typeof t.type=="function"){for(r=t.__k,s=0;r&&s<r.length;s++)r[s]&&(r[s].__=t,e=Xe(r[s],e,n));return e}t.__e!=e&&(e&&t.type&&!e.parentNode&&(e=G(t)),e=n.insertBefore(t.__e,e||null));do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function It(t,e,n,r){var s,o,i,l=t.key,d=t.type,u=e[n],p=u!=null&&(2&u.__u)==0;if(u===null&&l==null||p&&l==u.key&&d==u.type)return n;if(r>(p?1:0)){for(s=n-1,o=n+1;s>=0||o<e.length;)if((u=e[i=s>=0?s--:o++])!=null&&(2&u.__u)==0&&l==u.key&&d==u.type)return i}return-1}function ze(t,e,n){e[0]=="-"?t.setProperty(e,n??""):t[e]=n==null?"":typeof n!="number"||Mt.test(e)?n:n+"px"}function se(t,e,n,r,s){var o,i;e:if(e=="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof r=="string"&&(t.style.cssText=r=""),r)for(e in r)n&&e in n||ze(t.style,e,"");if(n)for(e in n)r&&n[e]==r[e]||ze(t.style,e,n[e])}else if(e[0]=="o"&&e[1]=="n")o=e!=(e=e.replace(Ge,"$1")),i=e.toLowerCase(),e=i in t||e=="onFocusOut"||e=="onFocusIn"?i.slice(2):e.slice(2),t.l||(t.l={}),t.l[e+o]=n,n?r?n[te]=r[te]:(n[te]=qe,t.addEventListener(e,o?xe:ye,o)):t.removeEventListener(e,o?xe:ye,o);else{if(s=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&n==1?"":n))}}function je(t){return function(e){if(this.l){var n=this.l[e.type+t];if(e[ie]==null)e[ie]=qe++;else if(e[ie]<n[te])return;return n(q.event?q.event(e):e)}}}function ke(t,e,n,r,s,o,i,l,d,u){var p,m,c,f,h,_,b,g,y,R,L,H,N,A,F,j,I=e.type;if(e.constructor!==void 0)return null;128&n.__u&&(d=!!(32&n.__u),o=[l=e.__e=n.__e]),(p=q.__b)&&p(e);e:if(typeof I=="function"){m=i.length;try{if(y=e.props,R=I.prototype&&I.prototype.render,L=(p=I.contextType)&&r[p.__c],H=p?L?L.props.value:p.__:r,n.__c?g=(c=e.__c=n.__c).__=c.__E:(R?e.__c=c=new I(y,H):(e.__c=c=new ce(y,H),c.constructor=I,c.render=Ft),L&&L.sub(c),c.state||(c.state={}),c.__n=r,f=c.__d=!0,c.__h=[],c._sb=[]),R&&c.__s==null&&(c.__s=c.state),R&&I.getDerivedStateFromProps!=null&&(c.__s==c.state&&(c.__s=z({},c.__s)),z(c.__s,I.getDerivedStateFromProps(y,c.__s))),h=c.props,_=c.state,c.__v=e,f)R&&I.getDerivedStateFromProps==null&&c.componentWillMount!=null&&c.componentWillMount(),R&&c.componentDidMount!=null&&c.__h.push(c.componentDidMount);else{if(R&&I.getDerivedStateFromProps==null&&y!==h&&c.componentWillReceiveProps!=null&&c.componentWillReceiveProps(y,H),e.__v==n.__v||!c.__e&&c.shouldComponentUpdate!=null&&c.shouldComponentUpdate(y,c.__s,H)===!1){e.__v!=n.__v&&(c.props=y,c.state=c.__s,c.__d=!1),e.__e=n.__e,e.__k=n.__k,e.__k.some(function(P){P&&(P.__=e)}),de.push.apply(c.__h,c._sb),c._sb=[],c.__h.length&&i.push(c),l=G(n);break e}c.componentWillUpdate!=null&&c.componentWillUpdate(y,c.__s,H),R&&c.componentDidUpdate!=null&&c.__h.push(function(){c.componentDidUpdate(h,_,b)})}if(c.context=H,c.props=y,c.__P=t,c.__e=!1,N=q.__r,A=0,R)c.state=c.__s,c.__d=!1,N&&N(e),p=c.render(c.props,c.state,c.context),de.push.apply(c.__h,c._sb),c._sb=[];else do c.__d=!1,N&&N(e),p=c.render(c.props,c.state,c.context),c.state=c.__s;while(c.__d&&++A<25);c.state=c.__s,c.getChildContext!=null&&(r=z(z({},r),c.getChildContext())),R&&!f&&c.getSnapshotBeforeUpdate!=null&&(b=c.getSnapshotBeforeUpdate(h,_)),F=p!=null&&p.type===w&&p.key==null?Ze(p.props.children):p,l=Qe(t,he(F)?F:[F],e,n,r,s,o,i,l,d,u),c.base=e.__e,e.__u&=-161,c.__h.length&&i.push(c),g&&(c.__E=c.__=null)}catch(P){if(i.length=m,e.__v=null,d||o!=null){if(P.then){for(e.__u|=d?160:128;l&&l.nodeType==8&&l.nextSibling;)l=l.nextSibling;o!=null&&(o[o.indexOf(l)]=null),e.__e=l}else if(o!=null)for(j=o.length;j--;)we(o[j])}else e.__e=n.__e;e.__k==null&&(e.__k=n.__k||[]),P.then||Ye(e),q.__e(P,e,n)}}else o==null&&e.__v==n.__v?(e.__k=n.__k,e.__e=n.__e):l=e.__e=Ht(n.__e,e,n,r,s,o,i,d,u);return(p=q.diffed)&&p(e),128&e.__u?void 0:l}function Ye(t){t&&(t.__c&&(t.__c.__e=!0),t.__k&&t.__k.some(Ye))}function Je(t,e,n){for(var r=0;r<n.length;r++)Se(n[r],n[++r],n[++r]);q.__c&&q.__c(e,t),t.some(function(s){try{t=s.__h,s.__h=[],t.some(function(o){o.call(s)})}catch(o){q.__e(o,s.__v)}})}function Ze(t){return typeof t!="object"||t==null||t.__b>0?t:he(t)?t.map(Ze):t.constructor!==void 0?null:z({},t)}function Ht(t,e,n,r,s,o,i,l,d){var u,p,m,c,f,h,_,b=n.props||ue,g=e.props,y=e.type;if(y=="svg"?s="http://www.w3.org/2000/svg":y=="math"?s="http://www.w3.org/1998/Math/MathML":s||(s="http://www.w3.org/1999/xhtml"),o!=null){for(u=0;u<o.length;u++)if((f=o[u])&&"setAttribute"in f==!!y&&(y?f.localName==y:f.nodeType==3)){t=f,o[u]=null;break}}if(t==null){if(y==null)return document.createTextNode(g);t=document.createElementNS(s,y,g.is&&g),l&&(q.__m&&q.__m(e,o),l=!1),o=null}if(y==null)b===g||l&&t.data==g||(t.data=g);else{if(o=y=="textarea"&&g.defaultValue!=null?null:o&&fe.call(t.childNodes),!l&&o!=null)for(b={},u=0;u<t.attributes.length;u++)b[(f=t.attributes[u]).name]=f.value;for(u in b)f=b[u],u=="dangerouslySetInnerHTML"?m=f:u=="children"||u in g||u=="value"&&"defaultValue"in g||u=="checked"&&"defaultChecked"in g||se(t,u,null,f,s);for(u in g)f=g[u],u=="children"?c=f:u=="dangerouslySetInnerHTML"?p=f:u=="value"?h=f:u=="checked"?_=f:l&&typeof f!="function"||b[u]===f||se(t,u,f,b[u],s);if(p)l||m&&(p.__html==m.__html||p.__html==t.innerHTML)||(t.innerHTML=p.__html),e.__k=[];else if(m&&(t.innerHTML=""),Qe(e.type=="template"?t.content:t,he(c)?c:[c],e,n,r,y=="foreignObject"?"http://www.w3.org/1999/xhtml":s,o,i,o?o[0]:n.__k&&G(n,0),l,d),o!=null)for(u=o.length;u--;)we(o[u]);l&&y!="textarea"||(u="value",y=="progress"&&h==null?t.removeAttribute("value"):h!=null&&(h!==t[u]||y=="progress"&&!h||y=="option"&&h!=b[u])&&se(t,u,h,b[u],s),u="checked",_!=null&&_!=t[u]&&se(t,u,_,b[u],s))}return t}function Se(t,e,n){try{if(typeof t=="function"){var r=typeof t.__u=="function";r&&t.__u(),r&&e==null||(t.__u=t(e))}else t.current=e}catch(s){q.__e(s,n)}}function et(t,e,n){var r,s;if(q.unmount&&q.unmount(t),(r=t.ref)&&(r.current&&r.current!=t.__e||Se(r,null,e)),(r=t.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(o){q.__e(o,e)}r.base=r.__P=r.__n=null}if(r=t.__k)for(s=0;s<r.length;s++)r[s]&&et(r[s],e,n||typeof t.type!="function");n||we(t.__e),t.__c=t.__=t.__e=void 0}function Ft(t,e,n){return this.constructor(t,n)}function tt(t,e,n){var r,s,o,i;e==document&&(e=document.documentElement),q.__&&q.__(t,e),s=(r=typeof n=="function")?null:n&&n.__k||e.__k,o=[],i=[],ke(e,t=(!r&&n||e).__k=Nt(w,null,[t]),s||ue,ue,e.namespaceURI,!r&&n?[n]:s?null:e.firstChild?fe.call(e.childNodes):null,o,!r&&n?n:s?s.__e:e.firstChild,r,i),Je(o,t,i),t.props.children=null}fe=de.slice,q={__e:function(t,e,n,r){for(var s,o,i;e=e.__;)if((s=e.__c)&&!s.__)try{if((o=s.constructor)&&o.getDerivedStateFromError!=null&&(s.setState(o.getDerivedStateFromError(t)),i=s.__d),s.componentDidCatch!=null&&(s.componentDidCatch(t,r||{}),i=s.__d),i)return s.__E=s}catch(l){t=l}throw t}},Be=0,$t=function(t){return t!=null&&t.constructor===void 0},ce.prototype.setState=function(t,e){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=z({},this.state),typeof t=="function"&&(t=t(z({},n),this.props)),t&&z(n,t),t!=null&&this.__v&&(e&&this._sb.push(e),Ue(this))},ce.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Ue(this))},ce.prototype.render=w,B=[],We=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Ke=function(t,e){return t.__v.__b-e.__v.__b},pe.__r=0,be=Math.random().toString(8),ie="__d"+be,te="__a"+be,Ge=/(PointerCapture)$|Capture$/i,qe=0,ye=je(!1),xe=je(!0),Rt=0;var V,S,Te,at,_e=0,ut=[],C=q,nt=C.__b,rt=C.__r,ot=C.diffed,st=C.__c,it=C.unmount,lt=C.__;function ae(t,e){C.__h&&C.__h(S,t,_e||e),_e=0;var n=S.__H||(S.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function v(t){return _e=1,Dt(dt,t)}function Dt(t,e,n){var r=ae(V++,2);if(r.t=t,!r.__c&&(r.__=[n?n(e):dt(void 0,e),function(l){var d=r.__N?r.__N[0]:r.__[0],u=r.t(d,l);d!==u&&(r.__N=[u,r.__[1]],r.__c.setState({}))}],r.__c=S,!S.__f)){var s=function(l,d,u){if(!r.__c.__H)return!0;var p=!1,m=r.__c.props!==l;if(r.__c.__H.__.some(function(f){if(f.__N){p=!0;var h=f.__[0];f.__=f.__N,f.__N=void 0,h!==f.__[0]&&(m=!0)}}),o){var c=o.call(this,l,d,u);return p?c||m:c}return!p||m};S.__f=!0;var o=S.shouldComponentUpdate,i=S.componentWillUpdate;S.componentWillUpdate=function(l,d,u){if(this.__e){var p=o;o=void 0,s(l,d,u),o=p}i&&i.call(this,l,d,u)},S.shouldComponentUpdate=s}return r.__N||r.__}function U(t,e){var n=ae(V++,3);!C.__s&&Ee(n.__H,e)&&(n.__=t,n.u=e,S.__H.__h.push(n))}function W(t,e){var n=ae(V++,4);!C.__s&&Ee(n.__H,e)&&(n.__=t,n.u=e,S.__h.push(n))}function E(t){return _e=5,Ot(function(){return{current:t}},[])}function Ot(t,e){var n=ae(V++,7);return Ee(n.__H,e)&&(n.__=t(),n.__H=e,n.__h=t),n.__}function O(){var t=ae(V++,11);if(!t.__){for(var e=S.__v;e!==null&&!e.__m&&e.__!==null;)e=e.__;var n=e.__m||(e.__m=[0,0]);t.__="P"+n[0]+"-"+n[1]++}return t.__}function Ut(){for(var t;t=ut.shift();){var e=t.__H;if(t.__P&&e)try{e.__h.some(me),e.__h.some(Ce),e.__h=[]}catch(n){e.__h=[],C.__e(n,t.__v)}}}C.__b=function(t){S=null,nt&&nt(t)},C.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),lt&&lt(t,e)},C.__r=function(t){rt&&rt(t),V=0;var e=(S=t.__c).__H;e&&(Te===S?(e.__h=[],S.__h=[],e.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(e.__h.some(me),e.__h.some(Ce),e.__h=[],V=0)),Te=S},C.diffed=function(t){ot&&ot(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(ut.push(e)!==1&&at===C.requestAnimationFrame||((at=C.requestAnimationFrame)||zt)(Ut)),e.__H.__.some(function(n){n.u&&(n.__H=n.u,n.u=void 0)})),Te=S=null},C.__c=function(t,e){e.some(function(n){try{n.__h.some(me),n.__h=n.__h.filter(function(r){return!r.__||Ce(r)})}catch(r){e.some(function(s){s.__h&&(s.__h=[])}),e=[],C.__e(r,n.__v)}}),st&&st(t,e)},C.unmount=function(t){it&&it(t);var e,n=t.__c;n&&n.__H&&(n.__H.__.some(function(r){try{me(r)}catch(s){e=s}}),n.__H=void 0,e&&C.__e(e,n.__v))};var ct=typeof requestAnimationFrame=="function";function zt(t){var e,n=function(){clearTimeout(r),ct&&cancelAnimationFrame(e),setTimeout(t)},r=setTimeout(n,35);ct&&(e=requestAnimationFrame(n))}function me(t){var e=S,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),S=e}function Ce(t){var e=S;t.__c=t.__(),S=e}function Ee(t,e){return!t||t.length!==e.length||e.some(function(n,r){return n!==t[r]})}function dt(t,e){return typeof e=="function"?e(t):e}var pt=`/*
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
    grid-template-columns: repeat(4, 1fr);
    gap: var(--qa-space-1);
    padding: var(--qa-space-2);
}

.tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--qa-target);
    border: 0;
    border-radius: var(--qa-radius-control);
    background: transparent;
    color: var(--qa-text-muted);
}

.tab:hover {
    background: var(--qa-surface);
    color: var(--qa-text);
}

.tab[aria-selected='true'] {
    background: var(--qa-selected);
    color: var(--qa-text);
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
    margin: 0;
    padding: 0 var(--qa-space-3);
    color: var(--qa-accent);
    font-size: var(--qa-text-md);
    font-weight: 600;
    line-height: var(--qa-leading-md);
}

/* The toggle of the base groups in a retest round. Its text lines up with the group titles. */
.full-heading {
    margin: 0;
}

.full-toggle {
    display: flex;
    align-items: center;
    gap: var(--qa-space-2);
    width: 100%;
    height: var(--qa-target);
    padding: 0 var(--qa-space-3);
    border: 0;
    border-radius: var(--qa-radius-control);
    background: transparent;
    color: var(--qa-text);
    font-size: var(--qa-text-md);
    font-weight: 600;
    line-height: var(--qa-leading-md);
    transition: background-color 120ms ease;
}

.full-toggle:hover {
    background: var(--qa-surface);
}

.full-count {
    flex: 1 1 0;
    color: var(--qa-text-muted);
    font-weight: 400;
    text-align: left;
}

.full-toggle .icon {
    color: var(--qa-text-muted);
    transition: transform 120ms ease;
}

.full-toggle[aria-expanded='true'] .icon {
    transform: rotate(180deg);
}

.history-note {
    padding: 0 var(--qa-space-3);
}

.history-passed {
    padding-right: var(--qa-space-3);
}

.stack[hidden] {
    display: none;
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
    .full-toggle,
    .full-toggle .icon,
    .goto,
    .box-glyph {
        transition: none;
    }
}
`;var Bt=new URL(".",document.currentScript.src),Le=class extends Error{constructor(e,n){super(n.message??`The request failed with status ${e}.`),this.data=n}};function Wt(){let t=document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);return t?decodeURIComponent(t[1]):""}function $e(t){return new URL(t,Bt).toString()}async function k(t,{method:e="GET",body:n}={}){let r=await fetch($e(t),{method:e,credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json","X-XSRF-TOKEN":Wt()},body:n&&JSON.stringify(n)}),s=await r.json().catch(()=>({}));if(!r.ok)throw new Le(r.status,s);return s}function $(t){let e=Object.values(t.data?.errors??{});return e.length>0?e[0][0]:t.message}var Kt=0;function a(t,e,n,r,s,o){e||(e={});var i,l,d=e;if("ref"in d)for(l in d={},e)l=="ref"?i=e[l]:d[l]=e[l];var u={type:t,props:d,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Kt,__i:-1,__u:0,__source:s,__self:o};if(typeof t=="function"&&(i=t.defaultProps))for(l in i)d[l]===void 0&&(d[l]=i[l]);return q.vnode&&q.vnode(u),u}function ne({label:t,ariaLabel:e,focusKey:n,question:r,confirmLabel:s,busyLabel:o,danger:i,disabled:l,triggerClass:d="button secondary",children:u,onConfirm:p}){let[m,c]=v("idle"),f=E(null),h=E(null),_=E(!1),b=O();W(()=>{m==="confirm"&&h.current?.focus(),m==="idle"&&_.current&&(_.current=!1,f.current?.focus())},[m]);let g=()=>{_.current=!0,c("idle")},y=async()=>{c("busy"),await p(),_.current=!0,c("idle")};return m==="idle"?a("button",{ref:f,type:"button",class:d,"aria-label":e,title:e,"data-focus-key":n,disabled:l,onClick:()=>c("confirm"),children:u??t}):a("div",{class:"confirm",role:"group","aria-labelledby":b,onKeyDown:L=>{L.key==="Escape"&&!L.isComposing&&m==="confirm"&&(L.stopPropagation(),g())},children:[a("p",{id:b,class:"confirm-question",children:r}),a("div",{class:"confirm-actions",children:[a("button",{ref:h,type:"button",class:"button secondary",disabled:m==="busy",onClick:g,children:"Cancel"}),a("button",{type:"button",class:`button ${i?"danger":"primary"}`,disabled:m==="busy",onClick:y,children:m==="busy"?o:s})]})]})}var Gt=/^[A-Za-z_][\w-]*(\[[\w-]*\])*$/,Vt=["file","button","submit","reset","image"];function ge(t){try{return[...document.querySelectorAll(t)]}catch{return null}}function Qt(t){if(!Gt.test(t))return ge(t);let e=ge(`[name="${CSS.escape(t)}"]`);return e.length>0?e:ge(`#${CSS.escape(t)}`)}function Xt(t){return!(t instanceof HTMLInputElement)||!["radio","checkbox"].includes(t.type)||t.name===""?[t]:ge(`input[type="${t.type}"][name="${CSS.escape(t.name)}"]`).filter(e=>e.form===t.form)}function Re(t,e){t.checked!==e&&t.click()}function Yt(t,e){if(typeof e!="string")return"This field takes one text value, not a list or true or false.";let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(n,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}));let r=s=>s.replaceAll(`\r
`,`
`).replaceAll(/[\r\n]/g,"").trim();return r(t.value)!==r(e)?`The field did not take the value "${e}".`:null}function Jt(t,e){let[n]=t;if(n instanceof HTMLSelectElement&&n.multiple){let r=typeof e=="string"?[e]:e;if(!Array.isArray(r))return"This select takes a list of option values, not true or false.";let s=[...n.options];s.forEach(i=>{i.selected=r.includes(i.value)}),n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0}));let o=r.filter(i=>!s.some(l=>l.value===i));return o.length>0?`There is no option with the value "${o.join('", "')}". The other values are selected.`:null}if(n instanceof HTMLSelectElement)return typeof e!="string"?"This select takes one option value, not a list or true or false.":e!==""&&![...n.options].some(r=>r.value===e)?`There is no option with the value "${e}".`:(Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value").set.call(n,e),n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0})),null);if(n.type==="radio"){if(typeof e!="string")return"A radio group takes one value, not a list or true or false.";let r=t.find(s=>s.value===e);return r===void 0?`There is no radio with the value "${e}".`:(Re(r,!0),null)}if(n.type==="checkbox"){if(typeof e=="boolean"&&t.length>1)return`This is a group of ${t.length} checkboxes. Use a list of the values to check.`;if(typeof e=="boolean")return Re(n,e),null;let r=typeof e=="string"?[e]:e;t.forEach(o=>Re(o,r.includes(o.value)));let s=r.filter(o=>!t.some(i=>i.value===o));return s.length>0?`There is no checkbox with the value "${s.join('", "')}". The other values are set.`:null}return Yt(n,e)}function ft(t){let e={total:t.length,filled:[],missing:[],problems:[],several:[]};for(let{key:n,value:r}of t){let s=Qt(n);if(s===null){e.problems.push({key:n,message:"The key is not a field name or a valid CSS selector."});continue}if(s.length===0){e.missing.push(n);continue}let o=s.filter(h=>h.getClientRects().length>0),i=s.filter(h=>h.type==="hidden"),l=o.length>0?o:i;if(l.length===0){e.problems.push({key:n,message:"The page has this field, but it is not visible."});continue}let d=[];for(let h of l)d.some(_=>_.includes(h))||d.push(Xt(h));d.length>1&&e.several.push({key:n,count:d.length});let[u]=d,[p]=u;if(!(p instanceof HTMLTextAreaElement||p instanceof HTMLSelectElement||p instanceof HTMLInputElement&&!Vt.includes(p.type))){let h=p instanceof HTMLInputElement?`${p.type} input`:`<${p.localName}> element`;e.problems.push({key:n,message:`Nitpick cannot fill a ${h}.`});continue}let c=Jt(u,r);if(c!==null){e.problems.push({key:n,message:c});continue}let f=r;Array.isArray(r)&&(f=r.length===0?"none":r.join(", ")),typeof r=="boolean"&&(f=r?"checked":"not checked"),r===""&&(f="empty"),p.type==="password"&&(f="(masked)"),e.filled.push({key:n,value:f})}return e}var Zt={arrowRight:a(w,{children:[a("path",{d:"M5 12h14"}),a("path",{d:"m12 5 7 7-7 7"})]}),arrowUp:a(w,{children:[a("path",{d:"m5 12 7-7 7 7"}),a("path",{d:"M12 19V5"})]}),check:a("path",{d:"M20 6 9 17l-5-5"}),chevronDown:a("path",{d:"m6 9 6 6 6-6"}),chevronLeft:a("path",{d:"m15 18-6-6 6-6"}),chevronRight:a("path",{d:"m9 18 6-6-6-6"}),history:a(w,{children:[a("path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}),a("path",{d:"M3 3v5h5"}),a("path",{d:"M12 7v5l4 2"})]}),listChecks:a(w,{children:[a("path",{d:"m3 17 2 2 4-4"}),a("path",{d:"m3 7 2 2 4-4"}),a("path",{d:"M13 6h8"}),a("path",{d:"M13 12h8"}),a("path",{d:"M13 18h8"})]}),mail:a(w,{children:[a("rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}),a("path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"})]}),search:a(w,{children:[a("circle",{cx:"11",cy:"11",r:"8"}),a("path",{d:"m21 21-4.3-4.3"})]}),textCursorInput:a(w,{children:[a("path",{d:"M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6"}),a("path",{d:"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7"}),a("path",{d:"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1"}),a("path",{d:"M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1"}),a("path",{d:"M9 6v12"})]}),trash:a(w,{children:[a("path",{d:"M3 6h18"}),a("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),a("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})]}),users:a(w,{children:[a("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),a("circle",{cx:"9",cy:"7",r:"4"}),a("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),a("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),x:a(w,{children:[a("path",{d:"M18 6 6 18"}),a("path",{d:"m6 6 12 12"})]})};function T({name:t,size:e=16}){return a("svg",{class:"icon",width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",children:Zt[t]})}function ht(t,e,n){try{return JSON.parse(t.getItem(`nitpick.${e}`))??n}catch{return n}}function mt(t,e,n){try{if(n===null){t.removeItem(`nitpick.${e}`);return}t.setItem(`nitpick.${e}`,JSON.stringify(n))}catch{}}var X={read:(t,e)=>ht(localStorage,t,e),write:(t,e)=>mt(localStorage,t,e)},Y={read:(t,e)=>ht(sessionStorage,t,e),write:(t,e)=>mt(sessionStorage,t,e)};function re(t,e){Y.write("focus",t),location.assign(e)}function D({name:t,ready:e,children:n}){let r=E(null),s=E(!1);return W(()=>{if(!e||s.current)return;s.current=!0,r.current.scrollTop=Y.read(`scroll.${t}`,0);let i=Y.read("focus",null);if(i===null)return;Y.write("focus",null);let l=r.current.getRootNode();l.querySelector(`[data-focus-key="${CSS.escape(i)}"]`)?.focus({preventScroll:!0}),l.activeElement||l.querySelector('[role="tab"][aria-selected="true"]')?.focus({preventScroll:!0})},[e]),a("div",{ref:r,class:"scroller","data-ready":e,onScroll:()=>{s.current&&r.current&&Y.write(`scroll.${t}`,r.current.scrollTop)},children:n})}var Me="Start a round to record results and nits";function oe(t,e){return e==="guest"?"Guest":t.personas.find(n=>n.key===e)?.label??e}function vt({failure:t}){return a("div",{role:"alert",class:"failure",children:[a("p",{class:"text",children:t.message}),t.output&&a("pre",{class:"output",children:t.output})]})}function _t({scenario:t,persona:e,current:n,focusKey:r,onFailure:s}){let[o,i]=v(!1),l=async()=>{i(!0);try{let{redirect:p}=await k("login",{method:"POST",body:{scenario:t.slug,persona:e}});re(r,p)}catch(p){s({message:$(p)}),i(!1)}},d=e==="guest"?"Log out":`Log in as ${oe(t,e)}`,u=e==="guest"?"Log out":"Log in";return n&&(u="Current"),a("button",{type:"button",class:"button secondary","aria-label":d,title:d,"data-focus-key":r,disabled:o||n,onClick:l,children:u})}function ea({scenario:t,persona:e,focusKey:n,onFailure:r}){let s=e==="guest"?"Reset, logged out":`Reset as ${oe(t,e)}`,o=e==="guest"?"Reset the database and stay logged out?":`Reset the database and log in as ${oe(t,e)}?`;return a(ne,{label:"Reset",ariaLabel:s,focusKey:n,question:o,confirmLabel:"Reset",busyLabel:"Resetting\u2026",danger:!0,onConfirm:async()=>{r(null);try{let{redirect:l}=await k("reset",{method:"POST",body:{scenario:t.slug,persona:e}});re(n,l)}catch(l){r({message:$(l),output:l.data?.output})}}})}var gt=Promise.resolve();function Ne(t){let e=gt.then(t);return gt=e.catch(()=>{}),e}async function bt(t,e,n){return(await Ne(()=>k(`rounds/${t.round.id}/nits`,{method:"POST",body:{item_key:e,body:n,url:location.href}}))).round}function ta({round:t,itemKey:e,label:n,inputRef:r,onRoundChange:s}){let[o,i]=v(""),[l,d]=v(!1),[u,p]=v(null),m=O();return a("form",{class:"nit-field",onSubmit:async f=>{if(f.preventDefault(),o.trim()!==""){d(!0),p(null);try{s(await bt(t,e,o)),i("")}catch(h){p($(h))}d(!1),r.current?.focus()}},children:[a("label",{class:"visually-hidden",for:m,children:n}),a("input",{ref:r,id:m,class:"input",type:"text",autocomplete:"off",maxLength:2e3,placeholder:"Add a nit\u2026",title:t===null?Me:void 0,value:o,readOnly:l,disabled:t===null,onInput:f=>i(f.currentTarget.value)}),u&&a("p",{role:"alert",class:"text error",children:u})]})}function Ae({round:t,nits:e,onRoundChange:n}){if(e.length===0)return null;let r=s=>async()=>{let o=await Ne(()=>k(`rounds/${t.round.id}/nits/${s.id}`,{method:"DELETE"}));n(o.round)};return a("ul",{class:"nits",children:e.map(s=>a("li",{class:"nit",children:[a("p",{class:"nit-body",children:[s.body,"\xA0",a("code",{class:"nit-path muted",children:["(",s.url,")"]})]}),a(ne,{ariaLabel:`Delete the nit: ${s.body}`,question:"Delete this nit?",confirmLabel:"Delete",busyLabel:"Deleting\u2026",danger:!0,triggerClass:"button icon-button",onConfirm:r(s),children:a(T,{name:"trash"})})]},s.id))})}var aa={untested:"pass",pass:"fail",fail:"untested"},na={untested:"press to mark passed",pass:"press to mark failed",fail:"press to clear"},ve={untested:"not tested",pass:"passed",fail:"failed"},Q={pass:"check",fail:"x"};function ra(t){return t===1?"1 nit":`${t} nits`}function oa({report:t}){let{total:e,filled:n,problems:r,several:s,missing:o}=t,i=`Filled ${n.length} of ${e} fields.`;return e===0&&(i="The fill has no fields."),a("ul",{class:"fill-lines",children:[a("li",{class:"fill-summary",children:i}),n.map(({key:l,value:d})=>a("li",{children:[a("code",{class:"fill-key",children:l})," ",d]},l)),r.map(({key:l,message:d})=>a("li",{children:[a("code",{class:"fill-key",children:l})," Not filled. ",d]},l)),s.map(({key:l,count:d})=>a("li",{children:[d," matches for ",a("code",{class:"fill-key",children:l}),". Nitpick filled the first."]},l)),o.length>0&&a("li",{children:["Not found:"," ",o.map((l,d)=>a(w,{children:[d>0&&", ",a("code",{class:"fill-key",children:l})]},l))]})]})}function sa({scenario:t,item:e,round:n,result:r,onRoundChange:s}){let[o,i]=v(null),[l,d]=v(!1),[u,p]=v(null),[m,c]=v(!1),[f,h]=v(null),[_,b]=v(null),g=E(null),y=E(!1),R=E(!1),L=E(null),H=O(),N=r?.nits??[],A=o??r?.status??"untested",F=aa[A];W(()=>{l&&R.current&&(R.current=!1,L.current?.focus())},[l]),U(()=>{if(f===null)return;let M=()=>h(null);return document.addEventListener("inertia:navigate",M),document.addEventListener("livewire:navigated",M),()=>{document.removeEventListener("inertia:navigate",M),document.removeEventListener("livewire:navigated",M)}},[f]);let j=async()=>{if(!m){c(!0),h(null),b(null);try{let{fields:M}=await k("fill",{method:"POST",body:{scenario:t.slug,item:e.key}});h(ft(M))}catch(M){b({message:$(M),output:M.data?.output})}c(!1)}},I=async()=>{let M=null;try{let Z=await Ne(()=>{y.current=!1,M=g.current;let ee=`rounds/${n.round.id}/results/${encodeURIComponent(e.key)}`;return M==="untested"?k(ee,{method:"DELETE"}):k(ee,{method:"PUT",body:{status:M}})});s(Z.round)}catch(Z){p($(Z))}g.current===M&&i(null)},P=()=>{g.current=F,i(F),p(null),F==="fail"&&l&&L.current?.focus(),F==="fail"&&!l&&(R.current=!0,d(!0)),F==="untested"&&N.length===0&&d(!1),y.current||(y.current=!0,I())};return a("li",{class:"item","data-status":A,children:[a("div",{class:"item-row",children:[a("button",{type:"button",class:"box","data-status":A,"aria-label":`${e.text}, ${ve[A]}, ${na[A]}`,title:n===null?Me:void 0,disabled:n===null,onClick:P,children:a("span",{class:"box-glyph",children:Q[A]&&a(T,{name:Q[A],size:12})})}),a("button",{type:"button",class:"item-toggle","aria-expanded":l,"aria-controls":H,onClick:()=>d(!l),children:[a("span",{class:"check-text",children:e.text}),(e.setup||N.length>0)&&a("span",{class:"item-meta",children:[e.setup,e.setup&&N.length>0&&" \xB7 ",N.length>0&&a("span",{class:"nit-count",children:ra(N.length)})]})]}),e.fill!==null&&a("button",{type:"button",class:"fill","aria-label":`Fill the form for: ${e.text}`,title:`Fill the form for: ${e.text}`,"aria-disabled":m,onClick:j,children:a(T,{name:"textCursorInput"})}),e.url&&a("a",{class:"goto",href:e.url,"aria-label":`Go to ${e.url}`,title:`Go to ${e.url}`,children:a(T,{name:"arrowRight"})})]}),e.fill!==null&&a("div",{role:"status",class:"fill-notice",children:f&&a(oa,{report:f})}),_&&a("div",{class:"item-failure",children:a(vt,{failure:_})}),u&&a("p",{role:"alert",class:"text error item-error",children:u}),a("div",{id:H,class:"details",hidden:!l,children:[n&&a(Ae,{round:n,nits:N,onRoundChange:s}),a(ta,{round:n,itemKey:e.key,label:`Nit on: ${e.text}`,inputRef:L,onRoundChange:s})]})]})}function ia({scenario:t,group:e,index:n,Heading:r,currentEmail:s,itemProps:o}){let[i,l]=v(null),d=e.type==="section",u=d?e.persona:e.items[0].persona,p=m=>({scenario:t,persona:m,current:m!=="guest"&&la(t,m)===s,focusKey:`login:${n}:${m}`,onFailure:l});return a("section",{class:"group",children:[a("div",{class:"group-header",children:[a(r,{class:"group-title",children:d?oe(t,e.persona):e.title}),d&&a(_t,{...p(e.persona)}),a(ea,{scenario:t,persona:u,focusKey:`reset:${n}`,onFailure:l})]}),i&&a(vt,{failure:i}),a("ol",{class:"items",children:e.items.map((m,c)=>a(w,{children:[!d&&m.persona!==e.items[c-1]?.persona&&a("li",{class:"handoff-step",children:[a("p",{class:"text muted",children:["As ",oe(t,m.persona)]}),a(_t,{...p(m.persona)})]}),a(sa,{scenario:t,item:m,...o(m)})]},m.key))})]})}function la(t,e){return t.personas.find(n=>n.key===e)?.email}function ca({round:t,onRoundChange:e}){let{results:n,nits:r}=t.orphaned,s=[...new Set([...n.map(o=>o.item_key),...r.map(o=>o.item_key)])].sort();return s.length===0?null:a("section",{class:"group",children:[a("div",{class:"group-header",children:a("h3",{class:"group-title",children:"Orphaned"})}),a("ul",{class:"items",children:s.map(o=>{let i=n.find(d=>d.item_key===o)?.status??"untested",l=r.filter(d=>d.item_key===o);return a("li",{class:"item",children:[a("div",{class:"item-row",children:[a("span",{class:"box","data-status":i,children:[a("span",{class:"box-glyph",children:Q[i]&&a(T,{name:Q[i],size:12})}),a("span",{class:"visually-hidden",children:ve[i]})]}),a("p",{class:"item-toggle",children:a("code",{class:"check-text",children:o})})]}),l.length>0&&a("div",{class:"details",children:a(Ae,{round:t,nits:l,onRoundChange:e})})]},o)})})]})}function ua({storageKey:t,count:e,children:n}){let[r,s]=v(()=>X.read(t,!1)),o=O();return a(w,{children:[a("h3",{class:"full-heading",children:a("button",{type:"button",class:"full-toggle","aria-expanded":r,"aria-controls":o,onClick:()=>{s(!r),X.write(t,r?null:!0)},children:["Full checklist",a("span",{class:"full-count",children:e===1?"1 check":`${e} checks`}),a(T,{name:"chevronDown"})]})}),a("div",{id:o,class:"stack",hidden:!r,children:n})]})}function da({round:t,onRoundChange:e}){let[n,r]=v(""),[s,o]=v(!1),[i,l]=v(null),d=E(null),u=O();return a("form",{class:"composer",onSubmit:async m=>{m.preventDefault(),o(!0),l(null);try{e(await bt(t,null,n)),r("")}catch(c){l($(c))}o(!1),d.current?.focus()},children:[i&&a("p",{role:"alert",class:"text error",children:i}),a("div",{class:"composer-field",children:[a("label",{class:"visually-hidden",for:u,children:"Page nit"}),a("input",{ref:d,id:u,class:"composer-input",type:"text",autocomplete:"off",maxLength:2e3,placeholder:"Note something on this page\u2026",title:t===null?Me:void 0,value:n,readOnly:s,disabled:t===null,onInput:m=>r(m.currentTarget.value)}),a("button",{type:"submit",class:"send","aria-label":"Add page nit",title:"Add page nit",disabled:s||t===null||n.trim()==="",children:a(T,{name:"arrowUp"})})]})]})}function yt({scenarios:t,scenario:e,round:n,ready:r,nextNumber:s,currentEmail:o,onRoundChange:i}){if(t!==null&&e===null)return a(D,{name:"checklist",ready:!0,children:a("p",{class:"text",children:["There are no scenarios yet. Make one with ",a("code",{children:"php artisan make:nitpick-scenario Name"}),"."]})});if(!r)return a(D,{name:"checklist",ready:!1});let l=n?.round.number??s,d=n===null||n.round.scenario===e.slug,u=e.groups.filter(h=>d&&(h.retest===null||h.retest===l)),p=u.some(h=>h.retest!==null),m=new Map((n?.groups??[]).flatMap(h=>h.items).map(h=>[h.key,h])),c=h=>({round:n,result:m.get(h.key),onRoundChange:i}),f=(h,_,b)=>a(ia,{scenario:e,group:h,index:_,Heading:b,currentEmail:o,itemProps:c},_);return a(w,{children:[a(D,{name:"checklist",ready:!0,children:a("div",{class:"stack",children:[!p&&u.map((h,_)=>f(h,_,"h3")),p&&a(w,{children:[a("h3",{class:"retest",children:["Retest ",l]}),u.map((h,_)=>h.retest!==null&&f(h,_,"h4")),a(ua,{storageKey:`full.${e.slug}.${l}`,count:u.filter(h=>h.retest===null).flatMap(h=>h.items).length,children:u.map((h,_)=>h.retest===null&&f(h,_,"h4"))},`full.${e.slug}.${l}`)]}),a("section",{class:"group",children:[a("div",{class:"group-header",children:a("h3",{class:"group-title",children:"Page nits"})}),a("div",{class:"panel-card",children:n&&n.page_nits.length>0?a(Ae,{round:n,nits:n.page_nits,onRoundChange:i}):a("p",{class:"text muted",children:"A page nit is a note on the page, not on an item. Add one below."})})]}),n&&a(ca,{round:n,onRoundChange:i})]})}),a(da,{round:n,onRoundChange:i})]})}function pa(t){return t===1?"1 check":`${t} checks`}function qt(t){let e=[new Date(t.closed_at).toLocaleDateString([],{dateStyle:"medium"})];return t.git_sha&&e.push(`${t.git_sha.slice(0,7)}${t.git_dirty?" (dirty)":""}`),e.join(" \xB7 ")}function xt({nits:t}){return t.length===0?null:a("ul",{class:"nits",children:t.map(e=>a("li",{class:"nit",children:a("p",{class:"nit-body",children:[e.body," ",a("code",{class:"nit-path muted",children:["(",e.url,")"]})]})},e.id))})}function fa(t,e){return t.type==="handoff"?t.title:e.find(n=>n.key===t.persona)?.label??"Guest"}function ha({summary:t,onBack:e}){let[n,r]=v(null),[s,o]=v(null);return U(()=>{k(`rounds/${t.id}`).then(i=>r(i.round)).catch(i=>o($(i)))},[t.id]),a("div",{class:"stack",children:[a("div",{children:a("button",{type:"button",class:"button secondary back",onClick:e,children:[a(T,{name:"chevronLeft"}),"All rounds"]})}),a("div",{class:"panel-card",children:[a("h3",{class:"item-text",children:["Round ",t.number]}),a("p",{class:"text muted",children:["Closed ",qt(t)," by ",t.tester]}),t.report&&a("p",{class:"text muted",children:a("code",{children:t.report})})]}),s&&a("p",{role:"alert",class:"text error",children:s}),n?.groups.map((i,l)=>a("section",{class:"group",children:[a("div",{class:"group-header",children:[a("h4",{class:"group-title",children:[i.retest!==null&&`Retest ${i.retest} \xB7 `,fa(i,n.personas)]}),i.passed>0&&a("p",{class:"text muted history-passed",children:[i.passed," passed"]})]}),i.items.length>0&&a("ol",{class:"items",children:i.items.map(d=>a("li",{class:"item","data-status":d.status,children:[a("div",{class:"item-row",children:[a("span",{class:"box","data-status":d.status,children:[a("span",{class:"box-glyph",children:Q[d.status]&&a(T,{name:Q[d.status],size:12})}),a("span",{class:"visually-hidden",children:ve[d.status]})]}),a("p",{class:"item-toggle",children:a("span",{class:"check-text",children:d.text})})]}),d.nits.length>0&&a("div",{class:"details",children:a(xt,{nits:d.nits})})]},d.key))})]},l)),n?.base_not_tested>0&&a("p",{class:"text muted history-note",children:[pa(n.base_not_tested)," of the full checklist not tested"]}),n?.page_nits.length>0&&a("section",{class:"group",children:[a("div",{class:"group-header",children:a("h4",{class:"group-title",children:"Page nits"})}),a("div",{class:"panel-card",children:a(xt,{nits:n.page_nits})})]})]})}function wt({scenario:t}){let[e,n]=v(null),[r,s]=v(null),[o,i]=v(null);return U(()=>{t!==null&&k(`rounds?scenario=${encodeURIComponent(t.slug)}`).then(l=>n(l.data)).catch(l=>{n([]),i($(l))})},[t?.slug]),r?a(D,{name:"history-open",ready:!0,children:a(ha,{summary:r,onBack:()=>s(null)})},"history-open"):a(D,{name:"history",ready:e!==null,children:a("div",{class:"stack",children:[o&&a("p",{role:"alert",class:"text error",children:o}),e?.length===0&&!o&&a("p",{class:"text muted",children:"No closed rounds yet. A round shows here after Close round."}),e?.length>0&&a("ul",{class:"rows",children:e.map(l=>a("li",{children:a("button",{type:"button",class:"row",onClick:()=>s(l),children:[a("span",{class:"row-text",children:[a("span",{class:"row-title",children:["Round ",l.number]}),a("span",{class:"row-meta",children:[qt(l)," \xB7 ",l.passed," passed \xB7 ",l.failed," failed \xB7"," ",l.nits===1?"1 nit":`${l.nits} nits`]})]}),a(T,{name:"chevronRight"})]})},l.id))})]})},"history")}function kt(t){return new Date(t.sent_at).toLocaleString([],{dateStyle:"short",timeStyle:"short"})}function ma(t){let e=new Date(t.sent_at);return e.toDateString()===new Date().toDateString()?e.toLocaleTimeString([],{timeStyle:"short"}):e.toLocaleDateString([],{dateStyle:"short"})}function _a({mail:t,onBack:e}){return a("div",{class:"stack",children:[a("div",{children:a("button",{type:"button",class:"button secondary back",onClick:e,children:[a(T,{name:"chevronLeft"}),"All mail"]})}),a("div",{class:"panel-card",children:[a("h3",{class:"item-text",children:t.subject||"-"}),a("p",{class:"text muted",children:["To ",t.to," at ",kt(t)]})]}),a("iframe",{class:"mail-frame",sandbox:"",title:`Mail: ${t.subject}`,src:$e(`mails/${t.id}`)}),a("section",{class:"group",children:[a("div",{class:"group-header",children:a("h3",{class:"group-title",children:"Links"})}),a("div",{class:"panel-card",children:t.links.length===0?a("p",{class:"text muted",children:"The mail has no links."}):a("ul",{class:"links",children:t.links.map(n=>a("li",{children:a("a",{class:"link",href:n,children:n})},n))})})]})]})}function St(){let[t,e]=v(null),[n,r]=v(null),[s,o]=v(!1),[i,l]=v(null),[d,u]=v(null),[p,m]=v(null),c=()=>Promise.all([k("mails"),k("queue")]).then(([_,b])=>{e(_.data),r(b.size)}).catch(_=>{e([]),m($(_))});U(()=>{c()},[]);let f=async()=>{o(!0),l(null),m(null);try{let _=await k("queue",{method:"POST"});_.exit_code!==0&&l(_.output),await c()}catch(_){m($(_))}o(!1)};return d?a(D,{name:"mail-open",ready:!0,children:a(_a,{mail:d,onBack:()=>u(null)})},"mail-open"):a(D,{name:"mail",ready:t!==null,children:a("div",{class:"stack",children:[a("div",{class:"panel-card queue",children:[a("p",{class:"text","aria-live":"polite",children:[a("span",{class:"figure",children:n??"-"})," queued ",n===1?"job":"jobs"]}),a("button",{type:"button",class:"button light",disabled:s,onClick:f,children:s?"Running\u2026":"Run queue"})]}),p&&a("p",{role:"alert",class:"text error",children:p}),i&&a("div",{role:"alert",class:"failure",children:[a("p",{class:"text",children:"The queue worker failed."}),a("pre",{class:"output",children:i})]}),t?.length===0&&a("p",{class:"text muted",children:"No mail yet. A queued mail shows here after Run queue."}),t?.length>0&&a("section",{class:"group",children:[a("div",{class:"group-header",children:a("h3",{class:"group-title",children:"Captured mail"})}),a("ul",{class:"rows",children:t.map(_=>a("li",{children:a("button",{type:"button",class:"row",onClick:()=>u(_),children:[a("span",{class:"row-text",children:[a("span",{class:"row-title",children:_.subject||"-"}),a("span",{class:"row-meta",children:[_.to," \xB7"," ",a("time",{dateTime:_.sent_at,title:kt(_),children:ma(_)})]})]}),a(T,{name:"chevronRight"})]})},_.id))})]})]})},"mail")}function Tt({rows:t,currentEmail:e,busy:n,onLogIn:r}){return a("ul",{class:"rows",children:t.map(s=>{let o=s.name||s.email,i=s.email===e;return a("li",{class:"row","data-current":i,children:[a("span",{class:"avatar","aria-hidden":"true",children:o.charAt(0).toUpperCase()}),a("span",{class:"row-text",children:[a("span",{class:"row-title",children:s.name||"-"}),a("span",{class:"row-meta",children:s.email})]}),a("button",{type:"button",class:"button secondary","aria-label":`Log in as ${o}`,title:`Log in as ${o}`,"data-focus-key":`login:${s.email}`,disabled:n||i,onClick:()=>r(s.body,`login:${s.email}`),children:i?"Current":"Log in"})]},s.email)})})}function Ct({scenarios:t,scenario:e,user:n}){let[r,s]=v(!1),[o,i]=v(null),[l,d]=v(null),u=E(null),p=O(),m=async(_,b)=>{s(!0),i(null);try{let{redirect:g}=await k("login",{method:"POST",body:_});re(b,g)}catch(g){i($(g)),s(!1)}},c=_=>{let b=_.currentTarget.value.trim();if(clearTimeout(u.current),b===""){d(null);return}u.current=setTimeout(()=>{k(`users?search=${encodeURIComponent(b)}`).then(g=>d(g.data)).catch(g=>i($(g)))},200)},f=(e?.personas??[]).map(_=>({name:_.label,email:_.email,body:{scenario:e.slug,persona:_.key}})),h=(l??[]).map(_=>({..._,body:{email:_.email}}));return a(D,{name:"personas",ready:t!==null,children:a("div",{class:"stack",children:[o&&a("p",{role:"alert",class:"text error",children:o}),a("section",{class:"group",children:[a("div",{class:"group-header",children:a("h3",{class:"group-title",children:"Personas"})}),t?.length===0&&a("p",{class:"text muted",children:"There are no scenarios yet."}),f.length>0&&a(Tt,{rows:f,currentEmail:n?.email,busy:r,onLogIn:m})]}),a("section",{class:"group",children:[a("div",{class:"group-header",children:a("h3",{class:"group-title",children:"Find a user"})}),a("div",{class:"search",children:[a(T,{name:"search"}),a("label",{class:"visually-hidden",for:p,children:"Find a user by email or name"}),a("input",{id:p,class:"search-input",type:"search",autocomplete:"off",onInput:c})]}),l?.length===0&&a("p",{class:"text muted",children:"No user matches."}),l?.length>0&&a(Tt,{rows:h,currentEmail:n?.email,busy:r,onLogIn:m})]}),a("div",{children:a("button",{type:"button",class:"button secondary","data-focus-key":"logout",disabled:r||!n||!e,onClick:()=>m({scenario:e?.slug,persona:"guest"},"logout"),children:n?"Log out":"Logged out"})})]})})}var Pe="Alt+Shift+Q",J=[{key:"checklist",label:"Checklist",icon:"listChecks"},{key:"mail",label:"Mail",icon:"mail"},{key:"personas",label:"Personas",icon:"users"},{key:"history",label:"History",icon:"history"}];function Ie(t,e){let[n,r]=v(()=>X.read(t,e));return[n,o=>{r(o),X.write(t,o)}]}function ga(t){return!t.isComposing&&t.altKey&&t.shiftKey&&!t.ctrlKey&&!t.metaKey&&t.code==="KeyQ"}function va(t){return t instanceof HTMLElement&&(t.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(t.tagName))}function ba({scenarios:t,scenario:e,round:n,nextNumber:r,onSelectScenario:s,onRoundChange:o}){let[i,l]=v(!1),[d,u]=v(null),[p,m]=v([]),c=O(),f=async()=>{l(!0),u(null);try{let g=await k("rounds",{method:"POST",body:{scenario:e.slug}});m([]),o(g.round)}catch(g){u($(g))}l(!1)},h=async()=>{u(null);try{let g=await k(`rounds/${n.round.id}`,{method:"PATCH",body:{status:"closed"}});m(g.reports),o(null)}catch(g){u($(g))}},_=n===null&&t?.length>1,b=t===null?"Loading\u2026":"No scenarios yet";return n!==null?b=`Round ${n.round.number} \xB7 open`:e!==null&&(b=`Round ${r} \xB7 not started`),a("header",{class:"card-header",children:[a("div",{class:"header-row",children:[a("div",{class:"header-title",children:[_?a("div",{class:"picker",children:[a("label",{class:"visually-hidden",for:c,children:"Scenario"}),a("select",{id:c,class:"picker-select",value:e.slug,onChange:g=>s(g.currentTarget.value),children:t.map(g=>a("option",{value:g.slug,children:g.title},g.slug))}),a(T,{name:"chevronDown"})]}):a("h2",{class:"title",children:n?.round.title??e?.title??"Nitpick"}),a("p",{class:"subtitle","data-round":n===null?"none":"open",children:b})]}),n===null?a("button",{type:"button",class:"button light",disabled:i||e===null,onClick:f,children:"Start round"}):a(ne,{label:"Close round",question:`Close round ${n.round.number} and write the report?`,confirmLabel:"Close round",busyLabel:"Closing\u2026",onConfirm:h})]}),d&&a("p",{role:"alert",class:"note error",children:d}),a("div",{role:"status",children:p.length>0&&a("p",{class:"note",children:["Report written to"," ",p.map(g=>a("code",{children:g},g))]})})]})}function ya(){let[t,e]=Ie("open",!1),[n,r]=Ie("tab","checklist"),[s,o]=Ie("scenario",null),[i,l]=v(null),[d,u]=v(null),[p,m]=v(!1),[c,f]=v({}),[h,_]=v(void 0),b=E(null),g=E(null),y=E(!1),R=E(!1),L=()=>k("user").then(x=>_(x.user)),H=()=>k("round").then(x=>{u(x.round),f(x.next_numbers),m(!0)}),N=x=>{u(x),x===null&&H()},A=x=>{e(!t),R.current=!t,y.current=!t&&x,t&&b.current?.focus()},F=x=>{x.key==="Escape"&&t&&!x.isComposing&&A(!1)};W(()=>{t&&y.current&&(y.current=!1,g.current?.querySelector('[aria-selected="true"]')?.focus())},[t]),U(()=>{k("scenarios").then(x=>l(x.data)),L(),H()},[]);let j=E(A);j.current=A,U(()=>{let x=K=>{!ga(K)||va(K.composedPath()[0])||(K.preventDefault(),j.current(!0))};return document.addEventListener("keydown",x),document.addEventListener("inertia:navigate",L),document.addEventListener("livewire:navigated",L),()=>{document.removeEventListener("keydown",x),document.removeEventListener("inertia:navigate",L),document.removeEventListener("livewire:navigated",L)}},[]);let I=d?.round.scenario??s,P=i?.find(x=>x.slug===I)??i?.[0]??null,M=P?.personas.find(x=>x.email===h?.email),Z=h===void 0?"":M?.label??h?.email??"Guest",ee=c[P?.slug]??1,Et=x=>{let K=J.findIndex(Lt=>Lt.key===n),Fe={ArrowRight:1,ArrowLeft:J.length-1,Home:-K,End:J.length-1-K};if(!(x.key in Fe))return;x.preventDefault();let De=J[(K+Fe[x.key])%J.length];r(De.key),g.current.querySelector(`#qa-tab-${De.key}`).focus()};return a(w,{children:[t&&a("section",{id:"qa-card",class:"card","aria-label":"Nitpick","data-enter":R.current,"data-loading":i===null||!p,onKeyDown:F,children:[a(ba,{scenarios:i,scenario:P,round:d,nextNumber:ee,onSelectScenario:o,onRoundChange:N}),a("div",{id:"qa-tabpanel",role:"tabpanel","aria-labelledby":`qa-tab-${n}`,class:"view",children:[n==="checklist"&&a(yt,{scenarios:i,scenario:P,round:d,ready:i!==null&&p,nextNumber:ee,currentEmail:h?.email,onRoundChange:N}),n==="mail"&&a(St,{}),n==="personas"&&a(Ct,{scenarios:i,scenario:P,user:h}),n==="history"&&a(wt,{scenario:P},d?.round.id)]}),a("div",{ref:g,role:"tablist","aria-label":"Nitpick",class:"tabbar",onKeyDown:Et,children:J.map(x=>a("button",{id:`qa-tab-${x.key}`,type:"button",role:"tab",class:"tab","aria-selected":x.key===n,"aria-controls":"qa-tabpanel","aria-label":x.label,title:x.label,tabIndex:x.key===n?0:-1,onClick:()=>r(x.key),children:a(T,{name:x.icon,size:20})},x.key))})]}),a("button",{ref:b,type:"button",class:"pill","data-open":t,"aria-expanded":t,"aria-controls":"qa-card","aria-label":t?"Close Nitpick":void 0,"aria-keyshortcuts":Pe,title:t?`Close (${Pe})`:`Nitpick (${Pe})`,onClick:()=>A(!1),onKeyDown:F,children:t?a(T,{name:"x",size:20}):a(w,{children:[a("span",{class:"pill-brand",children:"QA"}),a("span",{class:"pill-separator","aria-hidden":"true",children:"\xB7"}),a("span",{class:"pill-name",children:Z}),d&&a("span",{class:"pill-round",title:`Round ${d.round.number} is open`,children:["R",d.round.number]}),a(T,{name:"chevronRight"})]})})]})}var He=class extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;let e=this.attachShadow({mode:"open"}),n=document.createElement("style"),r=document.createElement("div");n.textContent=pt,r.className="root",e.append(n,r),tt(a(ya,{}),r)}};customElements.get("nitpick-panel")||customElements.define("nitpick-panel",He);document.querySelector("nitpick-panel")||document.documentElement.append(document.createElement("nitpick-panel"));})();
