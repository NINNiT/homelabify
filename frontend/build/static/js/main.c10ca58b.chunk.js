(this["webpackJsonphomelabify-frontend"]=this["webpackJsonphomelabify-frontend"]||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n(1),r=n.n(a),s=n(6),i=n.n(s),u=(n(13),n(3)),o=n.n(u),l=n(4),j=n(2),h=(n.p,n(15),n(7)),b=n.n(h),p=function(e){return Object(c.jsx)("div",{className:"plotwrapper",children:Object(c.jsx)(b.a,{className:"linegraph",data:e.graphData,layout:e.layout,config:e.config})})},f=function(e){var t=Object(a.useState)({}),n=Object(j.a)(t,2),r=n[0],s=n[1],i=Object(a.useState)({}),u=Object(j.a)(i,2),h=u[0],b=u[1],p=function(){var e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:4000/api/device/net").then((function(e){return e.json()}));case 2:t=e.sent,s({ip:t[0].ip,hostname:t[0].hostname});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:4000/api/healthcheck").then((function(e){return e.json()}));case 2:t=e.sent,b({influxdb:t[0].influxdb_status,measurement:t[0].measurement_status,alert:t[0].alert_status});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){p(),f();var e=setInterval((function(){p(),f()}),1e4);return function(){return clearInterval(e)}}),[]),Object(c.jsxs)("div",{className:"top-content",children:[Object(c.jsxs)("div",{className:"top-content-status",children:[Object(c.jsxs)("div",{children:[Object(c.jsx)("b",{children:"IP "})," ",r.ip]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("b",{children:"Hostname "})," ",r.hostname]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("b",{children:"influxdb "}),Object(c.jsx)("span",{className:h.influxdb?"green":"red",children:h.influxdb?"running":"not running"})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("b",{children:"measurement.py "}),Object(c.jsx)("span",{className:h.measurement?"green":"red",children:h.measurement?"running":"not running"})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)("b",{children:"alert.py "}),Object(c.jsx)("span",{className:h.alert?"green":"red",children:h.alert?"running":"not running"})]})]}),Object(c.jsx)("div",{className:"top-content-buttons",children:"buttons"})]})};var d=function(){var e=Object(a.useState)(null),t=Object(j.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)(null),i=Object(j.a)(s,2),u=i[0],h=i[1],b=Object(a.useState)(null),d=Object(j.a)(b,2),m=d[0],O=d[1],x=Object(a.useState)(null),v=Object(j.a)(x,2),g=v[0],y=v[1],k=Object(a.useState)(null),D=Object(j.a)(k,2),N=D[0],_=D[1],w=Object(a.useState)(null),S=Object(j.a)(w,2),I=S[0],C=S[1],P=function(){var e=Object(l.a)(o.a.mark((function e(){var t,n,c,a,s,i,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([fetch("http://localhost:4000/api/temperature/celsius").then((function(e){return e.json()})),fetch("http://localhost:4000/api/temperature/humidity").then((function(e){return e.json()})),fetch("http://localhost:4000/api/device/cpu").then((function(e){return e.json()})),fetch("http://localhost:4000/api/device/memory").then((function(e){return e.json()})),fetch("http://localhost:4000/api/device/disk").then((function(e){return e.json()}))]);case 2:t=e.sent,n=Object(j.a)(t,5),c=n[0],a=n[1],s=n[2],i=n[3],u=n[4],r(F("bar",c,["temp_c"])),h(F("bar",a,["humidity"])),O(F("bar",s,["cpu_freq_current"])),y(F("bar",s,["cpu_percent"])),_(F("line",i,["mem_free","mem_used"])),C(F("line",u,["disk_free","disk_used"]));case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(e,t,n){var c=[];switch(n.length){case 1:c=[{type:e,y:B(t,n[0]),x:B(t,"time")}];break;case 2:c=[{type:e,name:n[0],y:B(t,n[0]),x:B(t,"time")},{type:e,name:n[1],y:B(t,n[1]),x:B(t,"time")}]}return c},B=function(e,t){return e.map((function(e){return e[t]}))};Object(a.useEffect)((function(){P();var e=setInterval((function(){P()}),1e4);return function(){return clearInterval(e)}}),[]);var M={scrollZoom:!0};return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)("header",{className:"App-header",children:Object(c.jsx)("h1",{children:"Homelabify"})}),Object(c.jsx)(f,{}),Object(c.jsxs)("section",{className:"bottom-content",children:[Object(c.jsx)(p,{layout:{title:"Rack | Temperature in \xb0C"},graphData:n,config:M}),Object(c.jsx)(p,{layout:{title:"Rack | Humidity in %"},graphData:u,config:M}),Object(c.jsx)(p,{layout:{title:"Device | CPU Frequency in Mhz"},graphData:m,config:M}),Object(c.jsx)(p,{layout:{title:"Device | CPU Load in %"},graphData:g,config:M}),Object(c.jsx)(p,{layout:{title:"Device | Memory in MB"},graphData:N,config:M}),Object(c.jsx)(p,{layout:{title:"Device | Disk in Byte"},graphData:I,config:M})]})]})},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,24)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))};i.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(d,{})}),document.getElementById("root")),m()}},[[23,1,2]]]);
//# sourceMappingURL=main.c10ca58b.chunk.js.map