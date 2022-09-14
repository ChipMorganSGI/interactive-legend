/*
  Copyright 2020 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.​
*/
define(["require", "exports", "tslib", "dojo/i18n!./nls/resources", "ApplicationBase/support/domHelper", "ApplicationBase/support/itemUtils", "esri/Color", "esri/core/urlUtils", "esri/core/Handles", "esri/core/watchUtils", "esri/core/promiseUtils", "esri/widgets/Expand", "esri/widgets/LayerList", "esri/widgets/Search", "./Components/Header/Header", "./Components/InteractiveLegend/InteractiveLegend", "./Components/Alert", "./ConfigurationSettings/ConfigurationSettings", "./utils/widgetUtils", "esri/widgets/BasemapToggle", "TemplatesCommonLib/functionality/basemapToggle", "./Components/Splash/Splash", "esri/geometry/support/jsonUtils", "./telemetry/telemetry", "esri/config"], function (require, exports, tslib_1, resources_1, domHelper_1, itemUtils_1, Color, urlUtils, Handles, watchUtils_1, promiseUtils_1, Expand, LayerList, Search, Header, InteractiveLegend, Alert, ConfigurationSettings, widgetUtils_1, BasemapToggle, basemapToggle_1, Splash, jsonUtils_1, telemetry_1, esriConfig) {
    "use strict";
    resources_1 = tslib_1.__importDefault(resources_1);
    telemetry_1 = tslib_1.__importDefault(telemetry_1);
    // CSS
    var CSS = {
        loading: "configurable-application--loading",
        legend: "esri-interactive-legend__offscreen",
        popup: "offscreen-pop-up-container"
    };
    var InteractiveLegendApp = /** @class */ (function () {
        function InteractiveLegendApp() {
            this._configurationSettings = null;
            this._intLegendPropKey = "int-legend-prop-key";
            this._propWatcherKey = "prop-watcher-key";
            this._telemetry = null;
            this._initialExtent = null;
            this.base = null;
            this.handles = new Handles();
            this.analyticsHandles = new Handles();
            this.header = null;
            this.infoPanel = null;
            this.share = null;
            this.infoExpand = null;
            this.interactiveLegend = null;
            this.interactiveLegendExpand = null;
            this.layerList = null;
            this.layerListExpand = null;
            this.screenshot = null;
            this.search = null;
            this.searchExpand = null;
            this.splashWidget = null;
            this.splashWidgetButton = null;
            this.sharedTheme = null;
            this.basemapToggle = null;
        }
        InteractiveLegendApp.prototype.init = function (base) {
            var _this = this;
            if (!base) {
                console.error("ApplicationBase is not defined");
                return;
            }
            domHelper_1.setPageLocale(base.locale);
            domHelper_1.setPageDirection(base.direction);
            this.base = base;
            var config = base.config, results = base.results, portal = base.portal;
            esriConfig.portalUrl = portal.url;
            var find = config.find, marker = config.marker;
            var webMapItems = results.webMapItems;
            var validWebMapItems = webMapItems.map(function (response) {
                return response.value;
            });
            var firstItem = validWebMapItems[0];
            if (!firstItem) {
                document.location.href = "../../shared/unavailable/index.html?appid=" + ((config === null || config === void 0 ? void 0 : config.appid) || null);
                return;
            }
            config.title = !config.title ? itemUtils_1.getItemTitle(firstItem) : config.title;
            domHelper_1.setPageTitle(config.title);
            var interactiveLegendPosition = config.interactiveLegendPosition, filterMode = config.filterMode, mutedShade = config.mutedShade, muteOpacity = config.muteOpacity, muteGrayScale = config.muteGrayScale, featureCount = config.featureCount, updateExtent = config.updateExtent;
            this._configurationSettings = new ConfigurationSettings(config);
            this._handleTelemetry();
            var portalItem = this.base.results.applicationItem.value;
            var appProxies = portalItem && portalItem.applicationProxies
                ? portalItem.applicationProxies
                : null;
            var viewContainerNode = document.getElementById("viewContainer");
            var defaultViewProperties = itemUtils_1.getConfigViewProperties(config);
            var viewNode = document.createElement("div");
            viewContainerNode.appendChild(viewNode);
            var container = {
                container: viewNode
            };
            var viewProperties = tslib_1.__assign(tslib_1.__assign({}, defaultViewProperties), container);
            itemUtils_1.createMapFromItem({ item: firstItem, appProxies: appProxies }).then(function (map) {
                return itemUtils_1.createView(tslib_1.__assign(tslib_1.__assign({}, viewProperties), { map: map })).then(function (view) {
                    return itemUtils_1.findQuery(find, view).then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var defaultShade, r, g, b, a, defaultStyle, defaultMode, layerListViewModel, onboardingPanelEnabled, widgetProps, interactiveLegendPosVal, group;
                        var _this = this;
                        return tslib_1.__generator(this, function (_a) {
                            view.when(function (loadedView) {
                                _this._initialExtent = loadedView.extent.clone();
                            });
                            view.ui.remove("zoom");
                            defaultShade = null;
                            if (!mutedShade) {
                                defaultShade = new Color("rgba(169,169,169, 0.5)");
                            }
                            else {
                                if (typeof mutedShade === "string") {
                                    defaultShade = new Color(mutedShade);
                                }
                                else {
                                    r = mutedShade.r, g = mutedShade.g, b = mutedShade.b, a = mutedShade.a;
                                    defaultShade = new Color("rgba(" + r + "," + g + "," + b + "," + a + ")");
                                }
                            }
                            defaultStyle = "classic";
                            defaultMode = filterMode ? filterMode : "featureFilter";
                            this.layerList = new LayerList({
                                view: view
                            });
                            layerListViewModel = this.layerList
                                ? this.layerList.viewModel
                                : null;
                            onboardingPanelEnabled = null;
                            if (localStorage.getItem("firstTimeUseApp")) {
                                onboardingPanelEnabled = false;
                            }
                            else {
                                localStorage.setItem("firstTimeUseApp", "" + Date.now());
                                onboardingPanelEnabled = true;
                            }
                            widgetProps = {
                                view: view,
                                config: this._configurationSettings,
                                portal: this.base.portal
                            };
                            this.sharedTheme = this._createSharedTheme();
                            this._initPropertyWatchers(widgetProps, view);
                            this._handleThemeUpdates();
                            this.interactiveLegend = new InteractiveLegend({
                                view: view,
                                mutedShade: defaultShade,
                                style: defaultStyle,
                                filterMode: defaultMode,
                                layerListViewModel: layerListViewModel,
                                onboardingPanelEnabled: onboardingPanelEnabled,
                                opacity: muteOpacity,
                                grayScale: muteGrayScale,
                                faetureCountEnabled: featureCount,
                                updateExtentEnabled: updateExtent,
                                theme: this._configurationSettings.theme
                            });
                            this._initInteractiveLegendPropWatchers(widgetProps);
                            interactiveLegendPosVal = typeof interactiveLegendPosition === "string"
                                ? interactiveLegendPosition
                                : interactiveLegendPosition.position;
                            group = interactiveLegendPosVal.indexOf("left") !== -1
                                ? "left"
                                : interactiveLegendPosVal.indexOf("right") !== -1
                                    ? "right"
                                    : null;
                            this.interactiveLegendExpand = new Expand({
                                id: "interactiveLegend",
                                view: view,
                                group: group,
                                content: this.interactiveLegend,
                                mode: "floating",
                                expanded: true,
                                expandTooltip: resources_1.default.expandInteractiveLegend,
                                collapseTooltip: resources_1.default.expandInteractiveLegend,
                                expandIconClass: "custom-interactive-legend"
                            });
                            watchUtils_1.whenOnce(this.interactiveLegendExpand, "container", function () {
                                if (_this.interactiveLegendExpand.container) {
                                    var container_1 = _this.interactiveLegendExpand
                                        .container;
                                    container_1.classList.add("expand-content-z-index");
                                }
                            });
                            view.ui.add(this.interactiveLegendExpand, interactiveLegendPosVal);
                            itemUtils_1.goToMarker(marker, view);
                            document.body.classList.remove(CSS.loading);
                            this._handleHeader();
                            if (!this._configurationSettings.withinConfigurationExperience) {
                                this.handles.remove(this._intLegendPropKey);
                                this.handles.remove(this._propWatcherKey);
                            }
                            return [2 /*return*/];
                        });
                    }); });
                });
            });
        };
        InteractiveLegendApp.prototype._handleHeader = function () {
            var container = document.createElement("div");
            container.classList.add("esri-interactive-legend__header-app-container");
            var _a = this._configurationSettings, title = _a.title, customHeaderHTML = _a.customHeaderHTML, customHeader = _a.customHeader, applySharedTheme = _a.applySharedTheme;
            this.header = new Header({
                container: container,
                title: title,
                applySharedTheme: applySharedTheme,
                sharedTheme: this.sharedTheme,
                customHeader: customHeader,
                customHeaderHTML: customHeaderHTML,
                theme: this._configurationSettings.theme
            });
            var parentContainer = document.querySelector(".parent-container");
            var headerContainer = this.header.container;
            parentContainer.insertBefore(headerContainer, parentContainer.firstChild);
        };
        InteractiveLegendApp.prototype._handleCustomCSS = function () {
            var customCSSStyleSheet = document.getElementById("customCSS");
            if (customCSSStyleSheet) {
                customCSSStyleSheet.remove();
            }
            var styles = document.createElement("style");
            styles.id = "customCSS";
            styles.type = "text/css";
            var styleTextNode = document.createTextNode(this._configurationSettings.customCSS);
            styles.appendChild(styleTextNode);
            document.head.appendChild(styles);
        };
        InteractiveLegendApp.prototype._initInteractiveLegendPropWatchers = function (esriWidgetProps) {
            var _this = this;
            this.handles.add([
                watchUtils_1.init(this._configurationSettings, "filterMode", function (newValue, oldValue, propertyName) {
                    _this.interactiveLegend.filterMode = _this._configurationSettings.filterMode;
                }),
                watchUtils_1.init(this._configurationSettings, "featureCount", function (newValue, oldValue, propertyName) {
                    _this.interactiveLegend.featureCountEnabled = _this._configurationSettings.featureCount;
                }),
                watchUtils_1.init(this._configurationSettings, "updateExtent", function (newValue, oldValue, propertyName) {
                    _this.interactiveLegend.updateExtentEnabled = _this._configurationSettings.updateExtent;
                }),
                watchUtils_1.init(this._configurationSettings, "interactiveLegendPosition", function (newValue, oldValue, propertyName) {
                    var node = esriWidgetProps.view.ui.find("interactiveLegend");
                    if (node) {
                        var interactiveLegendPosition = _this._configurationSettings.interactiveLegendPosition;
                        var interactiveLegendPosVal = typeof interactiveLegendPosition === "string"
                            ? interactiveLegendPosition
                            : interactiveLegendPosition === null || interactiveLegendPosition === void 0 ? void 0 : interactiveLegendPosition.position;
                        var group = interactiveLegendPosVal.indexOf("left") !== -1
                            ? "left"
                            : interactiveLegendPosVal.indexOf("right") !== -1
                                ? "right"
                                : null;
                        node.group = group;
                        esriWidgetProps.view.ui.move(node, interactiveLegendPosVal);
                    }
                }),
                watchUtils_1.init(this._configurationSettings, "muteOpacity, muteGrayScale", function (newValue, oldValue, propertyName) {
                    _this.interactiveLegend.grayScale = _this._configurationSettings.muteGrayScale;
                    _this.interactiveLegend.opacity = _this._configurationSettings.muteOpacity;
                }),
                watchUtils_1.init(this._configurationSettings, "screenshot, screenshotPosition, theme", function (newValue, oldValue, propertyName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var screenshot, screenshotWatcher, screenshotEnabled, infoContent;
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                esriWidgetProps.propertyName = propertyName;
                                return [4 /*yield*/, widgetUtils_1.addScreenshot(esriWidgetProps, this.layerList, this.interactiveLegend.style.selectedStyleDataCollection)];
                            case 1:
                                screenshot = _a.sent();
                                if (screenshot) {
                                    this.screenshot = screenshot;
                                    screenshotWatcher = "screenshot-watcher-key";
                                    this.handles.remove(screenshotWatcher);
                                    this.handles.add(watchUtils_1.whenTrue(this.screenshot, "screenshotModeIsActive", function () {
                                        if (_this.interactiveLegendExpand &&
                                            _this.interactiveLegendExpand.expanded) {
                                            _this.interactiveLegendExpand.expanded = false;
                                        }
                                        if (_this.infoExpand && _this.infoExpand.expanded) {
                                            _this.infoExpand.expanded = false;
                                        }
                                        if (_this.searchExpand && _this.searchExpand.expanded) {
                                            _this.searchExpand.expanded = false;
                                        }
                                        if (_this.layerListExpand && _this.layerListExpand.expanded) {
                                            _this.layerListExpand.expanded = false;
                                        }
                                    }), screenshotWatcher);
                                }
                                if (!this.infoPanel) return [3 /*break*/, 3];
                                screenshotEnabled = this._configurationSettings.screenshot;
                                return [4 /*yield*/, widgetUtils_1.getInfoContent(screenshotEnabled)];
                            case 2:
                                infoContent = _a.sent();
                                this.infoPanel.infoContent = infoContent;
                                this.infoPanel.selectedItemIndex = 0;
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }),
                watchUtils_1.init(this._configurationSettings, "enableLegendOption, enablePopupOption, includeLegendInScreenshot, includePopupInScreenshot", function (newValue, oldValue, propertyName) {
                    esriWidgetProps.propertyName = propertyName;
                    if (_this.screenshot) {
                        _this.screenshot.enableLegendOption = _this._configurationSettings.enableLegendOption;
                        _this.screenshot.enablePopupOption = _this._configurationSettings.enablePopupOption;
                        _this.screenshot.includeLegendInScreenshot = _this._configurationSettings.includeLegendInScreenshot;
                        _this.screenshot.includePopupInScreenshot = _this._configurationSettings.includePopupInScreenshot;
                        if (!_this._configurationSettings.enableLegendOption) {
                            _this.screenshot.includeLegendInScreenshot = false;
                        }
                        if (!_this._configurationSettings.enablePopupOption) {
                            _this.screenshot.includePopupInScreenshot = false;
                        }
                    }
                })
            ], this._intLegendPropKey);
        };
        InteractiveLegendApp.prototype._initPropertyWatchers = function (widgetProps, view) {
            var _this = this;
            this.handles.add([
                watchUtils_1.init(this._configurationSettings, "applySharedTheme", function () {
                    if (_this.header) {
                        _this.header.applySharedTheme = _this._configurationSettings.applySharedTheme;
                    }
                }),
                watchUtils_1.init(this._configurationSettings, "home, homePosition", function (newValue, oldValue, propertyName) {
                    widgetProps.propertyName = propertyName;
                    widgetUtils_1.addHome(widgetProps);
                }),
                watchUtils_1.init(this._configurationSettings, "bookmarks, bookmarksPosition", function (newValue, oldValue, propertyName) {
                    widgetProps.propertyName = propertyName;
                    widgetUtils_1.addBookmarks(widgetProps);
                }),
                watchUtils_1.init(this._configurationSettings, "mapZoom, mapZoomPosition", function (newValue, oldValue, propertyName) {
                    widgetProps.propertyName = propertyName;
                    widgetUtils_1.addZoom(widgetProps);
                }),
                watchUtils_1.init(this._configurationSettings, "basemapToggle, basemapTogglePosition, basemapSelector, nextBasemap", function (newValue, oldValue, propertyName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _a, basemapToggle, basemapTogglePosition, _b, originalBasemap, nextBasemap;
                    return tslib_1.__generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _a = this._configurationSettings, basemapToggle = _a.basemapToggle, basemapTogglePosition = _a.basemapTogglePosition;
                                return [4 /*yield*/, basemapToggle_1.getBasemaps(widgetProps)];
                            case 1:
                                _b = _c.sent(), originalBasemap = _b.originalBasemap, nextBasemap = _b.nextBasemap;
                                // Decide what to do based on the property that changed
                                switch (propertyName) {
                                    case "basemapToggle":
                                        if (basemapToggle) {
                                            this.basemapToggle = new BasemapToggle({
                                                view: view,
                                                nextBasemap: nextBasemap
                                            });
                                            view.ui.add(this.basemapToggle, basemapTogglePosition);
                                        }
                                        else {
                                            if (!this.basemapToggle) {
                                                return [2 /*return*/];
                                            }
                                            basemapToggle_1.resetBasemapsInToggle(this.basemapToggle, originalBasemap, nextBasemap);
                                            view.ui.remove(this.basemapToggle);
                                            this.basemapToggle.destroy();
                                        }
                                        break;
                                    case "basemapTogglePosition":
                                        if (!this.basemapToggle) {
                                            return [2 /*return*/];
                                        }
                                        view.ui.move(this.basemapToggle, basemapTogglePosition);
                                        break;
                                    case "basemapSelector":
                                        if (!this.basemapToggle) {
                                            return [2 /*return*/];
                                        }
                                        basemapToggle_1.resetBasemapsInToggle(this.basemapToggle, originalBasemap, nextBasemap);
                                        break;
                                    case "nextBasemap":
                                        if (!this.basemapToggle) {
                                            return [2 /*return*/];
                                        }
                                        basemapToggle_1.resetBasemapsInToggle(this.basemapToggle, originalBasemap, nextBasemap);
                                        break;
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }),
                watchUtils_1.init(this._configurationSettings, "search, searchPosition, searchConfiguration, searchOpenAtStart", function (newValue, oldValue, propertyName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var search;
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                widgetProps.propertyName = propertyName;
                                return [4 /*yield*/, widgetUtils_1.addSearch(widgetProps)];
                            case 1:
                                search = _a.sent();
                                if (search) {
                                    this.search = search;
                                }
                                if (!this.handles.has("searchExtentSelector")) {
                                    this.handles.add(watchUtils_1.init(this._configurationSettings, "extentSelector, extentSelectorConfig", function () {
                                        var _a, _b;
                                        if (!_this.search) {
                                            return;
                                        }
                                        var extentSelector = (_a = _this._configurationSettings) === null || _a === void 0 ? void 0 : _a.extentSelector;
                                        var extentSelectorConfig = (_b = _this._configurationSettings) === null || _b === void 0 ? void 0 : _b.extentSelectorConfig;
                                        if (extentSelector && extentSelectorConfig) {
                                            var constraints = (extentSelectorConfig === null || extentSelectorConfig === void 0 ? void 0 : extentSelectorConfig.constraints) || null;
                                            var geometry = constraints === null || constraints === void 0 ? void 0 : constraints.geometry;
                                            if (geometry) {
                                                var extent_1 = jsonUtils_1.fromJSON(geometry);
                                                if (extent_1 &&
                                                    ((extent_1 === null || extent_1 === void 0 ? void 0 : extent_1.type) === "extent" ||
                                                        (extent_1 === null || extent_1 === void 0 ? void 0 : extent_1.type) === "polygon")) {
                                                    _this.search.allSources.forEach(function (source) {
                                                        source.filter = {
                                                            geometry: extent_1
                                                        };
                                                    });
                                                }
                                                else {
                                                    constraints.geometry = null;
                                                    _this.search.allSources.forEach(function (source) {
                                                        source.filter = null;
                                                    });
                                                }
                                            }
                                        }
                                        else {
                                            _this.search.allSources.forEach(function (source) {
                                                source.filter = null;
                                            });
                                        }
                                    }), "searchExtentSelector");
                                }
                                if (search) {
                                    this.search = search;
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }),
                watchUtils_1.init(this._configurationSettings, "layerList, layerListPosition", function (newValue, oldValue, propertyName) {
                    widgetProps.propertyName = propertyName;
                    widgetUtils_1.addLayerList(widgetProps);
                }),
                watchUtils_1.init(this._configurationSettings, "timeFilter, timeFilterPosition, timeFilterConfig, filterMode, muteOpacity, muteGrayScale", function (newValue, oldValue, propertyName) {
                    widgetProps.propertyName = propertyName;
                    widgetUtils_1.addTimeFilter(widgetProps);
                }),
                watchUtils_1.init(this._configurationSettings, "infoPanel, infoPanelPosition", function (newValue, oldValue, propertyName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                widgetProps.propertyName = propertyName;
                                _a = this;
                                return [4 /*yield*/, widgetUtils_1.addInfoPanel(widgetProps, this.base)];
                            case 1:
                                _a.infoPanel = _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }),
                watchUtils_1.init(this._configurationSettings, "share, sharePosition, theme", function (newValue, oldValue, propertyName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                widgetProps.propertyName = propertyName;
                                _a = this;
                                return [4 /*yield*/, widgetUtils_1.addShare(widgetProps)];
                            case 1:
                                _a.share = _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }),
                watchUtils_1.init(this._configurationSettings, "splash", function (newValue, oldValue, propertyName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var view, config, splash, node;
                    return tslib_1.__generator(this, function (_a) {
                        view = widgetProps.view, config = widgetProps.config;
                        splash = config.splash;
                        if (splash) {
                            this._createSplashWidget(view);
                            this.splashWidgetButton = this.splashWidget.createToolbarButton();
                            view.ui.add(this.splashWidgetButton, config.splashButtonPosition);
                        }
                        else {
                            node = view.ui.find("splash");
                            if (node) {
                                view.ui.remove(node);
                                document
                                    .querySelector(".esri-interactive-legend__splash-modal")
                                    .remove();
                            }
                        }
                        return [2 /*return*/];
                    });
                }); }),
                watchUtils_1.init(this._configurationSettings, "splashButtonPosition, splashOnStart, splashTitle, splashContent, splashButtonText", function (newValue, oldValue, propertyName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        if (this.splashWidget && propertyName === "splashButtonText") {
                            this.splashWidget.splashButtonText = this._configurationSettings.splashButtonText;
                        }
                        else if (this.splashWidget && propertyName === "splashContent") {
                            this.splashWidget.splashContent = this._configurationSettings.splashContent;
                        }
                        else if (this.splashWidget && propertyName === "splashTitle") {
                            this.splashWidget.splashTitle = this._configurationSettings.splashTitle;
                        }
                        else if (this.splashWidget && propertyName === "splashOnStart") {
                            this.splashWidget.splashOnStart = this._configurationSettings.splashOnStart;
                        }
                        else if (this.splashWidget &&
                            propertyName === "splashButtonPosition") {
                            widgetProps.view.ui.move(this.splashWidgetButton, this._configurationSettings.splashButtonPosition);
                        }
                        return [2 /*return*/];
                    });
                }); }),
                watchUtils_1.init(this._configurationSettings, "title", function (newValue, oldValue, propertyName) {
                    if (_this.header) {
                        _this.header.title = _this._configurationSettings.title
                            ? _this._configurationSettings.title
                            : _this.base.config.title;
                    }
                }),
                watchUtils_1.init(this._configurationSettings, "customHeader, customHeaderHTML", function () {
                    if (_this.header) {
                        _this.header.customHeaderHTML = _this._configurationSettings.customHeaderHTML;
                        _this.header.customHeader = _this._configurationSettings.customHeader;
                    }
                }),
                watchUtils_1.init(this._configurationSettings, "customCSS", function (newValue, oldValue, propertyName) {
                    _this._handleCustomCSS();
                }),
                watchUtils_1.init(this._configurationSettings, "mapA11yDesc", function (newValue, oldValue, propertyName) {
                    var _a;
                    if (_this._configurationSettings.mapA11yDesc) {
                        if (!document.getElementById("mapDescription")) {
                            var mapA11yDescContainer = document.createElement("div");
                            mapA11yDescContainer.id = "mapDescription";
                            mapA11yDescContainer.classList.add("sr-only");
                            mapA11yDescContainer.innerHTML = _this._configurationSettings.mapA11yDesc;
                            view.container.appendChild(mapA11yDescContainer);
                            var rootNode = document.getElementsByClassName("esri-view-surface");
                            view.container.setAttribute("aria-describedby", "mapDescription");
                            for (var k = 0; k < rootNode.length; k++) {
                                rootNode[k].setAttribute("aria-describedby", "mapDescription");
                            }
                        }
                        else {
                            document.getElementById("mapDescription").innerHTML = _this._configurationSettings.mapA11yDesc;
                        }
                    }
                    else {
                        var portalItem = (_a = view === null || view === void 0 ? void 0 : view.map) === null || _a === void 0 ? void 0 : _a.portalItem;
                        var mapA11yDescVal = (portalItem === null || portalItem === void 0 ? void 0 : portalItem.snippet) || (portalItem === null || portalItem === void 0 ? void 0 : portalItem.description);
                        if (!document.getElementById("mapDescription")) {
                            var mapA11yDescContainer = document.createElement("div");
                            mapA11yDescContainer.id = "mapDescription";
                            mapA11yDescContainer.classList.add("sr-only");
                            mapA11yDescContainer.innerHTML = mapA11yDescVal;
                            view.container.appendChild(mapA11yDescContainer);
                            var rootNode = document.getElementsByClassName("esri-view-surface");
                            view.container.setAttribute("aria-describedby", "mapDescription");
                            for (var k = 0; k < rootNode.length; k++) {
                                rootNode[k].setAttribute("aria-describedby", "mapDescription");
                            }
                        }
                        else {
                            document.getElementById("mapDescription").innerHTML = mapA11yDescVal;
                        }
                    }
                }),
                watchUtils_1.init(this._configurationSettings, "customUrlParam, customURLParamName", function (newValue, oldValue, propertyName) {
                    var _a, _b, _c;
                    var customUrlParam = (_b = (_a = _this._configurationSettings.customUrlParam) === null || _a === void 0 ? void 0 : _a.layers) === null || _b === void 0 ? void 0 : _b[0];
                    var fieldName = (_c = customUrlParam === null || customUrlParam === void 0 ? void 0 : customUrlParam.fields) === null || _c === void 0 ? void 0 : _c[0];
                    var customUrlParamName = _this._configurationSettings
                        .customURLParamName;
                    if (!customUrlParam || !customUrlParamName || !fieldName) {
                        return;
                    }
                    var layer = view.map.findLayerById(customUrlParam.id);
                    var layerSearchSource = {
                        layer: layer,
                        searchFields: customUrlParam.fields,
                        outFields: ["*"],
                        exactMatch: true,
                        displayField: fieldName
                    };
                    var href = _this._configurationSettings
                        .withinConfigurationExperience
                        ? document.referrer
                        : document.location.href;
                    var searchResults = urlUtils.urlToObject(href);
                    var searchTerm = null;
                    if (searchResults === null || searchResults === void 0 ? void 0 : searchResults.query) {
                        if (customUrlParamName in searchResults.query) {
                            searchTerm = searchResults.query[customUrlParamName];
                        }
                    }
                    if (layer) {
                        var search = new Search({
                            view: view,
                            resultGraphicEnabled: false,
                            searchAllEnabled: false,
                            includeDefaultSources: false,
                            suggestionsEnabled: false,
                            sources: [layerSearchSource],
                            searchTerm: searchTerm
                        });
                        search.search();
                    }
                }),
                watchUtils_1.init(this._configurationSettings, "extentSelector, extentSelectorConfig", function (newValue, oldValue, propertyName) {
                    var _a, _b, _c;
                    if (((_a = _this._configurationSettings) === null || _a === void 0 ? void 0 : _a.extentSelector) &&
                        _this._configurationSettings.extentSelectorConfig) {
                        var constraints = ((_c = (_b = _this._configurationSettings) === null || _b === void 0 ? void 0 : _b.extentSelectorConfig) === null || _c === void 0 ? void 0 : _c.constraints) || null;
                        var geometry = constraints === null || constraints === void 0 ? void 0 : constraints.geometry;
                        if (geometry) {
                            var extent = jsonUtils_1.fromJSON(geometry);
                            if (extent &&
                                ((extent === null || extent === void 0 ? void 0 : extent.type) === "extent" || (extent === null || extent === void 0 ? void 0 : extent.type) === "polygon")) {
                                constraints.geometry = extent;
                                view.goTo(extent, false).catch(function () { });
                            }
                            else {
                                constraints.geometry = null;
                            }
                        }
                        view.constraints = constraints;
                        _this._setMapViewRotation(view);
                    }
                    else {
                        view.rotation = 0;
                        view.constraints.geometry = null;
                        view.constraints.minZoom = -1;
                        view.constraints.maxZoom = -1;
                        view.constraints.minScale = 0;
                        view.constraints.maxScale = 0;
                        if (_this._initialExtent) {
                            view.goTo(_this._initialExtent);
                        }
                    }
                })
            ], this._propWatcherKey);
        };
        InteractiveLegendApp.prototype._handleThemeUpdates = function () {
            var _this = this;
            // Check for a preferred color scheme and then
            // monitor updates to that color scheme and the
            // configuration panel updates.
            if (!this._configurationSettings.theme) {
                this._configurationSettings.theme = window.matchMedia("(prefers-color-scheme: dark)")
                    ? "dark"
                    : "light";
            }
            this.handles.add(watchUtils_1.init(this._configurationSettings, "theme", function () {
                var theme = _this._configurationSettings.theme;
                widgetUtils_1.updateAppTheme(theme);
                if (_this.interactiveLegend) {
                    _this.interactiveLegend.set("theme", theme);
                }
                if (_this.header) {
                    _this.header.set("theme", theme);
                }
                if (_this.screenshot) {
                    _this.screenshot.set("theme", theme);
                }
                if (_this.infoPanel) {
                    _this.infoPanel.set("theme", theme);
                }
                if (_this.splashWidget) {
                    _this.splashWidget.set("theme", theme);
                }
            }), "configuration");
        };
        InteractiveLegendApp.prototype._createSplashWidget = function (view) {
            var _this = this;
            this.splashWidget = new Splash({
                view: view,
                splashTitle: this._configurationSettings.splashTitle,
                splashContent: this._configurationSettings.splashContent,
                splashButtonText: this._configurationSettings.splashButtonText,
                splashOnStart: this._configurationSettings.splashOnStart,
                container: document.createElement("calcite-modal")
            });
            watchUtils_1.whenOnce(this.splashWidget, "modalNode", function () {
                if (_this.splashWidget.splashOnStart) {
                    _this.splashWidget.modalNode.setAttribute("active", "");
                }
            });
            document.body.appendChild(this.splashWidget.container);
        };
        InteractiveLegendApp.prototype._createSharedTheme = function () {
            var _a, _b, _c, _d, _e, _f;
            var portal = (_a = this.base) === null || _a === void 0 ? void 0 : _a.portal;
            var sharedTheme = null;
            if (portal === null || portal === void 0 ? void 0 : portal.portalProperties) {
                var theme = (_b = portal === null || portal === void 0 ? void 0 : portal.portalProperties) === null || _b === void 0 ? void 0 : _b.sharedTheme;
                sharedTheme = {
                    background: (_c = theme === null || theme === void 0 ? void 0 : theme.header) === null || _c === void 0 ? void 0 : _c.background,
                    text: (_d = theme === null || theme === void 0 ? void 0 : theme.header) === null || _d === void 0 ? void 0 : _d.text,
                    logo: (_e = theme === null || theme === void 0 ? void 0 : theme.logo) === null || _e === void 0 ? void 0 : _e.small,
                    logoLink: (_f = theme === null || theme === void 0 ? void 0 : theme.logo) === null || _f === void 0 ? void 0 : _f.link
                };
            }
            return sharedTheme;
        };
        InteractiveLegendApp.prototype.createTelemetry = function () {
            var _a, _b, _c;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var portal, appName, _d;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            portal = this.base.portal;
                            appName = (_b = (_a = this.base.config) === null || _a === void 0 ? void 0 : _a.telemetry) === null || _b === void 0 ? void 0 : _b.name;
                            _d = this;
                            return [4 /*yield*/, telemetry_1.default.init({
                                    portal: portal,
                                    config: this._configurationSettings,
                                    appName: appName
                                })];
                        case 1:
                            _d._telemetry = _e.sent();
                            (_c = this._telemetry) === null || _c === void 0 ? void 0 : _c.logPageView();
                            return [2 /*return*/];
                    }
                });
            });
        };
        InteractiveLegendApp.prototype._handleTelemetry = function () {
            var _this = this;
            // Wait until both are defined
            promiseUtils_1.eachAlways([
                watchUtils_1.whenDefinedOnce(this._configurationSettings, "googleAnalytics"),
                watchUtils_1.whenDefinedOnce(this._configurationSettings, "googleAnalyticsKey"),
                watchUtils_1.whenDefinedOnce(this._configurationSettings, "googleAnalyticsConsentMsg"),
                watchUtils_1.whenDefinedOnce(this._configurationSettings, "googleAnalyticsConsent")
            ]).then(function () {
                var _a, _b;
                _this.createTelemetry();
                var alertContainer = document.createElement("container");
                document.body.appendChild(alertContainer);
                new Alert({
                    config: _this._configurationSettings,
                    container: alertContainer,
                    appName: (_b = (_a = _this.base.config) === null || _a === void 0 ? void 0 : _a.telemetry) === null || _b === void 0 ? void 0 : _b.name
                });
                _this.analyticsHandles.add([
                    watchUtils_1.watch(_this._configurationSettings, [
                        "googleAnalytics",
                        "googleAnalyticsConsent",
                        "googleAnalyticsConsentMsg",
                        "googleAnalyticsKey"
                    ], function (newValue, oldValue, propertyName) {
                        _this.createTelemetry();
                    })
                ]);
            });
        };
        InteractiveLegendApp.prototype._setMapViewRotation = function (view) {
            var _a, _b;
            var mapRotation = (_b = (_a = this._configurationSettings) === null || _a === void 0 ? void 0 : _a.extentSelectorConfig) === null || _b === void 0 ? void 0 : _b.mapRotation;
            if (view && view.constraints && !view.constraints.rotationEnabled) {
                // if rotation is disabled
                view.constraints.rotationEnabled = true; // set rotation to enabled
                if (mapRotation || mapRotation === 0) {
                    view.rotation = mapRotation;
                }
                view.constraints.rotationEnabled = false; // set rotation back to disabled
            }
            else {
                if (mapRotation || mapRotation === 0) {
                    view.rotation = mapRotation;
                }
            }
        };
        return InteractiveLegendApp;
    }());
    return InteractiveLegendApp;
});
