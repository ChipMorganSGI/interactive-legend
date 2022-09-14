define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "TemplatesCommonLib/baseClasses/configurationSettingsBase"], function (require, exports, tslib_1, decorators_1, ConfigurationSettingsBase) {
    "use strict";
    var ConfigurationSettings = /** @class */ (function (_super) {
        tslib_1.__extends(ConfigurationSettings, _super);
        function ConfigurationSettings() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.googleAnalytics = null;
            _this.googleAnalyticsKey = null;
            _this.googleAnalyticsConsent = null;
            _this.googleAnalyticsConsentMsg = null;
            _this.extentSelector = null;
            _this.extentSelectorConfig = null;
            _this.share = null;
            _this.sharePosition = null;
            _this.timeFilter = null;
            _this.bookmarks = null;
            _this.timeFilterConfig = null;
            _this.mapA11yDesc = null;
            return _this;
        }
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "applySharedTheme", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "screenshot", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "screenshotPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "enablePopupOption", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "enableLegendOption", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "includeLegendInScreenshot", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "includePopupInScreenshot", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "muteOpacity", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "muteGrayScale", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "splashOnStart", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "splashTitle", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "splashContent", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "splashButtonText", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "customCSS", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "customHeaderHTML", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "customHeader", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "customUrlParam", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "customURLParamName", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "title", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "home", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "homePosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "mapZoom", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "mapZoomPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "basemapToggle", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "basemapTogglePosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "nextBasemap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "basemapSelector", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "search", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "searchPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "searchOpenAtStart", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "searchConfiguration", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "layerList", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "layerListPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "filterMode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "featureCount", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "updateExtent", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "interactiveLegendPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "infoPanel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "infoPanelPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "splash", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "splashButtonPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "theme", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "googleAnalytics", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "googleAnalyticsKey", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "googleAnalyticsConsent", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "googleAnalyticsConsentMsg", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "extentSelector", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "extentSelectorConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "share", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "sharePosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "timeFilter", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "timeFilterPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "bookmarks", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "bookmarksPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "timeFilterConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "mapA11yDesc", void 0);
        ConfigurationSettings = tslib_1.__decorate([
            decorators_1.subclass("app.ConfigurationSettings")
        ], ConfigurationSettings);
        return ConfigurationSettings;
    }(ConfigurationSettingsBase));
    return ConfigurationSettings;
});
