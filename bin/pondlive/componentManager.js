"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentManager = void 0;
var clientRouter_1 = require("./component/clientRouter");
var liveSocket_1 = require("./component/liveSocket");
var liveRouter_1 = require("./component/liveRouter");
var fs = __importStar(require("fs"));
var pondserver_1 = require("../pondserver");
var pondbase_1 = require("../pondbase");
var pondsocket_1 = require("../pondsocket");
var ComponentManager = /** @class */ (function () {
    function ComponentManager(path, component, props) {
        var _this = this;
        this._base = new pondbase_1.BaseClass();
        this._path = path.replace('//', '/');
        this._parentId = props.parentId;
        this._componentId = this._base.nanoId();
        this._component = component;
        this._pond = props.pond;
        this._chain = props.chain;
        this._sockets = new pondbase_1.PondBase();
        this._initialiseManager();
        this._htmlPath = props.htmlPath;
        this._pondLive = props.pondLive;
        var contexts = props.providers.concat(this._component.providers || []);
        if (this._component.onContextChange)
            contexts.forEach(function (context) { return context.subscribe(_this); });
        this._providers = contexts;
        this._innerManagers = (component.routes || []).map(function (route) { return new ComponentManager("".concat(path).concat(route.path), new route.Component(), {
            parentId: _this._componentId,
            pond: _this._pond,
            chain: _this._chain,
            htmlPath: props.htmlPath,
            pondLive: props.pondLive,
            providers: contexts
        }); });
    }
    ComponentManager.prototype.render = function (data, clientId, router) {
        return __awaiter(this, void 0, void 0, function () {
            var document, mountContext, innerHtml, _a, _b, manager, event_1, rendered, e_1_1, renderRoutes, socket, rendered;
            var e_1, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        document = this._sockets.find(function (c) { return c.socket.clientId === clientId; });
                        if (!document)
                            document = this._sockets.createDocument(function (doc) {
                                return {
                                    socket: new liveSocket_1.LiveSocket(clientId, _this._pondLive, _this, doc.removeDoc.bind(doc)),
                                    rendered: (0, pondserver_1.html)(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))),
                                    timer: null,
                                };
                            });
                        else if (document.doc.socket) {
                            this._clearShutDown(document);
                            document.doc.socket.downgrade();
                        }
                        mountContext = {
                            params: data.params,
                            path: data.address,
                            query: data.query
                        };
                        if (!this._component.mount) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._component.mount(mountContext, document.doc.socket, router)];
                    case 1:
                        _d.sent();
                        _d.label = 2;
                    case 2:
                        innerHtml = null;
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 8, 9, 10]);
                        _a = __values(this._innerManagers), _b = _a.next();
                        _d.label = 4;
                    case 4:
                        if (!!_b.done) return [3 /*break*/, 7];
                        manager = _b.value;
                        event_1 = this._base.getLiveRequest(manager._path, data.address);
                        if (!event_1) return [3 /*break*/, 6];
                        return [4 /*yield*/, manager.render(event_1, clientId, router)];
                    case 5:
                        rendered = _d.sent();
                        if (rendered) {
                            innerHtml = rendered;
                            return [3 /*break*/, 7];
                        }
                        _d.label = 6;
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        if (router.sentResponse)
                            return [2 /*return*/, null];
                        renderRoutes = function () { return (0, clientRouter_1.clientRouter)(_this._componentId, (innerHtml === null || innerHtml === void 0 ? void 0 : innerHtml.path) || '', (innerHtml === null || innerHtml === void 0 ? void 0 : innerHtml.rendered) || (0, pondserver_1.html)(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""])))); };
                        if (!document.doc.socket) return [3 /*break*/, 13];
                        socket = document.doc.socket;
                        return [4 /*yield*/, this._manageContext(socket, router)];
                    case 11:
                        _d.sent();
                        return [4 /*yield*/, this._renderComponent(document, renderRoutes)];
                    case 12:
                        rendered = _d.sent();
                        return [2 /*return*/, {
                                path: this._componentId,
                                rendered: rendered
                            }];
                    case 13: return [2 /*return*/, null];
                }
            });
        });
    };
    ComponentManager.prototype.handleEvent = function (event, clientId, router, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._onEvent(clientId, router, res, 'updated', function (socket) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, ((_a = this._component.onEvent) === null || _a === void 0 ? void 0 : _a.call(socket.context, event, socket, router))];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentManager.prototype.handleRendered = function (clientId, router, res, channel) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._onEvent(clientId, router, res, 'rendered', function (socket) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        socket.upgradeToWebsocket(channel);
                                        return [4 /*yield*/, this._manageContext(socket, router)];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, ((_a = this._component.onRendered) === null || _a === void 0 ? void 0 : _a.call(socket.context, socket, router))];
                                    case 2:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentManager.prototype.handleInfo = function (info, socket, router, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var document;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        document = this._sockets.find(function (c) { return c.socket.clientId === socket.clientId; });
                        if (!document)
                            return [2 /*return*/, socket.destroy()];
                        this._clearShutDown(document);
                        return [4 /*yield*/, ((_a = this._component.onInfo) === null || _a === void 0 ? void 0 : _a.call(socket.context, info, socket, router))];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this._pushToClient(router, document, 'updated', res)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentManager.prototype.handleContextChange = function (context, clientId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var document, _b, router, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        document = this._sockets.find(function (c) { return c.socket.clientId === clientId; });
                        if (!document || !document.doc.socket.isWebsocket)
                            return [2 /*return*/];
                        this._clearShutDown(document);
                        _b = document.doc.socket.createResponse(), router = _b.router, response = _b.response;
                        return [4 /*yield*/, ((_a = this._component.onContextChange) === null || _a === void 0 ? void 0 : _a.call(document.doc.socket.context, context, document.doc.socket, router))];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, this._pushToClient(router, document, 'updated', response)];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentManager.prototype.handleUnmount = function (clientId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var socket;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        socket = this._sockets.find(function (c) { return c.socket.clientId === clientId; });
                        if (!socket)
                            return [2 /*return*/];
                        return [4 /*yield*/, ((_a = this._component.onUnmount) === null || _a === void 0 ? void 0 : _a.call(socket.doc.socket.context, socket.doc.socket))];
                    case 1:
                        _b.sent();
                        this._shutDown(socket);
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentManager.prototype._renderHtml = function (renderedHtml, token, headers) {
        var _this = this;
        return new Promise(function (resolve) {
            fs.readFile(_this._htmlPath || '', "utf8", function (err, data) {
                if (err)
                    return resolve("\n                            <!DOCTYPE html>\n                            <html lang=\"en\">\n                                <head>\n                                    <meta charset=\"UTF-8\">\n                                    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                                    <title>".concat(headers.pageTitle || 'PondLive', "</title>\n                                    <script>window.token = \"").concat(token, "\";</script>\n                                </head>\n                                <body>\n                                    ").concat(renderedHtml.toString(), "\n                                    <script src=\"/pondLive.js\" defer=\"\"></script>\n                                </body>\n                            </html>"));
                resolve(data.replace(/<title>(.*?)<\/title>/, " <title>".concat(headers.pageTitle || 'PondLive', "</title>\n                        <script>window.token = \"").concat(token, "\";</script>"))
                    .replace('<body>', "<body>\n                                    ".concat(renderedHtml.toString(), "\n                                    <script src=\"/pondLive.js\" defer=\"\"></script>\n                               ")));
            });
        });
    };
    ComponentManager.prototype._manageContext = function (socket, router) {
        var e_2, _a;
        var _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, _d, provider, context_1, e_2_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!this._component.onContextChange) return [3 /*break*/, 13];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 7, 8, 13]);
                        _c = __asyncValues(this._providers);
                        _e.label = 2;
                    case 2: return [4 /*yield*/, _c.next()];
                    case 3:
                        if (!(_d = _e.sent(), !_d.done)) return [3 /*break*/, 6];
                        provider = _d.value;
                        return [4 /*yield*/, provider.getData(socket)];
                    case 4:
                        context_1 = _e.sent();
                        (_b = this._component.onContextChange) === null || _b === void 0 ? void 0 : _b.call(socket.context, context_1, socket, router);
                        _e.label = 5;
                    case 5: return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _e.trys.push([8, , 11, 12]);
                        if (!(_d && !_d.done && (_a = _c.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(_c)];
                    case 9:
                        _e.sent();
                        _e.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    ComponentManager.prototype._onEvent = function (clientId, router, res, responseEvent, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document = this._sockets.find(function (c) { return c.socket.clientId === clientId; });
                        if (!document)
                            throw new pondbase_1.PondError('Client not found', 404, clientId);
                        this._clearShutDown(document);
                        return [4 /*yield*/, callback(document.doc.socket)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._pushToClient(router, document, responseEvent, res)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentManager.prototype._pushToClient = function (router, document, responseEvent, res) {
        return __awaiter(this, void 0, void 0, function () {
            var renderRoutes, previousRender, renderContext, htmlData, previous, difference;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (router.sentResponse)
                            return [2 /*return*/];
                        renderRoutes = function () { return (0, clientRouter_1.clientRouter)(_this._componentId, 'BREAK', (0, pondserver_1.html)(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])))); };
                        previousRender = document.doc.rendered;
                        return [4 /*yield*/, this._renderComponent(document, renderRoutes)];
                    case 1:
                        renderContext = _a.sent();
                        htmlData = (0, clientRouter_1.clientRouter)(this._parentId, this._componentId, renderContext);
                        if (responseEvent === 'updated') {
                            previous = (0, clientRouter_1.clientRouter)(this._parentId, this._componentId, previousRender);
                            difference = previous.differentiate(htmlData);
                            if (this._base.isObjectEmpty(difference))
                                return [2 /*return*/];
                            res.send(responseEvent, { rendered: difference, path: this._componentId, headers: router.headers });
                        }
                        else
                            res.send(responseEvent, {
                                rendered: htmlData.getParts(),
                                path: this._componentId,
                                headers: router.headers
                            });
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentManager.prototype._renderComponent = function (document, renderRoutes) {
        return __awaiter(this, void 0, void 0, function () {
            var renderContext, css, styleObject, rendered, finalHtml;
            return __generator(this, function (_a) {
                renderContext = renderRoutes;
                css = (0, pondserver_1.CssGenerator)(this._parentId);
                styleObject = this._component.manageStyles ? this._component.manageStyles.call(document.doc.socket.context, css) : {
                    string: (0, pondserver_1.html)(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""]))),
                    classes: {}
                };
                rendered = this._component.render.call(document.doc.socket.context, renderContext, styleObject.classes);
                finalHtml = (0, pondserver_1.html)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["", "", ""], ["", "", ""])), styleObject.string, rendered);
                document.updateDoc({
                    socket: document.doc.socket,
                    rendered: finalHtml,
                    timer: document.doc.timer
                });
                return [2 /*return*/, finalHtml];
            });
        });
    };
    ComponentManager.prototype._initialiseHTTPManager = function () {
        var _this = this;
        this._chain.use(function (req, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var csrfToken, method, eventRequest, resolver, htmlData, res, router, headers, html_1, headers, html_2, htmlString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        csrfToken = req.headers['x-csrf-token'];
                        method = req.method || '';
                        if (!(method === 'GET' && req.clientId && req.token && req.url)) return [3 /*break*/, 8];
                        eventRequest = this._base.getLiveRequest(this._path, req.url);
                        resolver = this._base.generateEventRequest(this._path, req.url);
                        htmlData = null;
                        res = new pondserver_1.PondHTTPResponse(response);
                        router = new liveRouter_1.LiveRouter(res);
                        if (!(resolver && csrfToken === req.token)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.render(resolver, req.clientId, router)];
                    case 1:
                        htmlData = _a.sent();
                        if (router.sentResponse)
                            return [2 /*return*/];
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(eventRequest && !csrfToken)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.render(eventRequest, req.clientId, router)];
                    case 3:
                        htmlData = _a.sent();
                        if (router.sentResponse)
                            return [2 /*return*/];
                        return [3 /*break*/, 5];
                    case 4:
                        if (csrfToken !== req.token && resolver) {
                            res.status(403, 'Invalid CSRF Token')
                                .json({
                                error: 'Invalid CSRF token'
                            });
                        }
                        _a.label = 5;
                    case 5:
                        if (!htmlData) return [3 /*break*/, 8];
                        if (!csrfToken) return [3 /*break*/, 6];
                        headers = router.headers;
                        if (headers.pageTitle)
                            res.setHeader('x-page-title', headers.pageTitle);
                        if (headers.flashMessage)
                            res.setHeader('x-flash-message', headers.flashMessage);
                        res.setHeader('x-router-container', '#' + this._parentId);
                        html_1 = (0, clientRouter_1.clientRouter)(this._parentId, htmlData.path, htmlData.rendered);
                        return [2 /*return*/, res.html(html_1.toString())];
                    case 6:
                        headers = router.headers;
                        html_2 = (0, clientRouter_1.clientRouter)(this._parentId, htmlData.path, htmlData.rendered);
                        return [4 /*yield*/, this._renderHtml(html_2, req.token, headers)];
                    case 7:
                        htmlString = _a.sent();
                        return [2 /*return*/, res.html(htmlString)];
                    case 8:
                        next();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ComponentManager.prototype._initialiseSocketManager = function () {
        var _this = this;
        this._pond.on("mount/".concat(this._componentId), function (req, res, channel) { return __awaiter(_this, void 0, void 0, function () {
            var router;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        router = new liveRouter_1.LiveRouter(res);
                        return [4 /*yield*/, this.handleRendered(req.client.clientAssigns.clientId, router, res, channel)];
                    case 1:
                        _a.sent();
                        channel.subscribe(function (data) {
                            if (data.action === pondsocket_1.ServerActions.PRESENCE && data.event === 'LEAVE_CHANNEL') {
                                _this.handleUnmount(req.client.clientAssigns.clientId);
                                _this._providers.forEach(function (context) { return context.deleteClient(req.client.clientAssigns.clientId); });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        this._pond.on("update/".concat(this._componentId), function (req, res, channel) { return __awaiter(_this, void 0, void 0, function () {
            var router, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        router = new liveRouter_1.LiveRouter(res);
                        return [4 /*yield*/, this.handleRendered(req.client.clientAssigns.clientId, router, res, channel)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        throw e_3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this._pond.on("event/".concat(this._componentId), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var router, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        router = new liveRouter_1.LiveRouter(res);
                        return [4 /*yield*/, this.handleEvent(req.message, req.client.clientAssigns.clientId, router, res)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        throw e_4;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this._pond.on("unmount/".concat(this._componentId), function (req) { return __awaiter(_this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.handleUnmount(req.client.clientAssigns.clientId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        throw e_5;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    ComponentManager.prototype._initialiseManager = function () {
        this._initialiseHTTPManager();
        this._initialiseSocketManager();
    };
    ComponentManager.prototype._shutDown = function (context) {
        if (context.doc.timer)
            clearTimeout(context.doc.timer);
        var timer = setTimeout(function () {
            context.doc.socket.destroy();
        }, 1000 * 10);
        context.updateDoc({
            socket: context.doc.socket,
            rendered: context.doc.rendered,
            timer: timer
        });
    };
    ComponentManager.prototype._clearShutDown = function (context) {
        if (context.doc.timer) {
            clearTimeout(context.doc.timer);
            context.updateDoc({
                socket: context.doc.socket,
                rendered: context.doc.rendered,
                timer: null
            });
        }
    };
    return ComponentManager;
}());
exports.ComponentManager = ComponentManager;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
