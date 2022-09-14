define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/core/Handles", "esri/core/watchUtils", "esri/core/Collection", "esri/views/layers/support/FeatureFilter", "esri/views/layers/support/FeatureEffect", "esri/widgets/LayerList/LayerListViewModel", "esri/tasks/support/Query", "./SelectedStyleData"], function (require, exports, tslib_1, Accessor, decorators_1, Handles, watchUtils, Collection, FeatureFilter, FeatureEffect, LayerListViewModel, Query, SelectedStyleData) {
    "use strict";
    var InteractiveStyleViewModel = /** @class */ (function (_super) {
        tslib_1.__extends(InteractiveStyleViewModel, _super);
        function InteractiveStyleViewModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // ----------------------------------
            //
            //  Variables
            //
            // ----------------------------------
            _this._handles = new Handles();
            _this.activeLayerInfos = null;
            _this.featureCountEnabled = null;
            _this.featureCountQuery = null;
            _this.filterMode = null;
            _this.grayScale = null;
            _this.layerListViewModel = new LayerListViewModel();
            _this.opacity = null;
            _this.searchExpressions = new Collection();
            _this.selectedStyleDataCollection = new Collection();
            _this.searchViewModel = null;
            _this.updateExtentEnabled = null;
            _this.view = null;
            return _this;
            // END OF TOTAL FEATURE COUNT METHODS
        }
        Object.defineProperty(InteractiveStyleViewModel.prototype, "state", {
            // ----------------------------------
            //
            //  Properties
            //
            // ----------------------------------
            get: function () {
                return this.view
                    ? this.get("view.ready")
                        ? this.featureCountQuery
                            ? "querying"
                            : "ready"
                        : "loading"
                    : "disabled";
            },
            enumerable: false,
            configurable: true
        });
        // ----------------------------------
        //
        //  Lifecycle methods
        //
        // ----------------------------------
        InteractiveStyleViewModel.prototype.initialize = function () {
            this._handles.add([
                this._handleSelectedStyleDataCollection(),
                this._watchFilterModeChange(),
                this._watchOpacityGrayScaleChange()
            ]);
        };
        InteractiveStyleViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        // ----------------------------------
        //
        //  Public methods
        //
        // ----------------------------------
        InteractiveStyleViewModel.prototype.applyFeatureFilter = function (elementInfo, field, operationalItemIndex, legendElement, legendInfoIndex, isPredominance, dataLayerId, legendElementInfos, normalizationField) {
            var _a, _b;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var selectedStyleData, queryExpressions, queryExpression, expressionIndex, selectedStyleData_1, featureLayerView, filterExpression, selectedStyleData_2, featureLayerView, filterExpression;
                return tslib_1.__generator(this, function (_c) {
                    selectedStyleData = this.getSelectedStyleData(dataLayerId);
                    queryExpressions = selectedStyleData.queryExpressions;
                    if (isPredominance) {
                        queryExpression = this._handlePredominanceExpression(elementInfo, dataLayerId);
                        expressionIndex = queryExpressions.indexOf(queryExpression);
                        if (queryExpressions.length === 0 || expressionIndex === -1) {
                            if (queryExpressions && queryExpressions[0] === "1=0") {
                                queryExpressions.splice(0, 1);
                            }
                            queryExpressions.push(queryExpression);
                        }
                        else if (queryExpressions &&
                            queryExpressions.length === 1 &&
                            queryExpression === queryExpressions[0]) {
                            queryExpressions[0] = "1=0";
                        }
                        else if (queryExpressions && queryExpressions.length === 1) {
                            queryExpressions[0] = queryExpression;
                        }
                        else if (queryExpressions &&
                            queryExpressions.length === 1 &&
                            queryExpression !== queryExpressions[0] &&
                            queryExpressions[0] === "1=0") {
                            queryExpressions[0] = queryExpression;
                        }
                        else if (queryExpressions &&
                            queryExpressions.length === 1 &&
                            queryExpression === queryExpressions[0] &&
                            queryExpressions[0] === "1=0") {
                            queryExpressions[0] = null;
                        }
                        else {
                            queryExpressions.splice(expressionIndex, 1);
                        }
                        selectedStyleData_1 = this.getSelectedStyleData(dataLayerId);
                        featureLayerView = selectedStyleData_1.featureLayerView;
                        filterExpression = queryExpressions.join(" OR ");
                        this._setSearchExpression(filterExpression);
                        featureLayerView.filter = new FeatureFilter({
                            where: filterExpression,
                            timeExtent: ((_a = featureLayerView === null || featureLayerView === void 0 ? void 0 : featureLayerView.filter) === null || _a === void 0 ? void 0 : _a.timeExtent) ? featureLayerView.filter.timeExtent
                                : null
                        });
                    }
                    else {
                        this._generateQueryExpressions(elementInfo, field, dataLayerId, legendElement, legendInfoIndex, legendElementInfos, normalizationField);
                        selectedStyleData_2 = this.getSelectedStyleData(dataLayerId);
                        featureLayerView = selectedStyleData_2.featureLayerView;
                        filterExpression = queryExpressions.join(" OR ");
                        this._setSearchExpression(filterExpression);
                        featureLayerView.filter = new FeatureFilter({
                            where: filterExpression,
                            timeExtent: ((_b = featureLayerView === null || featureLayerView === void 0 ? void 0 : featureLayerView.filter) === null || _b === void 0 ? void 0 : _b.timeExtent) ? featureLayerView.filter.timeExtent
                                : null
                        });
                    }
                    return [2 /*return*/];
                });
            });
        };
        InteractiveStyleViewModel.prototype.applyFeatureMute = function (elementInfo, field, operationalItemIndex, legendElement, legendInfoIndex, isPredominance, dataLayerId, legendElementInfos, normalizationField) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var selectedStyleData, queryExpressions, _o, opacity, grayScale, opacityValue, grayScaleValue, queryExpression, expressionIndex, filterExpression, featureLayerView, filterExpression;
                return tslib_1.__generator(this, function (_p) {
                    selectedStyleData = this.getSelectedStyleData(dataLayerId);
                    queryExpressions = selectedStyleData.queryExpressions;
                    _o = this, opacity = _o.opacity, grayScale = _o.grayScale;
                    opacityValue = opacity === null ? 30 : opacity;
                    grayScaleValue = grayScale === null ? 100 : grayScale;
                    if (isPredominance) {
                        queryExpression = this._handlePredominanceExpression(elementInfo, dataLayerId);
                        expressionIndex = queryExpressions.indexOf(queryExpression);
                        if (queryExpressions.length === 0 || expressionIndex === -1) {
                            if (queryExpressions && queryExpressions[0] === "1=0") {
                                queryExpressions.splice(0, 1);
                            }
                            queryExpressions.push(queryExpression);
                        }
                        else if (queryExpressions &&
                            queryExpressions.length === 1 &&
                            queryExpression === queryExpressions[0]) {
                            queryExpressions[0] = "1=0";
                        }
                        else if (queryExpressions && queryExpressions.length === 1) {
                            queryExpressions[0] = queryExpression;
                        }
                        else if (queryExpressions &&
                            queryExpressions.length === 1 &&
                            queryExpression !== queryExpressions[0] &&
                            queryExpressions[0] === "1=0") {
                            queryExpressions[0] = queryExpression;
                        }
                        else if (queryExpressions &&
                            queryExpressions.length === 1 &&
                            queryExpression === queryExpressions[0] &&
                            queryExpressions[0] === "1=0") {
                            queryExpressions[0] = null;
                        }
                        else {
                            queryExpressions.splice(expressionIndex, 1);
                        }
                        filterExpression = queryExpressions.join(" OR ");
                        this._setSearchExpression(filterExpression);
                        selectedStyleData.featureLayerView.effect = new FeatureEffect({
                            excludedEffect: "opacity(" + opacityValue + "%) grayscale(" + grayScaleValue + "%)",
                            filter: {
                                where: filterExpression,
                                timeExtent: ((_c = (_b = (_a = selectedStyleData.featureLayerView) === null || _a === void 0 ? void 0 : _a.effect) === null || _b === void 0 ? void 0 : _b.filter) === null || _c === void 0 ? void 0 : _c.timeExtent) ? (_f = (_e = (_d = selectedStyleData.featureLayerView) === null || _d === void 0 ? void 0 : _d.effect) === null || _e === void 0 ? void 0 : _e.filter) === null || _f === void 0 ? void 0 : _f.timeExtent : null
                            }
                        });
                    }
                    else {
                        this._generateQueryExpressions(elementInfo, field, dataLayerId, legendElement, legendInfoIndex, legendElementInfos, normalizationField);
                        featureLayerView = selectedStyleData === null || selectedStyleData === void 0 ? void 0 : selectedStyleData.featureLayerView;
                        filterExpression = queryExpressions.join(" OR ");
                        this._setSearchExpression(filterExpression);
                        featureLayerView.effect = new FeatureEffect({
                            excludedEffect: "opacity(" + opacityValue + "%) grayscale(" + grayScaleValue + "%)",
                            filter: {
                                where: filterExpression,
                                timeExtent: ((_j = (_h = (_g = selectedStyleData.featureLayerView) === null || _g === void 0 ? void 0 : _g.effect) === null || _h === void 0 ? void 0 : _h.filter) === null || _j === void 0 ? void 0 : _j.timeExtent) ? (_m = (_l = (_k = selectedStyleData.featureLayerView) === null || _k === void 0 ? void 0 : _k.effect) === null || _l === void 0 ? void 0 : _l.filter) === null || _m === void 0 ? void 0 : _m.timeExtent : null
                            }
                        });
                    }
                    return [2 /*return*/];
                });
            });
        };
        InteractiveStyleViewModel.prototype.resetLegendFilter = function (featureLayerData) {
            var _a, _b, _c;
            var featureLayerView = featureLayerData.featureLayerView, selectedInfoIndexes = featureLayerData.selectedInfoIndexes;
            var queryExpressions = featureLayerData.queryExpressions;
            if (queryExpressions) {
                queryExpressions.length = 0;
            }
            if (this.filterMode === "featureFilter") {
                if ((_a = featureLayerView === null || featureLayerView === void 0 ? void 0 : featureLayerView.filter) === null || _a === void 0 ? void 0 : _a.timeExtent) {
                    featureLayerView.filter.where = null;
                }
                else {
                    featureLayerView.filter = null;
                }
            }
            else if (this.filterMode === "mute") {
                if ((_c = (_b = featureLayerView === null || featureLayerView === void 0 ? void 0 : featureLayerView.effect) === null || _b === void 0 ? void 0 : _b.filter) === null || _c === void 0 ? void 0 : _c.timeExtent) {
                    featureLayerView.effect.filter.where = null;
                }
                else {
                    featureLayerView.effect = null;
                }
            }
            if (selectedInfoIndexes.length) {
                selectedInfoIndexes.length = 0;
            }
            this._setSearchExpression(null);
            this.notifyChange("state");
        };
        InteractiveStyleViewModel.prototype.validateInteractivity = function (activeLayerInfo, legendElement, field, legendElementIndex) {
            var _a, _b, _c, _d, _e;
            var type = legendElement.type;
            var layerView = activeLayerInfo.get("layerView");
            var classBreakInfos = layerView === null || layerView === void 0 ? void 0 : layerView.get("layer.renderer.classBreakInfos");
            var uniqueValueInfos = (layerView === null || layerView === void 0 ? void 0 : layerView.get("layer.renderer.uniqueValueInfos")) && field;
            var isSizeRamp = type === "size-ramp";
            var isColorRamp = type === "color-ramp";
            var opacityRamp = type === "opacity-ramp";
            var heatmapRamp = type === "heatmap-ramp";
            var hasMoreThanOneClassBreak = layerView && classBreakInfos && classBreakInfos.length > 1;
            var authoringInfoType = layerView === null || layerView === void 0 ? void 0 : layerView.get("layer.renderer.authoringInfo.type");
            var isPredominance = authoringInfoType === "predominance";
            var classifyDataCheckedColorRamp = authoringInfoType === "class-breaks-color";
            var classifyDataCheckedSizeRamp = authoringInfoType === "class-breaks-size";
            var singleSymbol = ((_a = legendElement === null || legendElement === void 0 ? void 0 : legendElement.infos) === null || _a === void 0 ? void 0 : _a.length) === 1 && !field;
            var isRelationship = authoringInfoType === "relationship" &&
                legendElement.type !== "size-ramp";
            var featureLayerData = null;
            (_b = this.selectedStyleDataCollection) === null || _b === void 0 ? void 0 : _b.forEach(function (data) {
                var _a;
                if (data.hasOwnProperty("length")) {
                    var selectedStyleDataItem = data;
                    var featureLayerDataGroup = selectedStyleDataItem;
                    featureLayerData = featureLayerDataGroup.find(function (groupLayerItem) {
                        var _a;
                        return data
                            ? ((_a = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _a === void 0 ? void 0 : _a.id) === (groupLayerItem === null || groupLayerItem === void 0 ? void 0 : groupLayerItem.layerItemId)
                            : null;
                    });
                }
                else {
                    featureLayerData = data
                        ? ((_a = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _a === void 0 ? void 0 : _a.id) === (data === null || data === void 0 ? void 0 : data.layerItemId)
                        : null;
                }
            });
            var isFeatureLayer = (activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.get("layer.type")) === "feature";
            var moreThanOneClassBreak = isFeatureLayer &&
                field &&
                !isColorRamp &&
                !isSizeRamp &&
                featureLayerData &&
                hasMoreThanOneClassBreak;
            var oneClassBreak = isFeatureLayer &&
                field &&
                !isColorRamp &&
                !isSizeRamp &&
                featureLayerData &&
                !hasMoreThanOneClassBreak
                ? true
                : false;
            var validate = oneClassBreak ||
                (isPredominance && !isSizeRamp) ||
                (classifyDataCheckedColorRamp && field) ||
                (classifyDataCheckedSizeRamp && field) ||
                (singleSymbol && !field && field !== null) ||
                isRelationship ||
                uniqueValueInfos
                ? true
                : false;
            var hasClustering = (activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.get("layer.featureReduction")) &&
                ((_c = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.legendElements[legendElementIndex]) === null || _c === void 0 ? void 0 : _c.type) === "size-ramp";
            var isSingleSymbol = legendElement.type === "symbol-table" &&
                ((_d = legendElement === null || legendElement === void 0 ? void 0 : legendElement.infos) === null || _d === void 0 ? void 0 : _d.length) === 1;
            var hasColorRamp = !(activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.legendElements.every(function (legendElement) { return legendElement.type !== "color-ramp"; }));
            var hasSizeRamp = !(activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.legendElements.every(function (legendElement) { return legendElement.type !== "size-ramp"; }));
            var singleSymbolColor = isSingleSymbol && hasColorRamp;
            var singleSymbolSize = isSingleSymbol && hasSizeRamp;
            var isUnclassifiedSizeRamp = (_e = legendElement === null || legendElement === void 0 ? void 0 : legendElement.infos) === null || _e === void 0 ? void 0 : _e.every(function (info) { return typeof info.value === "number"; });
            var isValidated = isFeatureLayer &&
                !hasClustering &&
                !opacityRamp &&
                !heatmapRamp &&
                !singleSymbolColor &&
                !singleSymbolSize &&
                !isUnclassifiedSizeRamp
                ? classBreakInfos
                    ? moreThanOneClassBreak || validate
                    : oneClassBreak || validate
                : false;
            return isValidated;
        };
        InteractiveStyleViewModel.prototype._createSelectedStyleData = function (featureLayerView) {
            if (!featureLayerView) {
                return null;
            }
            else {
                var featureLayer = featureLayerView.get("layer"), renderer = featureLayer.get("renderer"), field = renderer === null || renderer === void 0 ? void 0 : renderer.get("field"), field2 = renderer === null || renderer === void 0 ? void 0 : renderer.get("field2"), field3 = renderer === null || renderer === void 0 ? void 0 : renderer.get("field3"), fieldDelimiter = renderer === null || renderer === void 0 ? void 0 : renderer.get("fieldDelimiter"), normalizationField = renderer === null || renderer === void 0 ? void 0 : renderer.get("normalizationField"), normalizationType = renderer === null || renderer === void 0 ? void 0 : renderer.get("normalizationType"), hasCustomArcade = (field2 || field3) && fieldDelimiter ? true : false, invalidNormalization = normalizationType === "percent-of-total" ||
                    normalizationType === "log";
                if (hasCustomArcade || invalidNormalization) {
                    return null;
                }
                else {
                    var selectedStyleData = new SelectedStyleData({
                        layerItemId: featureLayer.id,
                        field: field,
                        selectedInfoIndexes: [],
                        applyStyles: null,
                        featureLayerView: featureLayerView,
                        normalizationField: normalizationField
                    });
                    return selectedStyleData;
                }
            }
        };
        // LIMITATION: When complex expressions (normalized fields) are queried against feature services that have Use Standardized Queries set to false - update extent cannot be applied.
        InteractiveStyleViewModel.prototype.updateExtentToAllFeatures = function (operationalItemIndex, layerId) {
            var _this = this;
            var selectedStyleData = this.getSelectedStyleData(layerId);
            var layerView = selectedStyleData.featureLayerView;
            var filterWhere = layerView.get("filter.where");
            var effectWhere = layerView.get("effect.filter.where");
            var featureLayer = this.view.map.findLayerById(layerId);
            var query = new Query();
            var queryExpressions = this.filterMode === "featureFilter" ? filterWhere : effectWhere;
            var whereClause = queryExpressions ? "" + queryExpressions : "1=1";
            query.where = whereClause;
            query.outSpatialReference = this.view.spatialReference;
            featureLayer
                .queryExtent(query)
                .catch(function (err) {
                console.error("ERROR: ", err);
            })
                .then(function (extent) {
                _this.view.goTo(extent);
            });
        };
        // ----------------------------------
        //
        //  Feature Filter Methods
        //
        // ----------------------------------
        InteractiveStyleViewModel.prototype._generateQueryExpressions = function (elementInfo, field, dataLayerId, legendElement, legendInfoIndex, legendElementInfos, normalizationField, generateFeatureCountExpression) {
            var queryExpression = this._generateQueryExpression(elementInfo, field, legendInfoIndex, legendElement, legendElementInfos, normalizationField);
            if (!generateFeatureCountExpression) {
                var hasOneValue = legendElementInfos && legendElementInfos.length === 1;
                var selectedStyleData = this.getSelectedStyleData(dataLayerId);
                var queryExpressions = selectedStyleData === null || selectedStyleData === void 0 ? void 0 : selectedStyleData.queryExpressions;
                var expressionIndex = queryExpressions.indexOf(queryExpression);
                if (queryExpressions.length === 0 || expressionIndex === -1) {
                    if (queryExpressions && queryExpressions[0] === "1=0") {
                        queryExpressions.splice(0, 1);
                    }
                    queryExpressions.push(queryExpression);
                }
                else if (queryExpressions &&
                    queryExpressions.length === 1 &&
                    queryExpression === queryExpressions[0] &&
                    !hasOneValue) {
                    queryExpressions[0] = "1=0";
                }
                else if (queryExpressions &&
                    queryExpressions.length === 1 &&
                    !hasOneValue) {
                    queryExpressions[0] = queryExpression;
                }
                else if (queryExpressions &&
                    queryExpressions.length === 1 &&
                    queryExpression !== queryExpressions[0] &&
                    queryExpressions[0] === "1=0" &&
                    !hasOneValue) {
                    queryExpressions[0] = queryExpression;
                }
                else if (queryExpressions &&
                    queryExpressions.length === 1 &&
                    queryExpression === queryExpressions[0] &&
                    queryExpressions[0] === "1=0" &&
                    !hasOneValue) {
                    queryExpressions[0] = null;
                }
                else {
                    queryExpressions.splice(expressionIndex, 1);
                }
            }
            else {
                return queryExpression;
            }
        };
        InteractiveStyleViewModel.prototype._generateQueryExpression = function (elementInfo, field, legendInfoIndex, legendElement, legendElementInfos, normalizationField) {
            var value = elementInfo.value;
            if (legendElement.type === "symbol-table") {
                // Classify data size/color ramp
                if (!elementInfo.hasOwnProperty("value") ||
                    (Array.isArray(elementInfo.value) && legendElementInfos.length === 1)) {
                    // Classify data size/color ramp - 'Other' category
                    if (legendElementInfos[0].hasOwnProperty("value") &&
                        Array.isArray(legendElementInfos[0].value) &&
                        legendElementInfos[legendElementInfos.length - 2] &&
                        legendElementInfos[legendElementInfos.length - 2].hasOwnProperty("value") &&
                        Array.isArray(legendElementInfos[legendElementInfos.length - 2].value)) {
                        var expression = normalizationField
                            ? "((" + field + "/" + normalizationField + ") > " + legendElementInfos[0].value[1] + ") OR ((" + field + "/" + normalizationField + ") < " + legendElementInfos[legendElementInfos.length - 2].value[0] + ") OR " + normalizationField + " = 0 OR " + normalizationField + " IS NULL"
                            : field + " > " + legendElementInfos[0].value[1] + " OR " + field + " < " + legendElementInfos[legendElementInfos.length - 2].value[0] + " OR " + field + " IS NULL";
                        return expression;
                    }
                    else if (legendElementInfos.length === 1) {
                        return "1=0";
                    }
                    else {
                        // Types unique symbols - 'Other' category
                        var expressionList_1 = [];
                        legendElementInfos.forEach(function (legendElementInfo) {
                            if (legendElementInfo.value) {
                                var value_1 = legendElementInfo.value;
                                var singleQuote = value_1.indexOf("'") !== -1 ? value_1.split("'").join("''") : null;
                                var expression = singleQuote
                                    ? field + " <> '" + singleQuote + "'"
                                    : isNaN(value_1) || typeof value_1 === "string" && !value_1.trim()
                                        ? field + " <> '" + value_1 + "'"
                                        : field + " <> " + value_1 + " AND " + field + " <> '" + value_1 + "'";
                                expressionList_1.push(expression);
                            }
                        });
                        var noExpression = expressionList_1.join(" AND ");
                        return field ? noExpression + " OR " + field + " IS NULL" : "";
                    }
                }
                else {
                    var singleQuote = value.indexOf("'") !== -1 ? value.split("'").join("''") : null;
                    var isArray = Array.isArray(elementInfo.value);
                    var isLastElement = legendElementInfos.length - 1 === legendInfoIndex;
                    var lastElementAndNoValue = !legendElementInfos[legendElementInfos.length - 1].hasOwnProperty("value");
                    var secondToLastElement = legendInfoIndex === legendElementInfos.length - 2;
                    var expression = isArray
                        ? normalizationField
                            ? isLastElement || (lastElementAndNoValue && secondToLastElement)
                                ? "(" + field + "/" + normalizationField + ") >= " + value[0] + " AND (" + field + "/" + normalizationField + ") <= " + elementInfo.value[1]
                                : "(" + field + "/" + normalizationField + ") > " + value[0] + " AND (" + field + "/" + normalizationField + ") <= " + elementInfo.value[1]
                            : isLastElement || (lastElementAndNoValue && secondToLastElement)
                                ? field + " >= " + value[0] + " AND " + field + " <= " + value[1]
                                : field + " > " + value[0] + " AND " + field + " <= " + value[1]
                        : legendElementInfos.length === 1 && field
                            ? isNaN(value) || !value.trim().length
                                ? field + " <> '" + value + "'"
                                : field + " <> " + value + " OR " + field + " <> '" + value + "'"
                            : singleQuote
                                ? field + " = '" + singleQuote + "'"
                                : isNaN(value) || !value.trim().length
                                    ? field + " = '" + value + "'"
                                    : field + " = " + value + " OR " + field + " = '" + value + "'";
                    return expression;
                }
            }
        };
        InteractiveStyleViewModel.prototype._handlePredominanceExpression = function (elementInfo, dataLayerId) {
            var selectedStyleData = this.getSelectedStyleData(dataLayerId);
            var featureLayerView = selectedStyleData.featureLayerView;
            var authoringInfo = featureLayerView
                ? featureLayerView.layer.renderer.authoringInfo
                : null;
            var fields = authoringInfo ? authoringInfo.fields : null;
            var expressionArr = [];
            if (!fields) {
                return;
            }
            if (elementInfo.hasOwnProperty("value")) {
                fields.forEach(function (field) {
                    if (elementInfo.value === field) {
                        return;
                    }
                    var sqlQuery = "(" + elementInfo.value + " > " + field + " OR (" + field + " IS NULL AND " + elementInfo.value + " <> 0 AND " + elementInfo.value + " IS NOT NULL))";
                    expressionArr.push(sqlQuery);
                });
                return expressionArr.join(" AND ");
            }
            else {
                var queryForZeroes_1 = [];
                fields.forEach(function (field) {
                    queryForZeroes_1.push(field + " = 0");
                });
                var otherExpression_1 = [];
                if (fields.length > 2) {
                    fields.forEach(function (field1) {
                        fields.forEach(function (field2) {
                            if (field1 === field2) {
                                return;
                            }
                            var queryForMultiplePredominance = [];
                            fields.forEach(function (field3) {
                                if (field1 === field3 || field2 === field3) {
                                    return;
                                }
                                queryForMultiplePredominance.push(field1 + " = " + field2 + " AND (" + field1 + " > " + field3 + " OR " + field1 + " >= " + field3 + ")");
                            });
                            otherExpression_1.push("(" + queryForMultiplePredominance.join(" AND ") + ")");
                        });
                    });
                    var isNull_1 = [];
                    fields.forEach(function (field) {
                        isNull_1.push(field + " IS NULL");
                    });
                    var generatedOtherExpression = "(" + queryForZeroes_1.join(" AND ") + ") OR (" + otherExpression_1.join(" OR ") + ") OR (" + isNull_1.join(" AND ") + ")";
                    return generatedOtherExpression;
                }
                else {
                    var expressions_1 = [];
                    fields.forEach(function (field1) {
                        fields.forEach(function (field2) {
                            if (field1 === field2) {
                                return;
                            }
                            expressions_1.push(field1 + " = " + field2);
                            expressions_1.push("(" + queryForZeroes_1.join(" AND ") + ")");
                        });
                    });
                    var zeroAndNull_1 = [];
                    fields.forEach(function (field1) {
                        fields.forEach(function (field2) {
                            if (field1 === field2) {
                                return;
                            }
                            zeroAndNull_1.push("(" + field1 + " = 0 AND " + field2 + " IS NULL) OR (" + field1 + " IS NULL AND " + field2 + " IS NULL)");
                        });
                    });
                    return "(" + expressions_1.join(" OR ") + ") OR (" + zeroAndNull_1.join(" OR ") + ")";
                }
            }
        };
        InteractiveStyleViewModel.prototype._generateQueryCountExpression = function (elementInfo, field, dataLayerId, legendInfoIndex, legendElement, isPredominance, legendElementInfos, normalizationField, generateFeatureCountExpression) {
            var singleSymbol = legendElementInfos.length === 1;
            if (!singleSymbol) {
                if (isPredominance) {
                    var predominanceExpression = this._handlePredominanceExpression(elementInfo, dataLayerId);
                    return predominanceExpression;
                }
                else {
                    return this._generateQueryExpressions(elementInfo, field, dataLayerId, legendElement, legendInfoIndex, legendElementInfos, normalizationField, generateFeatureCountExpression);
                }
            }
            else {
                var selectedStyleData = this.getSelectedStyleData(dataLayerId);
                var queryExpressions = selectedStyleData.queryExpressions;
                var expression = queryExpressions[0];
                if ((expression && expression === "1=0") ||
                    (expression && expression.indexOf("<>"))) {
                    return "1=0";
                }
                else {
                    return "1=1";
                }
            }
        };
        InteractiveStyleViewModel.prototype.getSelectedStyleData = function (layerId) {
            return this.selectedStyleDataCollection.find(function (selectedStyleDataItem) { return selectedStyleDataItem.layerItemId === layerId; });
        };
        InteractiveStyleViewModel.prototype._setSearchExpression = function (filterExpression) {
            var _this = this;
            if (!this.searchViewModel) {
                return;
            }
            this.searchViewModel.sources.forEach(function (searchSource) {
                _this.layerListViewModel.operationalItems.forEach(function (operationalItem) {
                    if (searchSource.layer &&
                        searchSource.layer.id === operationalItem.layer.id) {
                        if (filterExpression) {
                            searchSource.filter = {
                                where: filterExpression
                            };
                        }
                        else {
                            searchSource.filter = null;
                        }
                    }
                });
            });
        };
        InteractiveStyleViewModel.prototype._handleSelectedStyleDataCollection = function () {
            var _this = this;
            return watchUtils.on(this, "activeLayerInfos", "change", function () {
                if (!_this.view) {
                    return;
                }
                var selectedStyleDataItems = [];
                var promises = [];
                _this._createSelectedStyleDataCollection(selectedStyleDataItems, promises);
            });
        };
        InteractiveStyleViewModel.prototype._createSelectedStyleDataCollection = function (selectedStyleDataArr, promises) {
            var _this = this;
            this.activeLayerInfos.forEach(function (activeLayerInfo) {
                if (activeLayerInfo.layer.type === "group") {
                    _this._groupLayerRecursion(activeLayerInfo.layer, selectedStyleDataArr, promises);
                }
                else {
                    _this._getFeatureLayerView(activeLayerInfo.layer, promises);
                }
            });
            Promise.all(promises).then(function (promiseResponses) {
                promiseResponses.forEach(function (promiseResponse) {
                    var selectedStyleDataItem = _this._createSelectedStyleData(promiseResponse);
                    var existingSelectedStyleDataItem = _this.selectedStyleDataCollection.find(function (selectedStyleDataItemToTest) {
                        return selectedStyleDataItemToTest.layerItemId ===
                            selectedStyleDataItem.layerItemId;
                    });
                    if (!existingSelectedStyleDataItem) {
                        _this.selectedStyleDataCollection.add(selectedStyleDataItem);
                    }
                });
                _this._initFeatureCount();
            });
        };
        InteractiveStyleViewModel.prototype._groupLayerRecursion = function (groupLayer, selectedStyleDataArr, promises) {
            var _this = this;
            groupLayer.layers.forEach(function (layerChild) {
                if (layerChild.type === "group") {
                    var groupLayerChild = layerChild;
                    _this._groupLayerRecursion(groupLayerChild, selectedStyleDataArr, promises);
                }
                else {
                    _this._getFeatureLayerView(layerChild, promises);
                }
            });
        };
        InteractiveStyleViewModel.prototype._getFeatureLayerView = function (layer, promises) {
            promises.push(this.view.whenLayerView(layer).then(function (layerView) {
                return layerView;
            }));
        };
        InteractiveStyleViewModel.prototype._watchFilterModeChange = function () {
            var _this = this;
            return watchUtils.watch(this, "filterMode", function () {
                _this.selectedStyleDataCollection.forEach(function (selectedStyleData) {
                    var _a, _b, _c, _d, _e;
                    if (_this.filterMode === "featureFilter") {
                        var filter = (_c = (_b = (_a = selectedStyleData === null || selectedStyleData === void 0 ? void 0 : selectedStyleData.featureLayerView) === null || _a === void 0 ? void 0 : _a.effect) === null || _b === void 0 ? void 0 : _b.filter) === null || _c === void 0 ? void 0 : _c.clone();
                        if (filter) {
                            selectedStyleData.featureLayerView.effect = null;
                            selectedStyleData.featureLayerView.filter = filter;
                        }
                    }
                    else if (_this.filterMode === "mute") {
                        var filter = (_e = (_d = selectedStyleData === null || selectedStyleData === void 0 ? void 0 : selectedStyleData.featureLayerView) === null || _d === void 0 ? void 0 : _d.filter) === null || _e === void 0 ? void 0 : _e.clone();
                        if (filter) {
                            selectedStyleData.featureLayerView.filter = null;
                            var _f = _this, opacity = _f.opacity, grayScale = _f.grayScale;
                            var opacityValue = opacity === null ? 30 : opacity;
                            var grayScaleValue = grayScale === null ? 100 : grayScale;
                            selectedStyleData.featureLayerView.effect = new FeatureEffect({
                                excludedEffect: "opacity(" + opacityValue + "%) grayscale(" + grayScaleValue + "%)",
                                filter: filter
                            });
                        }
                    }
                });
            });
        };
        InteractiveStyleViewModel.prototype._watchOpacityGrayScaleChange = function () {
            var _this = this;
            return watchUtils.watch(this, "opacity, grayScale", function () {
                _this.selectedStyleDataCollection.forEach(function (selectedStyleData) {
                    var _a, _b, _c;
                    if (_this.filterMode === "mute") {
                        var filter = ((_a = selectedStyleData === null || selectedStyleData === void 0 ? void 0 : selectedStyleData.featureLayerView) === null || _a === void 0 ? void 0 : _a.filter) || ((_c = (_b = selectedStyleData === null || selectedStyleData === void 0 ? void 0 : selectedStyleData.featureLayerView) === null || _b === void 0 ? void 0 : _b.effect) === null || _c === void 0 ? void 0 : _c.filter);
                        selectedStyleData.featureLayerView.filter = null;
                        var _d = _this, opacity = _d.opacity, grayScale = _d.grayScale;
                        var opacityValue = opacity === null ? 30 : opacity;
                        var grayScaleValue = grayScale === null ? 100 : grayScale;
                        selectedStyleData.featureLayerView.effect = new FeatureEffect({
                            excludedEffect: "opacity(" + opacityValue + "%) grayscale(" + grayScaleValue + "%)",
                            filter: filter
                        });
                    }
                });
            });
        };
        // // FEATURE COUNT METHODS
        InteractiveStyleViewModel.prototype._initFeatureCount = function () {
            this._handleFeatureCountForLayers();
            this._updateFeatureCountOnViewUpdate();
        };
        InteractiveStyleViewModel.prototype._handleFeatureCountForLayers = function () {
            var _this = this;
            this.selectedStyleDataCollection.forEach(function (selectedStyleDataItem) {
                var featureLayerView = selectedStyleDataItem.featureLayerView;
                var savedActiveLayerInfo = {
                    activeLayerInfo: null
                };
                _this._getActiveLayerInfo(selectedStyleDataItem.layerItemId, savedActiveLayerInfo);
                if (savedActiveLayerInfo.activeLayerInfo) {
                    watchUtils.whenTrueOnce(savedActiveLayerInfo.activeLayerInfo, "ready", function () {
                        _this._handleActiveLayerInfoForCount(savedActiveLayerInfo.activeLayerInfo, featureLayerView);
                    });
                }
            });
        };
        InteractiveStyleViewModel.prototype._getActiveLayerInfo = function (layerId, savedActiveLayerInfo) {
            var _this = this;
            var activeLayerInfo = this.activeLayerInfos.find(function (activeLayerInfo) { return activeLayerInfo.layer.id === layerId; });
            if (!activeLayerInfo) {
                this.activeLayerInfos.forEach(function (activeLayerInfo) {
                    if (activeLayerInfo.children.length > 0) {
                        _this._getNestedActiveLayerInfo(layerId, activeLayerInfo, savedActiveLayerInfo);
                    }
                });
            }
            if (activeLayerInfo) {
                savedActiveLayerInfo.activeLayerInfo = activeLayerInfo;
            }
        };
        InteractiveStyleViewModel.prototype._getNestedActiveLayerInfo = function (layerId, activeLayerInfoParent, savedActiveLayerInfo) {
            var _this = this;
            var activeLayerInfo = activeLayerInfoParent.children.find(function (activeLayerInfoChild) { return activeLayerInfoChild.layer.id === layerId; });
            if (!activeLayerInfo) {
                if (activeLayerInfoParent.children.length > 0) {
                    activeLayerInfoParent.children.forEach(function (nestedActiveLayerInfoChild) {
                        _this._getNestedActiveLayerInfo(layerId, nestedActiveLayerInfoChild, savedActiveLayerInfo);
                    });
                }
            }
            else {
                if (activeLayerInfo) {
                    savedActiveLayerInfo.activeLayerInfo = activeLayerInfo;
                }
            }
        };
        InteractiveStyleViewModel.prototype._handleActiveLayerInfoForCount = function (activeLayerInfo, featureLayerView) {
            var _this = this;
            var watchLegendElementsForCount = "watch-legend-elements-for-count";
            this._handles.add(watchUtils.whenOnce(activeLayerInfo, "legendElements.length", function () {
                if (_this._handles.has(watchLegendElementsForCount)) {
                    _this._handles.remove(watchLegendElementsForCount);
                }
                activeLayerInfo.legendElements.forEach(function (legendElement, legendElementIndex) {
                    _this._handleLegendElementForCount(legendElement, featureLayerView, legendElementIndex, activeLayerInfo);
                });
            }), watchLegendElementsForCount);
        };
        InteractiveStyleViewModel.prototype._handleLegendElementForCount = function (legendElement, featureLayerView, legendElementIndex, activeLayerInfo) {
            var isInteractive = this.validateInteractivity(activeLayerInfo, legendElement, activeLayerInfo.get("layer.renderer.field"), legendElementIndex);
            if (!(legendElement === null || legendElement === void 0 ? void 0 : legendElement.infos) || !isInteractive) {
                return;
            }
            this._handleLayerViewWatcherForCount(featureLayerView, legendElementIndex, legendElement, activeLayerInfo);
            this._handleFeatureCount(featureLayerView, legendElementIndex, legendElement, activeLayerInfo);
        };
        InteractiveStyleViewModel.prototype._handleLayerViewWatcherForCount = function (featureLayerView, legendElementIndex, legendElement, activeLayerInfo) {
            var _this = this;
            var key = "feature-count-" + activeLayerInfo.layer.id + "-" + legendElementIndex;
            if (!this._handles.has(key) && featureLayerView) {
                this._handles.add(watchUtils.whenFalse(featureLayerView, "updating", function () {
                    _this._handleFeatureCount(featureLayerView, legendElementIndex, legendElement, activeLayerInfo);
                }), key);
            }
        };
        InteractiveStyleViewModel.prototype._handleFeatureCount = function (featureLayerView, legendElementIndex, legendElement, activeLayerInfo) {
            var _this = this;
            var promises = [];
            legendElement.infos.forEach(function (info, infoIndex) {
                _this._handleLegendElementForFeatureCount(featureLayerView, legendElementIndex, infoIndex, legendElement, info, promises, activeLayerInfo);
            });
            Promise.all(promises).then(function (featureCountResponses) {
                _this._handleFeatureCountResponses(featureCountResponses, legendElementIndex, activeLayerInfo);
            });
        };
        InteractiveStyleViewModel.prototype._handleLegendElementForFeatureCount = function (featureLayerView, legendElementIndex, infoIndex, legendElement, info, promises, activeLayerInfo) {
            var _this = this;
            var handlesKey = featureLayerView
                ? featureLayerView.layer.id + "-" + legendElementIndex + "-" + infoIndex
                : null;
            var selectedStyleData = this.getSelectedStyleData(activeLayerInfo.layer.id);
            var field = selectedStyleData.field, normalizationField = selectedStyleData.normalizationField;
            if (!this._handles.has(handlesKey)) {
                var applyFeatureCount = this.validateInteractivity(activeLayerInfo, legendElement, field, legendElementIndex);
                var isPredominance = featureLayerView.get("layer.renderer.authoringInfo.type") ===
                    "predominance";
                if (!applyFeatureCount) {
                    return;
                }
                var queryExpression_1 = this._generateQueryCountExpression(info, field, featureLayerView.layer.id, infoIndex, legendElement, isPredominance, legendElement.infos, normalizationField, applyFeatureCount);
                var query = this._generateFeatureCountQuery(queryExpression_1, featureLayerView);
                promises.push(featureLayerView
                    .queryFeatureCount(query)
                    .then(function (featureCountRes) {
                    return {
                        featureCountRes: featureCountRes,
                        infoIndex: infoIndex
                    };
                })
                    .catch(function (err) {
                    console.warn("Invalid geometry - querying count without geometry: ", err);
                    var queryNoGeometry = _this._generateFeatureCountQueryNoGeometry(queryExpression_1, featureLayerView);
                    return featureLayerView
                        .queryFeatureCount(queryNoGeometry)
                        .then(function (featureCountRes) {
                        return {
                            featureCountRes: featureCountRes,
                            infoIndex: infoIndex
                        };
                    });
                }));
            }
        };
        InteractiveStyleViewModel.prototype._generateFeatureCountQueryNoGeometry = function (queryExpression, featureLayerView) {
            var _a, _b, _c;
            var outSpatialReference = this.view && this.view.get("spatialReference");
            return new Query({
                where: queryExpression,
                outSpatialReference: outSpatialReference,
                timeExtent: ((_a = featureLayerView === null || featureLayerView === void 0 ? void 0 : featureLayerView.filter) === null || _a === void 0 ? void 0 : _a.timeExtent) ? featureLayerView.filter.timeExtent
                    : ((_c = (_b = featureLayerView === null || featureLayerView === void 0 ? void 0 : featureLayerView.effect) === null || _b === void 0 ? void 0 : _b.filter) === null || _c === void 0 ? void 0 : _c.timeExtent) ? featureLayerView.effect.filter.timeExtent
                        : null
            });
        };
        InteractiveStyleViewModel.prototype._generateFeatureCountQuery = function (queryExpression, featureLayerView) {
            var _a, _b, _c;
            var geometry = this.view && this.view.get("extent");
            var outSpatialReference = this.view && this.view.get("spatialReference");
            return new Query({
                where: queryExpression,
                geometry: geometry,
                outSpatialReference: outSpatialReference,
                timeExtent: ((_a = featureLayerView === null || featureLayerView === void 0 ? void 0 : featureLayerView.filter) === null || _a === void 0 ? void 0 : _a.timeExtent) ? featureLayerView.filter.timeExtent
                    : ((_c = (_b = featureLayerView === null || featureLayerView === void 0 ? void 0 : featureLayerView.effect) === null || _b === void 0 ? void 0 : _b.filter) === null || _c === void 0 ? void 0 : _c.timeExtent) ? featureLayerView.effect.filter.timeExtent
                        : null
            });
        };
        InteractiveStyleViewModel.prototype._handleFeatureCountResponses = function (featureCountResObjects, legendElementIndex, activeLayerInfo) {
            var _a;
            var featureCountsForLegendElement = featureCountResObjects
                .slice()
                .map(function (featureCountResObject) { return featureCountResObject.featureCountRes; });
            var selectedStyleData = this.getSelectedStyleData(activeLayerInfo.layer.id);
            if (!selectedStyleData) {
                return;
            }
            var featureCountsForLayer = selectedStyleData === null || selectedStyleData === void 0 ? void 0 : selectedStyleData.featureCount;
            featureCountsForLayer === null || featureCountsForLayer === void 0 ? void 0 : featureCountsForLayer.splice(legendElementIndex, 1, featureCountsForLegendElement);
            if (((_a = selectedStyleData.selectedInfoIndexes[legendElementIndex]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                this.updateTotalFeatureCount(activeLayerInfo, legendElementIndex);
            }
            else {
                this.queryTotalFeatureCount(legendElementIndex, activeLayerInfo);
            }
        };
        InteractiveStyleViewModel.prototype._updateFeatureCountOnViewUpdate = function () {
            var _this = this;
            var featureCountViewUpdateKey = "feature-count-view-update-key";
            this._handles.remove(featureCountViewUpdateKey);
            this._handles.add([
                watchUtils.whenFalse(this, "view.stationary", function () {
                    if (!_this.view.stationary) {
                        var stationaryIsTrue_1 = "stationary-is-true";
                        _this._handles.add(watchUtils.whenTrueOnce(_this, "view.stationary", function () {
                            if (_this._handles.has(stationaryIsTrue_1)) {
                                _this._handles.remove(stationaryIsTrue_1);
                            }
                            _this._watchDataForCount();
                        }), stationaryIsTrue_1);
                    }
                    else {
                        var stationaryIsFalse_1 = "stationary-is-false";
                        _this._handles.add(watchUtils.whenFalseOnce(_this, "view.interacting", function () {
                            if (_this._handles.has(stationaryIsFalse_1)) {
                                _this._handles.remove(stationaryIsFalse_1);
                            }
                            _this._watchDataForCount();
                        }), stationaryIsFalse_1);
                    }
                })
            ], featureCountViewUpdateKey);
        };
        InteractiveStyleViewModel.prototype._watchDataForCount = function () {
            var _this = this;
            var activeLayerInfosCountKey = "active-layer-infos-count-key";
            this._handles.add(watchUtils.when(this, "activeLayerInfos.length", function () {
                if (_this._handles.has(activeLayerInfosCountKey)) {
                    _this._handles.remove(activeLayerInfosCountKey);
                }
                var selectedStyleDataCollectionCountKey = "selected-style-data-collection-count-key";
                _this._handles.add(watchUtils.when(_this, "selectedStyleDataCollection.length", function () {
                    if (_this._handles.has(selectedStyleDataCollectionCountKey)) {
                        _this._handles.remove(selectedStyleDataCollectionCountKey);
                    }
                    _this._handleFeatureCountForLayers();
                }), selectedStyleDataCollectionCountKey);
            }), activeLayerInfosCountKey);
        };
        // END OF INIT FEATURE COUNT METHODS
        // START TOTAL FEATURE COUNT METHODS
        InteractiveStyleViewModel.prototype.queryTotalFeatureCount = function (legendElementIndex, activeLayerInfo) {
            var selectedStyleData = this.getSelectedStyleData(activeLayerInfo.layer.id);
            var featureCount = selectedStyleData.featureCount, totalFeatureCount = selectedStyleData.totalFeatureCount;
            var featureCountForLegend = featureCount.getItemAt(legendElementIndex);
            var total = (featureCountForLegend === null || featureCountForLegend === void 0 ? void 0 : featureCountForLegend.length) > 0 &&
                featureCountForLegend.reduce(function (num1, num2) { return num1 + num2; });
            if (totalFeatureCount === undefined || totalFeatureCount === null) {
                selectedStyleData.totalFeatureCount = 0;
                return;
            }
            selectedStyleData.totalFeatureCount = total;
        };
        InteractiveStyleViewModel.prototype.updateTotalFeatureCount = function (activeLayerInfo, legendElementIndex) {
            var selectedStyleData = this.getSelectedStyleData(activeLayerInfo.layer.id);
            var featureCount = selectedStyleData.featureCount;
            var featureCountForLegend = featureCount.getItemAt(legendElementIndex);
            var selectedInfoIndexes = selectedStyleData.selectedInfoIndexes[legendElementIndex];
            var currentTotal = 0;
            selectedInfoIndexes &&
                selectedInfoIndexes.forEach(function (infoIndex) {
                    currentTotal += featureCountForLegend[infoIndex];
                });
            selectedStyleData.totalFeatureCount = currentTotal;
        };
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: [
                    "view.updating",
                    "searchExpressions",
                    "layerListViewModel",
                    "featureCountQuery"
                ],
                readOnly: true
            })
        ], InteractiveStyleViewModel.prototype, "state", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractiveStyleViewModel.prototype, "activeLayerInfos", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractiveStyleViewModel.prototype, "featureCountEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractiveStyleViewModel.prototype, "featureCountQuery", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractiveStyleViewModel.prototype, "filterMode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractiveStyleViewModel.prototype, "grayScale", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractiveStyleViewModel.prototype, "layerListViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractiveStyleViewModel.prototype, "opacity", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractiveStyleViewModel.prototype, "searchExpressions", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractiveStyleViewModel.prototype, "selectedStyleDataCollection", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractiveStyleViewModel.prototype, "searchViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractiveStyleViewModel.prototype, "updateExtentEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractiveStyleViewModel.prototype, "view", void 0);
        InteractiveStyleViewModel = tslib_1.__decorate([
            decorators_1.subclass("InteractiveStyleViewModel")
        ], InteractiveStyleViewModel);
        return InteractiveStyleViewModel;
    }(Accessor));
    return InteractiveStyleViewModel;
});
