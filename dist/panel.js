(()=>{var le,q,Fe,wt,H,De,He,Oe,fe,ae,Q,je,me,he,_e,kt,oe={},se=[],St=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,ce=Array.isArray;function U(e,t){for(var a in t)e[a]=t[a];return e}function ge(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function Ct(e,t,a){var r,i,o,l={};for(o in t)o=="key"?r=t[o]:o=="ref"?i=t[o]:l[o]=t[o];if(arguments.length>2&&(l.children=arguments.length>3?le.call(arguments,2):a),typeof e=="function"&&e.defaultProps!=null)for(o in e.defaultProps)l[o]===void 0&&(l[o]=e.defaultProps[o]);return ne(e,l,r,i,null)}function ne(e,t,a,r,i){var o={type:e,props:t,key:a,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Fe,__i:-1,__u:0};return i==null&&q.vnode!=null&&q.vnode(o),o}function w(e){return e.children}function re(e,t){this.props=e,this.context=t}function B(e,t){if(t==null)return e.__?B(e.__,e.__i+1):null;for(var a;t<e.__k.length;t++)if((a=e.__k[t])!=null&&a.__e!=null)return a.__e;return typeof e.type=="function"?B(e):null}function Tt(e){if(e.__P&&e.__d){var t=e.__v,a=t.__e,r=[],i=[],o=U({},t);o.__v=t.__v+1,q.vnode&&q.vnode(o),ve(e.__P,o,t,e.__n,e.__P.namespaceURI,32&t.__u?[a]:null,r,a??B(t),!!(32&t.__u),i),o.__v=t.__v,o.__.__k[o.__i]=o,Ve(r,o,i),t.__e=t.__=null,o.__e!=a&&ze(o)}}function ze(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(t){if(t!=null&&t.__e!=null)return e.__e=e.__c.base=t.__e}),ze(e)}function Ae(e){(!e.__d&&(e.__d=!0)&&H.push(e)&&!ie.__r++||De!=q.debounceRendering)&&((De=q.debounceRendering)||He)(ie)}function ie(){try{for(var e,t=1;H.length;)H.length>t&&H.sort(Oe),e=H.shift(),t=H.length,Tt(e)}finally{H.length=ie.__r=0}}function Be(e,t,a,r,i,o,l,c,d,u,h){var f,s,p,g,m,v,_=r&&r.__k||se,b=t.length;for(d=Et(a,t,_,d,b),f=0;f<b;f++)(p=a.__k[f])!=null&&(s=p.__i!=-1&&_[p.__i]||oe,p.__i=f,v=ve(e,p,s,i,o,l,c,d,u,h),g=p.__e,p.ref&&s.ref!=p.ref&&(s.ref&&be(s.ref,null,p),h.push(p.ref,p.__c||g,p)),m==null&&g!=null&&(m=g),4&p.__u?(d=We(p,d,e),s.__e&&(s.__e=null)):typeof p.type=="function"&&v!==void 0?d=v:g&&(d=g.nextSibling),p.__u&=-7);return a.__e=m,d}function Et(e,t,a,r,i){var o,l,c,d,u,h=a.length,f=h,s=0;for(e.__k=new Array(i),o=0;o<i;o++)(l=t[o])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=e.__k[o]=ne(null,l,null,null,null):ce(l)?l=e.__k[o]=ne(w,{children:l},null,null,null):l.constructor===void 0&&l.__b>0?l=e.__k[o]=ne(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):e.__k[o]=l,d=o+s,l.__=e,l.__b=e.__b+1,c=null,(u=l.__i=Lt(l,a,d,f))!=-1&&(f--,(c=a[u])&&(c.__u|=2)),c==null||c.__v==null?(u==-1&&(i>h?s--:i<h&&s++),typeof l.type!="function"&&(l.__u|=4)):u!=d&&(u==d-1?s--:u==d+1?s++:(u>d?s--:s++,l.__u|=4))):e.__k[o]=null;if(f)for(o=0;o<h;o++)(c=a[o])!=null&&(2&c.__u)==0&&(c.__e==r&&(r=B(c)),Qe(c,c));return r}function We(e,t,a){var r,i;if(typeof e.type=="function"){for(r=e.__k,i=0;r&&i<r.length;i++)r[i]&&(r[i].__=e,t=We(r[i],t,a));return t}e.__e!=t&&(t&&e.type&&!t.parentNode&&(t=B(e)),t=a.insertBefore(e.__e,t||null));do t=t&&t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Lt(e,t,a,r){var i,o,l,c=e.key,d=e.type,u=t[a],h=u!=null&&(2&u.__u)==0;if(u===null&&c==null||h&&c==u.key&&d==u.type)return a;if(r>(h?1:0)){for(i=a-1,o=a+1;i>=0||o<t.length;)if((u=t[l=i>=0?i--:o++])!=null&&(2&u.__u)==0&&c==u.key&&d==u.type)return l}return-1}function Ie(e,t,a){t[0]=="-"?e.setProperty(t,a??""):e[t]=a==null?"":typeof a!="number"||St.test(t)?a:a+"px"}function te(e,t,a,r,i){var o,l;e:if(t=="style")if(typeof a=="string")e.style.cssText=a;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)a&&t in a||Ie(e.style,t,"");if(a)for(t in a)r&&a[t]==r[t]||Ie(e.style,t,a[t])}else if(t[0]=="o"&&t[1]=="n")o=t!=(t=t.replace(je,"$1")),l=t.toLowerCase(),t=l in e||t=="onFocusOut"||t=="onFocusIn"?l.slice(2):t.slice(2),e.l||(e.l={}),e.l[t+o]=a,a?r?a[Q]=r[Q]:(a[Q]=me,e.addEventListener(t,o?_e:he,o)):e.removeEventListener(t,o?_e:he,o);else{if(i=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=a??"";break e}catch{}typeof a=="function"||(a==null||a===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&a==1?"":a))}}function Ue(e){return function(t){if(this.l){var a=this.l[t.type+e];if(t[ae]==null)t[ae]=me++;else if(t[ae]<a[Q])return;return a(q.event?q.event(t):t)}}}function ve(e,t,a,r,i,o,l,c,d,u){var h,f,s,p,g,m,v,_,b,L,E,N,$,A,j,K,M=t.type;if(t.constructor!==void 0)return null;128&a.__u&&(d=!!(32&a.__u),o=[c=t.__e=a.__e]),(h=q.__b)&&h(t);e:if(typeof M=="function"){f=l.length;try{if(b=t.props,L=M.prototype&&M.prototype.render,E=(h=M.contextType)&&r[h.__c],N=h?E?E.props.value:h.__:r,a.__c?_=(s=t.__c=a.__c).__=s.__E:(L?t.__c=s=new M(b,N):(t.__c=s=new re(b,N),s.constructor=M,s.render=Nt),E&&E.sub(s),s.state||(s.state={}),s.__n=r,p=s.__d=!0,s.__h=[],s._sb=[]),L&&s.__s==null&&(s.__s=s.state),L&&M.getDerivedStateFromProps!=null&&(s.__s==s.state&&(s.__s=U({},s.__s)),U(s.__s,M.getDerivedStateFromProps(b,s.__s))),g=s.props,m=s.state,s.__v=t,p)L&&M.getDerivedStateFromProps==null&&s.componentWillMount!=null&&s.componentWillMount(),L&&s.componentDidMount!=null&&s.__h.push(s.componentDidMount);else{if(L&&M.getDerivedStateFromProps==null&&b!==g&&s.componentWillReceiveProps!=null&&s.componentWillReceiveProps(b,N),t.__v==a.__v||!s.__e&&s.shouldComponentUpdate!=null&&s.shouldComponentUpdate(b,s.__s,N)===!1){t.__v!=a.__v&&(s.props=b,s.state=s.__s,s.__d=!1),t.__e=a.__e,t.__k=a.__k,t.__k.some(function(D){D&&(D.__=t)}),se.push.apply(s.__h,s._sb),s._sb=[],s.__h.length&&l.push(s),c=B(a);break e}s.componentWillUpdate!=null&&s.componentWillUpdate(b,s.__s,N),L&&s.componentDidUpdate!=null&&s.__h.push(function(){s.componentDidUpdate(g,m,v)})}if(s.context=N,s.props=b,s.__P=e,s.__e=!1,$=q.__r,A=0,L)s.state=s.__s,s.__d=!1,$&&$(t),h=s.render(s.props,s.state,s.context),se.push.apply(s.__h,s._sb),s._sb=[];else do s.__d=!1,$&&$(t),h=s.render(s.props,s.state,s.context),s.state=s.__s;while(s.__d&&++A<25);s.state=s.__s,s.getChildContext!=null&&(r=U(U({},r),s.getChildContext())),L&&!p&&s.getSnapshotBeforeUpdate!=null&&(v=s.getSnapshotBeforeUpdate(g,m)),j=h!=null&&h.type===w&&h.key==null?Ge(h.props.children):h,c=Be(e,ce(j)?j:[j],t,a,r,i,o,l,c,d,u),s.base=t.__e,t.__u&=-161,s.__h.length&&l.push(s),_&&(s.__E=s.__=null)}catch(D){if(l.length=f,t.__v=null,d||o!=null){if(D.then){for(t.__u|=d?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;o!=null&&(o[o.indexOf(c)]=null),t.__e=c}else if(o!=null)for(K=o.length;K--;)ge(o[K])}else t.__e=a.__e;t.__k==null&&(t.__k=a.__k||[]),D.then||Ke(t),q.__e(D,t,a)}}else o==null&&t.__v==a.__v?(t.__k=a.__k,t.__e=a.__e):c=t.__e=Rt(a.__e,t,a,r,i,o,l,d,u);return(h=q.diffed)&&h(t),128&t.__u?void 0:c}function Ke(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(Ke))}function Ve(e,t,a){for(var r=0;r<a.length;r++)be(a[r],a[++r],a[++r]);q.__c&&q.__c(t,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(o){o.call(i)})}catch(o){q.__e(o,i.__v)}})}function Ge(e){return typeof e!="object"||e==null||e.__b>0?e:ce(e)?e.map(Ge):e.constructor!==void 0?null:U({},e)}function Rt(e,t,a,r,i,o,l,c,d){var u,h,f,s,p,g,m,v=a.props||oe,_=t.props,b=t.type;if(b=="svg"?i="http://www.w3.org/2000/svg":b=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),o!=null){for(u=0;u<o.length;u++)if((p=o[u])&&"setAttribute"in p==!!b&&(b?p.localName==b:p.nodeType==3)){e=p,o[u]=null;break}}if(e==null){if(b==null)return document.createTextNode(_);e=document.createElementNS(i,b,_.is&&_),c&&(q.__m&&q.__m(t,o),c=!1),o=null}if(b==null)v===_||c&&e.data==_||(e.data=_);else{if(o=b=="textarea"&&_.defaultValue!=null?null:o&&le.call(e.childNodes),!c&&o!=null)for(v={},u=0;u<e.attributes.length;u++)v[(p=e.attributes[u]).name]=p.value;for(u in v)p=v[u],u=="dangerouslySetInnerHTML"?f=p:u=="children"||u in _||u=="value"&&"defaultValue"in _||u=="checked"&&"defaultChecked"in _||te(e,u,null,p,i);for(u in _)p=_[u],u=="children"?s=p:u=="dangerouslySetInnerHTML"?h=p:u=="value"?g=p:u=="checked"?m=p:c&&typeof p!="function"||v[u]===p||te(e,u,p,v[u],i);if(h)c||f&&(h.__html==f.__html||h.__html==e.innerHTML)||(e.innerHTML=h.__html),t.__k=[];else if(f&&(e.innerHTML=""),Be(t.type=="template"?e.content:e,ce(s)?s:[s],t,a,r,b=="foreignObject"?"http://www.w3.org/1999/xhtml":i,o,l,o?o[0]:a.__k&&B(a,0),c,d),o!=null)for(u=o.length;u--;)ge(o[u]);c&&b!="textarea"||(u="value",b=="progress"&&g==null?e.removeAttribute("value"):g!=null&&(g!==e[u]||b=="progress"&&!g||b=="option"&&g!=v[u])&&te(e,u,g,v[u],i),u="checked",m!=null&&m!=e[u]&&te(e,u,m,v[u],i))}return e}function be(e,t,a){try{if(typeof e=="function"){var r=typeof e.__u=="function";r&&e.__u(),r&&t==null||(e.__u=e(t))}else e.current=t}catch(i){q.__e(i,a)}}function Qe(e,t,a){var r,i;if(q.unmount&&q.unmount(e),(r=e.ref)&&(r.current&&r.current!=e.__e||be(r,null,t)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(o){q.__e(o,t)}r.base=r.__P=r.__n=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&Qe(r[i],t,a||typeof e.type!="function");a||ge(e.__e),e.__c=e.__=e.__e=void 0}function Nt(e,t,a){return this.constructor(e,a)}function Xe(e,t,a){var r,i,o,l;t==document&&(t=document.documentElement),q.__&&q.__(e,t),i=(r=typeof a=="function")?null:a&&a.__k||t.__k,o=[],l=[],ve(t,e=(!r&&a||t).__k=Ct(w,null,[e]),i||oe,oe,t.namespaceURI,!r&&a?[a]:i?null:t.firstChild?le.call(t.childNodes):null,o,!r&&a?a:i?i.__e:t.firstChild,r,l),Ve(o,e,l),e.props.children=null}le=se.slice,q={__e:function(e,t,a,r){for(var i,o,l;t=t.__;)if((i=t.__c)&&!i.__)try{if((o=i.constructor)&&o.getDerivedStateFromError!=null&&(i.setState(o.getDerivedStateFromError(e)),l=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,r||{}),l=i.__d),l)return i.__E=i}catch(c){e=c}throw e}},Fe=0,wt=function(e){return e!=null&&e.constructor===void 0},re.prototype.setState=function(e,t){var a;a=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=U({},this.state),typeof e=="function"&&(e=e(U({},a),this.props)),e&&U(a,e),e!=null&&this.__v&&(t&&this._sb.push(t),Ae(this))},re.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Ae(this))},re.prototype.render=w,H=[],He=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Oe=function(e,t){return e.__v.__b-t.__v.__b},ie.__r=0,fe=Math.random().toString(8),ae="__d"+fe,Q="__a"+fe,je=/(PointerCapture)$|Capture$/i,me=0,he=Ue(!1),_e=Ue(!0),kt=0;var W,k,ye,Je,de=0,ot=[],S=q,Ye=S.__b,Ze=S.__r,et=S.diffed,tt=S.__c,at=S.unmount,nt=S.__;function X(e,t){S.__h&&S.__h(k,e,de||t),de=0;var a=k.__H||(k.__H={__:[],__h:[]});return e>=a.__.length&&a.__.push({}),a.__[e]}function y(e){return de=1,Pt(st,e)}function Pt(e,t,a){var r=X(W++,2);if(r.t=e,!r.__c&&(r.__=[a?a(t):st(void 0,t),function(c){var d=r.__N?r.__N[0]:r.__[0],u=r.t(d,c);d!==u&&(r.__N=[u,r.__[1]],r.__c.setState({}))}],r.__c=k,!k.__f)){var i=function(c,d,u){if(!r.__c.__H)return!0;var h=!1,f=r.__c.props!==c;if(r.__c.__H.__.some(function(p){if(p.__N){h=!0;var g=p.__[0];p.__=p.__N,p.__N=void 0,g!==p.__[0]&&(f=!0)}}),o){var s=o.call(this,c,d,u);return h?s||f:s}return!h||f};k.__f=!0;var o=k.shouldComponentUpdate,l=k.componentWillUpdate;k.componentWillUpdate=function(c,d,u){if(this.__e){var h=o;o=void 0,i(c,d,u),o=h}l&&l.call(this,c,d,u)},k.shouldComponentUpdate=i}return r.__N||r.__}function J(e,t){var a=X(W++,3);!S.__s&&qe(a.__H,t)&&(a.__=e,a.u=t,k.__H.__h.push(a))}function O(e,t){var a=X(W++,4);!S.__s&&qe(a.__H,t)&&(a.__=e,a.u=t,k.__h.push(a))}function C(e){return de=5,$t(function(){return{current:e}},[])}function $t(e,t){var a=X(W++,7);return qe(a.__H,t)&&(a.__=e(),a.__H=t,a.__h=e),a.__}function I(){var e=X(W++,11);if(!e.__){for(var t=k.__v;t!==null&&!t.__m&&t.__!==null;)t=t.__;var a=t.__m||(t.__m=[0,0]);e.__="P"+a[0]+"-"+a[1]++}return e.__}function Mt(){for(var e;e=ot.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(ue),t.__h.some(xe),t.__h=[]}catch(a){t.__h=[],S.__e(a,e.__v)}}}S.__b=function(e){k=null,Ye&&Ye(e)},S.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),nt&&nt(e,t)},S.__r=function(e){Ze&&Ze(e),W=0;var t=(k=e.__c).__H;t&&(ye===k?(t.__h=[],k.__h=[],t.__.some(function(a){a.__N&&(a.__=a.__N),a.u=a.__N=void 0})):(t.__h.some(ue),t.__h.some(xe),t.__h=[],W=0)),ye=k},S.diffed=function(e){et&&et(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(ot.push(t)!==1&&Je===S.requestAnimationFrame||((Je=S.requestAnimationFrame)||Dt)(Mt)),t.__H.__.some(function(a){a.u&&(a.__H=a.u,a.u=void 0)})),ye=k=null},S.__c=function(e,t){t.some(function(a){try{a.__h.some(ue),a.__h=a.__h.filter(function(r){return!r.__||xe(r)})}catch(r){t.some(function(i){i.__h&&(i.__h=[])}),t=[],S.__e(r,a.__v)}}),tt&&tt(e,t)},S.unmount=function(e){at&&at(e);var t,a=e.__c;a&&a.__H&&(a.__H.__.some(function(r){try{ue(r)}catch(i){t=i}}),a.__H=void 0,t&&S.__e(t,a.__v))};var rt=typeof requestAnimationFrame=="function";function Dt(e){var t,a=function(){clearTimeout(r),rt&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(a,35);rt&&(t=requestAnimationFrame(a))}function ue(e){var t=k,a=e.__c;typeof a=="function"&&(e.__c=void 0,a()),k=t}function xe(e){var t=k;e.__c=e.__(),k=t}function qe(e,t){return!e||e.length!==t.length||t.some(function(a,r){return a!==e[r]})}function st(e,t){return typeof t=="function"?t(e):t}var it=`/*
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
`;var It=new URL(".",document.currentScript.src),we=class extends Error{constructor(t,a){super(a.message??`The request failed with status ${t}.`),this.data=a}};function Ut(){let e=document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);return e?decodeURIComponent(e[1]):""}function ke(e){return new URL(e,It).toString()}async function T(e,{method:t="GET",body:a}={}){let r=await fetch(ke(e),{method:t,credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json","X-XSRF-TOKEN":Ut()},body:a&&JSON.stringify(a)}),i=await r.json().catch(()=>({}));if(!r.ok)throw new we(r.status,i);return i}function P(e){let t=Object.values(e.data?.errors??{});return t.length>0?t[0][0]:e.message}var Ft=0;function n(e,t,a,r,i,o){t||(t={});var l,c,d=t;if("ref"in d)for(c in d={},t)c=="ref"?l=t[c]:d[c]=t[c];var u={type:e,props:d,key:a,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Ft,__i:-1,__u:0,__source:i,__self:o};if(typeof e=="function"&&(l=e.defaultProps))for(c in l)d[c]===void 0&&(d[c]=l[c]);return q.vnode&&q.vnode(u),u}function Y({label:e,ariaLabel:t,focusKey:a,question:r,confirmLabel:i,busyLabel:o,danger:l,disabled:c,triggerClass:d="button secondary",children:u,onConfirm:h}){let[f,s]=y("idle"),p=C(null),g=C(null),m=C(!1),v=I();O(()=>{f==="confirm"&&g.current?.focus(),f==="idle"&&m.current&&(m.current=!1,p.current?.focus())},[f]);let _=()=>{m.current=!0,s("idle")},b=async()=>{s("busy"),await h(),m.current=!0,s("idle")};return f==="idle"?n("button",{ref:p,type:"button",class:d,"aria-label":t,title:t,"data-focus-key":a,disabled:c,onClick:()=>s("confirm"),children:u??e}):n("div",{class:"confirm",role:"group","aria-labelledby":v,onKeyDown:E=>{E.key==="Escape"&&!E.isComposing&&f==="confirm"&&(E.stopPropagation(),_())},children:[n("p",{id:v,class:"confirm-question",children:r}),n("div",{class:"confirm-actions",children:[n("button",{ref:g,type:"button",class:"button secondary",disabled:f==="busy",onClick:_,children:"Cancel"}),n("button",{type:"button",class:`button ${l?"danger":"primary"}`,disabled:f==="busy",onClick:b,children:f==="busy"?o:i})]})]})}var Ht={arrowRight:n(w,{children:[n("path",{d:"M5 12h14"}),n("path",{d:"m12 5 7 7-7 7"})]}),arrowUp:n(w,{children:[n("path",{d:"m5 12 7-7 7 7"}),n("path",{d:"M12 19V5"})]}),check:n("path",{d:"M20 6 9 17l-5-5"}),chevronDown:n("path",{d:"m6 9 6 6 6-6"}),chevronLeft:n("path",{d:"m15 18-6-6 6-6"}),chevronRight:n("path",{d:"m9 18 6-6-6-6"}),listChecks:n(w,{children:[n("path",{d:"m3 17 2 2 4-4"}),n("path",{d:"m3 7 2 2 4-4"}),n("path",{d:"M13 6h8"}),n("path",{d:"M13 12h8"}),n("path",{d:"M13 18h8"})]}),mail:n(w,{children:[n("rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}),n("path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"})]}),search:n(w,{children:[n("circle",{cx:"11",cy:"11",r:"8"}),n("path",{d:"m21 21-4.3-4.3"})]}),trash:n(w,{children:[n("path",{d:"M3 6h18"}),n("path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}),n("path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"})]}),users:n(w,{children:[n("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),n("circle",{cx:"9",cy:"7",r:"4"}),n("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),n("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]}),x:n(w,{children:[n("path",{d:"M18 6 6 18"}),n("path",{d:"m6 6 12 12"})]})};function R({name:e,size:t=16}){return n("svg",{class:"icon",width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",focusable:"false",children:Ht[e]})}function lt(e,t,a){try{return JSON.parse(e.getItem(`nitpick.${t}`))??a}catch{return a}}function ct(e,t,a){try{if(a===null){e.removeItem(`nitpick.${t}`);return}e.setItem(`nitpick.${t}`,JSON.stringify(a))}catch{}}var Se={read:(e,t)=>lt(localStorage,e,t),write:(e,t)=>ct(localStorage,e,t)},V={read:(e,t)=>lt(sessionStorage,e,t),write:(e,t)=>ct(sessionStorage,e,t)};function Z(e){V.write("focus",e),location.reload()}function F({name:e,ready:t,children:a}){let r=C(null),i=C(!1);return O(()=>{if(!t||i.current)return;i.current=!0,r.current.scrollTop=V.read(`scroll.${e}`,0);let l=V.read("focus",null);if(l===null)return;V.write("focus",null);let c=r.current.getRootNode();c.querySelector(`[data-focus-key="${CSS.escape(l)}"]`)?.focus({preventScroll:!0}),c.activeElement||c.querySelector('[role="tab"][aria-selected="true"]')?.focus({preventScroll:!0})},[t]),n("div",{ref:r,class:"scroller","data-ready":t,onScroll:()=>{i.current&&r.current&&V.write(`scroll.${e}`,r.current.scrollTop)},children:a})}var Ce="Start a round to record results and nits";function ee(e,t){return t==="guest"?"Guest":e.personas.find(a=>a.key===t)?.label??t}function Ot({failure:e}){return n("div",{role:"alert",class:"failure",children:[n("p",{class:"text",children:e.message}),e.output&&n("pre",{class:"output",children:e.output})]})}function ut({scenario:e,persona:t,current:a,focusKey:r,onFailure:i}){let[o,l]=y(!1),c=async()=>{l(!0);try{await T("login",{method:"POST",body:{scenario:e.slug,persona:t}}),Z(r)}catch(h){i({message:P(h)}),l(!1)}},d=t==="guest"?"Log out":`Log in as ${ee(e,t)}`,u=t==="guest"?"Log out":"Log in";return a&&(u="Current"),n("button",{type:"button",class:"button secondary","aria-label":d,title:d,"data-focus-key":r,disabled:o||a,onClick:c,children:u})}function jt({scenario:e,persona:t,focusKey:a,onFailure:r}){let i=t==="guest"?"Reset, logged out":`Reset as ${ee(e,t)}`,o=t==="guest"?"Reset the database and stay logged out?":`Reset the database and log in as ${ee(e,t)}?`;return n(Y,{label:"Reset",ariaLabel:i,focusKey:a,question:o,confirmLabel:"Reset",busyLabel:"Resetting\u2026",danger:!0,onConfirm:async()=>{r(null);try{await T("reset",{method:"POST",body:{scenario:e.slug,persona:t}}),Z(a)}catch(c){r({message:P(c),output:c.data?.output})}}})}var dt=Promise.resolve();function Te(e){let t=dt.then(e);return dt=t.catch(()=>{}),t}async function pt(e,t,a){return(await Te(()=>T(`rounds/${e.round.id}/nits`,{method:"POST",body:{item_key:t,body:a,url:location.href}}))).round}function zt({round:e,itemKey:t,label:a,inputRef:r,onRoundChange:i}){let[o,l]=y(""),[c,d]=y(!1),[u,h]=y(null),f=I();return n("form",{class:"nit-field",onSubmit:async p=>{if(p.preventDefault(),o.trim()!==""){d(!0),h(null);try{i(await pt(e,t,o)),l("")}catch(g){h(P(g))}d(!1),r.current?.focus()}},children:[n("label",{class:"visually-hidden",for:f,children:a}),n("input",{ref:r,id:f,class:"input",type:"text",autocomplete:"off",maxLength:2e3,placeholder:"Add a nit\u2026",title:e===null?Ce:void 0,value:o,readOnly:c,disabled:e===null,onInput:p=>l(p.currentTarget.value)}),u&&n("p",{role:"alert",class:"text error",children:u})]})}function Ee({round:e,nits:t,onRoundChange:a}){if(t.length===0)return null;let r=i=>async()=>{let o=await Te(()=>T(`rounds/${e.round.id}/nits/${i.id}`,{method:"DELETE"}));a(o.round)};return n("ul",{class:"nits",children:t.map(i=>n("li",{class:"nit",children:[n("p",{class:"nit-body",children:[i.body,"\xA0",n("code",{class:"nit-path muted",children:["(",i.url,")"]})]}),n(Y,{ariaLabel:`Delete the nit: ${i.body}`,question:"Delete this nit?",confirmLabel:"Delete",busyLabel:"Deleting\u2026",danger:!0,triggerClass:"button icon-button",onConfirm:r(i),children:n(R,{name:"trash"})})]},i.id))})}var Bt={untested:"pass",pass:"fail",fail:"untested"},Wt={untested:"press to mark passed",pass:"press to mark failed",fail:"press to clear"},ft={untested:"not tested",pass:"passed",fail:"failed"},pe={pass:"check",fail:"x"};function Kt(e){return e===1?"1 nit":`${e} nits`}function Vt({scenario:e,item:t,round:a,result:r,onRoundChange:i}){let[o,l]=y(null),[c,d]=y(!1),[u,h]=y(null),f=C(null),s=C(!1),p=C(!1),g=C(null),m=I(),v=r?.nits??[],_=o??r?.status??"untested",b=Bt[_];O(()=>{c&&p.current&&(p.current=!1,g.current?.focus())},[c]);let L=async()=>{let N=null;try{let $=await Te(()=>{s.current=!1,N=f.current;let A=`rounds/${a.round.id}/results/${encodeURIComponent(t.key)}`;return N==="untested"?T(A,{method:"DELETE"}):T(A,{method:"PUT",body:{status:N}})});i($.round)}catch($){h(P($))}f.current===N&&l(null)},E=()=>{f.current=b,l(b),h(null),b==="fail"&&c&&g.current?.focus(),b==="fail"&&!c&&(p.current=!0,d(!0)),b==="untested"&&v.length===0&&d(!1),s.current||(s.current=!0,L())};return n("li",{class:"item","data-status":_,children:[n("div",{class:"item-row",children:[n("button",{type:"button",class:"box","data-status":_,"aria-label":`${t.text}, ${ft[_]}, ${Wt[_]}`,title:a===null?Ce:void 0,disabled:a===null,onClick:E,children:n("span",{class:"box-glyph",children:pe[_]&&n(R,{name:pe[_],size:12})})}),n("button",{type:"button",class:"item-toggle","aria-expanded":c,"aria-controls":m,onClick:()=>d(!c),children:[n("span",{class:"check-text",children:t.text}),(t.setup||v.length>0)&&n("span",{class:"item-meta",children:[t.setup,t.setup&&v.length>0&&" \xB7 ",v.length>0&&n("span",{class:"nit-count",children:Kt(v.length)})]})]}),t.url&&n("a",{class:"goto",href:t.url,"aria-label":`Go to ${t.url}`,title:`Go to ${t.url}`,children:n(R,{name:"arrowRight"})})]}),u&&n("p",{role:"alert",class:"text error item-error",children:u}),n("div",{id:m,class:"details",hidden:!c,children:[a&&n(Ee,{round:a,nits:v,onRoundChange:i}),n(zt,{round:a,itemKey:t.key,label:`Nit on: ${t.text}`,inputRef:g,onRoundChange:i})]})]})}function Gt({scenario:e,group:t,index:a,Heading:r,currentEmail:i,itemProps:o}){let[l,c]=y(null),d=t.type==="section",u=d?t.persona:t.items[0].persona,h=f=>({scenario:e,persona:f,current:f!=="guest"&&Qt(e,f)===i,focusKey:`login:${a}:${f}`,onFailure:c});return n("section",{class:"group",children:[n("div",{class:"group-header",children:[n(r,{class:"group-title",children:d?ee(e,t.persona):t.title}),d&&n(ut,{...h(t.persona)}),n(jt,{scenario:e,persona:u,focusKey:`reset:${a}`,onFailure:c})]}),l&&n(Ot,{failure:l}),n("ol",{class:"items",children:t.items.map((f,s)=>n(w,{children:[!d&&f.persona!==t.items[s-1]?.persona&&n("li",{class:"handoff-step",children:[n("p",{class:"text muted",children:["As ",ee(e,f.persona)]}),n(ut,{...h(f.persona)})]}),n(Vt,{scenario:e,item:f,...o(f)})]},f.key))})]})}function Qt(e,t){return e.personas.find(a=>a.key===t)?.email}function Xt({round:e,onRoundChange:t}){let{results:a,nits:r}=e.orphaned,i=[...new Set([...a.map(o=>o.item_key),...r.map(o=>o.item_key)])].sort();return i.length===0?null:n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Orphaned"})}),n("ul",{class:"items",children:i.map(o=>{let l=a.find(d=>d.item_key===o)?.status??"untested",c=r.filter(d=>d.item_key===o);return n("li",{class:"item",children:[n("div",{class:"item-row",children:[n("span",{class:"box","data-status":l,children:[n("span",{class:"box-glyph",children:pe[l]&&n(R,{name:pe[l],size:12})}),n("span",{class:"visually-hidden",children:ft[l]})]}),n("p",{class:"item-toggle",children:n("code",{class:"check-text",children:o})})]}),c.length>0&&n("div",{class:"details",children:n(Ee,{round:e,nits:c,onRoundChange:t})})]},o)})})]})}function Jt({round:e,onRoundChange:t}){let[a,r]=y(""),[i,o]=y(!1),[l,c]=y(null),d=C(null),u=I();return n("form",{class:"composer",onSubmit:async f=>{f.preventDefault(),o(!0),c(null);try{t(await pt(e,null,a)),r("")}catch(s){c(P(s))}o(!1),d.current?.focus()},children:[l&&n("p",{role:"alert",class:"text error",children:l}),n("div",{class:"composer-field",children:[n("label",{class:"visually-hidden",for:u,children:"Page nit"}),n("input",{ref:d,id:u,class:"composer-input",type:"text",autocomplete:"off",maxLength:2e3,placeholder:"Note something on this page\u2026",title:e===null?Ce:void 0,value:a,readOnly:i,disabled:e===null,onInput:f=>r(f.currentTarget.value)}),n("button",{type:"submit",class:"send","aria-label":"Add page nit",title:"Add page nit",disabled:i||e===null||a.trim()==="",children:n(R,{name:"arrowUp"})})]})]})}function ht({scenarios:e,scenario:t,round:a,ready:r,nextNumber:i,currentEmail:o,onRoundChange:l}){if(e!==null&&t===null)return n(F,{name:"checklist",ready:!0,children:n("p",{class:"text",children:["There are no scenarios yet. Make one with ",n("code",{children:"php artisan make:nitpick-scenario Name"}),"."]})});if(!r)return n(F,{name:"checklist",ready:!1});let c=a?.round.number??i,d=a===null||a.round.scenario===t.slug,u=t.groups.filter(s=>d&&(s.retest===null||s.retest===c)),h=new Map((a?.groups??[]).flatMap(s=>s.items).map(s=>[s.key,s])),f=s=>({round:a,result:h.get(s.key),onRoundChange:l});return n(w,{children:[n(F,{name:"checklist",ready:!0,children:n("div",{class:"stack",children:[u.map((s,p)=>{let g=s.retest!==null&&s.retest!==u[p-1]?.retest;return n(w,{children:[g&&n("h3",{class:"retest",children:["Retest ",s.retest]}),n(Gt,{scenario:t,group:s,index:p,Heading:s.retest===null?"h3":"h4",currentEmail:o,itemProps:f})]},p)}),n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Page nits"})}),n("div",{class:"panel-card",children:a&&a.page_nits.length>0?n(Ee,{round:a,nits:a.page_nits,onRoundChange:l}):n("p",{class:"text muted",children:"A page nit is a note on the page, not on an item. Add one below."})})]}),a&&n(Xt,{round:a,onRoundChange:l})]})}),n(Jt,{round:a,onRoundChange:l})]})}function _t(e){return new Date(e.sent_at).toLocaleString([],{dateStyle:"short",timeStyle:"short"})}function Yt(e){let t=new Date(e.sent_at);return t.toDateString()===new Date().toDateString()?t.toLocaleTimeString([],{timeStyle:"short"}):t.toLocaleDateString([],{dateStyle:"short"})}function Zt({mail:e,onBack:t}){return n("div",{class:"stack",children:[n("div",{children:n("button",{type:"button",class:"button secondary back",onClick:t,children:[n(R,{name:"chevronLeft"}),"All mail"]})}),n("div",{class:"panel-card",children:[n("h3",{class:"item-text",children:e.subject||"-"}),n("p",{class:"text muted",children:["To ",e.to," at ",_t(e)]})]}),n("iframe",{class:"mail-frame",sandbox:"",title:`Mail: ${e.subject}`,src:ke(`mails/${e.id}`)}),n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Links"})}),n("div",{class:"panel-card",children:e.links.length===0?n("p",{class:"text muted",children:"The mail has no links."}):n("ul",{class:"links",children:e.links.map(a=>n("li",{children:n("a",{class:"link",href:a,children:a})},a))})})]})]})}function mt(){let[e,t]=y(null),[a,r]=y(null),[i,o]=y(!1),[l,c]=y(null),[d,u]=y(null),[h,f]=y(null),s=()=>Promise.all([T("mails"),T("queue")]).then(([m,v])=>{t(m.data),r(v.size)}).catch(m=>{t([]),f(P(m))});J(()=>{s()},[]);let p=async()=>{o(!0),c(null),f(null);try{let m=await T("queue",{method:"POST"});m.exit_code!==0&&c(m.output),await s()}catch(m){f(P(m))}o(!1)};return d?n(F,{name:"mail-open",ready:!0,children:n(Zt,{mail:d,onBack:()=>u(null)})},"mail-open"):n(F,{name:"mail",ready:e!==null,children:n("div",{class:"stack",children:[n("div",{class:"panel-card queue",children:[n("p",{class:"text","aria-live":"polite",children:[n("span",{class:"figure",children:a??"-"})," queued ",a===1?"job":"jobs"]}),n("button",{type:"button",class:"button light",disabled:i,onClick:p,children:i?"Running\u2026":"Run queue"})]}),h&&n("p",{role:"alert",class:"text error",children:h}),l&&n("div",{role:"alert",class:"failure",children:[n("p",{class:"text",children:"The queue worker failed."}),n("pre",{class:"output",children:l})]}),e?.length===0&&n("p",{class:"text muted",children:"No mail yet. A queued mail shows here after Run queue."}),e?.length>0&&n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Captured mail"})}),n("ul",{class:"rows",children:e.map(m=>n("li",{children:n("button",{type:"button",class:"row",onClick:()=>u(m),children:[n("span",{class:"row-text",children:[n("span",{class:"row-title",children:m.subject||"-"}),n("span",{class:"row-meta",children:[m.to," \xB7"," ",n("time",{dateTime:m.sent_at,title:_t(m),children:Yt(m)})]})]}),n(R,{name:"chevronRight"})]})},m.id))})]})]})},"mail")}function gt({rows:e,currentEmail:t,busy:a,onLogIn:r}){return n("ul",{class:"rows",children:e.map(i=>{let o=i.name||i.email,l=i.email===t;return n("li",{class:"row","data-current":l,children:[n("span",{class:"avatar","aria-hidden":"true",children:o.charAt(0).toUpperCase()}),n("span",{class:"row-text",children:[n("span",{class:"row-title",children:i.name||"-"}),n("span",{class:"row-meta",children:i.email})]}),n("button",{type:"button",class:"button secondary","aria-label":`Log in as ${o}`,title:`Log in as ${o}`,"data-focus-key":`login:${i.email}`,disabled:a||l,onClick:()=>r(i.body,`login:${i.email}`),children:l?"Current":"Log in"})]},i.email)})})}function vt({scenarios:e,scenario:t,user:a}){let[r,i]=y(!1),[o,l]=y(null),[c,d]=y(null),u=C(null),h=I(),f=async(m,v)=>{i(!0),l(null);try{await T("login",{method:"POST",body:m}),Z(v)}catch(_){l(P(_)),i(!1)}},s=m=>{let v=m.currentTarget.value.trim();if(clearTimeout(u.current),v===""){d(null);return}u.current=setTimeout(()=>{T(`users?search=${encodeURIComponent(v)}`).then(_=>d(_.data)).catch(_=>l(P(_)))},200)},p=(t?.personas??[]).map(m=>({name:m.label,email:m.email,body:{scenario:t.slug,persona:m.key}})),g=(c??[]).map(m=>({...m,body:{email:m.email}}));return n(F,{name:"personas",ready:e!==null,children:n("div",{class:"stack",children:[o&&n("p",{role:"alert",class:"text error",children:o}),n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Personas"})}),e?.length===0&&n("p",{class:"text muted",children:"There are no scenarios yet."}),p.length>0&&n(gt,{rows:p,currentEmail:a?.email,busy:r,onLogIn:f})]}),n("section",{class:"group",children:[n("div",{class:"group-header",children:n("h3",{class:"group-title",children:"Find a user"})}),n("div",{class:"search",children:[n(R,{name:"search"}),n("label",{class:"visually-hidden",for:h,children:"Find a user by email or name"}),n("input",{id:h,class:"search-input",type:"search",autocomplete:"off",onInput:s})]}),c?.length===0&&n("p",{class:"text muted",children:"No user matches."}),c?.length>0&&n(gt,{rows:g,currentEmail:a?.email,busy:r,onLogIn:f})]}),n("div",{children:n("button",{type:"button",class:"button secondary","data-focus-key":"logout",disabled:r||!a||!t,onClick:()=>f({scenario:t?.slug,persona:"guest"},"logout"),children:a?"Log out":"Logged out"})})]})})}var Le="Alt+Shift+Q",G=[{key:"checklist",label:"Checklist",icon:"listChecks"},{key:"mail",label:"Mail",icon:"mail"},{key:"personas",label:"Personas",icon:"users"}];function Re(e,t){let[a,r]=y(()=>Se.read(e,t));return[a,o=>{r(o),Se.write(e,o)}]}function ea(e){return!e.isComposing&&e.altKey&&e.shiftKey&&!e.ctrlKey&&!e.metaKey&&e.code==="KeyQ"}function ta(e){return e instanceof HTMLElement&&(e.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(e.tagName))}function aa({scenarios:e,scenario:t,round:a,nextNumber:r,onSelectScenario:i,onRoundChange:o}){let[l,c]=y(!1),[d,u]=y(null),[h,f]=y([]),s=I(),p=async()=>{c(!0),u(null);try{let _=await T("rounds",{method:"POST",body:{scenario:t.slug}});f([]),o(_.round)}catch(_){u(P(_))}c(!1)},g=async()=>{u(null);try{let _=await T(`rounds/${a.round.id}`,{method:"PATCH",body:{status:"closed"}});f(_.reports),o(null)}catch(_){u(P(_))}},m=a===null&&e?.length>1,v=e===null?"Loading\u2026":"No scenarios yet";return a!==null?v=`Round ${a.round.number} \xB7 open`:t!==null&&(v=`Round ${r} \xB7 not started`),n("header",{class:"card-header",children:[n("div",{class:"header-row",children:[n("div",{class:"header-title",children:[m?n("div",{class:"picker",children:[n("label",{class:"visually-hidden",for:s,children:"Scenario"}),n("select",{id:s,class:"picker-select",value:t.slug,onChange:_=>i(_.currentTarget.value),children:e.map(_=>n("option",{value:_.slug,children:_.title},_.slug))}),n(R,{name:"chevronDown"})]}):n("h2",{class:"title",children:a?.round.title??t?.title??"Nitpick"}),n("p",{class:"subtitle","data-round":a===null?"none":"open",children:v})]}),a===null?n("button",{type:"button",class:"button light",disabled:l||t===null,onClick:p,children:"Start round"}):n(Y,{label:"Close round",question:`Close round ${a.round.number} and write the report?`,confirmLabel:"Close round",busyLabel:"Closing\u2026",onConfirm:g})]}),d&&n("p",{role:"alert",class:"note error",children:d}),n("div",{role:"status",children:h.length>0&&n("p",{class:"note",children:["Report written to"," ",h.map(_=>n("code",{children:_},_))]})})]})}function na(){let[e,t]=Re("open",!1),[a,r]=Re("tab","checklist"),[i,o]=Re("scenario",null),[l,c]=y(null),[d,u]=y(null),[h,f]=y(!1),[s,p]=y({}),[g,m]=y(void 0),v=C(null),_=C(null),b=C(!1),L=C(!1),E=()=>T("user").then(x=>m(x.user)),N=()=>T("round").then(x=>{u(x.round),p(x.next_numbers),f(!0)}),$=x=>{u(x),x===null&&N()},A=x=>{t(!e),L.current=!e,b.current=!e&&x,e&&v.current?.focus()},j=x=>{x.key==="Escape"&&e&&!x.isComposing&&A(!1)};O(()=>{e&&b.current&&(b.current=!1,_.current?.querySelector('[aria-selected="true"]')?.focus())},[e]),J(()=>{T("scenarios").then(x=>c(x.data)),E(),N()},[]);let K=C(A);K.current=A,J(()=>{let x=z=>{!ea(z)||ta(z.composedPath()[0])||(z.preventDefault(),K.current(!0))};return document.addEventListener("keydown",x),document.addEventListener("inertia:navigate",E),document.addEventListener("livewire:navigated",E),()=>{document.removeEventListener("keydown",x),document.removeEventListener("inertia:navigate",E),document.removeEventListener("livewire:navigated",E)}},[]);let M=d?.round.scenario??i,D=l?.find(x=>x.slug===M)??l?.[0]??null,bt=D?.personas.find(x=>x.email===g?.email),yt=g===void 0?"":bt?.label??g?.email??"Guest",Pe=s[D?.slug]??1,xt=x=>{let z=G.findIndex(qt=>qt.key===a),$e={ArrowRight:1,ArrowLeft:G.length-1,Home:-z,End:G.length-1-z};if(!(x.key in $e))return;x.preventDefault();let Me=G[(z+$e[x.key])%G.length];r(Me.key),_.current.querySelector(`#qa-tab-${Me.key}`).focus()};return n(w,{children:[e&&n("section",{id:"qa-card",class:"card","aria-label":"Nitpick","data-enter":L.current,"data-loading":l===null||!h,onKeyDown:j,children:[n(aa,{scenarios:l,scenario:D,round:d,nextNumber:Pe,onSelectScenario:o,onRoundChange:$}),n("div",{id:"qa-tabpanel",role:"tabpanel","aria-labelledby":`qa-tab-${a}`,class:"view",children:[a==="checklist"&&n(ht,{scenarios:l,scenario:D,round:d,ready:l!==null&&h,nextNumber:Pe,currentEmail:g?.email,onRoundChange:$}),a==="mail"&&n(mt,{}),a==="personas"&&n(vt,{scenarios:l,scenario:D,user:g})]}),n("div",{ref:_,role:"tablist","aria-label":"Nitpick",class:"tabbar",onKeyDown:xt,children:G.map(x=>n("button",{id:`qa-tab-${x.key}`,type:"button",role:"tab",class:"tab","aria-selected":x.key===a,"aria-controls":"qa-tabpanel",tabIndex:x.key===a?0:-1,onClick:()=>r(x.key),children:[n(R,{name:x.icon}),x.label]},x.key))})]}),n("button",{ref:v,type:"button",class:"pill","data-open":e,"aria-expanded":e,"aria-controls":"qa-card","aria-label":e?"Close Nitpick":void 0,"aria-keyshortcuts":Le,title:e?`Close (${Le})`:`Nitpick (${Le})`,onClick:()=>A(!1),onKeyDown:j,children:e?n(R,{name:"x",size:20}):n(w,{children:[n("span",{class:"pill-brand",children:"QA"}),n("span",{class:"pill-separator","aria-hidden":"true",children:"\xB7"}),n("span",{class:"pill-name",children:yt}),d&&n("span",{class:"pill-round",title:`Round ${d.round.number} is open`,children:["R",d.round.number]}),n(R,{name:"chevronRight"})]})})]})}var Ne=class extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;let t=this.attachShadow({mode:"open"}),a=document.createElement("style"),r=document.createElement("div");a.textContent=it,r.className="root",t.append(a,r),Xe(n(na,{}),r)}};customElements.get("nitpick-panel")||customElements.define("nitpick-panel",Ne);document.querySelector("nitpick-panel")||document.documentElement.append(document.createElement("nitpick-panel"));})();
