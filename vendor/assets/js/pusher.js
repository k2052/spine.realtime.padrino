/*!
 * Pusher JavaScript Library v1.11.0
 * http://pusherapp.com/
 *
 * Copyright 2011, Pusher
 * Released under the MIT licence.
 */

if(Function.prototype.scopedTo===void 0)Function.prototype.scopedTo=function(a,c){var b=this;return function(){return b.apply(a,Array.prototype.slice.call(c||[]).concat(Array.prototype.slice.call(arguments)))}};
var Pusher=function(a,c){this.options=c||{};this.key=a;this.channels=new Pusher.Channels;this.global_emitter=new Pusher.EventsDispatcher;var b=this;this.checkAppKey();this.connection=new Pusher.Connection(this.key,this.options);this.connection.bind("connected",function(){b.subscribeAll()}).bind("message",function(a){var c=a.event.indexOf("pusher_internal:")===0;if(a.channel){var g;(g=b.channel(a.channel))&&g.emit(a.event,a.data)}c||b.global_emitter.emit(a.event,a.data)}).bind("disconnected",function(){b.channels.disconnect()}).bind("error",
function(a){Pusher.warn("Error",a)});Pusher.instances.push(this);Pusher.isReady&&b.connect()};Pusher.instances=[];
Pusher.prototype={channel:function(a){return this.channels.find(a)},connect:function(){this.connection.connect()},disconnect:function(){this.connection.disconnect()},bind:function(a,c){this.global_emitter.bind(a,c);return this},bind_all:function(a){this.global_emitter.bind_all(a);return this},subscribeAll:function(){for(var a in this.channels.channels)this.channels.channels.hasOwnProperty(a)&&this.subscribe(a)},subscribe:function(a){var c=this,b=this.channels.add(a,this);this.connection.state==="connected"&&
b.authorize(this,function(e,f){e?b.emit("pusher:subscription_error",f):c.send_event("pusher:subscribe",{channel:a,auth:f.auth,channel_data:f.channel_data})});return b},unsubscribe:function(a){this.channels.remove(a);this.connection.state==="connected"&&this.send_event("pusher:unsubscribe",{channel:a})},send_event:function(a,c,b){return this.connection.send_event(a,c,b)},checkAppKey:function(){(this.key===null||this.key===void 0)&&Pusher.warn("Warning","You must pass your app key when you instantiate Pusher.")}};
Pusher.Util={extend:function extend(c,b){for(var e in b)c[e]=b[e]&&b[e].constructor&&b[e].constructor===Object?extend(c[e]||{},b[e]):b[e];return c},stringify:function(){for(var a=["Pusher"],c=0;c<arguments.length;c++)typeof arguments[c]==="string"?a.push(arguments[c]):window.JSON==void 0?a.push(arguments[c].toString()):a.push(JSON.stringify(arguments[c]));return a.join(" : ")},arrayIndexOf:function(a,c){var b=Array.prototype.indexOf;if(a==null)return-1;if(b&&a.indexOf===b)return a.indexOf(c);for(i=
0,l=a.length;i<l;i++)if(a[i]===c)return i;return-1}};Pusher.debug=function(){Pusher.log&&Pusher.log(Pusher.Util.stringify.apply(this,arguments))};Pusher.warn=function(){window.console&&window.console.warn?window.console.warn(Pusher.Util.stringify.apply(this,arguments)):Pusher.log&&Pusher.log(Pusher.Util.stringify.apply(this,arguments))};Pusher.VERSION="1.11.0";Pusher.host="ws.pusherapp.com";Pusher.ws_port=80;Pusher.wss_port=443;Pusher.channel_auth_endpoint="/pusher/auth";Pusher.cdn_http="http://js.pusher.com/";
Pusher.cdn_https="https://d3dy5gmtp8yhk7.cloudfront.net/";Pusher.dependency_suffix=".min";Pusher.channel_auth_transport="ajax";Pusher.activity_timeout=12E4;Pusher.pong_timeout=3E4;Pusher.isReady=!1;Pusher.ready=function(){Pusher.isReady=!0;for(var a=0,c=Pusher.instances.length;a<c;a++)Pusher.instances[a].connect()};
(function(){function a(a){this.callbacks={};this.global_callbacks=[];this.failThrough=a}a.prototype.bind=function(a,b){this.callbacks[a]=this.callbacks[a]||[];this.callbacks[a].push(b);return this};a.prototype.unbind=function(a,b){if(this.callbacks[a]){var e=Pusher.Util.arrayIndexOf(this.callbacks[a],b);this.callbacks[a].splice(e,1)}return this};a.prototype.emit=function(a,b){for(var e=0;e<this.global_callbacks.length;e++)this.global_callbacks[e](a,b);var f=this.callbacks[a];if(f)for(e=0;e<f.length;e++)f[e](b);
else this.failThrough&&this.failThrough(a,b);return this};a.prototype.bind_all=function(a){this.global_callbacks.push(a);return this};this.Pusher.EventsDispatcher=a}).call(this);
(function(){function a(a,b,c){if(b[a]!==void 0)b[a](c)}function c(a,c,g){b.EventsDispatcher.call(this);this.state=void 0;this.errors=[];this.stateActions=g;this.transitions=c;this.transition(a)}var b=this.Pusher;c.prototype.transition=function(c,f){var g=this.state,h=this.stateActions;if(g&&b.Util.arrayIndexOf(this.transitions[g],c)==-1)throw Error("Invalid transition ["+g+" to "+c+"]");a(g+"Exit",h,f);a(g+"To"+(c.substr(0,1).toUpperCase()+c.substr(1)),h,f);a(c+"Pre",h,f);this.state=c;this.emit("state_change",
{oldState:g,newState:c});a(c+"Post",h,f)};c.prototype.is=function(a){return this.state===a};c.prototype.isNot=function(a){return this.state!==a};b.Util.extend(c.prototype,b.EventsDispatcher.prototype);this.Pusher.Machine=c}).call(this);
(function(){var a=function(){var a=this;Pusher.EventsDispatcher.call(this);window.addEventListener!==void 0&&(window.addEventListener("online",function(){a.emit("online",null)},!1),window.addEventListener("offline",function(){a.emit("offline",null)},!1))};a.prototype.isOnLine=function(){return window.navigator.onLine===void 0?!0:window.navigator.onLine};Pusher.Util.extend(a.prototype,Pusher.EventsDispatcher.prototype);this.Pusher.NetInfo=a}).call(this);
(function(){function a(a){a.connectionWait=0;a.openTimeout=b.TransportType==="flash"?5E3:2E3;a.connectedTimeout=2E3;a.connectionSecure=a.compulsorySecure;a.connectionAttempts=0}function c(c,r){function k(){d.connectionWait<s&&(d.connectionWait+=f);d.openTimeout<t&&(d.openTimeout+=g);d.connectedTimeout<u&&(d.connectedTimeout+=h);if(d.compulsorySecure!==!0)d.connectionSecure=!d.connectionSecure;d.connectionAttempts++}function o(){d._machine.transition("impermanentlyClosing")}function p(){d._activityTimer&&
clearTimeout(d._activityTimer);d._activityTimer=setTimeout(function(){d.send_event("pusher:ping",{});d._activityTimer=setTimeout(function(){d.socket.close()},d.options.pong_timeout||b.pong_timeout)},d.options.activity_timeout||b.activity_timeout)}function v(){d._machine.transition("open")}function w(a){a=q(a);if(a!==void 0)if(a.event==="pusher:connection_established")d._machine.transition("connected",a.data.socket_id);else if(a.event==="pusher:error")switch(d.emit("error",{type:"PusherError",data:a.data}),
a.data.code){case 4E3:b.warn(a.data.message);d.compulsorySecure=!0;d.connectionSecure=!0;d.options.encrypted=!0;break;case 4001:d._machine.transition("permanentlyClosing")}}function x(a){p();a=q(a);if(a!==void 0){b.debug("Event recd",a);switch(a.event){case "pusher:error":d.emit("error",{type:"PusherError",data:a.data});break;case "pusher:ping":d.send_event("pusher:pong",{})}d.emit("message",a)}}function q(a){try{var b=JSON.parse(a.data);if(typeof b.data==="string")try{b.data=JSON.parse(b.data)}catch(c){if(!(c instanceof
SyntaxError))throw c;}return b}catch(e){d.emit("error",{type:"MessageParseError",error:e,data:a.data})}}function m(){d._machine.transition("waiting")}function n(){d.emit("error",{type:"WebSocketError"});d.socket.close();d._machine.transition("impermanentlyClosing")}function j(a,c){if(d.state!==a){var e=d.state;d.state=a;b.debug("State changed",e+" -> "+a);d.emit("state_change",{previous:e,current:a});d.emit(a,c)}}var d=this;b.EventsDispatcher.call(this);this.options=b.Util.extend({encrypted:!1},r);
this.netInfo=new b.NetInfo;this.netInfo.bind("online",function(){d._machine.is("waiting")&&(d._machine.transition("connecting"),j("connecting"))});this.netInfo.bind("offline",function(){if(d._machine.is("connected"))d.socket.onclose=void 0,d.socket.onmessage=void 0,d.socket.onerror=void 0,d.socket.onopen=void 0,d.socket.close(),d.socket=void 0,d._machine.transition("waiting")});this._machine=new b.Machine("initialized",e,{initializedPre:function(){d.compulsorySecure=d.options.encrypted;d.key=c;d.socket=
null;d.socket_id=null;d.state="initialized"},waitingPre:function(){d.connectionWait>0&&d.emit("connecting_in",d.connectionWait);d.netInfo.isOnLine()===!1||d.connectionAttempts>4?j("unavailable"):j("connecting");if(d.netInfo.isOnLine()===!0)d._waitingTimer=setTimeout(function(){d._machine.transition("connecting")},d.connectionWait)},waitingExit:function(){clearTimeout(d._waitingTimer)},connectingPre:function(){if(d.netInfo.isOnLine()===!1)d._machine.transition("waiting"),j("unavailable");else{var a;
a=b.ws_port;var c="ws://";if(d.connectionSecure||document.location.protocol==="https:")a=b.wss_port,c="wss://";a=c+b.host+":"+a+"/app/"+d.key+"?client=js&version="+b.VERSION;b.debug("Connecting",a);d.socket=new b.Transport(a);d.socket.onopen=v;d.socket.onclose=m;d.socket.onerror=n;d._connectingTimer=setTimeout(o,d.openTimeout)}},connectingExit:function(){clearTimeout(d._connectingTimer)},connectingToWaiting:function(){k()},connectingToImpermanentlyClosing:function(){k()},openPre:function(){d.socket.onmessage=
w;d.socket.onerror=n;d.socket.onclose=m;d._openTimer=setTimeout(o,d.connectedTimeout)},openExit:function(){clearTimeout(d._openTimer)},openToWaiting:function(){k()},openToImpermanentlyClosing:function(){k()},connectedPre:function(b){d.socket_id=b;d.socket.onmessage=x;d.socket.onerror=n;d.socket.onclose=m;a(d);p()},connectedPost:function(){j("connected")},connectedExit:function(){d._activityTimer&&clearTimeout(d._activityTimer);j("disconnected")},impermanentlyClosingPost:function(){if(d.socket)d.socket.onclose=
m,d.socket.close()},permanentlyClosingPost:function(){d.socket?(d.socket.onclose=function(){a(d);d._machine.transition("permanentlyClosed")},d.socket.close()):(a(d),d._machine.transition("permanentlyClosed"))},failedPre:function(){j("failed");b.debug("WebSockets are not available in this browser.")}})}var b=this.Pusher,e={initialized:["waiting","failed"],waiting:["connecting","permanentlyClosed"],connecting:["open","permanentlyClosing","impermanentlyClosing","waiting"],open:["connected","permanentlyClosing",
"impermanentlyClosing","waiting"],connected:["permanentlyClosing","impermanentlyClosing","waiting"],impermanentlyClosing:["waiting","permanentlyClosing"],permanentlyClosing:["permanentlyClosed"],permanentlyClosed:["waiting"],failed:["permanentlyClosing"]},f=2E3,g=2E3,h=2E3,s=5*f,t=5*g,u=5*h;c.prototype.connect=function(){b.Transport===null||b.Transport===void 0?this._machine.transition("failed"):this._machine.is("initialized")?(a(this),this._machine.transition("waiting")):this._machine.is("waiting")&&
this.netInfo.isOnLine()===!0?this._machine.transition("connecting"):this._machine.is("permanentlyClosed")&&this._machine.transition("waiting")};c.prototype.send=function(a){return this._machine.is("connected")?(this.socket.send(a),!0):!1};c.prototype.send_event=function(a,c,e){a={event:a,data:c};e&&(a.channel=e);b.debug("Event sent",a);return this.send(JSON.stringify(a))};c.prototype.disconnect=function(){this._machine.is("permanentlyClosed")||(this._machine.is("waiting")?this._machine.transition("permanentlyClosed"):
this._machine.transition("permanentlyClosing"))};b.Util.extend(c.prototype,b.EventsDispatcher.prototype);this.Pusher.Connection=c}).call(this);Pusher.Channels=function(){this.channels={}};Pusher.Channels.prototype={add:function(a,c){var b=this.find(a);b||(b=Pusher.Channel.factory(a,c),this.channels[a]=b);return b},find:function(a){return this.channels[a]},remove:function(a){delete this.channels[a]},disconnect:function(){for(var a in this.channels)this.channels[a].disconnect()}};
Pusher.Channel=function(a,c){var b=this;Pusher.EventsDispatcher.call(this,function(b){Pusher.debug("No callbacks on "+a+" for "+b)});this.pusher=c;this.name=a;this.subscribed=!1;this.bind("pusher_internal:subscription_succeeded",function(a){b.onSubscriptionSucceeded(a)})};
Pusher.Channel.prototype={init:function(){},disconnect:function(){},onSubscriptionSucceeded:function(){this.subscribed=!0;this.emit("pusher:subscription_succeeded")},authorize:function(a,c){c(!1,{})},trigger:function(a,c){return this.pusher.send_event(a,c,this.name)}};Pusher.Util.extend(Pusher.Channel.prototype,Pusher.EventsDispatcher.prototype);Pusher.auth_callbacks={};
Pusher.authorizers={ajax:function(a,c){var b;b=Pusher.XHR?new Pusher.XHR:window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");b.open("POST",Pusher.channel_auth_endpoint,!0);b.setRequestHeader("Content-Type","application/x-www-form-urlencoded");b.onreadystatechange=function(){if(b.readyState==4)if(b.status==200){var a,f=!1;try{a=JSON.parse(b.responseText),f=!0}catch(g){c(!0,"JSON returned from webapp was invalid, yet status code was 200. Data was: "+b.responseText)}f&&
c(!1,a)}else Pusher.warn("Couldn't get auth info from your webapp",status),c(!0,b.status)};b.send("socket_id="+encodeURIComponent(a.connection.socket_id)+"&channel_name="+encodeURIComponent(this.name))},jsonp:function(a,c){var b="socket_id="+encodeURIComponent(a.connection.socket_id)+"&channel_name="+encodeURIComponent(this.name),e=document.createElement("script");Pusher.auth_callbacks[this.name]=function(a){c(!1,a)};e.src=Pusher.channel_auth_endpoint+"?callback="+encodeURIComponent("Pusher.auth_callbacks['"+
this.name+"']")+"&"+b;b=document.getElementsByTagName("head")[0]||document.documentElement;b.insertBefore(e,b.firstChild)}};Pusher.Channel.PrivateChannel={authorize:function(a,c){Pusher.authorizers[Pusher.channel_auth_transport].scopedTo(this)(a,c)}};
Pusher.Channel.PresenceChannel={init:function(){this.bind("pusher_internal:member_added",function(a){this.emit("pusher:member_added",this.members.add(a.user_id,a.user_info))}.scopedTo(this));this.bind("pusher_internal:member_removed",function(a){(a=this.members.remove(a.user_id))&&this.emit("pusher:member_removed",a)}.scopedTo(this))},disconnect:function(){this.members.clear()},onSubscriptionSucceeded:function(a){this.members._members_map=a.presence.hash;this.members.count=a.presence.count;this.subscribed=
!0;this.emit("pusher:subscription_succeeded",this.members)},members:{_members_map:{},count:0,each:function(a){for(var c in this._members_map)a({id:c,info:this._members_map[c]})},add:function(a,c){this._members_map[a]=c;this.count++;return this.get(a)},remove:function(a){var c=this.get(a);c&&(delete this._members_map[a],this.count--);return c},get:function(a){return this._members_map.hasOwnProperty(a)?{id:a,info:this._members_map[a]}:null},clear:function(){this._members_map={};this.count=0}}};
Pusher.Channel.factory=function(a,c){var b=new Pusher.Channel(a,c);a.indexOf("private-")===0?Pusher.Util.extend(b,Pusher.Channel.PrivateChannel):a.indexOf("presence-")===0&&(Pusher.Util.extend(b,Pusher.Channel.PrivateChannel),Pusher.Util.extend(b,Pusher.Channel.PresenceChannel));b.init();return b};
var _require=function(){var a;a=document.addEventListener?function(a,b){a.addEventListener("load",b,!1)}:function(a,b){a.attachEvent("onreadystatechange",function(){(a.readyState=="loaded"||a.readyState=="complete")&&b()})};return function(c,b){function e(b,c){var c=c||function(){},e=document.getElementsByTagName("head")[0],h=document.createElement("script");h.setAttribute("src",b);h.setAttribute("type","text/javascript");h.setAttribute("async",!0);a(h,function(){var a=c;f++;g==f&&setTimeout(a,0)});
e.appendChild(h)}for(var f=0,g=c.length,h=0;h<g;h++)e(c[h],b)}}();
(function(){var a=(document.location.protocol=="http:"?Pusher.cdn_http:Pusher.cdn_https)+Pusher.VERSION,c=[];window.JSON===void 0&&c.push(a+"/json2"+Pusher.dependency_suffix+".js");if(window.WebSocket===void 0&&window.MozWebSocket===void 0)window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION=!0,c.push(a+"/flashfallback"+Pusher.dependency_suffix+".js");var b=function(){return window.WebSocket===void 0&&window.MozWebSocket===void 0?function(){window.WebSocket!==void 0&&window.MozWebSocket===void 0?(Pusher.Transport=
window.WebSocket,Pusher.TransportType="flash",window.WEB_SOCKET_SWF_LOCATION=a+"/WebSocketMain.swf",WebSocket.__addTask(function(){Pusher.ready()}),WebSocket.__initialize()):(Pusher.Transport=null,Pusher.TransportType="none",Pusher.ready())}:function(){Pusher.Transport=window.MozWebSocket!==void 0?window.MozWebSocket:window.WebSocket;Pusher.TransportType="native";Pusher.ready()}}(),e=function(a){var b=function(){document.body?a():setTimeout(b,0)};b()},f=function(){e(b)};c.length>0?_require(c,f):f()})();
