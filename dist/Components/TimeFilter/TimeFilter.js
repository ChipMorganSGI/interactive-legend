define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "dojo/i18n!./TimeFilter/nls/resources", "esri/widgets/support/widget", "./TimeFilter/TimeFilterViewModel", "esri/widgets/TimeSlider", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, Widget, i18n, widget_1, TimeFilterViewModel_1, TimeSlider, watchUtils_1) {
    "use strict";
    TimeFilterViewModel_1 = tslib_1.__importDefault(TimeFilterViewModel_1);
    var base = "esri-time-filter";
    var CSS = {
        base: base + " esri-widget",
        panel: "esri-widget--panel",
        selectLayerLabel: base + "__layer-selector-label",
        layerSelectorDropdown: base + "__layer-selector-dropdown",
        noTimeLayerContainer: base + "__no-time-layer-container esri-widget esri-widget--panel",
        icons: {
            clock: "esri-icon-time-clock"
        }
    };
    var TimeFilter = /** @class */ (function (_super) {
        tslib_1.__extends(TimeFilter, _super);
        function TimeFilter(params) {
            var _this = _super.call(this, params) || this;
            _this.iconClass = CSS.icons.clock;
            _this.timeFilterConfigCollection = null;
            _this.config = null;
            _this.view = null;
            _this.currentTimeConfigItem = null;
            _this.timeSlider = null;
            _this.filterMode = null;
            _this.muteOpacity = null;
            _this.muteGrayScale = null;
            _this.viewModel = new TimeFilterViewModel_1.default();
            return _this;
        }
        TimeFilter.prototype.postInitialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "timeFilterConfigCollection.length", function () {
                _this.currentTimeConfigItem = _this.timeFilterConfigCollection.getItemAt(0);
            });
        };
        TimeFilter.prototype.render = function () {
            var _a;
            var layerSelector = this._renderLayerSelector();
            var timeSlider = this._renderTimeSlider();
            var noTimeLayers = this.viewModel.timeFilterConfigCollection.length === 0;
            var widgetPanel = (_a = {},
                _a[CSS.panel] = document.body.clientWidth < 813,
                _a);
            return (widget_1.tsx("div", { class: this.classes(CSS.base, widgetPanel) },
                noTimeLayers ? (widget_1.tsx("div", { class: CSS.noTimeLayerContainer }, "No time enabled layers in map.")) : null,
                !noTimeLayers ? layerSelector : null,
                !noTimeLayers ? timeSlider : null));
        };
        // START OF PRIVATE RENDER METHODS
        TimeFilter.prototype._renderLayerSelector = function () {
            var _a, _b;
            var options = this._renderLayerOptions();
            return (widget_1.tsx("label", { class: CSS.selectLayerLabel },
                i18n.selectLayer,
                widget_1.tsx("select", { bind: this, onchange: this._handleSelect, id: "timeLayers", class: CSS.layerSelectorDropdown, disabled: this.timeFilterConfigCollection.length < 2 ||
                        ((_b = (_a = this.timeSlider) === null || _a === void 0 ? void 0 : _a.viewModel) === null || _b === void 0 ? void 0 : _b.state) === "playing"
                        ? true
                        : false }, options)));
        };
        TimeFilter.prototype._renderTimeSlider = function () {
            return widget_1.tsx("div", { bind: this, afterCreate: this._initTimeSlider });
        };
        TimeFilter.prototype._renderLayerOptions = function () {
            return this.timeFilterConfigCollection.toArray().map(function (item) {
                var _a = item.layerView.layer, id = _a.id, title = _a.title;
                return (widget_1.tsx("option", { key: "time-filter-layer-" + id, value: id }, title));
            });
        };
        // END OF PRIVATE RENDER METHODS
        TimeFilter.prototype._handleSelect = function (e) {
            var node = e.target;
            var options = node.options, selectedIndex = node.selectedIndex;
            var selected = options[selectedIndex];
            var value = selected.value;
            var timeFilterConfigCollection = this.timeFilterConfigCollection;
            var timeConfigItem = timeFilterConfigCollection.find(function (timeConfigItem) { return timeConfigItem.layerView.layer.id === value; });
            this.currentTimeConfigItem = timeConfigItem;
        };
        TimeFilter.prototype._initTimeSlider = function (container) {
            if (this.timeSlider) {
                return;
            }
            if (!this.view) {
                return;
            }
            this.timeSlider = new TimeSlider({
                container: container,
                mode: "time-window",
                loop: true
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilter.prototype, "iconClass", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.timeFilterConfigCollection")
        ], TimeFilter.prototype, "timeFilterConfigCollection", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.config")
        ], TimeFilter.prototype, "config", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.view")
        ], TimeFilter.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.currentTimeConfigItem")
        ], TimeFilter.prototype, "currentTimeConfigItem", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.timeSlider")
        ], TimeFilter.prototype, "timeSlider", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.filterMode")
        ], TimeFilter.prototype, "filterMode", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.muteOpacity")
        ], TimeFilter.prototype, "muteOpacity", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.muteGrayScale")
        ], TimeFilter.prototype, "muteGrayScale", void 0);
        tslib_1.__decorate([
            decorators_1.property({ type: TimeFilterViewModel_1.default })
        ], TimeFilter.prototype, "viewModel", void 0);
        TimeFilter = tslib_1.__decorate([
            decorators_1.subclass("TimeFilter")
        ], TimeFilter);
        return TimeFilter;
    }(Widget));
    return TimeFilter;
});
