define(["require", "exports", "tslib", "dojo/i18n!../nls/resources", "esri/core/promiseUtils"], function (require, exports, tslib_1, resources_1, promiseUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateAppTheme = exports.addScreenshot = exports.getInfoContent = exports.findNode = exports.addInfoPanel = exports.addSearch = exports.addZoom = exports.addShare = exports.addBookmarks = exports.addLayerList = exports.addTimeFilter = exports.addHome = void 0;
    resources_1 = tslib_1.__importDefault(resources_1);
    function addHome(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, home, homePosition, Home, node;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        home = config.home, homePosition = config.homePosition;
                        return [4 /*yield*/, new Promise(function (resolve_1, reject_1) { require(["esri/widgets/Home"], resolve_1, reject_1); }).then(tslib_1.__importStar)];
                    case 1:
                        Home = _a.sent();
                        node = findNode("esri-home");
                        //   If home is not enabled and  node exists - remove from UI.
                        if (!home) {
                            if (node) {
                                view.ui.remove(node);
                            }
                            return [2 /*return*/];
                        }
                        if (node && propertyName === "homePosition") {
                            view.ui.move(node, homePosition);
                        }
                        else if (propertyName === "home") {
                            view.ui.add(new Home.default({ view: view }), homePosition);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addHome = addHome;
    function addTimeFilter(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, timeFilter, timeFilterConfig, timeFilterPosition, filterMode, muteOpacity, muteGrayScale, modules, _a, TimeFilter, Expand, node, timeFilterPosVal, group, timeFilter_1, timeFilterExpand;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        timeFilter = config.timeFilter, timeFilterConfig = config.timeFilterConfig, timeFilterPosition = config.timeFilterPosition, filterMode = config.filterMode, muteOpacity = config.muteOpacity, muteGrayScale = config.muteGrayScale;
                        return [4 /*yield*/, promiseUtils_1.eachAlways([
                                new Promise(function (resolve_2, reject_2) { require(["../Components/TimeFilter/TimeFilter"], resolve_2, reject_2); }).then(tslib_1.__importStar),
                                new Promise(function (resolve_3, reject_3) { require(["esri/widgets/Expand"], resolve_3, reject_3); }).then(tslib_1.__importStar)
                            ])];
                    case 1:
                        modules = _b.sent();
                        _a = modules.map(function (module) { return module.value; }), TimeFilter = _a[0], Expand = _a[1];
                        node = view.ui.find("timeFilterExpand");
                        if (!timeFilter) {
                            if (node) {
                                view.ui.remove(node);
                            }
                            return [2 /*return*/];
                        }
                        timeFilterPosVal = typeof timeFilterPosition === "string"
                            ? timeFilterPosition
                            : timeFilterPosition.position;
                        group = timeFilterPosVal.indexOf("left") !== -1
                            ? "left"
                            : timeFilterPosVal.indexOf("right") !== -1
                                ? "right"
                                : null;
                        if (node && propertyName === "timeFilterPosition") {
                            node.expanded = false;
                            node.group = group;
                            view.ui.move(node, timeFilterPosition);
                        }
                        else if (propertyName === "timeFilter") {
                            timeFilter_1 = new TimeFilter.default({
                                view: view,
                                config: timeFilterConfig,
                                filterMode: filterMode,
                                muteOpacity: muteOpacity,
                                muteGrayScale: muteGrayScale
                            });
                            timeFilterExpand = new Expand.default({
                                view: view,
                                content: timeFilter_1,
                                id: "timeFilterExpand",
                                group: group,
                                expanded: true,
                                expandTooltip: resources_1.default.timeFilterLabel,
                                collapseTooltip: resources_1.default.timeFilterLabel,
                                mode: "floating"
                            });
                            view.ui.add(timeFilterExpand, timeFilterPosition);
                        }
                        else if (propertyName === "timeFilterConfig") {
                            if (node.content) {
                                node.content.config = timeFilterConfig;
                            }
                        }
                        else if (propertyName === "filterMode") {
                            if (node.content) {
                                node.content.filterMode = filterMode;
                            }
                        }
                        else if (propertyName === "muteOpacity") {
                            if (node.content) {
                                node.content.muteOpacity = muteOpacity;
                            }
                        }
                        else if (propertyName === "muteGrayScale") {
                            if (node.content) {
                                node.content.muteGrayScale = muteGrayScale;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addTimeFilter = addTimeFilter;
    function addLayerList(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, layerList, layerListPosition, modules, _a, LayerList, Expand, node, layerListPosVal, group, layerList_1, layerListExpand;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        layerList = config.layerList, layerListPosition = config.layerListPosition;
                        return [4 /*yield*/, promiseUtils_1.eachAlways([
                                new Promise(function (resolve_4, reject_4) { require(["esri/widgets/LayerList"], resolve_4, reject_4); }).then(tslib_1.__importStar),
                                new Promise(function (resolve_5, reject_5) { require(["esri/widgets/Expand"], resolve_5, reject_5); }).then(tslib_1.__importStar)
                            ])];
                    case 1:
                        modules = _b.sent();
                        _a = modules.map(function (module) { return module.value; }), LayerList = _a[0], Expand = _a[1];
                        node = view.ui.find("layerListExpand");
                        if (!layerList) {
                            if (node) {
                                view.ui.remove(node);
                            }
                            return [2 /*return*/];
                        }
                        layerListPosVal = typeof layerListPosition === "string"
                            ? layerListPosition
                            : layerListPosition.position;
                        group = layerListPosVal.indexOf("left") !== -1
                            ? "left"
                            : layerListPosVal.indexOf("right") !== -1
                                ? "right"
                                : null;
                        if (node && propertyName === "layerListPosition") {
                            node.expanded = false;
                            node.group = group;
                            view.ui.move(node, layerListPosition);
                        }
                        else if (propertyName === "layerList") {
                            layerList_1 = new LayerList.default({ view: view });
                            layerListExpand = new Expand.default({
                                view: view,
                                content: layerList_1,
                                id: "layerListExpand",
                                group: group,
                                expandTooltip: resources_1.default.layerListLabel,
                                collapseTooltip: resources_1.default.layerListLabel
                            });
                            view.ui.add(layerListExpand, layerListPosition);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addLayerList = addLayerList;
    function addBookmarks(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, bookmarks, bookmarksPosition, modules, _a, Bookmarks, Expand, node, bookmarksPosVal, group, bookmarks_1, bookmarksExpand;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        bookmarks = config.bookmarks, bookmarksPosition = config.bookmarksPosition;
                        return [4 /*yield*/, promiseUtils_1.eachAlways([
                                new Promise(function (resolve_6, reject_6) { require(["esri/widgets/Bookmarks"], resolve_6, reject_6); }).then(tslib_1.__importStar),
                                new Promise(function (resolve_7, reject_7) { require(["esri/widgets/Expand"], resolve_7, reject_7); }).then(tslib_1.__importStar)
                            ])];
                    case 1:
                        modules = _b.sent();
                        _a = modules.map(function (module) { return module.value; }), Bookmarks = _a[0], Expand = _a[1];
                        node = view.ui.find("bookmarksExpand");
                        if (!bookmarks) {
                            if (node) {
                                view.ui.remove(node);
                            }
                            return [2 /*return*/];
                        }
                        bookmarksPosVal = typeof bookmarksPosition === "string"
                            ? bookmarksPosition
                            : bookmarksPosition.position;
                        group = bookmarksPosVal.indexOf("left") !== -1
                            ? "left"
                            : bookmarksPosVal.indexOf("right") !== -1
                                ? "right"
                                : null;
                        if (node && propertyName === "bookmarksPosition") {
                            node.expanded = false;
                            node.group = group;
                            view.ui.move(node, bookmarksPosition);
                        }
                        else if (propertyName === "bookmarks") {
                            bookmarks_1 = new Bookmarks.default({ view: view });
                            bookmarksExpand = new Expand.default({
                                view: view,
                                content: bookmarks_1,
                                id: "bookmarksExpand",
                                group: group,
                                expandTooltip: resources_1.default.bookmarksLabel,
                                collapseTooltip: resources_1.default.bookmarksLabel
                            });
                            view.ui.add(bookmarksExpand, bookmarksPosition);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addBookmarks = addBookmarks;
    function addShare(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, share, sharePosition, theme, modules, Share, node, sharePosVal, group, share_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        share = config.share, sharePosition = config.sharePosition, theme = config.theme;
                        return [4 /*yield*/, promiseUtils_1.eachAlways([new Promise(function (resolve_8, reject_8) { require(["Share"], resolve_8, reject_8); }).then(tslib_1.__importStar)])];
                    case 1:
                        modules = _a.sent();
                        Share = modules.map(function (module) { return module.value; })[0];
                        node = view.ui.find("share");
                        if (!share) {
                            if (node) {
                                view.ui.remove(node);
                            }
                            return [2 /*return*/];
                        }
                        sharePosVal = typeof sharePosition === "string" ? sharePosition : sharePosition.position;
                        group = sharePosVal.indexOf("left") !== -1
                            ? "left"
                            : sharePosVal.indexOf("right") !== -1
                                ? "right"
                                : null;
                        if (node && propertyName === "sharePosition") {
                            node.expanded = false;
                            node.group = group;
                            view.ui.move(node, sharePosition);
                        }
                        else if (node && propertyName === "theme") {
                            node.set("theme", theme);
                            setShareButtonTheme(theme);
                        }
                        else if (propertyName === "share") {
                            share_1 = new Share.default({
                                id: "share",
                                view: view,
                                theme: theme,
                                shareFeatures: {
                                    embedMap: false
                                }
                            });
                            view.ui.add(share_1, sharePosition);
                            setShareButtonTheme(theme);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addShare = addShare;
    function addZoom(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, mapZoom, mapZoomPosition, Zoom, node;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        mapZoom = config.mapZoom, mapZoomPosition = config.mapZoomPosition;
                        return [4 /*yield*/, new Promise(function (resolve_9, reject_9) { require(["esri/widgets/Zoom"], resolve_9, reject_9); }).then(tslib_1.__importStar)];
                    case 1:
                        Zoom = _a.sent();
                        node = findNode("esri-zoom");
                        if (!mapZoom) {
                            if (node) {
                                view.ui.remove(node);
                            }
                            return [2 /*return*/];
                        }
                        if (node && propertyName === "mapZoomPosition") {
                            view.ui.move(node, mapZoomPosition);
                        }
                        else if (propertyName === "mapZoom") {
                            view.ui.add(new Zoom.default({ view: view }), mapZoomPosition);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addZoom = addZoom;
    function addSearch(props) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, portal, config, propertyName, search, searchConfiguration, searchOpenAtStart, searchPosition, modules, _b, Search, FeatureLayer, Expand, node, searchPosVal, group, sources, content, geometry_1, searchExpand;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        view = props.view, portal = props.portal, config = props.config, propertyName = props.propertyName;
                        search = config.search, searchConfiguration = config.searchConfiguration, searchOpenAtStart = config.searchOpenAtStart, searchPosition = config.searchPosition;
                        return [4 /*yield*/, promiseUtils_1.eachAlways([
                                new Promise(function (resolve_10, reject_10) { require(["esri/widgets/Search"], resolve_10, reject_10); }).then(tslib_1.__importStar),
                                new Promise(function (resolve_11, reject_11) { require(["esri/layers/FeatureLayer"], resolve_11, reject_11); }).then(tslib_1.__importStar),
                                new Promise(function (resolve_12, reject_12) { require(["esri/widgets/Expand"], resolve_12, reject_12); }).then(tslib_1.__importStar)
                            ])];
                    case 1:
                        modules = _c.sent();
                        _b = modules.map(function (module) { return module.value; }), Search = _b[0], FeatureLayer = _b[1], Expand = _b[2];
                        node = view.ui.find("searchExpand");
                        if (!Search || !FeatureLayer || !Expand) {
                            return [2 /*return*/];
                        }
                        if (!search) {
                            if (node) {
                                view.ui.remove(node);
                            }
                            return [2 /*return*/];
                        }
                        searchPosVal = typeof searchPosition === "string"
                            ? searchPosition
                            : searchPosition.position;
                        group = searchPosVal.indexOf("left") !== -1
                            ? "left"
                            : searchPosVal.indexOf("right") !== -1
                                ? "right"
                                : null;
                        if (propertyName === "searchPosition" && node) {
                            node.group = group;
                            view.ui.move(node, searchPosition);
                        }
                        else if (propertyName === "searchOpenAtStart" && node) {
                            node.expanded = searchOpenAtStart;
                        }
                        else if (propertyName === "search" ||
                            (propertyName === "searchConfiguration" && node)) {
                            if (node) {
                                view.ui.remove(node);
                            }
                            sources = searchConfiguration === null || searchConfiguration === void 0 ? void 0 : searchConfiguration.sources;
                            if (sources) {
                                sources.forEach(function (source) {
                                    var _a, _b, _c;
                                    var layerFromMap = ((_a = source === null || source === void 0 ? void 0 : source.layer) === null || _a === void 0 ? void 0 : _a.id) ? view.map.findLayerById(source.layer.id)
                                        : null;
                                    if (layerFromMap) {
                                        source.layer = layerFromMap;
                                    }
                                    else if ((_b = source === null || source === void 0 ? void 0 : source.layer) === null || _b === void 0 ? void 0 : _b.url) {
                                        source.layer = new FeatureLayer.default((_c = source === null || source === void 0 ? void 0 : source.layer) === null || _c === void 0 ? void 0 : _c.url);
                                    }
                                });
                            }
                            content = new Search.default(tslib_1.__assign({ view: view,
                                portal: portal }, searchConfiguration));
                            geometry_1 = (_a = view === null || view === void 0 ? void 0 : view.constraints) === null || _a === void 0 ? void 0 : _a.geometry;
                            if (geometry_1) {
                                content.sources.forEach(function (source) {
                                    source.filter = {
                                        geometry: geometry_1
                                    };
                                });
                            }
                            else {
                                content.sources.forEach(function (source) {
                                    source.filter = null;
                                });
                            }
                            searchExpand = new Expand.default({
                                expanded: searchOpenAtStart,
                                id: "searchExpand",
                                content: content,
                                mode: "floating",
                                group: group,
                                view: view,
                                expandTooltip: resources_1.default.searchLabel,
                                collapseTooltip: resources_1.default.searchLabel
                            });
                            view.ui.add(searchExpand, searchPosition);
                            return [2 /*return*/, content];
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addSearch = addSearch;
    function addInfoPanel(props, base) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, infoPanel, infoPanelPosition, screenshot, theme, modules, _a, Info, Expand, node, infoPosVal, group, infoContent, infoWidget, infoExpand;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        infoPanel = config.infoPanel, infoPanelPosition = config.infoPanelPosition, screenshot = config.screenshot, theme = config.theme;
                        return [4 /*yield*/, promiseUtils_1.eachAlways([
                                new Promise(function (resolve_13, reject_13) { require(["../Components/Info/Info"], resolve_13, reject_13); }).then(tslib_1.__importStar),
                                new Promise(function (resolve_14, reject_14) { require(["esri/widgets/Expand"], resolve_14, reject_14); }).then(tslib_1.__importStar)
                            ])];
                    case 1:
                        modules = _b.sent();
                        _a = modules.map(function (module) { return module.value; }), Info = _a[0], Expand = _a[1];
                        node = view.ui.find("infoExpand");
                        if (!infoPanel) {
                            if (node) {
                                view.ui.remove(node);
                            }
                            return [2 /*return*/];
                        }
                        infoPosVal = typeof infoPanelPosition === "string"
                            ? infoPanelPosition
                            : infoPanelPosition.position;
                        group = infoPosVal.indexOf("left") !== -1
                            ? "left"
                            : infoPosVal.indexOf("right") !== -1
                                ? "right"
                                : null;
                        if (!(node && propertyName === "infoPanelPosition")) return [3 /*break*/, 2];
                        node.expanded = false;
                        node.group = group;
                        view.ui.move(node, infoPanelPosition);
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(propertyName === "infoPanel")) return [3 /*break*/, 4];
                        return [4 /*yield*/, getInfoContent(screenshot)];
                    case 3:
                        infoContent = _b.sent();
                        infoWidget = new Info.default({
                            view: view,
                            infoContent: infoContent,
                            theme: theme
                        });
                        infoExpand = new Expand.default({
                            id: "infoExpand",
                            view: view,
                            group: group,
                            content: infoWidget,
                            mode: "floating",
                            expandTooltip: infoWidget.label,
                            collapseTooltip: infoWidget.label
                        });
                        infoWidget.expandWidget = infoExpand;
                        view.ui.add(infoExpand, infoPanelPosition);
                        return [2 /*return*/, infoWidget];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    exports.addInfoPanel = addInfoPanel;
    function findNode(className) {
        var mainNodes = document.getElementsByClassName(className);
        var node = null;
        for (var j = 0; j < mainNodes.length; j++) {
            node = mainNodes[j];
        }
        return node ? node : null;
    }
    exports.findNode = findNode;
    function getInfoContent(screenshotEnabled) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modules, _a, InfoItem, Collection, screenshotTitle, onboardingPanelScreenshotStepOne, onboardingPanelScreenshotStepTwo, onboardingPanelScreenshotStepThree, onboardingPanelScreenshotStepFour, onboardingPanelScreenshotStepFive, newInteractiveLegend, firstOnboardingWelcomeMessage, secondOnboardingWelcomeMessage, thirdOnboardingWelcomeMessage, screenshotSteps, infoContentItems;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, promiseUtils_1.eachAlways([
                            new Promise(function (resolve_15, reject_15) { require(["../Components/Info/Info/InfoItem"], resolve_15, reject_15); }).then(tslib_1.__importStar),
                            new Promise(function (resolve_16, reject_16) { require(["esri/core/Collection"], resolve_16, reject_16); }).then(tslib_1.__importStar)
                        ])];
                    case 1:
                        modules = _b.sent();
                        _a = modules.map(function (module) { return module.value; }), InfoItem = _a[0], Collection = _a[1];
                        screenshotTitle = resources_1.default.onboardingPanelScreenshotTitle;
                        onboardingPanelScreenshotStepOne = resources_1.default.onboardingPanelScreenshotStepOne, onboardingPanelScreenshotStepTwo = resources_1.default.onboardingPanelScreenshotStepTwo, onboardingPanelScreenshotStepThree = resources_1.default.onboardingPanelScreenshotStepThree, onboardingPanelScreenshotStepFour = resources_1.default.onboardingPanelScreenshotStepFour, onboardingPanelScreenshotStepFive = resources_1.default.onboardingPanelScreenshotStepFive, newInteractiveLegend = resources_1.default.newInteractiveLegend, firstOnboardingWelcomeMessage = resources_1.default.firstOnboardingWelcomeMessage, secondOnboardingWelcomeMessage = resources_1.default.secondOnboardingWelcomeMessage, thirdOnboardingWelcomeMessage = resources_1.default.thirdOnboardingWelcomeMessage;
                        screenshotSteps = [
                            onboardingPanelScreenshotStepOne,
                            onboardingPanelScreenshotStepTwo,
                            onboardingPanelScreenshotStepThree,
                            onboardingPanelScreenshotStepFour,
                            onboardingPanelScreenshotStepFive
                        ];
                        infoContentItems = [
                            firstOnboardingWelcomeMessage,
                            secondOnboardingWelcomeMessage,
                            thirdOnboardingWelcomeMessage
                        ];
                        return [2 /*return*/, screenshotEnabled
                                ? new Collection.default([
                                    new InfoItem.default({
                                        type: "list",
                                        title: screenshotTitle,
                                        infoContentItems: screenshotSteps
                                    }),
                                    new InfoItem.default({
                                        type: "explanation",
                                        title: newInteractiveLegend,
                                        infoContentItems: infoContentItems
                                    })
                                ])
                                : new Collection.default([
                                    new InfoItem.default({
                                        type: "explanation",
                                        title: newInteractiveLegend,
                                        infoContentItems: infoContentItems
                                    })
                                ])];
                }
            });
        });
    }
    exports.getInfoContent = getInfoContent;
    function addScreenshot(props, layerList, selectedStyleData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, screenshot, screenshotPosition, enableLegendOption, enablePopupOption, includeLegendInScreenshot, includePopupInScreenshot, featureCount, theme, modules, _a, Screenshot, Expand, node, screenshotWidget, screenshotPosVal, group, screenshot_1, expand;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        screenshot = config.screenshot, screenshotPosition = config.screenshotPosition, enableLegendOption = config.enableLegendOption, enablePopupOption = config.enablePopupOption, includeLegendInScreenshot = config.includeLegendInScreenshot, includePopupInScreenshot = config.includePopupInScreenshot, featureCount = config.featureCount, theme = config.theme;
                        return [4 /*yield*/, promiseUtils_1.eachAlways([
                                new Promise(function (resolve_17, reject_17) { require(["../Components/Screenshot/Screenshot"], resolve_17, reject_17); }).then(tslib_1.__importStar),
                                new Promise(function (resolve_18, reject_18) { require(["esri/widgets/Expand"], resolve_18, reject_18); }).then(tslib_1.__importStar)
                            ])];
                    case 1:
                        modules = _b.sent();
                        _a = modules.map(function (module) { return module.value; }), Screenshot = _a[0], Expand = _a[1];
                        node = view.ui.find("screenshotExpand");
                        if (!screenshot) {
                            if (node) {
                                screenshotWidget = node === null || node === void 0 ? void 0 : node.content;
                                if (screenshotWidget &&
                                    screenshotWidget.get("viewModel.screenshotModeIsActive")) {
                                    screenshotWidget.set("viewModel.screenshotModeIsActive", false);
                                }
                                view.ui.remove(node);
                            }
                            return [2 /*return*/];
                        }
                        screenshotPosVal = typeof screenshotPosition === "string"
                            ? screenshotPosition
                            : screenshotPosition.position;
                        group = screenshotPosVal.indexOf("left") !== -1
                            ? "left"
                            : screenshotPosVal.indexOf("right") !== -1
                                ? "right"
                                : null;
                        if (propertyName === "screenshot" && screenshot) {
                            screenshot_1 = new Screenshot.default({
                                view: view,
                                enableLegendOption: enableLegendOption,
                                enablePopupOption: enablePopupOption,
                                includeLegendInScreenshot: enableLegendOption
                                    ? includeLegendInScreenshot
                                    : false,
                                includePopupInScreenshot: enablePopupOption
                                    ? includePopupInScreenshot
                                    : false,
                                selectedStyleData: selectedStyleData,
                                legendFeatureCountEnabled: featureCount,
                                layerListViewModel: layerList.viewModel,
                                theme: theme,
                                includeLayoutOption: true
                            });
                            expand = new Expand.default({
                                id: "screenshotExpand",
                                view: view,
                                group: group,
                                content: screenshot_1,
                                mode: "floating",
                                expandTooltip: screenshot_1.label,
                                collapseTooltip: screenshot_1.label
                            });
                            view.ui.add(expand, screenshotPosition);
                            return [2 /*return*/, screenshot_1];
                        }
                        else if (propertyName === "screenshotPosition") {
                            node.expanded = false;
                            node.group = group;
                            view.ui.move(node, screenshotPosition);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addScreenshot = addScreenshot;
    function updateAppTheme(theme) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var style;
            return tslib_1.__generator(this, function (_a) {
                style = document.getElementById("esri-stylesheet");
                style.href =
                    style.href.indexOf("light") !== -1
                        ? style.href.replace(/light/g, theme)
                        : style.href.replace(/dark/g, theme);
                return [2 /*return*/];
            });
        });
    }
    exports.updateAppTheme = updateAppTheme;
    function setShareButtonTheme(theme) {
        var buttonInterval = setInterval(function () {
            var shareButton = findNode("esri-share__share-button");
            if (shareButton) {
                clearInterval(buttonInterval);
            }
            if (!shareButton) {
                return;
            }
            if (theme === "dark") {
                shareButton.classList.add("esri-share__dark-theme--button");
            }
            else {
                shareButton.classList.remove("esri-share__dark-theme--button");
            }
        }, 1);
    }
});
