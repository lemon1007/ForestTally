import{bz as b,by as E,bs as y,bo as S,bD as L,bZ as M,bE as c,bP as g,bO as x,bH as C,bC as F,bT as T,bU as i}from"./vendor.3d1f4046.js";import{s}from"./index.a6d27080.js";import"./vant.c7f9a482.js";import"./mock.598c5236.js";const A=(r,e)=>{const u=b(),t=b(),d=b(!1),f=E(()=>!u.value||!t.value?null:{x:t.value.x-u.value.x,y:t.value.y-u.value.y}),h=E(()=>{if(!f.value)return"";const{x:a,y:l}=f.value;return Math.abs(a)>Math.abs(l)?a>0?"right":"left":l>0?"down":"up"}),m=a=>{var l,n;(l=e==null?void 0:e.beforeStart)==null||l.call(e,a),d.value=!0,t.value=u.value={x:a.touches[0].screenX,y:a.touches[0].screenY},(n=e==null?void 0:e.afterStart)==null||n.call(e,a)},v=a=>{var l,n;(l=e==null?void 0:e.beforeMove)==null||l.call(e,a),u.value&&(t.value={x:a.touches[0].screenX,y:a.touches[0].screenY},(n=e==null?void 0:e.afterMove)==null||n.call(e,a))},w=a=>{var l,n;(l=e==null?void 0:e.beforeEnd)==null||l.call(e,a),d.value=!1,(n=e==null?void 0:e.afterEnd)==null||n.call(e,a)};return y(()=>{!r.value||(r.value.addEventListener("touchstart",m),r.value.addEventListener("touchmove",v),r.value.addEventListener("touchend",w))}),S(()=>{!r.value||(r.value.removeEventListener("touchstart",m),r.value.removeEventListener("touchmove",v),r.value.removeEventListener("touchend",w))}),{swiping:d,direction:h,distance:f}},R=(r,e)=>{let u,t;return(...d)=>(u||(t=r(...d),u=setTimeout(()=>{u=void 0},e)),t)};function V(r){return typeof r=="function"||Object.prototype.toString.call(r)==="[object Object]"&&!F(r)}const j={welcome1:"/welcome/2",welcome2:"/welcome/3",welcome3:"/welcome/4",welcome4:"/items"},U=L({setup:(r,e)=>{const u=b(),{direction:t,swiping:d}=A(u,{beforeStart:v=>v.preventDefault()}),f=T(),h=i(),m=R(()=>{const v=(f.name||"welcome1").toString();h.push(j[v])},500);return M(()=>{d.value&&t.value==="left"&&m()}),()=>c("div",{class:s.wrapper},[c("header",null,[c("div",{class:s.headerContent},[c("svg",null,[c("use",{"xlink:href":"#tree"},null)]),c("span",{class:s.fontStyle},[g("\u68EE\u6797\u8BB0\u8D26")])])]),c("main",{ref:u},[c(x,{name:"main"},{default:({Component:v,route:w})=>c(C,{enterFromClass:s.slideFadeEnterFrom,enterActiveClass:s.slideFadeEnterActive,leaveToClass:s.slideFadeLeaveTo,leaveActiveClass:s.slideFadeLeaveActive},V(v)?v:{default:()=>[v]})})]),c("footer",null,[c(x,{name:"footer"},null)])])}});export{U as Welcome,U as default};