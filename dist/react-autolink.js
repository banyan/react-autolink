!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react")):"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?exports.ReactAutolink=e(require("react")):t.ReactAutolink=e(t.React)}(this,function(t){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";function n(){var t=/((?:https?:\/\/)?(?:(?:[a-z0-9][a-z0-9\-]{1,61}[a-z0-9]\.)+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?-]*)/gi,e=function(t,e){return t.slice(0,e.length)===e};return{autolink:function(r){var n=void 0===arguments[1]?{}:arguments[1];return r?r.split(t).map(function(r){var o=r.match(t);if(o){var c=o[0];return u.createElement("a",a({href:e(c,"http")?c:"http://"+c},n),c)}return r}):null}}}var o=function(t){return t&&t.__esModule?t["default"]:t},u=o(r(2)),a=o(r(1));t.exports=n()},function(t){"use strict";function e(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=Object.assign||function(t){for(var r,n,o=e(t),u=1;u<arguments.length;u++){r=arguments[u],n=Object.keys(Object(r));for(var a=0;a<n.length;a++)o[n[a]]=r[n[a]]}return o}},function(e){e.exports=t}])});