(this.webpackJsonpreact_sc=this.webpackJsonpreact_sc||[]).push([[0],{19:function(e,t,n){e.exports=n(41)},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(18),o=n.n(c);n(9);var l=function(){return r.a.createElement("header",{className:"header"},r.a.createElement("div",null,r.a.createElement("a",{href:"/",className:"title"},"\u534f\u8bae\u5206\u6790\u5668"),r.a.createElement("a",{href:"./help/help.html",className:"a_help"},"\u5e2e\u52a9\u6587\u6863")))},u=n(4),s=n(5),i=n(2),m=n(7),p=n(6),h=n(3),f=n.n(h),d=0;function v(){var e=document.querySelector("textarea"),t=e.value.split("\n").length;t>=21&&e.setAttribute("rows",t+2)}var g=function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(e){return Object(u.a)(this,n),t.call(this,e)}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=document.querySelector("textarea");document.ondrop=function(e){e.preventDefault()},document.ondragover=function(e){e.preventDefault()},t.ondragenter=function(){},t.ondrop=function(n){var a=n.dataTransfer.files[0],r=a.name.lastIndexOf("."),c=a.name.substring(r);if(".txt"!==c&&".spdl"!==c)return window.alert("\u6587\u4ef6\u683c\u5f0f\u9519\u8bef"),null;var o=new FileReader;o.readAsText(a),o.onload=function(){var n=o.result;t.value=n,v(),e.props.changeInput(n)}}}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"code_wrap"},r.a.createElement("div",null,"\u8bf7\u8f93\u5165\u534f\u8bae\u63cf\u8ff0:"),r.a.createElement("textarea",{placeholder:"\u652f\u6301.txt\u6216.spdl\u6587\u4ef6\u62d6\u62fd\u81f3\u6846\u5185",value:this.props.input,onChange:function(t){v(),e.props.changeInput(t.target.value)},rows:"23"}))}}]),n}(r.a.Component),E=function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={selected:"\u70b9\u51fb\u9009\u62e9\u534f\u8bae"},a.changeSelect=a.changeSelect.bind(Object(i.a)(a)),a}return Object(s.a)(n,[{key:"changeSelect",value:function(e){var t=this,n=e.target.value;this.setState({selected:n}),"\u70b9\u51fb\u9009\u62e9\u534f\u8bae"===n||f.a.get("http://192.168.2.130/protocols/".concat(n)).then((function(e){var n=JSON.parse(e.data).protocol;document.querySelector("textarea").value=n,v(),t.props.changeInput(n)}),(function(e){window.alert("\u8bf7\u6c42\u5931\u8d25\uff0cerr\uff1a".concat(e))}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"select"},"\u7ecf\u5178\u5b89\u5168\u534f\u8bae\u9009\u62e9\uff1a",r.a.createElement("select",{value:this.state.selected,onChange:this.changeSelect},["\u70b9\u51fb\u9009\u62e9\u534f\u8bae","ns3","nsl3","nsl3-broken","tmn","wmf","needham-schroeder-sk","needham-schroeder-lowe"].map((function(e){return r.a.createElement("option",{key:String(++d)},e)}))))}}]),n}(r.a.Component),b="";function k(e){b=Math.random().toString().substr(3,17)+(new Date).getTime();var t={input:e.input,mark:b};if(""===t.input.replace(/\s*/g,""))return window.alert("\u8bf7\u6b63\u786e\u8f93\u5165\u534f\u8bae\u63cf\u8ff0"),null;f.a.post("http://192.168.2.130/result/",t).then((function(t){var n=JSON.parse(t.data).result;if("error"===n.substring(0,5))return window.alert(n),null;!function(e,t){var n=e.split("\n"),a=[],r=1;n.forEach((function(e){var t=e.match(/claim\t(.+),(.+)\t(.+)_(.+)\t(.+)\t(.+)\t(.+)/),n=t[1];t[5]="-"===t[5]?"":t[5];var c=t[2],o={property:"".concat(t[3]," ").concat(t[5]),turnout:t[6].replace(/\u001b\[32mOk\u001b\[0m/g,"\u6210\u529f").replace(/\u001b\[31mFail\u001b\[0m/g,"\u5931\u8d25"),state:t[7].replace(/\[no attack within bounds\]/,"\u754c\u9650\u5185\u6ca1\u6709\u653b\u51fb").replace(/\[proof of correctness\]/,"\u6b63\u786e\u6027\u8bc1\u660e").replace(/\[at least (\d+) attack(s)?\]/,(function(e,t){return"\u81f3\u5c11\u5b58\u5728 ".concat(t," \u4e2a\u653b\u51fb")})).replace(/\[exactly (\d+) attack(s)?\]/,(function(e,t){return"\u5b58\u5728 ".concat(t," \u4e2a\u653b\u51fb")})),number:null==t[7].match(/\d+/)?0:+t[7].match(/\d+/)[0],nth_of_attack:r};r+=o.number,a.find((function(e){return e.name===n}))?a.forEach((function(e){e.name===n&&(e.roles.find((function(e){return e.roleName===c}))?e.roles.forEach((function(e){e.roleName===c&&e.claims.push(o)})):e.roles.push({roleName:c,claims:[o]}))})):a.push({name:n,roles:[{roleName:c,claims:[o]}]})})),t.changeProtocols(a),document.querySelector(".warp").style.display="block"}(n,e)}),(function(e){window.alert("err:".concat(e))}))}function w(e){return r.a.createElement("button",{onClick:function(){return k(e)}},"\u8fd0\u884c")}var y=0;function O(){return String(++y)}function N(e){return r.a.createElement("div",null,r.a.createElement("p",null,"\u534f\u8bae\u540d\u79f0\uff1a",e.protocol.name),e.protocol.roles.map((function(e){return r.a.createElement(S,{key:O(),role:e})})))}function S(e){return r.a.createElement("div",null,"\u89d2\u8272\uff1a",e.role.roleName,r.a.createElement("ul",null,r.a.createElement("span",null,"\u58f0\u660e(claim)"),r.a.createElement("span",null,"\u72b6\u6001"),r.a.createElement("span",null,"\u4fe1\u606f"),e.role.claims.map((function(e){return r.a.createElement(j,{key:O(),claim:e})}))))}function j(e){var t=e.claim;return r.a.createElement("li",null,r.a.createElement("span",null,t.property),r.a.createElement("span",null,t.turnout),r.a.createElement("span",null,"\u6210\u529f"===t.turnout?t.state:r.a.createElement("button",{onClick:function(){return e=t.property,n=t.number,a=t.nth_of_attack,void f.a.get("http://192.168.2.130/charts/".concat(b,"/").concat(n,"/").concat(a)).then((function(t){JSON.parse(t.data).picture.forEach((function(t,n){var a=new Image;a.src="data:image/png;base64,"+t,a.style.display="block",a.style.margin="0 auto",a.style.height="700px";var r=window.open();r.document.write(a.outerHTML),r.document.title="".concat(e,"\u7684\u7b2c").concat(n+1,"\u5f20\u653b\u51fb\u56fe"),r.document.close()}))}),(function(e){console.log(e)}));var e,n,a}},t.state)))}function I(e){return r.a.createElement("div",{className:"result_wrap"},r.a.createElement("div",null,"\u8fd0\u884c\u7ed3\u679c:"),r.a.createElement("div",{className:"warp"},e.protocols.map((function(e){return r.a.createElement(N,{key:O(),protocol:e})}))))}var _=function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={protocols:[{name:"",roles:[{roleName:"",claims:[{property:"",turnout:"",state:"",number:0,nth_of_attack:0}]}]}],input:""},a.changeInput=a.changeInput.bind(Object(i.a)(a)),a.changeProtocols=a.changeProtocols.bind(Object(i.a)(a)),a}return Object(s.a)(n,[{key:"changeInput",value:function(e){this.setState({input:e})}},{key:"changeProtocols",value:function(e){this.setState({protocols:e})}},{key:"render",value:function(){return r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"tab"},r.a.createElement(E,{changeInput:this.changeInput}),r.a.createElement(w,{input:this.state.input,changeProtocols:this.changeProtocols})),r.a.createElement(g,{input:this.state.input,changeInput:this.changeInput}),r.a.createElement(I,{protocols:this.state.protocols}))}}]),n}(r.a.Component);function x(){return r.a.createElement("div",null,r.a.createElement(l,null),r.a.createElement(_,null))}o.a.render(r.a.createElement(x,null),document.getElementById("root"))},9:function(e,t,n){}},[[19,1,2]]]);
//# sourceMappingURL=main.05ddbbb8.chunk.js.map