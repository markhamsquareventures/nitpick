(()=>{var le,q,Fe,wt,H,De,He,Oe,fe,ae,Q,je,me,he,_e,kt,oe={},se=[],St=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,ce=Array.isArray;function U(t,e){for(var a in e)t[a]=e[a];return t}function ge(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function Ct(t,e,a){var r,i,o,l={};for(o in e)o=="key"?r=e[o]:o=="ref"?i=e[o]:l[o]=e[o];if(arguments.length>2&&(l.children=arguments.length>3?le.call(arguments,2):a),typeof t=="function"&&t.defaultProps!=null)for(o in t.defaultProps)l[o]===void 0&&(l[o]=t.defaultProps[o]);return ne(t,l,r,i,null)}function ne(t,e,a,r,i){var o={type:t,props:e,key:a,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Fe,__i:-1,__u:0};return i==null&&q.vnode!=null&&q.vnode(o),o}function w(t){return t.children}function re(t,e){this.props=t,this.context=e}function B(t,e){if(e==null)return t.__?B(t.__,t.__i+1):null;for(var a;e<t.__k.length;e++)if((a=t.__k[e])!=null&&a.__e!=null)return a.__e;return typeof t.type=="function"?B(t):null}function Tt(t){if(t.__P&&t.__d){var e=t.__v,a=e.__e,r=[],i=[],o=U({},e);o.__v=e.__v+1,q.vnode&&q.vnode(o),ve(t.__P,o,e,t.__n,t.__P.namespaceURI,32&e.__u?[a]:null,r,a??B(e),!!(32&e.__u),i),o.__v=e.__v,o.__.__k[o.__i]=o,Ve(r,o,i),e.__e=e.__=null,o.__e!=a&&ze(o)}}function ze(t){if((t=t.__)!=null&&t.__c!=null)return t.__e=t.__c.base=null,t.__k.some(function(e){if(e!=null&&e.__e!=null)return t.__e=t.__c.base=e.__e}),ze(t)}function Ae(t){(!t.__d&&(t.__d=!0)&&H.push(t)&&!ie.__r++||De!=q.debounceRendering)&&((De=q.debounceRendering)||He)(ie)}function ie(){try{for(var t,e=1;H.length;)H.length>e&&H.sort(Oe),t=H.shift(),e=H.length,Tt(t)}finally{H.length=ie.__r=0}}function Be(t,e,a,r,i,o,l,c,d,u,f){var h,s,p,g,m,v,_=r&&r.__k||se,b=e.length;for(d=Et(a,e,_,d,b),h=0;h<b;h++)(p=a.__k[h])!=null&&(s=p.__i!=-1&&_[p.__i]||oe,p.__i=h,v=ve(t,p,s,i,o,l,c,d,u,f),g=p.__e,p.ref&&s.ref!=p.ref&&(s.ref&&be(s.ref,null,p),f.push(p.ref,p.__c||g,p)),m==null&&g!=null&&(m=g),4&p.__u?(d=We(p,d,t),s.__e&&(s.__e=null)):typeof p.type=="function"&&v!==void 0?d=v:g&&(d=g.nextSibling),p.__u&=-7);return a.__e=m,d}function Et(t,e,a,r,i){var o,l,c,d,u,f=a.length,h=f,s=0;for(t.__k=new Array(i),o=0;o<i;o++)(l=e[o])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=t.__k[o]=ne(null,l,null,null,null):ce(l)?l=t.__k[o]=ne(w,{children:l},null,null,null):l.constructor===void 0&&l.__b>0?l=t.__k[o]=ne(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):t.__k[o]=l,d=o+s,l.__=t,l.__b=t.__b+1,c=null,(u=l.__i=Lt(l,a,d,h))!=-1&&(h--,(c=a[u])&&(c.__u|=2)),c==null||c.__v==null?(u==-1&&(i>f?s--:i<f&&s++),typeof l.type!="function"&&(l.__u|=4)):u!=d&&(u==d-1?s--:u==d+1?s++:(u>d?s--:s++,l.__u|=4))):t.__k[o]=null;if(h)for(o=0;o<f;o++)(c=a[o])!=null&&(2&c.__u)==0&&(c.__e==r&&(r=B(c)),Qe(c,c));return r}function We(t,e,a){var r,i;if(typeof t.type=="function"){for(r=t.__k,i=0;r&&i<r.length;i++)r[i]&&(r[i].__=t,e=We(r[i],e,a));return e}t.__e!=e&&(e&&t.type&&!e.parentNode&&(e=B(t)),e=a.insertBefore(t.__e,e||null));do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function Lt(t,e,a,r){var i,o,l,c=t.key,d=t.type,u=e[a],f=u!=null&&(2&u.__u)==0;if(u===null&&c==null||f&&c==u.key&&d==u.type)return a;if(r>(f?1:0)){for(i=a-1,o=a+1;i>=0||o<e.length;)if((u=e[l=i>=0?i--:o++])!=null&&(2&u.__u)==0&&c==u.key&&d==u.type)return l}return-1}function Ie(t,e,a){e[0]=="-"?t.setProperty(e,a??""):t[e]=a==null?"":typeof a!="number"||St.test(e)?a:a+"px"}function te(t,e,a,r,i){var o,l;e:if(e=="style")if(typeof a=="string")t.style.cssText=a;else{if(typeof r=="string"&&(t.style.cssText=r=""),r)for(e in r)a&&e in a||Ie(t.style,e,"");if(a)for(e in a)r&&a[e]==r[e]||Ie(t.style,e,a[e])}else if(e[0]=="o"&&e[1]=="n")o=e!=(e=e.replace(je,"$1")),l=e.toLowerCase(),e=l in t||e=="onFocusOut"||e=="onFocusIn"?l.slice(2):e.slice(2),t.l||(t.l={}),t.l[e+o]=a,a?r?a[Q]=r[Q]:(a[Q]=me,t.addEventListener(e,o?_e:he,o)):t.removeEventListener(e,o?_e:he,o);else{if(i=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=a??"";break e}catch{}typeof a=="function"||(a==null||a===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&a==1?"":a))}}function Ue(t){return function(e){if(this.l){var a=this.l[e.type+t];if(e[ae]==null)e[ae]=me++;else if(e[ae]<a[Q])return;return a(q.event?q.event(e):e)}}}function ve(t,e,a,r,i,o,l,c,d,u){var f,h,s,p,g,m,v,_,b,L,E,N,$,A,j,K,M=e.type;if(e.constructor!==void 0)return null;128&a.__u&&(d=!!(32&a.__u),o=[c=e.__e=a.__e]),(f=q.__b)&&f(e);e:if(typeof M=="function"){h=l.length;try{if(b=e.props,L=M.prototype&&M.prototype.render,E=(f=M.contextType)&&r[f.__c],N=f?E?E.props.value:f.__:r,a.__c?_=(s=e.__c=a.__c).__=s.__E:(L?e.__c=s=new M(b,N):(e.__c=s=new re(b,N),s.constructor=M,s.render=Nt),E&&E.sub(s),s.state||(s.state={}),s.__n=r,p=s.__d=!0,s.__h=[],s._sb=[]),L&&s.__s==null&&(s.__s=s.state),L&&M.getDerivedStateFromProps!=null&&(s.__s==s.state&&(s.__s=U({},s.__s)),U(s.__s,M.getDerivedStateFromProps(b,s.__s))),g=s.props,m=s.state,s.__v=e,p)L&&M.getDerivedStateFromProps==null&&s.componentWillMount!=null&&s.componentWillMount(),L&&s.componentDidMount!=null&&s.__h.push(s.componentDidMount);else{if(L&&M.getDerivedStateFromProps==null&&b!==g&&s.componentWillReceiveProps!=null&&s.componentWillReceiveProps(b,N),e.__v==a.__v||!s.__e&&s.shouldComponentUpdate!=null&&s.shouldComponentUpdate(b,s.__s,N)===!1){e.__v!=a.__v&&(s.props=b,s.state=s.__s,s.__d=!1),e.__e=a.__e,e.__k=a.__k,e.__k.some(function(D){D&&(D.__=e)}),se.push.apply(s.__h,s._sb),s._sb=[],s.__h.length&&l.push(s),c=B(a);break e}s.componentWillUpdate!=null&&s.componentWillUpdate(b,s.__s,N),L&&s.componentDidUpdate!=null&&s.__h.push(function(){s.componentDidUpdate(g,m,v)})}if(s.context=N,s.props=b,s.__P=t,s.__e=!1,$=q.__r,A=0,L)s.state=s.__s,s.__d=!1,$&&$(e),f=s.render(s.props,s.state,s.context),se.push.apply(s.__h,s._sb),s._sb=[];else do s.__d=!1,$&&$(e),f=s.render(s.props,s.state,s.context),s.state=s.__s;while(s.__d&&++A<25);s.state=s.__s,s.getChildContext!=null&&(r=U(U({},r),s.getChildContext())),L&&!p&&s.getSnapshotBeforeUpdate!=null&&(v=s.getSnapshotBeforeUpdate(g,m)),j=f!=null&&f.type===w&&f.key==null?Ge(f.props.children):f,c=Be(t,ce(j)?j:[j],e,a,r,i,o,l,c,d,u),s.base=e.__e,e.__u&=-161,s.__h.length&&l.push(s),_&&(s.__E=s.__=null)}catch(D){if(l.length=h,e.__v=null,d||o!=null){if(D.then){for(e.__u|=d?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;o!=null&&(o[o.indexOf(c)]=null),e.__e=c}else if(o!=null)for(K=o.length;K--;)ge(o[K])}else e.__e=a.__e;e.__k==null&&(e.__k=a.__k||[]),D.then||Ke(e),q.__e(D,e,a)}}else o==null&&e.__v==a.__v?(e.__k=a.__k,e.__e=a.__e):c=e.__e=Rt(a.__e,e,a,r,i,o,l,d,u);return(f=q.diffed)&&f(e),128&e.__u?void 0:c}function Ke(t){t&&(t.__c&&(t.__c.__e=!0),t.__k&&t.__k.some(Ke))}function Ve(t,e,a){for(var r=0;r<a.length;r++)be(a[r],a[++r],a[++r]);q.__c&&q.__c(e,t),t.some(function(i){try{t=i.__h,i.__h=[],t.some(function(o){o.call(i)})}catch(o){q.__e(o,i.__v)}})}function Ge(t){return typeof t!="object"||t==null||t.__b>0?t:ce(t)?t.map(Ge):t.constructor!==void 0?null:U({},t)}function Rt(t,e,a,r,i,o,l,c,d){var u,f,h,s,p,g,m,v=a.props||oe,_=e.props,b=e.type;if(b=="svg"?i="http://www.w3.org/2000/svg":b=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),o!=null){for(u=0;u<o.length;u++)if((p=o[u])&&"setAttribute"in p==!!b&&(b?p.localName==b:p.nodeType==3)){t=p,o[u]=null;break}}if(t==null){if(b==null)return document.createTextNode(_);t=document.createElementNS(i,b,_.is&&_),c&&(q.__m&&q.__m(e,o),c=!1),o=null}if(b==null)v===_||c&&t.data==_||(t.data=_);else{if(o=b=="textarea"&&_.defaultValue!=null?null:o&&le.call(t.childNodes),!c&&o!=null)for(v={},u=0;u<t.attributes.length;u++)v[(p=t.attributes[u]).name]=p.value;for(u in v)p=v[u],u=="dangerouslySetInnerHTML"?h=p:u=="children"||u in _||u=="value"&&"defaultValue"in _||u=="checked"&&"defaultChecked"in _||te(t,u,null,p,i);for(u in _)p=_[u],u=="children"?s=p:u=="dangerouslySetInnerHTML"?f=p:u=="value"?g=p:u=="checked"?m=p:c&&typeof p!="function"||v[u]===p||te(t,u,p,v[u],i);if(f)c||h&&(f.__html==h.__html||f.__html==t.innerHTML)||(t.innerHTML=f.__html),e.__k=[];else if(h&&(t.innerHTML=""),Be(e.type=="template"?t.content:t,ce(s)?s:[s],e,a,r,b=="foreignObject"?"http://www.w3.org/1999/xhtml":i,o,l,o?o[0]:a.__k&&B(a,0),c,d),o!=null)for(u=o.length;u--;)ge(o[u]);c&&b!="textarea"||(u="value",b=="progress"&&g==null?t.removeAttribute("value"):g!=null&&(g!==t[u]||b=="progress"&&!g||b=="option"&&g!=v[u])&&te(t,u,g,v[u],i),u="checked",m!=null&&m!=t[u]&&te(t,u,m,v[u],i))}return t}function be(t,e,a){try{if(typeof t=="function"){var r=typeof t.__u=="function";r&&t.__u(),r&&e==null||(t.__u=t(e))}else t.current=e}catch(i){q.__e(i,a)}}function Qe(t,e,a){var r,i;if(q.unmount&&q.unmount(t),(r=t.ref)&&(r.current&&r.current!=t.__e||be(r,null,e)),(r=t.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(o){q.__e(o,e)}r.base=r.__P=r.__n=null}if(r=t.__k)for(i=0;i<r.length;i++)r[i]&&Qe(r[i],e,a||typeof t.type!="function");a||ge(t.__e),t.__c=t.__=t.__e=void 0}function Nt(t,e,a){return this.constructor(t,a)}function Xe(t,e,a){var r,i,o,l;e==document&&(e=document.documentElement),q.__&&q.__(t,e),i=(r=typeof a=="function")?null:a&&a.__k||e.__k,o=[],l=[],ve(e,t=(!r&&a||e).__k=Ct(w,null,[t]),i||oe,oe,e.namespaceURI,!r&&a?[a]:i?null:e.firstChild?le.call(e.childNodes):null,o,!r&&a?a:i?i.__e:e.firstChild,r,l),Ve(o,t,l),t.props.children=null}le=se.slice,q={__e:function(t,e,a,r){for(var i,o,l;e=e.__;)if((i=e.__c)&&!i.__)try{if((o=i.constructor)&&o.getDerivedStateFromError!=null&&(i.setState(o.getDerivedStateFromError(t)),l=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(t,r||{}),l=i.__d),l)return i.__E=i}catch(c){t=c}throw t}},Fe=0,wt=function(t){return t!=null&&t.constructor===void 0},re.prototype.setState=function(t,e){var a;a=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=U({},this.state),typeof t=="function"&&(t=t(U({},a),this.props)),t&&U(a,t),t!=null&&this.__v&&(e&&this._sb.push(e),Ae(this))},re.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Ae(this))},re.prototype.render=w,H=[],He=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Oe=function(t,e){return t.__v.__b-e.__v.__b},ie.__r=0,fe=Math.random().toString(8),ae="__d"+fe,Q="__a"+fe,je=/(PointerCapture)$|Capture$/i,me=0,he=Ue(!1),_e=Ue(!0),kt=0;var W,k,ye,Je,de=0,ot=[],S=q,Ye=S.__b,Ze=S.__r,et=S.diffed,tt=S.__c,at=S.unmount,nt=S.__;function X(t,e){S.__h&&S.__h(k,t,de||e),de=0;var a=k.__H||(k.__H={__:[],__h:[]});return t>=a.__.length&&a.__.push({}),a.__[t]}function y(t){return de=1,Pt(st,t)}function Pt(t,e,a){var r=X(W++,2);if(r.t=t,!r.__c&&(r.__=[a?a(e):st(void 0,e),function(c){var d=r.__N?r.__N[0]:r.__[0],u=r.t(d,c);d!==u&&(r.__N=[u,r.__[1]],r.__c.setState({}))}],r.__c=k,!k.__f)){var i=function(c,d,u){if(!r.__c.__H)return!0;var f=!1,h=r.__c.props!==c;if(r.__c.__H.__.some(function(p){if(p.__N){f=!0;var g=p.__[0];p.__=p.__N,p.__N=void 0,g!==p.__[0]&&(h=!0)}}),o){var s=o.call(this,c,d,u);return f?s||h:s}return!f||h};k.__f=!0;var o=k.shouldComponentUpdate,l=k.componentWillUpdate;k.componentWillUpdate=function(c,d,u){if(this.__e){var f=o;o=void 0,i(c,d,u),o=f}l&&l.call(this,c,d,u)},k.shouldComponentUpdate=i}return r.__N||r.__}function J(t,e){var a=X(W++,3);!S.__s&&qe(a.__H,e)&&(a.__=t,a.u=e,k.__H.__h.push(a))}function O(t,e){var a=X(W++,4);!S.__s&&qe(a.__H,e)&&(a.__=t,a.u=e,k.__h.push(a))}function C(t){return de=5,$t(function(){return{current:t}},[])}function $t(t,e){var a=X(W++,7);return qe(a.__H,e)&&(a.__=t(),a.__H=e,a.__h=t),a.__}function I(){var t=X(W++,11);if(!t.__){for(var e=k.__v;e!==null&&!e.__m&&e.__!==null;)e=e.__;var a=e.__m||(e.__m=[0,0]);t.__="P"+a[0]+"-"+a[1]++}return t.__}function Mt(){for(var t;t=ot.shift();){var e=t.__H;if(t.__P&&e)try{e.__h.some(ue),e.__h.some(xe),e.__h=[]}catch(a){e.__h=[],S.__e(a,t.__v)}}}S.__b=function(t){k=null,Ye&&Ye(t)},S.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),nt&&nt(t,e)},S.__r=function(t){Ze&&Ze(t),W=0;var e=(k=t.__c).__H;e&&(ye===k?(e.__h=[],k.__h=[],e.__.some(function(a){a.__N&&(a.__=a.__N),a.u=a.__N=void 0})):(e.__h.some(ue),e.__h.some(xe),e.__h=[],W=0)),ye=k},S.diffed=function(t){et&&et(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(ot.push(e)!==1&&Je===S.requestAnimationFrame||((Je=S.requestAnimationFrame)||Dt)(Mt)),e.__H.__.some(function(a){a.u&&(a.__H=a.u,a.u=void 0)})),ye=k=null},S.__c=function(t,e){e.some(function(a){try{a.__h.some(ue),a.__h=a.__h.filter(function(r){return!r.__||xe(r)})}catch(r){e.some(function(i){i.__h&&(i.__h=[])}),e=[],S.__e(r,a.__v)}}),tt&&tt(t,e)},S.unmount=function(t){at&&at(t);var e,a=t.__c;a&&a.__H&&(a.__H.__.some(function(r){try{ue(r)}catch(i){e=i}}),a.__H=void 0,e&&S.__e(e,a.__v))};var rt=typeof requestAnimationFrame=="function";function Dt(t){var e,a=function(){clearTimeout(r),rt&&cancelAnimationFrame(e),setTimeout(t)},r=setTimeout(a,35);rt&&(e=requestAnimationFrame(a))}function ue(t){var e=k,a=t.__c;typeof a=="function"&&(t.__c=void 0,a()),k=e}function xe(t){var e=k;t.__c=t.__(),k=e}function qe(t,e){return!t||t.length!==e.length||e.some(function(a,r){return a!==t[r]})}function st(t,e){return typeof e=="function"?e(t):e}var it=`/*
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

.goto {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--qa-target);
    height: var(--qa-target);
    border-radius: var(--qa-radius-control);
    color: var(--qa-text-muted);
    transition: background-color 120ms ease;
}

.goto:hover {
    background: var(--qa-raised);
    color: var(--qa-text);
}

.item-error {
    padding: 0 var(--qa-space-3) var(--qa-space-3) var(--qa-target-sm);
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
`;var It=new URL(".",document.currentScript.src),we=class extends Error{constructor(e,a){super(a.message??`The request failed with status ${e}.`),this.data=a}};function Ut(){let t=document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);return t?decodeURIComponent(t[1]):""}function ke(t){return new URL(t,It).toString()}async function T(t,{method:e="GET",body:a}={}){let r=await fetch(ke(t),{method:e,credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json","X-XSRF-TOKEN":Ut()},body:a&&JSON.stringify(a)}),i=await r.json().catch(()=>({}));if(!r.ok)throw new we(r.status,i);return i}function P(t){let e=Object.values(t.data?.errors??{});return e.length>0?e[0][0]:t.message}var Ft=0;function n(t,e,a,r,i,o){e||(e={});var l,c,d=e;if("ref"in d)for(c in d={},e)c=="ref"?l=e[c]:d[c]=e[c];var u={type:t,props:d,key:a,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Ft,__i:-1,__u:0,__source:i,__self:o};if(typeof t=="function"&&(l=t.defaultProps))for(c in l)d[c]===void 0&&(d[c]=l[c]);return q.vnode&&q.vnode(u),u}function Y({label:t,ariaLabel:e,focusKey:a,question:r,confirmLabel:i,busyLabel:o,danger:l,disabled:c,triggerClass:d="button secondary",children:u,onConfirm:f}){let[h,s]=y("idle"),p=C(null),g=C(null),m=C(!1),v=I();O(()=>{h==="confirm"&&g.current?.focus(),h==="idle"&&m.current&&(m.current=!1,p.current?.focus())},[h]);let _=()=>{m.current=!0,s("idle")},b=async()=>{s("busy"),await f(),m.current=!0,s("idle")};return h==="idle"?n("button",{ref:p,type:"button",class:d,"aria-label":e,title:e,"data-focus-key":a,disabled:c,onClick:()=>s("confirm"),children:u??t}):n("div",{class:"confirm",role:"group","aria-labelledby":v,onKeyDown:E=>{E.key==="Escape"&&!E.isComposing&&h==="confirm"&&(E.stopPropagation(),_())},children:[n("p",{id:v,class:"confirm-question",children:r}),n("div",{class:"confirm-actions",children:[n("button",{ref:g,type:"button",class:"button secondary",disabled:h==="busy",onClick:_,children:"Cancel"}),n("button",{type:"button",class:`button ${l?"danger":"primary"}`,disabled:h==="busy",onClick:b,children:h==="busy"?o:i})]})]})}var Ht={arrowRight:n(w,{children:[n("path",{d:"M5 12h14"}),n("path",{d:"m12 5 7 7-7 7"})]}),arrowUp:n(w,{children:[n("path",{d:"m5 12 7-7 7 7"}),n("path",{d:"M12 19V5"})]}),check:n("path",{d:"M20 6 9 17l-5-5"}),chevronDown:n("path",{d:"m6 9 6 6 6-6"}),chevronLeft:n("path",{d:"m15 18-6-6 6-6"}),chevronRight:n("path",{d:"m9 18 6-6-6-6"}),listChecks:n(w,{children:[n("path",{d:"m3 17 2 2 4-4"}),n("path",{d:"m3 7 2 2 4-4"}),n("path",{d:"M13 6h8"}),n("path",{d:"M13 12h8"}),n("path",{d:"M13 18h8"})]}),mail:n(w,{children:[n("rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}),n("path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"})]}),search:n(w,{children:[n("circle",{cx:"11",cy:"11",r:"8"}),n("path",{d:"m21 21-4.3-4.3"})]}),trash:n(w,{children:[n("path",{d:"M3 6h18"}),n("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),n("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})]}),users:n(w,{children:[n("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),n("circle",{cx:"9",cy:"7",r:"4"}),n("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),n("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),x:n(w,{children:[n("path",{d:"M18 6 6 18"}),n("path",{d:"m6 6 12 12"})]})};function R({name:t,size:e=16}){return n("svg",{class:"icon",width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",children:Ht[t]})}function lt(t,e,a){try{return JSON.parse(t.getItem(`nitpick.${e}`))??a}catch{return a}}function ct(t,e,a){try{if(a===null){t.removeItem(`nitpick.${e}`);return}t.setItem(`nitpick.${e}`,JSON.stringify(a))}catch{}}var Se={read:(t,e)=>lt(localStorage,t,e),write:(t,e)=>ct(localStorage,t,e)},V={read:(t,e)=>lt(sessionStorage,t,e),write:(t,e)=>ct(sessionStorage,t,e)};function Z(t,e){V.write("focus",t),location.assign(e)}function F({name:t,ready:e,children:a}){let r=C(null),i=C(!1);return O(()=>{if(!e||i.current)return;i.current=!0,r.current.scrollTop=V.read(`scroll.${t}`,0);let l=V.read("focus",null);if(l===null)return;V.write("focus",null);let c=r.current.getRootNode();c.querySelector(`[data-focus-key="${CSS.escape(l)}"]`)?.focus({preventScroll:!0}),c.activeElement||c.querySelector('[role="tab"][aria-selected="true"]')?.focus({preventScroll:!0})},[e]),n("div",{ref:r,class:"scroller","data-ready":e,onScroll:()=>{i.current&&r.current&&V.write(`scroll.${t}`,r.current.scrollTop)},children:a})}var Ce="Start a round to record results and nits";function ee(t,e){return e==="guest"?"Guest":t.personas.find(a=>a.key===e)?.label??e}function Ot({failure:t}){return n("div",{role:"alert",class:"failure",children:[n("p",{class:"text",children:t.message}),t.output&&n("pre",{class:"output",children:t.output})]})}function ut({scenario:t,persona:e,current:a,focusKey:r,onFailure:i}){let[o,l]=y(!1),c=async()=>{l(!0);try{let{redirect:f}=await T("login",{method:"POST",body:{scenario:t.slug,persona:e}});Z(r,f)}catch(f){i({message:P(f)}),l(!1)}},d=e==="guest"?"Log out":`Log in as ${ee(t,e)}`,u=e==="guest"?"Log out":"Log in";return a&&(u="Current"),n("button",{type:"button",class:"button secondary","aria-label":d,title:d,"data-focus-key":r,disabled:o||a,onClick:c,children:u})}function jt({scenario:t,persona:e,focusKey:a,onFailure:r}){let i=e==="guest"?"Reset, logged out":`Reset as ${ee(t,e)}`,o=e==="guest"?"Reset the database and stay logged out?":`Reset the database and log in as ${ee(t,e)}?`;return n(Y,{label:"Reset",ariaLabel:i,focusKey:a,question:o,confirmLabel:"Reset",busyLabel:"Resetting\u2026",danger:!0,onConfirm:async()=>{r(null);try{let{redirect:c}=await T("reset",{method:"POST",body:{scenario:t.slug,persona:e}});Z(a,c)}catch(c){r({message:P(c),output:c.data?.output})}}})}var dt=Promise.resolve();function Te(t){let e=dt.then(t);return dt=e.catch(()=>{}),e}async function pt(t,e,a){return(await Te(()=>T(`rounds/${t.round.id}/nits`,{method:"POST",body:{item_key:e,body:a,url:location.href}}))).round}function zt({round:t,itemKey:e,label:a,inputRef:r,onRoundChange:i}){let[o,l]=y(""),[c,d]=y(!1),[u,f]=y(null),h=I();return n("form",{class:"nit-field",onSubmit:async p=>{if(p.preventDefault(),o.trim()!==""){d(!0),f(null);try{i(await pt(t,e,o)),l("")}catch(g){f(P(g))}d(!1),r.current?.focus()}},children:[n("label",{class:"visually-hidden",for:h,children:a}),n("input",{ref:r,id:h,class:"input",type:"text",autocomplete:"off",maxLength:2e3,placeholder:"Add a nit\u2026",title:t===null?Ce:void 0,value:o,readOnly:c,disabled:t===null,onInput:p=>l(p.currentTarget.value)}),u&&n("p",{role:"alert",class:"text error",children:u})]})}function Ee({round:t,nits:e,onRoundChange:a}){if(e.length===0)return null;let r=i=>async()=>{let o=await Te(()=>T(`rounds/${t.round.id}/nits/${i.id}`,{method:"DELETE"}));a(o.round)};return n("ul",{class:"nits",children:e.map(i=>n("li",{class:"nit",children:[n("p",{class:"nit-body",children:[i.body,"\xA0",n("code",{class:"nit-path muted",children:["(",i.url,")"]})]}),n(Y,{ariaLabel:`Delete the nit: ${i.body}`,question:"Delete this nit?",confirmLabel:"Delete",busyLabel:"Deleting\u2026",danger:!0,triggerClass:"button icon-button",onConfirm:r(i),children:n(R,{name:"trash"})})]},i.id))})}var Bt={untested:"pass",pass:"fail",fail:"untested"},Wt={untested:"press to mark passed",pass:"press to mark failed",fail:"press to clear"},ft={untested:"not tested",pass:"passed",fail:"failed"},pe={pass:"check",fail:"x"};function Kt(t){return t===1?"1 nit":`${t} nits`}function Vt({scenario:t,item:e,round:a,result:r,onRoundChange:i}){let[o,l]=y(null),[c,d]=y(!1),[u,f]=y(null),h=C(null),s=C(!1),p=C(!1),g=C(null),m=I(),v=r?.nits??[],_=o??r?.status??"untested",b=Bt[_];O(()=>{c&&p.current&&(p.current=!1,g.current?.focus())},[c]);let L=async()=>{let N=null;try{let $=await Te(()=>{s.current=!1,N=h.current;let A=`rounds/${a.round.id}/results/${encodeURIComponent(e.key)}`;return N==="untested"?T(A,{method:"DELETE"}):T(A,{method:"PUT",body:{status:N}})});i($.round)}catch($){f(P($))}h.current===N&&l(null)},E=()=>{h.current=b,l(b),f(null),b==="fail"&&c&&g.current?.focus(),b==="fail"&&!c&&(p.current=!0,d(!0)),b==="untested"&&v.length===0&&d(!1),s.current||(s.current=!0,L())};return n("li",{class:"item","data-status":_,children:[n("div",{class:"item-row",children:[n("button",{type:"button",class:"box","data-status":_,"aria-label":`${e.text}, ${ft[_]}, ${Wt[_]}`,title:a===null?Ce:void 0,disabled:a===null,onClick:E,children:n("span",{class:"box-glyph",children:pe[_]&&n(R,{name:pe[_],size:12})})}),n("button",{type:"button",class:"item-toggle","aria-expanded":c,"aria-controls":m,onClick:()=>d(!c),children:[n("span",{class:"check-text",children:e.text}),(e.setup||v.length>0)&&n("span",{class:"item-meta",children:[e.setup,e.setup&&v.length>0&&" \xB7 ",v.length>0&&n("span",{class:"nit-count",children:Kt(v.length)})]})]}),e.url&&n("a",{class:"goto",href:e.url,"aria-label":`Go to ${e.url}`,title:`Go to ${e.url}`,children:n(R,{name:"arrowRight"})})]}),u&&n("p",{role:"alert",class:"text error item-error",children:u}),n("div",{id:m,class:"details",hidden:!c,children:[a&&n(Ee,{round:a,nits:v,onRoundChange:i}),n(zt,{round:a,itemKey:e.key,label:`Nit on: ${e.text}`,inputRef:g,onRoundChange:i})]})]})}function Gt({scenario:t,group:e,index:a,Heading:r,currentEmail:i,itemProps:o}){let[l,c]=y(null),d=e.type==="section",u=d?e.persona:e.items[0].persona,f=h=>({scenario:t,persona:h,current:h!=="guest"&&Qt(t,h)===i,focusKey:`login:${a}:${h}`,onFailure:c});return n("section",{class:"group",children:[n("div",{class:"group-header",children:[n(r,{class:"group-title",children:d?ee(t,e.persona):e.title}),d&&n(ut,{...f(e.persona)}),n(jt,{scenario:t,persona:u,focusKey:`reset:${a}`,onFailure:c})]}),l&&n(Ot,{failure:l}),n("ol",{class:"items",children:e.items.map((h,s)=>n(w,{children:[!d&&h.persona!==e.items[s-1]?.persona&&n("li",{class:"handoff-step",children:[n("p",{class:"text muted",children:["As ",ee(t,h.persona)]}),n(ut,{...f(h.persona)})]}),n(Vt,{scenario:t,item:h,...o(h)})]},h.key))})]})}function Qt(t,e){return t.personas.find(a=>a.key===e)?.email}function Xt({round:t,onRoundChange:e}){let{results:a,nits:r}=t.orphaned,i=[...new Set([...a.map(o=>o.item_key),...r.map(o=>o.item_key)])].sort();return i.length===0?null:n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Orphaned"})}),n("ul",{class:"items",children:i.map(o=>{let l=a.find(d=>d.item_key===o)?.status??"untested",c=r.filter(d=>d.item_key===o);return n("li",{class:"item",children:[n("div",{class:"item-row",children:[n("span",{class:"box","data-status":l,children:[n("span",{class:"box-glyph",children:pe[l]&&n(R,{name:pe[l],size:12})}),n("span",{class:"visually-hidden",children:ft[l]})]}),n("p",{class:"item-toggle",children:n("code",{class:"check-text",children:o})})]}),c.length>0&&n("div",{class:"details",children:n(Ee,{round:t,nits:c,onRoundChange:e})})]},o)})})]})}function Jt({round:t,onRoundChange:e}){let[a,r]=y(""),[i,o]=y(!1),[l,c]=y(null),d=C(null),u=I();return n("form",{class:"composer",onSubmit:async h=>{h.preventDefault(),o(!0),c(null);try{e(await pt(t,null,a)),r("")}catch(s){c(P(s))}o(!1),d.current?.focus()},children:[l&&n("p",{role:"alert",class:"text error",children:l}),n("div",{class:"composer-field",children:[n("label",{class:"visually-hidden",for:u,children:"Page nit"}),n("input",{ref:d,id:u,class:"composer-input",type:"text",autocomplete:"off",maxLength:2e3,placeholder:"Note something on this page\u2026",title:t===null?Ce:void 0,value:a,readOnly:i,disabled:t===null,onInput:h=>r(h.currentTarget.value)}),n("button",{type:"submit",class:"send","aria-label":"Add page nit",title:"Add page nit",disabled:i||t===null||a.trim()==="",children:n(R,{name:"arrowUp"})})]})]})}function ht({scenarios:t,scenario:e,round:a,ready:r,nextNumber:i,currentEmail:o,onRoundChange:l}){if(t!==null&&e===null)return n(F,{name:"checklist",ready:!0,children:n("p",{class:"text",children:["There are no scenarios yet. Make one with ",n("code",{children:"php artisan make:nitpick-scenario Name"}),"."]})});if(!r)return n(F,{name:"checklist",ready:!1});let c=a?.round.number??i,d=a===null||a.round.scenario===e.slug,u=e.groups.filter(s=>d&&(s.retest===null||s.retest===c)),f=new Map((a?.groups??[]).flatMap(s=>s.items).map(s=>[s.key,s])),h=s=>({round:a,result:f.get(s.key),onRoundChange:l});return n(w,{children:[n(F,{name:"checklist",ready:!0,children:n("div",{class:"stack",children:[u.map((s,p)=>{let g=s.retest!==null&&s.retest!==u[p-1]?.retest;return n(w,{children:[g&&n("h3",{class:"retest",children:["Retest ",s.retest]}),n(Gt,{scenario:e,group:s,index:p,Heading:s.retest===null?"h3":"h4",currentEmail:o,itemProps:h})]},p)}),n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Page nits"})}),n("div",{class:"panel-card",children:a&&a.page_nits.length>0?n(Ee,{round:a,nits:a.page_nits,onRoundChange:l}):n("p",{class:"text muted",children:"A page nit is a note on the page, not on an item. Add one below."})})]}),a&&n(Xt,{round:a,onRoundChange:l})]})}),n(Jt,{round:a,onRoundChange:l})]})}function _t(t){return new Date(t.sent_at).toLocaleString([],{dateStyle:"short",timeStyle:"short"})}function Yt(t){let e=new Date(t.sent_at);return e.toDateString()===new Date().toDateString()?e.toLocaleTimeString([],{timeStyle:"short"}):e.toLocaleDateString([],{dateStyle:"short"})}function Zt({mail:t,onBack:e}){return n("div",{class:"stack",children:[n("div",{children:n("button",{type:"button",class:"button secondary back",onClick:e,children:[n(R,{name:"chevronLeft"}),"All mail"]})}),n("div",{class:"panel-card",children:[n("h3",{class:"item-text",children:t.subject||"-"}),n("p",{class:"text muted",children:["To ",t.to," at ",_t(t)]})]}),n("iframe",{class:"mail-frame",sandbox:"",title:`Mail: ${t.subject}`,src:ke(`mails/${t.id}`)}),n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Links"})}),n("div",{class:"panel-card",children:t.links.length===0?n("p",{class:"text muted",children:"The mail has no links."}):n("ul",{class:"links",children:t.links.map(a=>n("li",{children:n("a",{class:"link",href:a,children:a})},a))})})]})]})}function mt(){let[t,e]=y(null),[a,r]=y(null),[i,o]=y(!1),[l,c]=y(null),[d,u]=y(null),[f,h]=y(null),s=()=>Promise.all([T("mails"),T("queue")]).then(([m,v])=>{e(m.data),r(v.size)}).catch(m=>{e([]),h(P(m))});J(()=>{s()},[]);let p=async()=>{o(!0),c(null),h(null);try{let m=await T("queue",{method:"POST"});m.exit_code!==0&&c(m.output),await s()}catch(m){h(P(m))}o(!1)};return d?n(F,{name:"mail-open",ready:!0,children:n(Zt,{mail:d,onBack:()=>u(null)})},"mail-open"):n(F,{name:"mail",ready:t!==null,children:n("div",{class:"stack",children:[n("div",{class:"panel-card queue",children:[n("p",{class:"text","aria-live":"polite",children:[n("span",{class:"figure",children:a??"-"})," queued ",a===1?"job":"jobs"]}),n("button",{type:"button",class:"button light",disabled:i,onClick:p,children:i?"Running\u2026":"Run queue"})]}),f&&n("p",{role:"alert",class:"text error",children:f}),l&&n("div",{role:"alert",class:"failure",children:[n("p",{class:"text",children:"The queue worker failed."}),n("pre",{class:"output",children:l})]}),t?.length===0&&n("p",{class:"text muted",children:"No mail yet. A queued mail shows here after Run queue."}),t?.length>0&&n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Captured mail"})}),n("ul",{class:"rows",children:t.map(m=>n("li",{children:n("button",{type:"button",class:"row",onClick:()=>u(m),children:[n("span",{class:"row-text",children:[n("span",{class:"row-title",children:m.subject||"-"}),n("span",{class:"row-meta",children:[m.to," \xB7"," ",n("time",{dateTime:m.sent_at,title:_t(m),children:Yt(m)})]})]}),n(R,{name:"chevronRight"})]})},m.id))})]})]})},"mail")}function gt({rows:t,currentEmail:e,busy:a,onLogIn:r}){return n("ul",{class:"rows",children:t.map(i=>{let o=i.name||i.email,l=i.email===e;return n("li",{class:"row","data-current":l,children:[n("span",{class:"avatar","aria-hidden":"true",children:o.charAt(0).toUpperCase()}),n("span",{class:"row-text",children:[n("span",{class:"row-title",children:i.name||"-"}),n("span",{class:"row-meta",children:i.email})]}),n("button",{type:"button",class:"button secondary","aria-label":`Log in as ${o}`,title:`Log in as ${o}`,"data-focus-key":`login:${i.email}`,disabled:a||l,onClick:()=>r(i.body,`login:${i.email}`),children:l?"Current":"Log in"})]},i.email)})})}function vt({scenarios:t,scenario:e,user:a}){let[r,i]=y(!1),[o,l]=y(null),[c,d]=y(null),u=C(null),f=I(),h=async(m,v)=>{i(!0),l(null);try{let{redirect:_}=await T("login",{method:"POST",body:m});Z(v,_)}catch(_){l(P(_)),i(!1)}},s=m=>{let v=m.currentTarget.value.trim();if(clearTimeout(u.current),v===""){d(null);return}u.current=setTimeout(()=>{T(`users?search=${encodeURIComponent(v)}`).then(_=>d(_.data)).catch(_=>l(P(_)))},200)},p=(e?.personas??[]).map(m=>({name:m.label,email:m.email,body:{scenario:e.slug,persona:m.key}})),g=(c??[]).map(m=>({...m,body:{email:m.email}}));return n(F,{name:"personas",ready:t!==null,children:n("div",{class:"stack",children:[o&&n("p",{role:"alert",class:"text error",children:o}),n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Personas"})}),t?.length===0&&n("p",{class:"text muted",children:"There are no scenarios yet."}),p.length>0&&n(gt,{rows:p,currentEmail:a?.email,busy:r,onLogIn:h})]}),n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Find a user"})}),n("div",{class:"search",children:[n(R,{name:"search"}),n("label",{class:"visually-hidden",for:f,children:"Find a user by email or name"}),n("input",{id:f,class:"search-input",type:"search",autocomplete:"off",onInput:s})]}),c?.length===0&&n("p",{class:"text muted",children:"No user matches."}),c?.length>0&&n(gt,{rows:g,currentEmail:a?.email,busy:r,onLogIn:h})]}),n("div",{children:n("button",{type:"button",class:"button secondary","data-focus-key":"logout",disabled:r||!a||!e,onClick:()=>h({scenario:e?.slug,persona:"guest"},"logout"),children:a?"Log out":"Logged out"})})]})})}var Le="Alt+Shift+Q",G=[{key:"checklist",label:"Checklist",icon:"listChecks"},{key:"mail",label:"Mail",icon:"mail"},{key:"personas",label:"Personas",icon:"users"}];function Re(t,e){let[a,r]=y(()=>Se.read(t,e));return[a,o=>{r(o),Se.write(t,o)}]}function ea(t){return!t.isComposing&&t.altKey&&t.shiftKey&&!t.ctrlKey&&!t.metaKey&&t.code==="KeyQ"}function ta(t){return t instanceof HTMLElement&&(t.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(t.tagName))}function aa({scenarios:t,scenario:e,round:a,nextNumber:r,onSelectScenario:i,onRoundChange:o}){let[l,c]=y(!1),[d,u]=y(null),[f,h]=y([]),s=I(),p=async()=>{c(!0),u(null);try{let _=await T("rounds",{method:"POST",body:{scenario:e.slug}});h([]),o(_.round)}catch(_){u(P(_))}c(!1)},g=async()=>{u(null);try{let _=await T(`rounds/${a.round.id}`,{method:"PATCH",body:{status:"closed"}});h(_.reports),o(null)}catch(_){u(P(_))}},m=a===null&&t?.length>1,v=t===null?"Loading\u2026":"No scenarios yet";return a!==null?v=`Round ${a.round.number} \xB7 open`:e!==null&&(v=`Round ${r} \xB7 not started`),n("header",{class:"card-header",children:[n("div",{class:"header-row",children:[n("div",{class:"header-title",children:[m?n("div",{class:"picker",children:[n("label",{class:"visually-hidden",for:s,children:"Scenario"}),n("select",{id:s,class:"picker-select",value:e.slug,onChange:_=>i(_.currentTarget.value),children:t.map(_=>n("option",{value:_.slug,children:_.title},_.slug))}),n(R,{name:"chevronDown"})]}):n("h2",{class:"title",children:a?.round.title??e?.title??"Nitpick"}),n("p",{class:"subtitle","data-round":a===null?"none":"open",children:v})]}),a===null?n("button",{type:"button",class:"button light",disabled:l||e===null,onClick:p,children:"Start round"}):n(Y,{label:"Close round",question:`Close round ${a.round.number} and write the report?`,confirmLabel:"Close round",busyLabel:"Closing\u2026",onConfirm:g})]}),d&&n("p",{role:"alert",class:"note error",children:d}),n("div",{role:"status",children:f.length>0&&n("p",{class:"note",children:["Report written to"," ",f.map(_=>n("code",{children:_},_))]})})]})}function na(){let[t,e]=Re("open",!1),[a,r]=Re("tab","checklist"),[i,o]=Re("scenario",null),[l,c]=y(null),[d,u]=y(null),[f,h]=y(!1),[s,p]=y({}),[g,m]=y(void 0),v=C(null),_=C(null),b=C(!1),L=C(!1),E=()=>T("user").then(x=>m(x.user)),N=()=>T("round").then(x=>{u(x.round),p(x.next_numbers),h(!0)}),$=x=>{u(x),x===null&&N()},A=x=>{e(!t),L.current=!t,b.current=!t&&x,t&&v.current?.focus()},j=x=>{x.key==="Escape"&&t&&!x.isComposing&&A(!1)};O(()=>{t&&b.current&&(b.current=!1,_.current?.querySelector('[aria-selected="true"]')?.focus())},[t]),J(()=>{T("scenarios").then(x=>c(x.data)),E(),N()},[]);let K=C(A);K.current=A,J(()=>{let x=z=>{!ea(z)||ta(z.composedPath()[0])||(z.preventDefault(),K.current(!0))};return document.addEventListener("keydown",x),document.addEventListener("inertia:navigate",E),document.addEventListener("livewire:navigated",E),()=>{document.removeEventListener("keydown",x),document.removeEventListener("inertia:navigate",E),document.removeEventListener("livewire:navigated",E)}},[]);let M=d?.round.scenario??i,D=l?.find(x=>x.slug===M)??l?.[0]??null,bt=D?.personas.find(x=>x.email===g?.email),yt=g===void 0?"":bt?.label??g?.email??"Guest",Pe=s[D?.slug]??1,xt=x=>{let z=G.findIndex(qt=>qt.key===a),$e={ArrowRight:1,ArrowLeft:G.length-1,Home:-z,End:G.length-1-z};if(!(x.key in $e))return;x.preventDefault();let Me=G[(z+$e[x.key])%G.length];r(Me.key),_.current.querySelector(`#qa-tab-${Me.key}`).focus()};return n(w,{children:[t&&n("section",{id:"qa-card",class:"card","aria-label":"Nitpick","data-enter":L.current,"data-loading":l===null||!f,onKeyDown:j,children:[n(aa,{scenarios:l,scenario:D,round:d,nextNumber:Pe,onSelectScenario:o,onRoundChange:$}),n("div",{id:"qa-tabpanel",role:"tabpanel","aria-labelledby":`qa-tab-${a}`,class:"view",children:[a==="checklist"&&n(ht,{scenarios:l,scenario:D,round:d,ready:l!==null&&f,nextNumber:Pe,currentEmail:g?.email,onRoundChange:$}),a==="mail"&&n(mt,{}),a==="personas"&&n(vt,{scenarios:l,scenario:D,user:g})]}),n("div",{ref:_,role:"tablist","aria-label":"Nitpick",class:"tabbar",onKeyDown:xt,children:G.map(x=>n("button",{id:`qa-tab-${x.key}`,type:"button",role:"tab",class:"tab","aria-selected":x.key===a,"aria-controls":"qa-tabpanel",tabIndex:x.key===a?0:-1,onClick:()=>r(x.key),children:[n(R,{name:x.icon}),x.label]},x.key))})]}),n("button",{ref:v,type:"button",class:"pill","data-open":t,"aria-expanded":t,"aria-controls":"qa-card","aria-label":t?"Close Nitpick":void 0,"aria-keyshortcuts":Le,title:t?`Close (${Le})`:`Nitpick (${Le})`,onClick:()=>A(!1),onKeyDown:j,children:t?n(R,{name:"x",size:20}):n(w,{children:[n("span",{class:"pill-brand",children:"QA"}),n("span",{class:"pill-separator","aria-hidden":"true",children:"\xB7"}),n("span",{class:"pill-name",children:yt}),d&&n("span",{class:"pill-round",title:`Round ${d.round.number} is open`,children:["R",d.round.number]}),n(R,{name:"chevronRight"})]})})]})}var Ne=class extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;let e=this.attachShadow({mode:"open"}),a=document.createElement("style"),r=document.createElement("div");a.textContent=it,r.className="root",e.append(a,r),Xe(n(na,{}),r)}};customElements.get("nitpick-panel")||customElements.define("nitpick-panel",Ne);document.querySelector("nitpick-panel")||document.documentElement.append(document.createElement("nitpick-panel"));})();
