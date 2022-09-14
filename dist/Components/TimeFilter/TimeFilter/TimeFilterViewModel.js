define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/watchUtils", "esri/core/Collection", "esri/core/Handles", "esri/TimeInterval", "esri/views/layers/support/FeatureFilter", "esri/views/layers/support/FeatureEffect"], function (require, exports, tslib_1, decorators_1, Accessor, watchUtils_1, Collection, Handles, TimeInterval, FeatureFilter, FeatureEffect) {
    "use strict";
    var TimeFilterViewModel = /** @class */ (function (_super) {
        tslib_1.__extends(TimeFilterViewModel, _super);
        function TimeFilterViewModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._handles = new Handles();
            _this.currentTimeConfigItem = null;
            _this.viewModel = null;
            _this.config = null;
            _this.timeFilterConfigCollection = new Collection();
            _this.view = null;
            _this.timeSlider = null;
            _this.filterMode = null;
            _this.muteOpacity = null;
            _this.muteGrayScale = null;
            return _this;
        }
        TimeFilterViewModel.prototype.initialize = function () {
            this._watchMapLoad();
        };
        TimeFilterViewModel.prototype._watchMapLoad = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "view", function () {
                _this.view.when(function () {
                    _this._initConfig();
                    _this._initUpdateTimeSliderWatchers();
                });
            });
        };
        TimeFilterViewModel.prototype._initConfig = function () {
            var _this = this;
            watchUtils_1.init(this, "config", function () {
                _this._setUpTimeFilterConfigItems();
            });
        };
        TimeFilterViewModel.prototype._setUpTimeFilterConfigItems = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var configItemIds, configItemsExist, layerViewPromisesArr, layerViewsRes, timeFilterItems;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            configItemIds = this._getConfigItemsIds();
                            configItemsExist = this._configItemIdsExist(configItemIds);
                            if (!configItemsExist) {
                                window.location.reload();
                                return [2 /*return*/];
                            }
                            layerViewPromisesArr = this._getLayerViewPromisesArr(configItemIds);
                            return [4 /*yield*/, Promise.all(layerViewPromisesArr)];
                        case 1:
                            layerViewsRes = _a.sent();
                            timeFilterItems = this._getTimeFilterItemsArr(layerViewsRes);
                            this.timeFilterConfigCollection.removeAll();
                            this.timeFilterConfigCollection.addMany(timeFilterItems);
                            return [2 /*return*/];
                    }
                });
            });
        };
        TimeFilterViewModel.prototype._getConfigItemsIds = function () {
            return this.config.slice().map(function (configItem) { return configItem.id; });
        };
        TimeFilterViewModel.prototype._configItemIdsExist = function (configItemIds) {
            var _this = this;
            return configItemIds.every(function (id) {
                return _this.view.map.allLayers.find(function (layer) { return layer.id === id; });
            });
        };
        TimeFilterViewModel.prototype._getLayerViewPromisesArr = function (configItemIds) {
            var _this = this;
            var layerViews = [];
            configItemIds.forEach(function (id) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var allLayers, layer;
                return tslib_1.__generator(this, function (_a) {
                    allLayers = this.get("view.map.allLayers");
                    layer = allLayers.find(function (layer) {
                        return layer.id === id && layer.type === "feature";
                    });
                    layerViews.push(this.view.whenLayerView(layer));
                    return [2 /*return*/];
                });
            }); });
            return layerViews;
        };
        TimeFilterViewModel.prototype._getTimeFilterItemsArr = function (layerViewsRes) {
            var timeFilterItems = [];
            this.config.forEach(function (item) {
                var layerView = layerViewsRes.filter(function (layerViewResItem) { return layerViewResItem.layer.id === item.id; })[0];
                timeFilterItems.push({
                    layerView: layerView,
                    increments: item.increments,
                    rangeStart: item.rangeStart,
                    rangeEnd: item.rangeEnd
                });
            });
            return timeFilterItems;
        };
        TimeFilterViewModel.prototype._initUpdateTimeSliderWatchers = function () {
            var _this = this;
            this._handles.add([
                watchUtils_1.watch(this, "config", function () {
                    if (!_this.config) {
                        return;
                    }
                    _this.config.forEach(function (configItem) {
                        var timeFilterItem = _this.timeFilterConfigCollection.find(function (timeFilterConfigItem) {
                            return timeFilterConfigItem.layerView.layer.id === configItem.id;
                        });
                        if (timeFilterItem) {
                            var rangeStart = configItem.rangeStart, rangeEnd = configItem.rangeEnd, increments = configItem.increments;
                            timeFilterItem.rangeStart = rangeStart;
                            timeFilterItem.rangeEnd = rangeEnd;
                            timeFilterItem.increments = increments;
                        }
                    });
                    _this._updateTimeSlider();
                }),
                watchUtils_1.whenOnce(this, "timeSlider", function () {
                    watchUtils_1.whenOnce(_this, "currentTimeConfigItem", function () {
                        _this._updateTimeSlider();
                    });
                }),
                watchUtils_1.watch(this, "currentTimeConfigItem", function () {
                    _this._updateTimeSlider();
                }),
                this._watchFilterModeChange(),
                this._watchOpacityGrayScaleChange()
            ]);
        };
        TimeFilterViewModel.prototype._updateTimeSlider = function () {
            var _this = this;
            if (!this.timeSlider) {
                return;
            }
            var timeConfigItemToUpdate = this.timeFilterConfigCollection.find(function (timeConfigItem) {
                var _a, _b, _c, _d, _e;
                return ((_b = (_a = timeConfigItem === null || timeConfigItem === void 0 ? void 0 : timeConfigItem.layerView) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.id) === ((_e = (_d = (_c = _this.currentTimeConfigItem) === null || _c === void 0 ? void 0 : _c.layerView) === null || _d === void 0 ? void 0 : _d.layer) === null || _e === void 0 ? void 0 : _e.id);
            });
            if (timeConfigItemToUpdate) {
                this.currentTimeConfigItem = timeConfigItemToUpdate;
            }
            var currentLayerView = this.currentTimeConfigItem.layerView
                .layer;
            var currentLVFullTimeExtent = currentLayerView.get("timeInfo.fullTimeExtent");
            this.timeSlider.set("fullTimeExtent", currentLVFullTimeExtent);
            var _a = this.currentTimeConfigItem, rangeStart = _a.rangeStart, rangeEnd = _a.rangeEnd;
            this.timeSlider.set("fullTimeExtent.start", rangeStart);
            this.timeSlider.set("fullTimeExtent.end", rangeEnd);
            var currentTimeExtent = this.currentTimeConfigItem.currentTimeExtent;
            if (currentTimeExtent) {
                var start = currentTimeExtent.start, end = currentTimeExtent.end;
                this.timeSlider.set("values", [start, end]);
            }
            else {
                var _b = this.currentTimeConfigItem, rangeStart_1 = _b.rangeStart, rangeEnd_1 = _b.rangeEnd;
                this.timeSlider.set("values", [new Date(rangeStart_1), new Date(rangeEnd_1)]);
            }
            this.timeSlider.set("stops", {
                interval: new TimeInterval({
                    unit: this.currentTimeConfigItem.increments,
                    value: 1
                })
            });
            this._watchCurrentTimeExtent();
        };
        TimeFilterViewModel.prototype._watchFilterModeChange = function () {
            var _this = this;
            return watchUtils_1.watch(this, "filterMode", function () {
                _this.timeFilterConfigCollection.forEach(function (timeFilterItem) {
                    var _a;
                    var flayerView = timeFilterItem.layerView;
                    if (_this.filterMode === "featureFilter") {
                        var filter = (_a = flayerView === null || flayerView === void 0 ? void 0 : flayerView.effect) === null || _a === void 0 ? void 0 : _a.filter;
                        if (filter) {
                            flayerView.effect = null;
                            flayerView.filter = filter;
                        }
                    }
                    else if (_this.filterMode === "mute") {
                        var filter = flayerView === null || flayerView === void 0 ? void 0 : flayerView.filter;
                        if (filter) {
                            flayerView.filter = null;
                            var _b = _this, muteOpacity = _b.muteOpacity, muteGrayScale = _b.muteGrayScale;
                            var opacityValue = muteOpacity === null ? 30 : muteOpacity;
                            var grayScaleValue = muteGrayScale === null ? 100 : muteGrayScale;
                            flayerView.effect = new FeatureEffect({
                                excludedEffect: "opacity(" + opacityValue + "%) grayscale(" + grayScaleValue + "%)",
                                filter: filter
                            });
                        }
                    }
                });
            });
        };
        TimeFilterViewModel.prototype._watchOpacityGrayScaleChange = function () {
            var _this = this;
            return watchUtils_1.watch(this, "muteOpacity, muteGrayScale", function () {
                _this.timeFilterConfigCollection.forEach(function (timeFilterItem) {
                    var _a;
                    if (_this.filterMode === "mute") {
                        var flayerView = timeFilterItem.layerView;
                        var filter = (flayerView === null || flayerView === void 0 ? void 0 : flayerView.filter) || ((_a = flayerView === null || flayerView === void 0 ? void 0 : flayerView.effect) === null || _a === void 0 ? void 0 : _a.filter);
                        flayerView.filter = null;
                        var _b = _this, muteOpacity = _b.muteOpacity, muteGrayScale = _b.muteGrayScale;
                        var opacityValue = muteOpacity === null ? 30 : muteOpacity;
                        var grayScaleValue = muteGrayScale === null ? 100 : muteGrayScale;
                        flayerView.effect = new FeatureEffect({
                            excludedEffect: "opacity(" + opacityValue + "%) grayscale(" + grayScaleValue + "%)",
                            filter: filter
                        });
                    }
                });
            });
        };
        TimeFilterViewModel.prototype._watchCurrentTimeExtent = function () {
            var _this = this;
            var key = "timeSliderKey";
            if (this._handles.has(key)) {
                this._handles.remove(key);
            }
            this._handles.add(this.timeSlider.watch("timeExtent", function (timeExtent) {
                var _a;
                _this.currentTimeConfigItem.currentTimeExtent = timeExtent;
                var layerView = _this.currentTimeConfigItem
                    .layerView;
                if (_this.filterMode === "featureFilter") {
                    if (layerView.filter) {
                        layerView.set("filter.timeExtent", timeExtent);
                    }
                    else {
                        layerView.set("filter", new FeatureFilter({
                            timeExtent: timeExtent
                        }));
                    }
                }
                else if (_this.filterMode === "mute") {
                    var _b = _this, muteOpacity = _b.muteOpacity, muteGrayScale = _b.muteGrayScale;
                    var opacityValue = muteOpacity === null ? 30 : muteOpacity;
                    var grayScaleValue = muteGrayScale === null ? 100 : muteGrayScale;
                    if ((_a = layerView.effect) === null || _a === void 0 ? void 0 : _a.filter) {
                        layerView.set("effect.filter.timeExtent", timeExtent);
                    }
                    else {
                        layerView.set("effect", new FeatureEffect({
                            filter: new FeatureFilter({
                                timeExtent: timeExtent
                            }),
                            excludedEffect: "opacity(" + opacityValue + "%) grayscale(" + grayScaleValue + "%)"
                        }));
                    }
                }
            }), key);
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterViewModel.prototype, "currentTimeConfigItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterViewModel.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterViewModel.prototype, "config", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterViewModel.prototype, "timeFilterConfigCollection", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterViewModel.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterViewModel.prototype, "timeSlider", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterViewModel.prototype, "filterMode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterViewModel.prototype, "muteOpacity", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterViewModel.prototype, "muteGrayScale", void 0);
        TimeFilterViewModel = tslib_1.__decorate([
            decorators_1.subclass("TimeFilterViewModel")
        ], TimeFilterViewModel);
        return TimeFilterViewModel;
    }(Accessor));
    return TimeFilterViewModel;
});
