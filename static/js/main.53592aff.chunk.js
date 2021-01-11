(this["webpackJsonpthe-shoppies"]=this["webpackJsonpthe-shoppies"]||[]).push([[0],{35:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n(0),i=n.n(a),s=n(21),r=n.n(s),o=n(7),l=n(9),j=n(14),d=n(40),u=n(37),b=n(22),h=n(38),O=n(13),m=function(e){var t=e.searchTerm,n=e.handleChange;return Object(c.jsx)(d.a,{id:"search-movies",className:"cards",children:Object(c.jsxs)(d.a.Group,{controlId:"movie-search",children:[Object(c.jsx)(u.a,{children:Object(c.jsx)(b.a,{className:"text-left",children:Object(c.jsx)(d.a.Label,{children:"Movie title"})})}),Object(c.jsx)(u.a,{children:Object(c.jsx)(b.a,{children:Object(c.jsxs)(h.a,{id:"search-bar",children:[Object(c.jsx)(h.a.Prepend,{children:Object(c.jsx)(h.a.Text,{children:Object(c.jsx)(O.a,{icon:"search"})})}),Object(c.jsx)(d.a.Control,{type:"text",value:t,onChange:n})]})})})]})})},g=n(23),x=function(e){var t=e.pagination,n=Object(j.a)(t,3),i=n[0],s=n[1],r=n[2],o=Math.ceil(s/10),l=[{icon:"angle-left",text:"-",onClick:r,isShowing:1===i},{icon:"",text:"".concat(i)},{icon:"",text:"/"},{icon:"",text:"".concat(o)},{icon:"angle-right",text:"+",onClick:r,isShowing:i===o}];return Object(c.jsx)(a.Fragment,{children:l.map((function(e,t){return e.icon?Object(c.jsx)(g.a,{size:"sm",variant:"outline-secondary",className:e.isShowing?"hidden":"",onClick:function(){return e.onClick(e.text)},type:"button",children:Object(c.jsx)(O.a,{icon:e.icon})},"pagination-button".concat(e.icon)):Object(c.jsx)("span",{className:"paginationNumbers",children:e.text},"pagination-span-".concat(e.text,"-").concat(t))}))})},f=function(e){var t=e.title,n=e.buttonText,a=e.data,i=e.onClick,s=e.imdbID,r=void 0===s?void 0:s,o=e.pagination,l=void 0===o?void 0:o;return Object(c.jsxs)(d.a,{className:"cards",children:[Object(c.jsx)("h5",{className:"text-left",id:n.toLowerCase(),children:t},"header-".concat(n.toLowerCase())),Object(c.jsx)("ul",{children:a.length?a.map((function(e,t){var a=r&&(r.size>=5||r.has(e.imdbID))?"disabled":"";return Object(c.jsx)("li",{className:"text-left",children:Object(c.jsxs)("span",{children:[e.Title,"  (",e.Year,")",Object(c.jsx)(g.a,{variant:"outline-secondary",type:"button",onClick:function(){return i(e)},className:a,children:n})]})},"li-".concat(n,"-").concat(t))})):null}),l&&l[1]>10&&Object(c.jsx)(x,{pagination:l})]})},p=function(e){var t=e.data,n=e.searchTerm,a=e.onClick,i=e.pagination,s={title:'Results for "'.concat(n||"",'"'),buttonText:"Nominate"};return Object(c.jsx)(f,{title:s.title,buttonText:s.buttonText,data:t.searchResults,onClick:a,imdbID:t.setId,pagination:i})},v=function(e){var t=e.data,n=e.onClick,a="Nominations",i="Remove";return Object(c.jsx)(f,{title:a,buttonText:i,data:t,onClick:n})},T=function(){return Object(c.jsxs)("div",{className:"cards text-left",children:[Object(c.jsx)("h2",{children:"Thank you for nominating these movies!"}),Object(c.jsx)("h5",{children:"Have a great day"})]})},I=n(39),N=function(e){return fetch("http://www.omdbapi.com/?".concat(e,"&apikey=bef97d")).then((function(e){return e.json()})).catch((function(e){return console.error(e)}))},C=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=e.split(" ").join("+"),c="s=".concat(n,"&page=").concat(t);return N(c)},w=function(){var e=window.localStorage.getItem("savedNoms")?JSON.parse(window.localStorage.getItem("savedNoms")):[],t=window.localStorage.getItem("savedIds")?JSON.parse(window.localStorage.getItem("savedIds")):[],n=Object(a.useRef)(null),i=Object(a.useState)({searchResults:[],nominatedMovies:e,searchTerm:"",setId:new Set(Object(l.a)(t)),isTyping:!1,pageNumber:1,totalResults:0,isChangingPage:!1}),s=Object(j.a)(i,2),r=s[0],d=s[1],h=function(){d((function(e){return Object(o.a)(Object(o.a)({},e),{},{isTyping:!1})}))};return Object(a.useEffect)((function(){r.nominatedMovies.length&&(window.localStorage.setItem("savedNoms",JSON.stringify(r.nominatedMovies)),window.localStorage.setItem("savedIds",JSON.stringify(Object(l.a)(r.setId))))}),[r.nominatedMovies,r.setId]),Object(a.useEffect)((function(){var e=setTimeout(h,1500);return function(){return clearTimeout(e)}}),[r.searchTerm]),Object(a.useEffect)((function(){r.searchTerm&&!r.isTyping&&C(r.searchTerm).then((function(e){d((function(t){var n=e.Search?e.totalResults:0;return Object(o.a)(Object(o.a)({},t),{},{searchResults:e.Search?e.Search:[],totalResults:n,pageNumber:1,isChangingPage:!1})}))}))}),[r.isTyping,r.searchTerm]),Object(a.useEffect)((function(){r.searchTerm&&r.isChangingPage&&C(r.searchTerm,r.pageNumber).then((function(e){d((function(t){var n=e.Search?e.totalResults:0;return Object(o.a)(Object(o.a)({},t),{},{searchResults:e.Search?e.Search:[],totalResults:n,isChangingPage:!1})}))}))}),[r.isChangingPage]),Object(a.useEffect)((function(){r.setId.size>=5&&n.current.scrollIntoView()}),[r.setId]),Object(c.jsxs)("div",{className:"my-5",children:[Object(c.jsx)(I.a,{children:Object(c.jsx)(u.a,{children:Object(c.jsx)(b.a,{children:Object(c.jsx)("header",{className:"text-left",children:Object(c.jsx)("h1",{children:"The Shoppies"})})})})}),5===r.setId.size&&Object(c.jsx)(I.a,{children:Object(c.jsx)(u.a,{children:Object(c.jsx)(b.a,{ref:n,children:Object(c.jsx)(T,{})})})}),Object(c.jsx)(I.a,{children:Object(c.jsx)(m,{searchTerm:r.searchTerm,handleChange:function(e){var t=e.target.value;d((function(e){return Object(o.a)(Object(o.a)({},e),{},{searchTerm:t,isTyping:!0})}))}})}),Object(c.jsx)(I.a,{children:Object(c.jsxs)(u.a,{children:[Object(c.jsx)(b.a,{xs:12,md:6,children:Object(c.jsx)(p,{data:r,searchTerm:r.searchTerm,onClick:function(e){d((function(t){return Object(o.a)(Object(o.a)({},t),{},{nominatedMovies:[].concat(Object(l.a)(t.nominatedMovies),[{Title:e.Title,Year:e.Year,imdbID:e.imdbID}]),setId:new Set(Object(l.a)(t.setId.add(e.imdbID)))})}))},pagination:[r.pageNumber,r.totalResults,function(e){d((function(t){return Object(o.a)(Object(o.a)({},t),{},{pageNumber:"+"===e?t.pageNumber+1:t.pageNumber-1,isChangingPage:!0})}))}]})}),Object(c.jsx)(b.a,{xs:12,md:6,children:Object(c.jsx)(v,{data:r.nominatedMovies,onClick:function(e){d((function(t){return Object(o.a)(Object(o.a)({},t),{},{nominatedMovies:Object(l.a)(t.nominatedMovies.filter((function(t){return t.imdbID!==e.imdbID}))),setId:new Set(Object(l.a)(t.setId).filter((function(t){return t!==e.imdbID})))})}))}})})]})})]})},S=(n(35),n(8)),y=n(15);S.b.add(y.c,y.a,y.b);var k=function(){return Object(c.jsx)("div",{className:"App",children:Object(c.jsx)(w,{})})},R=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,41)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),i(e),s(e)}))};r.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(k,{})}),document.getElementById("root")),R()}},[[36,1,2]]]);
//# sourceMappingURL=main.53592aff.chunk.js.map