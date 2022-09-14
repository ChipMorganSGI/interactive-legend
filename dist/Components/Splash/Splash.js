define(["require", "exports", "tslib", "dojo/i18n!../../nls/resources", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "../InteractiveLegend/InteractiveLegend/support/styleUtils", "esri/core/watchUtils"], function (require, exports, tslib_1, i18n, decorators_1, Widget, widget_1, styleUtils_1, watchUtils_1) {
    "use strict";
    var CSS = {
        appBody: "app-body",
        trailerHalf: "trailer-half",
        textRight: "text-right",
        appButton: "app-button",
        esriWidget: "esri-widget",
        esriWidgetButton: "esri-widget--button",
        splashButtonStyles: "splash-button",
        splashContent: "esri-splash__content",
        splashModal: "esri-interactive-legend__splash-modal"
    };
    var Splash = /** @class */ (function (_super) {
        tslib_1.__extends(Splash, _super);
        function Splash(params) {
            var _this = _super.call(this, params) || this;
            _this._splashContentNode = null;
            _this._beforeCloseIsSet = false;
            _this.view = null;
            _this.splashButtonText = null;
            _this.splashContent = null;
            _this.splashOnStart = null;
            _this.splashTitle = null;
            _this.modalNode = null;
            _this.theme = "light";
            return _this;
        }
        Splash.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.when(this, "splashContent", function () {
                    _this._handleSplashContent();
                    _this.scheduleRender();
                }),
                watchUtils_1.watch(this, "splashContent", function () {
                    _this._handleSplashContent();
                    _this.scheduleRender();
                })
            ]);
        };
        Splash.prototype.render = function () {
            var _a = this, splashTitle = _a.splashTitle, splashButtonText = _a.splashButtonText;
            return (widget_1.tsx("calcite-modal", { bind: this, afterCreate: widget_1.storeNode, afterUpdate: this._setBeforeClose, "data-node-ref": "modalNode", size: "medium", theme: this.theme, class: CSS.splashModal },
                widget_1.tsx("h3", { slot: "header" }, splashTitle),
                widget_1.tsx("div", { class: CSS.splashContent, slot: "content" }, this._splashContentNode ? (widget_1.tsx("p", { bind: this._splashContentNode, afterCreate: styleUtils_1.attachToNode })) : null),
                widget_1.tsx("calcite-button", { bind: this, onclick: this._closeModal, slot: "primary", width: "full" }, splashButtonText)));
        };
        Splash.prototype.createToolbarButton = function () {
            var _this = this;
            // add a button to the app that toggles the splash and setup to add to the view
            var splashButton = document.createElement("button");
            splashButton.id = "splash";
            splashButton.title = i18n.introductionPanelTooltip;
            var esriWidget = CSS.esriWidget, esriWidgetButton = CSS.esriWidgetButton, splashButtonStyles = CSS.splashButtonStyles;
            var headerButtonClasses = [
                esriWidget,
                esriWidgetButton,
                splashButtonStyles,
                "esri-icon-description"
            ];
            headerButtonClasses.forEach(function (className) {
                splashButton.classList.add(className);
            });
            var spanElement = document.createElement("span");
            splashButton.appendChild(spanElement);
            watchUtils_1.whenOnce(this, "modalNode", function () {
                splashButton.addEventListener("click", function () {
                    _this.modalNode.setAttribute("active", "true");
                    var parentContainer = document.querySelector(".parent-container");
                    parentContainer.style.zIndex = "0";
                });
            });
            return splashButton;
        };
        Splash.prototype._handleSplashContent = function () {
            var content = document.createElement("div");
            content.innerHTML = this.splashContent;
            this._splashContentNode = content;
            this.scheduleRender();
        };
        Splash.prototype._closeModal = function () {
            this.modalNode.removeAttribute("active");
        };
        Splash.prototype._setBeforeClose = function () {
            var _this = this;
            if (this.modalNode && !this._beforeCloseIsSet) {
                this.modalNode.beforeClose = function () {
                    return _this._beforeClose();
                };
                this._beforeCloseIsSet = true;
            }
        };
        Splash.prototype._beforeClose = function () {
            var _this = this;
            return new Promise(function (resolve) {
                var parentContainer = document.querySelector(".parent-container");
                parentContainer.style.zIndex = "500";
                _this.modalNode.removeAttribute("active");
                resolve();
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Splash.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Splash.prototype, "splashButtonText", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Splash.prototype, "splashContent", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Splash.prototype, "splashOnStart", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Splash.prototype, "splashTitle", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Splash.prototype, "modalNode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Splash.prototype, "theme", void 0);
        Splash = tslib_1.__decorate([
            decorators_1.subclass("Splash")
        ], Splash);
        return Splash;
    }(Widget));
    return Splash;
});
