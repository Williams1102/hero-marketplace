(this["webpackJsonpmarketplace-game-nfts"]=this["webpackJsonpmarketplace-game-nfts"]||[]).push([[2],{1055:function(t,e,r){"use strict";var n=r(0),a=r.n(n),c=r(13),s=r(947),u=r(151),i=r(2),o=r(1122),p=r(1045),f=r(990),l=r(1053),d=r(1084),h=r(1046),b=r(250),v=(r(951),r(957)),j=r(249),x=r(949),O=r(68),m=r(153);function w(t,e){return g.apply(this,arguments)}function g(){return(g=Object(c.a)(a.a.mark((function t(e,r){var n,c,s,u,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=Object(O.r)(r),c=n.UPGRADE_START_ABI,s=Object(O.s)(r)){t.next=4;break}return t.abrupt("return",null);case 4:return t.next=6,e(s,c);case 6:return u=t.sent,i=u.contract,t.abrupt("return",i);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function k(t,e){return y.apply(this,arguments)}function y(){return(y=Object(c.a)(a.a.mark((function t(e,r){var n,c,s,u,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=Object(O.m)(r),c=n.KABY_TOKEN_ABI,s=Object(O.n)(r),t.next=4,e(s,c);case 4:return u=t.sent,i=u.contract,t.abrupt("return",i);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function S(t){return A.apply(this,arguments)}function A(){return(A=Object(c.a)(a.a.mark((function t(e){var r,n,c,s,u,i,o,p,f;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(b.a)();case 3:return r=t.sent,n=r.web3,c=r.account,s=r.chainId,u=r.getContractAsync,t.next=10,w(u,s);case 10:return i=t.sent,o=null===i||void 0===i?void 0:i.methods.upgradeStarForHero(e).encodeABI(),p={from:null===c||void 0===c?void 0:c.toString(),to:null===i||void 0===i?void 0:i.options.address,data:o,value:"0x00"},t.next=15,n.eth.sendTransaction(p);case 15:return f=t.sent,t.abrupt("return",Object(m.b)(f));case 19:return t.prev=19,t.t0=t.catch(0),t.abrupt("return",Object(m.a)(t.t0.message));case 22:case"end":return t.stop()}}),t,null,[[0,19]])})))).apply(this,arguments)}function R(t){return N.apply(this,arguments)}function N(){return(N=Object(c.a)(a.a.mark((function t(e){var r,n,c,s,u,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(b.a)();case 2:return r=t.sent,n=r.chainId,c=r.getContractAsync,t.next=7,w(c,n);case 7:return s=t.sent,u=Number(e)-1,t.next=11,null===s||void 0===s?void 0:s.methods.payAmountForUpStar(u).call();case 11:return i=t.sent,t.abrupt("return",Number(i));case 13:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function E(){return(E=Object(c.a)(a.a.mark((function t(){var e,r,n,c,s,u,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(b.a)();case 2:return e=t.sent,r=e.account,n=e.chainId,c=e.getContractAsync,t.next=8,k(c,n);case 8:return s=t.sent,u=Object(O.s)(n),t.next=12,null===s||void 0===s?void 0:s.methods.allowance(r,u).call();case 12:return i=t.sent,t.abrupt("return",Number(i));case 14:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function I(){return B.apply(this,arguments)}function B(){return(B=Object(c.a)(a.a.mark((function t(){var e,r,n,c,s,u,i,o,p,f,l;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e="0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",t.next=4,Object(b.a)();case 4:return r=t.sent,n=r.web3,c=r.account,s=r.chainId,u=r.getContractAsync,t.next=11,k(u,s);case 11:return i=t.sent,o=Object(O.s)(s),t.next=15,null===i||void 0===i?void 0:i.methods.approve(o,e).encodeABI();case 15:return p=t.sent,f={from:null===c||void 0===c?void 0:c.toString(),to:null===i||void 0===i?void 0:i.options.address,data:p,value:"0x00"},t.next=19,n.eth.sendTransaction(f);case 19:return l=t.sent,t.abrupt("return",Object(m.b)(l));case 23:return t.prev=23,t.t0=t.catch(0),t.abrupt("return",Object(m.a)(t.t0.message));case 26:case"end":return t.stop()}}),t,null,[[0,23]])})))).apply(this,arguments)}var C=r(968),M=function(){var t=Object(c.a)(a.a.mark((function t(e){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,C.a.post("upgrade-star",e);case 3:return r=t.sent,t.abrupt("return",r);case 7:throw t.prev=7,t.t0=t.catch(0),t.t0;case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}(),P=r(950),F=r(25),U=function(t){var e=t.showModal,r=Object(i.useContext)(P.b);return Object(i.useEffect)((function(){r.setIsModalOpen(e)}),[e]),Object(F.jsx)(o.a,{centered:!0,show:e,backdrop:"static",keyboard:!1,className:"modal-chose-wallet",children:Object(F.jsxs)("div",{className:"custom-popup",children:[Object(F.jsx)(o.a.Header,{children:Object(F.jsx)(o.a.Title,{children:" "})}),Object(F.jsx)(o.a.Body,{children:Object(F.jsx)(p.a,{children:Object(F.jsxs)(f.a,{className:"d-flex justify-content-center",children:[Object(F.jsx)("div",{children:Object(F.jsx)(h.a,{as:"div",animation:"border",size:"sm",role:"status","aria-hidden":"true",variant:"light",className:"spinner-loading"})}),Object(F.jsx)("div",{children:"Loading..."})]})})})]})})};e.a=function(t){var e=t.showModal,r=t.handleCloseModal,n=t.heroId,m=t.heroStar,w=t.handleStarUpgrade,g=Object(u.c)(),k=g.chainId,y=g.account,A=Object(i.useState)(null),N=Object(s.a)(A,2),B=N[0],C=N[1],q=Object(i.useState)(0),T=Object(s.a)(q,2),H=T[0],_=T[1],z=Object(i.useState)(null),D=Object(s.a)(z,2),G=D[0],K=D[1],L=Object(i.useState)(0),V=Object(s.a)(L,2),Y=V[0],J=V[1],W=Object(i.useContext)(P.b);Object(i.useEffect)((function(){W.setIsModalOpen(e)}),[e]),Object(i.useEffect)((function(){if(m&&n){var t=function(){var t=Object(c.a)(a.a.mark((function t(){var e,r,n,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(b.a)();case 2:return e=t.sent,r=e.getTokenBalance,t.next=6,r(y);case 6:return n=t.sent,et(Number(n.kabyBalance)||0),t.next=10,R(m);case 10:(c=t.sent)&&_(c);case 12:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();(function(){var t=Object(c.a)(a.a.mark((function t(){var e,r,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=O.t[k],r={networkId:e,heroId:n},t.next=4,M(r);case 4:"success"===(c=t.sent).status?(console.log(c.data),K(c.data)):(K({}),j.b.error(x.a.ERROR.default));case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()(),t(),function(){return E.apply(this,arguments)}().then((function(t){J(t)}))}}),[y,k,m,n]);var Q=function(){var t=Object(c.a)(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(H>tt)){t.next=2;break}return t.abrupt("return");case 2:if(null===G||void 0===G?void 0:G.couldUpgrade){t.next=4;break}return t.abrupt("return");case 4:return C(v.a.UPGRADE),t.next=7,S(n);case 7:t.sent.success?(j.b.success(x.a.SUCCESS.default),w(),r()):(j.b.error(x.a.ERROR.default),C(null));case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),X=function(){var t=Object(c.a)(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return C(v.a.APPROVE),t.next=3,I();case 3:t.sent.success?(j.b.success(x.a.SUCCESS.default),J(1e23)):j.b.error(x.a.ERROR.default),C(null);case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),Z=Object(i.useState)(0),$=Object(s.a)(Z,2),tt=$[0],et=$[1];return Object(i.useEffect)((function(){y&&k&&function(){var t=Object(c.a)(a.a.mark((function t(e){var r,n,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(b.a)();case 2:return r=t.sent,n=r.getTokenBalance,t.next=6,n(e);case 6:c=t.sent,et(c.kabyBalance);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()(y)}),[k,y]),Object(F.jsxs)(F.Fragment,{children:[!G&&Object(F.jsx)(U,{showModal:!0}),G&&Object(F.jsx)(o.a,{centered:!0,show:e,onHide:r,className:"modal-chose-wallet",children:Object(F.jsxs)("div",{className:"custom-popup",children:[Object(F.jsx)(o.a.Header,{closeButton:!0,children:Object(F.jsx)(o.a.Title,{children:" "})}),Object(F.jsx)(o.a.Body,{children:Object(F.jsx)(p.a,{children:Object(F.jsxs)(f.a,{className:"d-flex flex-column justify-content-between",children:[Object(F.jsxs)("div",{children:[Object(F.jsx)("h4",{className:"upper-case",children:"Upgrade Star"}),Object(F.jsx)(l.a,{children:Object(F.jsx)("div",{children:Object(F.jsxs)(l.a.Text,{id:"text-upgrade-star-001",children:["Would you like to pay ",Object(F.jsxs)("strong",{children:[" ",H," KABY "]})," to upgrade star of your hero?",Object(F.jsx)("br",{}),"After upgrading to the next star, heroes will increase base stats and unlock new skill levels. Later, you must use skill books to level up the skill."]})})})]}),Object(F.jsxs)("div",{className:"divider-end",children:[H>tt&&Object(F.jsx)("div",{className:"error",children:Object(F.jsx)("span",{children:"*Not enough balance KABY"})}),!G.couldUpgrade&&Object(F.jsx)("div",{className:"error",children:Object(F.jsx)("span",{children:"*Hero hasn't reached max level yet"})}),Object(F.jsxs)("div",{className:"d-lg-flex justify-content-end stake-end ",children:[Object(F.jsx)(d.a,{className:"",onClick:function(){r()},variant:"danger",type:"button",children:"CANCEL"}),Object(F.jsx)(d.a,{className:(!(null===G||void 0===G?void 0:G.couldUpgrade)||!H||B)&&"disable",onClick:function(){Y/1e18<H?X():H<=tt&&!B&&Q()},variant:"info",type:"button",children:[v.a.UPGRADE,v.a.APPROVE].includes(B)?Object(F.jsxs)(F.Fragment,{children:[" ",Object(F.jsx)(h.a,{as:"div",animation:"border",size:"sm",role:"status","aria-hidden":"true",className:"spinner-loading"}),"PENDING..."]}):Object(F.jsx)("span",{children:Y/1e18>=H?"UPGRADE":"APPROVE"})})]})]})]})})})]})})]})}},954:function(t,e,r){"use strict";r.d(e,"k",(function(){return u})),r.d(e,"l",(function(){return i})),r.d(e,"e",(function(){return o})),r.d(e,"d",(function(){return p})),r.d(e,"g",(function(){return f})),r.d(e,"c",(function(){return l})),r.d(e,"f",(function(){return d})),r.d(e,"h",(function(){return h})),r.d(e,"i",(function(){return b})),r.d(e,"j",(function(){return v})),r.d(e,"a",(function(){return j})),r.d(e,"m",(function(){return x})),r.d(e,"b",(function(){return O}));var n=r(0),a=r.n(n),c=r(13),s=r(968),u=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("item-list-market",{params:t});case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()},i=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("item-list-wallet",{params:t});case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()},o=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("user_hero_list",{params:t});case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()},p=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("stake-hero-list",{params:t});case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()},f=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("training-exp",{params:t});case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()},l=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("herodetail",{params:t});case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()},d=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("hero/list-offer",{params:t});case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()},h=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("hero/list-sale",{params:t});case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()},b=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("item-market",{params:t});case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()},v=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("item-wallet",{params:t});case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()},j=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.post("buy-item",t);case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()},x=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.post("transfer-to-market",t);case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()},O=function(t){return function(){var e=Object(c.a)(a.a.mark((function e(r,n){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.post("transfer-to-wallet",t);case 3:return c=e.sent,e.abrupt("return",c);case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}()}},959:function(t,e,r){"use strict";e.a=r.p+"static/media/RMSOFq.8323c9.water-icon.png"},960:function(t,e,r){"use strict";e.a=r.p+"static/media/RMSOFq.55a19e.fire-icon.png"},961:function(t,e,r){"use strict";e.a=r.p+"static/media/RMSOFq.da6192.dark-icon.png"},962:function(t,e,r){"use strict";e.a=r.p+"static/media/RMSOFq.1c8682.light-icon.png"},963:function(t,e,r){"use strict";e.a=r.p+"static/media/RMSOFq.d50a26.wind-icon.png"},964:function(t,e,r){"use strict";e.a=r.p+"static/media/RMSOFq.89034e.attack-item.png"},965:function(t,e,r){"use strict";e.a=r.p+"static/media/RMSOFq.90e411.defense-item.png"},966:function(t,e,r){"use strict";e.a=r.p+"static/media/RMSOFq.2ae884.speed-item.png"},967:function(t,e,r){"use strict";e.a=r.p+"static/media/RMSOFq.dab76c.HP-item.png"},968:function(t,e,r){"use strict";var n=r(0),a=r.n(n),c=r(13),s=r(974),u=r.n(s),i=r(975),o=r.n(i),p=u.a.create({baseURL:"https://devapi.kabygame.com/WebApi",headers:{Authorization:localStorage.getItem("token")?"Bearer ".concat(localStorage.getItem("token")):void 0,"content-type":"application/json","Access-Control-Allow-Origin":"*"},paramsSerializer:function(t){return o.a.stringify(t)}});p.interceptors.request.use(function(){var t=Object(c.a)(a.a.mark((function t(e){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(r=localStorage.getItem("token"))&&(e.headers={Authorization:"Bearer ".concat(r)}),t.abrupt("return",e);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),(function(t){return Promise.reject(t)})),p.interceptors.response.use((function(t){return t.data?t.data:t}),(function(t){var e=t.response&&t.response.data&&t.response.data||t;return Promise.reject(e)})),e.a=p}}]);
//# sourceMappingURL=YEv5XG.bab2e4.2.chunk.js.map