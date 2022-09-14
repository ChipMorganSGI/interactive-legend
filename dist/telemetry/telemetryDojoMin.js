define(function () {
    "use strict";
    function e(e, t) { var n = new XMLHttpRequest; n.addEventListener("load", function () { t(n.responseText); }), n.open(e.method, e.url), Object.keys(e.headers).forEach(function (t) { n.setRequestHeader(t, e.headers[t]); }), n.send(e.body); }
    function t(e, t) { var r = q.get(j); if (r && Date.now() / 1e3 < r.Expiration)
        return t(r); n(e, function (e) { q.set(j, e), t(e); }); }
    function n(t, n) { var i = D({}, N); i.headers["X-Amz-Target"] = "AWSCognitoIdentityService.GetId", i.body = JSON.stringify({ IdentityPoolId: t }), e(i, function (e) { r(JSON.parse(e), n); }); }
    function r(t, n) { var r = D({}, N); r.headers["X-Amz-Target"] = "AWSCognitoIdentityService.GetCredentialsForIdentity", r.body = JSON.stringify({ IdentityId: t.IdentityId }), e(r, function (e) { var t = JSON.parse(e); n(t.Credentials); }); }
    function i() { return { session: o(), id: s() }; }
    function o() { var e = void 0, t = q.get(M); return (!t || Date.now() > t.expiration) && (e = !0, t = a()), t.expiration = Date.now() + L, q.set(M, t), e && (t.new = !0), t; }
    function s() { var e = q.get(R); return e || (e = c(), q.set(R, e)), e; }
    function a() { return { id: Math.floor(17592186044416 * (1 + Math.random())).toString(16), startTimestamp: (new Date).toISOString() }; }
    function c() { return u() + u() + "-" + u() + "-" + u() + "-" + u() + "-" + u() + u() + u(); }
    function u() { return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1); }
    function l(e, t) { var n = { host: t.uri.host, "content-type": e.config.defaultContentType, accept: e.config.defaultAcceptType, "x-amz-date": p(t.signDate) }; t.request.method = t.request.method.toUpperCase(), t.request.body ? t.payload = t.request.body : t.request.data && e.payloadSerializer ? t.payload = e.payloadSerializer(t.request.data) : delete n["content-type"], t.request.headers = w(n, Object.keys(t.request.headers || {}).reduce(function (e, n) { return e[n.toLowerCase()] = t.request.headers[n], e; }, {})), t.sortedHeaderKeys = Object.keys(t.request.headers).sort(), t.request.headers["content-type"] && (t.request.headers["content-type"] = t.request.headers["content-type"].split(";")[0]), "object" === P(t.request.params) && w(t.uri.queryParams, t.request.params); }
    function h(e, t) { t.signedHeaders = t.sortedHeaderKeys.map(function (e) { return e.toLowerCase(); }).join(";"), t.canonicalRequest = String(t.request.method).toUpperCase() + "\n" + encodeURI(t.uri.path) + "\n" + Object.keys(t.uri.queryParams).sort().map(function (e) { return encodeURIComponent(e) + "=" + encodeURIComponent(t.uri.queryParams[e]); }).join("&") + "\n" + t.sortedHeaderKeys.map(function (e) { return e.toLocaleLowerCase() + ":" + t.request.headers[e]; }).join("\n") + "\n\n" + t.signedHeaders + "\n" + e.hasher.hash(t.payload ? t.payload : ""); }
    function f(e, t) { t.credentialScope = [p(t.signDate, !0), e.config.region, e.config.service, "aws4_request"].join("/"), t.stringToSign = "AWS4-HMAC-SHA256\n" + p(t.signDate) + "\n" + t.credentialScope + "\n" + e.hasher.hash(t.canonicalRequest); }
    function d(e, t) { var n = e.hasher.hmac, r = n(n(n(n("AWS4" + e.config.secretAccessKey, p(t.signDate, !0), { hexOutput: !1 }), e.config.region, { hexOutput: !1, textInput: !1 }), e.config.service, { hexOutput: !1, textInput: !1 }), "aws4_request", { hexOutput: !1, textInput: !1 }); t.signature = n(r, t.stringToSign, { textInput: !1 }); }
    function g(e, t) { t.authorization = "AWS4-HMAC-SHA256 Credential=" + e.config.accessKeyId + "/" + t.credentialScope + ", SignedHeaders=" + t.signedHeaders + ", Signature=" + t.signature; }
    function p(e, t) { var n = e.toISOString().replace(/[:\-]|\.\d{3}/g, "").substr(0, 17); return t ? n.substr(0, 8) : n; }
    function y() { return function (e) { return JSON.stringify(e); }; }
    function v() { function e(e) { return /^\??(.*)$/.exec(e)[1].split("&").reduce(function (e, t) { return t = /^(.+)=(.*)$/.exec(t), t && (e[t[1]] = t[2]), e; }, {}); } var t = document ? document.createElement("a") : {}; return function (n) { return t.href = n, { protocol: t.protocol, host: t.host.replace(/^(.*):((80)|(443))$/, "$1"), path: ("/" !== t.pathname.charAt(0) ? "/" : "") + t.pathname, queryParams: e(t.search) }; }; }
    function m() { return { hash: function (e, t) { t = w({ hexOutput: !0, textInput: !0 }, t); var n = U.SHA256(e); return t.hexOutput ? n.toString(U.enc.Hex) : n; }, hmac: function (e, t, n) { n = w({ hexOutput: !0, textInput: !0 }, n); var r = U.HmacSHA256(t, e, { asBytes: !0 }); return n.hexOutput ? r.toString(U.enc.Hex) : r; } }; }
    function w(e) { return [].slice.call(arguments, 1).forEach(function (t) { t && "object" === (void 0 === t ? "undefined" : P(t)) && Object.keys(t).forEach(function (n) { var r = t[n]; void 0 !== r && (null !== r && "object" === (void 0 === r ? "undefined" : P(r)) ? (e[n] = Array.isArray(r) ? [] : {}, w(e[n], r)) : e[n] = r); }); }), e; }
    function S(e, t) { if (void 0 === e || !e)
        throw new Error(t); }
    function k(e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = i().session; return { eventType: "pageView", timestamp: (new Date).toISOString(), session: { id: r.id, startTimestamp: r.startTimestamp }, attributes: D({ referrer: document.referrer, hostname: window.location.hostname, path: e || window.location.pathname, pageUrl: e || window.location.pathname, pageName: document.title, previousPageUrl: t.pageUrl, previousPageName: t.pageName }, _(n)), metrics: E(n) }; }
    function b(e) { var t = i().session; return { eventType: e.eventType || "other", timestamp: (new Date).toISOString(), session: { id: t.id, startTimestamp: t.startTimestamp }, attributes: D({ referrer: document.referrer, hostname: window.location.hostname, path: window.location.pathname }, _(e)), metrics: E(e) }; }
    function _(e) { var t = D({}, e); return delete t.workflow, J.forEach(function (e) { return delete t[e]; }), Object.keys(t).forEach(function (e) { t[e] = "json" === e ? t[e] ? JSON.stringify(t[e]) : "null" : void 0 !== t[e] ? t[e].toString() : "null"; }), t; }
    function E(e) { var t = {}; return J.forEach(function (n) { e[n] && (t[n] = e[n]); }), t; }
    function T() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], n = { region: "us-east-1", service: "mobileanalytics", accessKeyId: e.AccessKeyId, secretAccessKey: e.SecretKey, sessionToken: e.SessionToken }; return new F(n).sign(t); }
    function O(e, t) { return JSON.stringify({ client: { client_id: e, app_title: t.name, app_version_name: t.version || "unknown" }, services: { mobile_analytics: { app_id: t.id } } }); }
    function I(n, r, o) { var s = i(); n = Array.isArray(n) ? n : [n]; var a = x(n); t(r, function (t) { try {
        a.headers = T(t, a), a.headers["x-amz-Client-Context"] = O(s.id, o);
    }
    catch (e) {
        return void console.error(e);
    } e(a, function (e) { e && console.error(JSON.parse(e)); }); }); }
    function x(e) { return { url: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Y, method: "POST", body: JSON.stringify({ events: e }) }; }
    function A(e) { window.ga ? window.ga(function () { e(window.ga.getAll()); }) : console.log(new Error("Google Analytics trackers not available")); }
    function z(e, t) { var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}; return H({ hitType: "pageview", page: e || window.location.pathname }, t, n, r); }
    function C(e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}; return H({ hitType: "event", eventCategory: e.category || "none", eventAction: e.action, eventLabel: e.label }, e, t, n); }
    function H(e, t, n, r) { var i = e; return Object.keys(n).forEach(function (e) { i["dimension" + n[e]] = t[e]; }), Object.keys(r).forEach(function (e) { i["metric" + r[e]] = t[e]; }), i; }
    var q = { storage: {}, memory: !0, get: function (e) { var t = void 0; try {
            t = window.localStorage && window.localStorage.getItem(e) || this.storage[e];
        }
        catch (n) {
            t = this.storage[e];
        } if (t)
            try {
                return JSON.parse(t);
            }
            catch (e) {
                return;
            } }, set: function (e, t) { t = JSON.stringify(t); try {
            window.localStorage.setItem(e, t);
        }
        catch (n) {
            this.memory || (console.error("setting local storage failed, falling back to in-memory storage"), this.memory = !0), this.storage[e] = t;
        } }, delete: function (e) { try {
            window.localStorage.removeItem(e);
        }
        catch (t) {
            this.memory || (console.error("setting local storage failed, falling back to in-memory storage"), this.memory = !0), delete this.storage[e];
        } } }, P = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; }, W = function (e, t) { if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function"); }, B = function () { function e(e, t) { for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    } } return function (t, n, r) { return n && e(t.prototype, n), r && e(t, r), t; }; }(), D = Object.assign || function (e) { for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    } return e; }, j = "TELEMETRY_COGNITO_CREDENTIALS", N = { method: "POST", url: "https://cognito-identity.us-east-1.amazonaws.com/", headers: { "Content-type": "application/x-amz-json-1.1" } }, L = 18e5, M = "TELEMETRY_SESSION", R = "TELEMETRY_CLIENT_ID", U = function (e, t) { var n = {}, r = n.lib = {}, i = function () { }, o = r.Base = { extend: function (e) { i.prototype = this; var t = new i; return e && t.mixIn(e), t.hasOwnProperty("init") || (t.init = function () { t.$super.init.apply(this, arguments); }), t.init.prototype = t, t.$super = this, t; }, create: function () { var e = this.extend(); return e.init.apply(e, arguments), e; }, init: function () { }, mixIn: function (e) { for (var t in e)
            e.hasOwnProperty(t) && (this[t] = e[t]); e.hasOwnProperty("toString") && (this.toString = e.toString); }, clone: function () { return this.init.prototype.extend(this); } }, s = r.WordArray = o.extend({ init: function (e, t) { e = this.words = e || [], this.sigBytes = void 0 != t ? t : 4 * e.length; }, toString: function (e) { return (e || c).stringify(this); }, concat: function (e) { var t = this.words, n = e.words, r = this.sigBytes; if (e = e.sigBytes, this.clamp(), r % 4)
            for (var i = 0; i < e; i++)
                t[r + i >>> 2] |= (n[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 24 - (r + i) % 4 * 8;
        else if (n.length > 65535)
            for (i = 0; i < e; i += 4)
                t[r + i >>> 2] = n[i >>> 2];
        else
            t.push.apply(t, n); return this.sigBytes += e, this; }, clamp: function () { var t = this.words, n = this.sigBytes; t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4); }, clone: function () { var e = o.clone.call(this); return e.words = this.words.slice(0), e; }, random: function (t) { for (var n = [], r = 0; r < t; r += 4)
            n.push(4294967296 * e.random() | 0); return new s.init(n, t); } }), a = n.enc = {}, c = a.Hex = { stringify: function (e) { var t = e.words; e = e.sigBytes; for (var n = [], r = 0; r < e; r++) {
            var i = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
            n.push((i >>> 4).toString(16)), n.push((15 & i).toString(16));
        } return n.join(""); }, parse: function (e) { for (var t = e.length, n = [], r = 0; r < t; r += 2)
            n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4; return new s.init(n, t / 2); } }, u = a.Latin1 = { stringify: function (e) { var t = e.words; e = e.sigBytes; for (var n = [], r = 0; r < e; r++)
            n.push(String.fromCharCode(t[r >>> 2] >>> 24 - r % 4 * 8 & 255)); return n.join(""); }, parse: function (e) { for (var t = e.length, n = [], r = 0; r < t; r++)
            n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8; return new s.init(n, t); } }, l = a.Utf8 = { stringify: function (e) { try {
            return decodeURIComponent(escape(u.stringify(e)));
        }
        catch (e) {
            throw Error("Malformed UTF-8 data");
        } }, parse: function (e) { return u.parse(unescape(encodeURIComponent(e))); } }, h = r.BufferedBlockAlgorithm = o.extend({ reset: function () { this._data = new s.init, this._nDataBytes = 0; }, _append: function (e) { "string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes; }, _process: function (t) { var n = this._data, r = n.words, i = n.sigBytes, o = this.blockSize, a = i / (4 * o), a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0); if (t = a * o, i = e.min(4 * t, i), t) {
            for (var c = 0; c < t; c += o)
                this._doProcessBlock(r, c);
            c = r.splice(0, t), n.sigBytes -= i;
        } return new s.init(c, i); }, clone: function () { var e = o.clone.call(this); return e._data = this._data.clone(), e; }, _minBufferSize: 0 }); r.Hasher = h.extend({ cfg: o.extend(), init: function (e) { this.cfg = this.cfg.extend(e), this.reset(); }, reset: function () { h.reset.call(this), this._doReset(); }, update: function (e) { return this._append(e), this._process(), this; }, finalize: function (e) { return e && this._append(e), this._doFinalize(); }, blockSize: 16, _createHelper: function (e) { return function (t, n) { return new e.init(n).finalize(t); }; }, _createHmacHelper: function (e) { return function (t, n) { return new f.HMAC.init(e, n).finalize(t); }; } }); var f = n.algo = {}; return n; }(Math);
    !function (e) { for (var t = U, n = t.lib, r = n.WordArray, i = n.Hasher, n = t.algo, o = [], s = [], a = function (e) { return 4294967296 * (e - (0 | e)) | 0; }, c = 2, u = 0; u < 64;) {
        var l;
        e: {
            l = c;
            for (var h = e.sqrt(l), f = 2; f <= h; f++)
                if (!(l % f)) {
                    l = !1;
                    break e;
                }
            l = !0;
        }
        l && (u < 8 && (o[u] = a(e.pow(c, .5))), s[u] = a(e.pow(c, 1 / 3)), u++), c++;
    } var d = [], n = n.SHA256 = i.extend({ _doReset: function () { this._hash = new r.init(o.slice(0)); }, _doProcessBlock: function (e, t) { for (var n = this._hash.words, r = n[0], i = n[1], o = n[2], a = n[3], c = n[4], u = n[5], l = n[6], h = n[7], f = 0; f < 64; f++) {
            if (f < 16)
                d[f] = 0 | e[t + f];
            else {
                var g = d[f - 15], p = d[f - 2];
                d[f] = ((g << 25 | g >>> 7) ^ (g << 14 | g >>> 18) ^ g >>> 3) + d[f - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + d[f - 16];
            }
            g = h + ((c << 26 | c >>> 6) ^ (c << 21 | c >>> 11) ^ (c << 7 | c >>> 25)) + (c & u ^ ~c & l) + s[f] + d[f], p = ((r << 30 | r >>> 2) ^ (r << 19 | r >>> 13) ^ (r << 10 | r >>> 22)) + (r & i ^ r & o ^ i & o), h = l, l = u, u = c, c = a + g | 0, a = o, o = i, i = r, r = g + p | 0;
        } n[0] = n[0] + r | 0, n[1] = n[1] + i | 0, n[2] = n[2] + o | 0, n[3] = n[3] + a | 0, n[4] = n[4] + c | 0, n[5] = n[5] + u | 0, n[6] = n[6] + l | 0, n[7] = n[7] + h | 0; }, _doFinalize: function () { var t = this._data, n = t.words, r = 8 * this._nDataBytes, i = 8 * t.sigBytes; return n[i >>> 5] |= 128 << 24 - i % 32, n[14 + (i + 64 >>> 9 << 4)] = e.floor(r / 4294967296), n[15 + (i + 64 >>> 9 << 4)] = r, t.sigBytes = 4 * n.length, this._process(), this._hash; }, clone: function () { var e = i.clone.call(this); return e._hash = this._hash.clone(), e; } }); t.SHA256 = i._createHelper(n), t.HmacSHA256 = i._createHmacHelper(n); }(Math), function () { var e = U, t = e.enc.Utf8; e.algo.HMAC = e.lib.Base.extend({ init: function (e, n) { e = this._hasher = new e.init, "string" == typeof n && (n = t.parse(n)); var r = e.blockSize, i = 4 * r; n.sigBytes > i && (n = e.finalize(n)), n.clamp(); for (var o = this._oKey = n.clone(), s = this._iKey = n.clone(), a = o.words, c = s.words, u = 0; u < r; u++)
            a[u] ^= 1549556828, c[u] ^= 909522486; o.sigBytes = s.sigBytes = i, this.reset(); }, reset: function () { var e = this._hasher; e.reset(), e.update(this._iKey); }, update: function (e) { return this._hasher.update(e), this; }, finalize: function (e) { var t = this._hasher; return e = t.finalize(e), t.reset(), t.finalize(this._oKey.clone().concat(e)); } }); }();
    var K = { region: "eu-west-1", service: "execute-api", defaultContentType: "application/json", defaultAcceptType: "application/json", payloadSerializerFactory: y, uriParserFactory: v, hasherFactory: m }, F = function () { function e(t) { W(this, e), this.config = w({}, K, t), this.payloadSerializer = this.config.payloadSerializer || this.config.payloadSerializerFactory(), this.uriParser = this.config.uriParserFactory(), this.hasher = this.config.hasherFactory(), S(this.config.accessKeyId, "AwsSigner requires AWS AccessKeyID"), S(this.config.secretAccessKey, "AwsSigner requires AWS SecretAccessKey"); } return B(e, [{ key: "sign", value: function (e, t) { var n = { request: w({}, e), signDate: t || new Date, uri: this.uriParser(e.url) }; return l(this, n), h(this, n), f(this, n), d(this, n), g(this, n), { Accept: n.request.headers.accept, Authorization: n.authorization, "Content-Type": n.request.headers["content-type"], "x-amz-date": n.request.headers["x-amz-date"], "x-amz-security-token": this.config.sessionToken || void 0 }; } }]), e; }(), J = ["size", "duration", "position", "number", "count"], Y = "https://mobileanalytics.us-east-1.amazonaws.com/2014-06-05/events", $ = function () { function e(t) { W(this, e), this.name = "amazon", D(this, t), i().session.new && !t.test && this.logEvent({ eventType: "_session.start" }); } return B(e, [{ key: "logPageView", value: function (e, t) { var n = k(e, this.previousPage, t); I(n, this.userPoolID, this.app), this.previousPage = n.attributes; } }, { key: "logEvent", value: function (e) { I(b(e), this.userPoolID, this.app); } }]), e; }(), V = function () { function e() { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; W(this, e), this.name = "google", D(this, t); } return B(e, [{ key: "logPageView", value: function (e, t) { var n = z(e, t, this.dimensions, this.metrics); A(function (e) { e.forEach(function (e) { e.send(n); }); }); } }, { key: "logEvent", value: function (e) { var t = C(e, this.dimensions, this.metrics); A(function (e) { e.forEach(function (e) { e.send(t); }); }); } }]), e; }(), G = function (e) { if (e)
        return U.SHA256(e).toString(U.enc.Hex); }, X = ["esri.com", "esriuk.com", "esri.de", "esri.ca", "esrifrance.fr", "esri.nl", "esri-portugal.pt", "esribulgaria.com", "esri.fi", "esri.kr", "esrimalaysia.com.my", "esri.es", "esriaustralia.com.au", "esri-southafrica.com", "esri.cl", "esrichina.com.cn", "esri.co", "esriturkey.com.tr", "geodata.no", "esriitalia.it", "esri.pl"], Q = function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.portal || {}; return !e.disabled && ("1" !== navigator.doNotTrack && "1" !== window.doNotTrack && ((void 0 === t.eueiEnabled || !1 !== t.eueiEnabled) && (!(!t.eueiEnabled || !t.user || t.user.orgId !== t.id) || (!(!t.user || t.user.orgId || "US" !== t.ipCntryCode) || (!t.user && "US" === t.ipCntryCode || !(Object.keys(t).length > 0)))))); };
    return function () { function e(t) { W(this, e); try {
        if (this.trackers = [], this.workflows = {}, this.test = t.test, this.debug = t.debug, this.disabled = !Q(t), this.disabled && console.log("Telemetry Disabled"), t.portal && t.portal.user) {
            var n = t.portal.subscriptionInfo || {};
            this.setUser(t.portal.user, n.type);
        }
        else
            t.user && this.setUser(t.user);
        this.disabled || this._initTrackers(t);
    }
    catch (e) {
        console.error("Telemetry Disabled"), console.error(e), this.disabled = !0;
    } } return B(e, [{ key: "_initTrackers", value: function (e) { if (e.amazon) {
                var t = new $(e.amazon);
                this.trackers.push(t);
            } if (e.google) {
                var n = new V(e.google);
                this.trackers.push(n);
            } this.trackers.length || console.error(new Error("No trackers configured")); } }, { key: "setUser", value: function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "Public"; e = "string" == typeof e ? { username: e } : e, this.user = e, this.user.accountType = t; var n = void 0; if (e.email && e.email.split) {
                var r = e.email.split("@")[1];
                n = X.filter(function (e) { return r === e; }).length > 0;
            } (n || ["In House", "Demo and Marketing"].indexOf(t) > -1) && (this.user.internalUser = !0); } }, { key: "logPageView", value: function (e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = this.preProcess(t); if (this.debug)
                console.log("Tracking page view", JSON.stringify(n));
            else if (this.test && !this.disabled)
                return n; return !this.trackers.length || this.disabled ? (this.disabled || console.error(new Error("Page view was not logged because no trackers are configured.")), !1) : (this.trackers.forEach(function (t) { try {
                t.logPageView(e, n);
            }
            catch (e) {
                console.error(t.name + " tracker failed to log page view.", e);
            } }), !0); } }, { key: "logEvent", value: function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = this.preProcess(e); if (this.debug)
                console.log("Tracking event", JSON.stringify(t));
            else if (this.test)
                return t; return !this.trackers.length || this.disabled ? (this.disabled || console.error(new Error("Event was not logged because no trackers are configured.")), !1) : (this.trackers.forEach(function (e) { try {
                e.logEvent(t);
            }
            catch (t) {
                console.error(e.name + " tracker failed to log event", t);
            } }), !0); } }, { key: "logError", value: function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = D({ eventType: "error" }, e); this.logEvent(t); } }, { key: "startWorkflow", value: function (e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = { name: e, start: Date.now(), steps: [], workflowId: Math.floor(17592186044416 * (1 + Math.random())).toString(16) }; this._saveWorkflow(n); var r = D({ name: e, step: "start" }, t); return this._logWorkflow(r), n; } }, { key: "stepWorkflow", value: function (e, t) { var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = "string" == typeof options ? n : n.details, i = D({ name: e, step: t, details: r }, n); this._logWorkflow(i); } }, { key: "endWorkflow", value: function (e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = D({ name: e, step: "finish" }, t); this._logWorkflow(n); } }, { key: "cancelWorkflow", value: function (e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = D({ name: e, step: "cancel" }, t); this._logWorkflow(n); } }, { key: "getWorkflow", value: function (e) { var t = q.get("TELEMETRY-WORKFLOW:" + e); if (t) {
                if (Date.now() - t.start < 18e5)
                    return t;
                this._deleteWorkflow(t);
            } } }, { key: "_saveWorkflow", value: function (e) { q.set("TELEMETRY-WORKFLOW:" + e.name, e); } }, { key: "_deleteWorkflow", value: function (e) { q.delete("TELEMETRY-WORKFLOW:" + e.name); } }, { key: "_logWorkflow", value: function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; e = this.preProcess(e); var t = this.getWorkflow(e.name); t || (this.startWorkflow(e.name), t = this.getWorkflow(e.name)), t.steps.push(e.step), t.duration = (Date.now() - t.start) / 1e3, ["cancel", "finish"].indexOf(e.step) > -1 ? this._deleteWorkflow(t) : this._saveWorkflow(t); var n = D(e, { eventType: "workflow", category: e.name, action: e.step, label: e.details, duration: t.duration, workflowId: t.workflowId }); this.logEvent(n); } }, { key: "preProcess", value: function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = {}; return this.user && (t = { user: G(this.user.username), orgId: G(this.user.orgId), lastLogin: this.user.lastLogin, userSince: this.user.created, internalUser: this.user.internalUser || !1, accountType: this.user.accountType }), D({}, e, t); } }]), e; }();
});
//# sourceMappingURL=telemetry.dojo.min.js.map
