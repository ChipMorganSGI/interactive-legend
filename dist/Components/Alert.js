define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "dojo/i18n!../nls/resources", "esri/widgets/support/widget"], function (require, exports, tslib_1, decorators_1, Widget, i18n, widget_1) {
    "use strict";
    var CSS = {
        base: "esri-interactive-legend-ga-alert",
        optOutButton: "esri-interactive-legend__opt-out-button"
    };
    var Alert = /** @class */ (function (_super) {
        tslib_1.__extends(Alert, _super);
        function Alert(params) {
            var _this = _super.call(this, params) || this;
            _this._alertNode = null;
            _this.portal = null;
            _this.appName = "interactivelegend";
            return _this;
        }
        Alert.prototype.render = function () {
            var _a;
            var enableGA = localStorage.getItem("analytics-opt-in-" + this.appName) || false;
            var _b = this.config, googleAnalytics = _b.googleAnalytics, googleAnalyticsKey = _b.googleAnalyticsKey, googleAnalyticsConsent = _b.googleAnalyticsConsent, googleAnalyticsConsentMsg = _b.googleAnalyticsConsentMsg;
            var isActive = googleAnalytics &&
                googleAnalyticsKey !== null &&
                googleAnalyticsConsent &&
                !enableGA
                ? true
                : false;
            return (widget_1.tsx("div", { bind: this },
                widget_1.tsx("calcite-alert", { afterCreate: widget_1.storeNode, bind: this, "data-node-ref": "_alertNode", "intl-close": i18n.close, scale: "s", active: isActive, class: CSS.base, theme: ((_a = this.config) === null || _a === void 0 ? void 0 : _a.theme) === "dark" ? "dark" : "light" },
                    widget_1.tsx("div", { slot: "alert-message", innerHTML: googleAnalyticsConsentMsg }),
                    widget_1.tsx("calcite-button", { scale: "s", slot: "alert-link", bind: this, afterCreate: this.handleClick, class: CSS.optOutButton }, i18n.webAnalytics.optIn))));
        };
        Alert.prototype.handleClick = function (element) {
            var _this = this;
            element.addEventListener("click", function () {
                // Add opt-in value to local storage
                localStorage.setItem("analytics-opt-in-" + _this.appName, "true");
                // update config setting to trigger GA reset and
                // prevent dialog from showing
                _this.config.googleAnalyticsConsent = false;
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Alert.prototype, "portal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Alert.prototype, "config", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Alert.prototype, "appName", void 0);
        Alert = tslib_1.__decorate([
            decorators_1.subclass("Alert")
        ], Alert);
        return Alert;
    }(Widget));
    return Alert;
});
