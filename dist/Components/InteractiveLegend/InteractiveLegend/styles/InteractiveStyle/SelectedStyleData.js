define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Collection"], function (require, exports, tslib_1, decorators_1, Accessor, Collection) {
    "use strict";
    var SelectedStyleData = /** @class */ (function (_super) {
        tslib_1.__extends(SelectedStyleData, _super);
        function SelectedStyleData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.activeLayerInfo = null;
            _this.layerItemId = null;
            _this.selectedInfoIndexes = [];
            _this.field = null;
            _this.applyStyles = null;
            _this.featureLayerView = null;
            _this.normalizationField = null;
            _this.queryExpressions = [];
            _this.featureCount = new Collection();
            _this.totalFeatureCount = null;
            return _this;
        }
        tslib_1.__decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "activeLayerInfo", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "layerItemId", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "selectedInfoIndexes", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "field", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "applyStyles", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "featureLayerView", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "normalizationField", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "queryExpressions", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "featureCount", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SelectedStyleData.prototype, "totalFeatureCount", void 0);
        SelectedStyleData = tslib_1.__decorate([
            decorators_1.subclass("SelectedStyleData")
        ], SelectedStyleData);
        return SelectedStyleData;
    }(Accessor));
    return SelectedStyleData;
});
