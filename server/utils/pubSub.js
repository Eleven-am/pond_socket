"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Subject = exports.Broadcast = void 0;
var Broadcast = /** @class */ (function () {
    function Broadcast() {
        this._subscribers = new Set();
    }
    /**
     * @desc Subscribe to the broadcast
     * @param handler - The handler to call when the broadcast is published
     */
    Broadcast.prototype.subscribe = function (handler) {
        var _this = this;
        this._subscribers.add(handler);
        return {
            /**
             * @desc Unsubscribe from the broadcast
             */
            unsubscribe: function () {
                _this._subscribers.delete(handler);
            }
        };
    };
    /**
     * @desc Publish to the broadcast
     * @param data - The data to publish
     */
    Broadcast.prototype.publish = function (data) {
        var e_1, _a;
        var result;
        try {
            for (var _b = __values(this._subscribers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var subscriber = _c.value;
                result = subscriber(data);
                if (result)
                    break;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    };
    return Broadcast;
}());
exports.Broadcast = Broadcast;
var Subject = /** @class */ (function (_super) {
    __extends(Subject, _super);
    function Subject(value) {
        var _this = _super.call(this) || this;
        _this._value = value;
        return _this;
    }
    Object.defineProperty(Subject.prototype, "value", {
        /**
         * @desc Get the current value of the subject
         */
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @desc Subscribe to the subject
     */
    Subject.prototype.subscribe = function (handler) {
        handler(this._value);
        return _super.prototype.subscribe.call(this, handler);
    };
    /**
     * @desc Publish to the subject
     */
    Subject.prototype.publish = function (data) {
        if (this._value !== data) {
            this._value = data;
            return _super.prototype.publish.call(this, data);
        }
    };
    return Subject;
}(Broadcast));
exports.Subject = Subject;
