(this["webpackJsonpmarketplace-game-nfts"]=this["webpackJsonpmarketplace-game-nfts"]||[]).push([[0],{1045:function(e,a,t){"use strict";var r=t(22),l=t(45),s=t(944),i=t.n(s),n=t(2),o=t.n(n),c=t(945),d=["bsPrefix","className","noGutters","as"],u=["xl","lg","md","sm","xs"],f=o.a.forwardRef((function(e,a){var t=e.bsPrefix,s=e.className,n=e.noGutters,f=e.as,m=void 0===f?"div":f,b=Object(l.a)(e,d),v=Object(c.a)(t,"row"),p=v+"-cols",x=[];return u.forEach((function(e){var a,t=b[e];delete b[e];var r="xs"!==e?"-"+e:"";null!=(a=null!=t&&"object"===typeof t?t.cols:t)&&x.push(""+p+r+"-"+a)})),o.a.createElement(m,Object(r.a)({ref:a},b,{className:i.a.apply(void 0,[s,v,n&&"no-gutters"].concat(x))}))}));f.displayName="Row",f.defaultProps={noGutters:!1},a.a=f},1053:function(e,a,t){"use strict";var r=t(22),l=t(45),s=t(944),i=t.n(s),n=t(2),o=t.n(n),c=(t(955),t(956)),d=t(946),u=t(945),f=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],m=o.a.forwardRef((function(e,a){var t=e.id,s=e.bsPrefix,c=e.bsCustomPrefix,m=e.className,b=e.type,v=void 0===b?"checkbox":b,p=e.isValid,x=void 0!==p&&p,O=e.isInvalid,j=void 0!==O&&O,y=e.isStatic,N=e.as,h=void 0===N?"input":N,P=Object(l.a)(e,f),E=Object(n.useContext)(d.a),w=E.controlId,I=E.custom?[c,"custom-control-input"]:[s,"form-check-input"],C=I[0],F=I[1];return s=Object(u.a)(C,F),o.a.createElement(h,Object(r.a)({},P,{ref:a,type:v,id:t||w,className:i()(m,s,x&&"is-valid",j&&"is-invalid",y&&"position-static")}))}));m.displayName="FormCheckInput";var b=m,v=["bsPrefix","bsCustomPrefix","className","htmlFor"],p=o.a.forwardRef((function(e,a){var t=e.bsPrefix,s=e.bsCustomPrefix,c=e.className,f=e.htmlFor,m=Object(l.a)(e,v),b=Object(n.useContext)(d.a),p=b.controlId,x=b.custom?[s,"custom-control-label"]:[t,"form-check-label"],O=x[0],j=x[1];return t=Object(u.a)(O,j),o.a.createElement("label",Object(r.a)({},m,{ref:a,htmlFor:f||p,className:i()(c,t)}))}));p.displayName="FormCheckLabel";var x=p,O=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],j=o.a.forwardRef((function(e,a){var t=e.id,s=e.bsPrefix,f=e.bsCustomPrefix,m=e.inline,v=void 0!==m&&m,p=e.disabled,j=void 0!==p&&p,y=e.isValid,N=void 0!==y&&y,h=e.isInvalid,P=void 0!==h&&h,E=e.feedbackTooltip,w=void 0!==E&&E,I=e.feedback,C=e.className,F=e.style,g=e.title,k=void 0===g?"":g,R=e.type,V=void 0===R?"checkbox":R,T=e.label,L=e.children,z=e.custom,S=e.as,A=void 0===S?"input":S,G=Object(l.a)(e,O),M="switch"===V||z,_=M?[f,"custom-control"]:[s,"form-check"],q=_[0],J=_[1];s=Object(u.a)(q,J);var B=Object(n.useContext)(d.a).controlId,D=Object(n.useMemo)((function(){return{controlId:t||B,custom:M}}),[B,M,t]),H=M||null!=T&&!1!==T&&!L,K=o.a.createElement(b,Object(r.a)({},G,{type:"switch"===V?"checkbox":V,ref:a,isValid:N,isInvalid:P,isStatic:!H,disabled:j,as:A}));return o.a.createElement(d.a.Provider,{value:D},o.a.createElement("div",{style:F,className:i()(C,s,M&&"custom-"+V,v&&s+"-inline")},L||o.a.createElement(o.a.Fragment,null,K,H&&o.a.createElement(x,{title:k},T),(N||P)&&o.a.createElement(c.a,{type:N?"valid":"invalid",tooltip:w},I))))}));j.displayName="FormCheck",j.Input=b,j.Label=x;var y=j,N=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],h=o.a.forwardRef((function(e,a){var t=e.id,s=e.bsPrefix,c=e.bsCustomPrefix,f=e.className,m=e.isValid,b=e.isInvalid,v=e.lang,p=e.as,x=void 0===p?"input":p,O=Object(l.a)(e,N),j=Object(n.useContext)(d.a),y=j.controlId,h=j.custom?[c,"custom-file-input"]:[s,"form-control-file"],P=h[0],E=h[1];return s=Object(u.a)(P,E),o.a.createElement(x,Object(r.a)({},O,{ref:a,id:t||y,type:"file",lang:v,className:i()(f,s,m&&"is-valid",b&&"is-invalid")}))}));h.displayName="FormFileInput";var P=h,E=["bsPrefix","bsCustomPrefix","className","htmlFor"],w=o.a.forwardRef((function(e,a){var t=e.bsPrefix,s=e.bsCustomPrefix,c=e.className,f=e.htmlFor,m=Object(l.a)(e,E),b=Object(n.useContext)(d.a),v=b.controlId,p=b.custom?[s,"custom-file-label"]:[t,"form-file-label"],x=p[0],O=p[1];return t=Object(u.a)(x,O),o.a.createElement("label",Object(r.a)({},m,{ref:a,htmlFor:f||v,className:i()(c,t),"data-browse":m["data-browse"]}))}));w.displayName="FormFileLabel";var I=w,C=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],F=o.a.forwardRef((function(e,a){var t=e.id,s=e.bsPrefix,f=e.bsCustomPrefix,m=e.disabled,b=void 0!==m&&m,v=e.isValid,p=void 0!==v&&v,x=e.isInvalid,O=void 0!==x&&x,j=e.feedbackTooltip,y=void 0!==j&&j,N=e.feedback,h=e.className,E=e.style,w=e.label,F=e.children,g=e.custom,k=e.lang,R=e["data-browse"],V=e.as,T=void 0===V?"div":V,L=e.inputAs,z=void 0===L?"input":L,S=Object(l.a)(e,C),A=g?[f,"custom"]:[s,"form-file"],G=A[0],M=A[1];s=Object(u.a)(G,M);var _=Object(n.useContext)(d.a).controlId,q=Object(n.useMemo)((function(){return{controlId:t||_,custom:g}}),[_,g,t]),J=null!=w&&!1!==w&&!F,B=o.a.createElement(P,Object(r.a)({},S,{ref:a,isValid:p,isInvalid:O,disabled:b,as:z,lang:k}));return o.a.createElement(d.a.Provider,{value:q},o.a.createElement(T,{style:E,className:i()(h,s,g&&"custom-file")},F||o.a.createElement(o.a.Fragment,null,g?o.a.createElement(o.a.Fragment,null,B,J&&o.a.createElement(I,{"data-browse":R},w)):o.a.createElement(o.a.Fragment,null,J&&o.a.createElement(I,null,w),B),(p||O)&&o.a.createElement(c.a,{type:p?"valid":"invalid",tooltip:y},N))))}));F.displayName="FormFile",F.Input=P,F.Label=I;var g=F,k=t(991),R=["bsPrefix","className","children","controlId","as"],V=o.a.forwardRef((function(e,a){var t=e.bsPrefix,s=e.className,c=e.children,f=e.controlId,m=e.as,b=void 0===m?"div":m,v=Object(l.a)(e,R);t=Object(u.a)(t,"form-group");var p=Object(n.useMemo)((function(){return{controlId:f}}),[f]);return o.a.createElement(d.a.Provider,{value:p},o.a.createElement(b,Object(r.a)({},v,{ref:a,className:i()(s,t)}),c))}));V.displayName="FormGroup";var T=V,L=(t(958),t(990)),z=["as","bsPrefix","column","srOnly","className","htmlFor"],S=o.a.forwardRef((function(e,a){var t=e.as,s=void 0===t?"label":t,c=e.bsPrefix,f=e.column,m=e.srOnly,b=e.className,v=e.htmlFor,p=Object(l.a)(e,z),x=Object(n.useContext)(d.a).controlId;c=Object(u.a)(c,"form-label");var O="col-form-label";"string"===typeof f&&(O=O+" "+O+"-"+f);var j=i()(b,c,m&&"sr-only",f&&O);return v=v||x,f?o.a.createElement(L.a,Object(r.a)({ref:a,as:"label",className:j,htmlFor:v},p)):o.a.createElement(s,Object(r.a)({ref:a,className:j,htmlFor:v},p))}));S.displayName="FormLabel",S.defaultProps={column:!1,srOnly:!1};var A=S,G=["bsPrefix","className","as","muted"],M=o.a.forwardRef((function(e,a){var t=e.bsPrefix,s=e.className,n=e.as,c=void 0===n?"small":n,d=e.muted,f=Object(l.a)(e,G);return t=Object(u.a)(t,"form-text"),o.a.createElement(c,Object(r.a)({},f,{ref:a,className:i()(s,t,d&&"text-muted")}))}));M.displayName="FormText";var _=M,q=o.a.forwardRef((function(e,a){return o.a.createElement(y,Object(r.a)({},e,{ref:a,type:"switch"}))}));q.displayName="Switch",q.Input=y.Input,q.Label=y.Label;var J=q,B=t(970),D=["bsPrefix","inline","className","validated","as"],H=Object(B.a)("form-row"),K=o.a.forwardRef((function(e,a){var t=e.bsPrefix,s=e.inline,n=e.className,c=e.validated,d=e.as,f=void 0===d?"form":d,m=Object(l.a)(e,D);return t=Object(u.a)(t,"form"),o.a.createElement(f,Object(r.a)({},m,{ref:a,className:i()(n,c&&"was-validated",s&&t+"-inline")}))}));K.displayName="Form",K.defaultProps={inline:!1},K.Row=H,K.Group=T,K.Control=k.a,K.Check=y,K.File=g,K.Switch=J,K.Label=A,K.Text=_;a.a=K},946:function(e,a,t){"use strict";var r=t(2),l=t.n(r).a.createContext({controlId:void 0});a.a=l},955:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(){for(var e=arguments.length,a=Array(e),t=0;t<e;t++)a[t]=arguments[t];function r(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];var l=null;return a.forEach((function(e){if(null==l){var a=e.apply(void 0,t);null!=a&&(l=a)}})),l}return(0,s.default)(r)};var r,l=t(992),s=(r=l)&&r.__esModule?r:{default:r};e.exports=a.default},956:function(e,a,t){"use strict";var r=t(22),l=t(45),s=t(944),i=t.n(s),n=t(2),o=t.n(n),c=t(27),d=t.n(c),u=["as","className","type","tooltip"],f={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},m=o.a.forwardRef((function(e,a){var t=e.as,s=void 0===t?"div":t,n=e.className,c=e.type,d=void 0===c?"valid":c,f=e.tooltip,m=void 0!==f&&f,b=Object(l.a)(e,u);return o.a.createElement(s,Object(r.a)({},b,{ref:a,className:i()(n,d+"-"+(m?"tooltip":"feedback"))}))}));m.displayName="Feedback",m.propTypes=f,a.a=m},990:function(e,a,t){"use strict";var r=t(22),l=t(45),s=t(944),i=t.n(s),n=t(2),o=t.n(n),c=t(945),d=["bsPrefix","className","as"],u=["xl","lg","md","sm","xs"],f=o.a.forwardRef((function(e,a){var t=e.bsPrefix,s=e.className,n=e.as,f=void 0===n?"div":n,m=Object(l.a)(e,d),b=Object(c.a)(t,"col"),v=[],p=[];return u.forEach((function(e){var a,t,r,l=m[e];if(delete m[e],"object"===typeof l&&null!=l){var s=l.span;a=void 0===s||s,t=l.offset,r=l.order}else a=l;var i="xs"!==e?"-"+e:"";a&&v.push(!0===a?""+b+i:""+b+i+"-"+a),null!=r&&p.push("order"+i+"-"+r),null!=t&&p.push("offset"+i+"-"+t)})),v.length||v.push(b),o.a.createElement(f,Object(r.a)({},m,{ref:a,className:i.a.apply(void 0,[s].concat(v,p))}))}));f.displayName="Col",a.a=f},991:function(e,a,t){"use strict";var r=t(22),l=t(45),s=t(944),i=t.n(s),n=(t(955),t(2)),o=t.n(n),c=(t(958),t(956)),d=t(946),u=t(945),f=["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"],m=o.a.forwardRef((function(e,a){var t,s,c=e.bsPrefix,m=e.bsCustomPrefix,b=e.type,v=e.size,p=e.htmlSize,x=e.id,O=e.className,j=e.isValid,y=void 0!==j&&j,N=e.isInvalid,h=void 0!==N&&N,P=e.plaintext,E=e.readOnly,w=e.custom,I=e.as,C=void 0===I?"input":I,F=Object(l.a)(e,f),g=Object(n.useContext)(d.a).controlId,k=w?[m,"custom"]:[c,"form-control"],R=k[0],V=k[1];if(c=Object(u.a)(R,V),P)(s={})[c+"-plaintext"]=!0,t=s;else if("file"===b){var T;(T={})[c+"-file"]=!0,t=T}else if("range"===b){var L;(L={})[c+"-range"]=!0,t=L}else if("select"===C&&w){var z;(z={})[c+"-select"]=!0,z[c+"-select-"+v]=v,t=z}else{var S;(S={})[c]=!0,S[c+"-"+v]=v,t=S}return o.a.createElement(C,Object(r.a)({},F,{type:b,size:p,ref:a,readOnly:E,id:x||g,className:i()(O,t,y&&"is-valid",h&&"is-invalid")}))}));m.displayName="FormControl",a.a=Object.assign(m,{Feedback:c.a})},992:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e){function a(a,t,r,l,s,i){var n=l||"<<anonymous>>",o=i||r;if(null==t[r])return a?new Error("Required "+s+" `"+o+"` was not specified in `"+n+"`."):null;for(var c=arguments.length,d=Array(c>6?c-6:0),u=6;u<c;u++)d[u-6]=arguments[u];return e.apply(void 0,[t,r,n,s,o].concat(d))}var t=a.bind(null,!1);return t.isRequired=a.bind(null,!0),t},e.exports=a.default},993:function(e,a,t){"use strict";var r=t(45),l=t(22),s=t(944),i=t.n(s),n=t(2),o=t.n(n),c=t(970),d=t(945),u=["bsPrefix","size","hasValidation","className","as"],f=Object(c.a)("input-group-append"),m=Object(c.a)("input-group-prepend"),b=Object(c.a)("input-group-text",{Component:"span"}),v=o.a.forwardRef((function(e,a){var t=e.bsPrefix,s=e.size,n=e.hasValidation,c=e.className,f=e.as,m=void 0===f?"div":f,b=Object(r.a)(e,u);return t=Object(d.a)(t,"input-group"),o.a.createElement(m,Object(l.a)({ref:a},b,{className:i()(c,t,s&&t+"-"+s,n&&"has-validation")}))}));v.displayName="InputGroup";var p=Object(l.a)({},v,{Text:b,Radio:function(e){return o.a.createElement(b,null,o.a.createElement("input",Object(l.a)({type:"radio"},e)))},Checkbox:function(e){return o.a.createElement(b,null,o.a.createElement("input",Object(l.a)({type:"checkbox"},e)))},Append:f,Prepend:m});a.a=p}}]);
//# sourceMappingURL=HPwBJc.a7754c.0.chunk.js.map