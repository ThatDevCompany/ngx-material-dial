(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.dial = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

    var NgxMaterialDialComponent = /** @class */ (function () {
        function NgxMaterialDialComponent() {
            this.value = 180;
            this.valueChange = new core.EventEmitter();
        }
        NgxMaterialDialComponent.prototype.onClick = function (e) {
            this.value = this.calcAngle(e.offsetX, e.offsetY);
            this.valueChange.emit(this.value);
            this.redraw();
        };
        NgxMaterialDialComponent.prototype.calcAngle = function (x, y) {
            return Math.round(Math.atan2(y - 50, x - 50) * (180 / Math.PI)) + 90;
        };
        NgxMaterialDialComponent.prototype.redraw = function () {
            this.rootElement.nativeElement.style.transform = 'rotate(' + this.value + 'deg)';
        };
        NgxMaterialDialComponent.prototype.ngOnInit = function () {
            this.redraw();
        };
        NgxMaterialDialComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-material-dial',
                        templateUrl: './dial.component.html',
                        styleUrls: ['./dial.component.css']
                    },] },
        ];
        /** @nocollapse */
        NgxMaterialDialComponent.propDecorators = {
            "rootElement": [{ type: core.ViewChild, args: ['rootElement',] },],
            "value": [{ type: core.Input },],
            "valueChange": [{ type: core.Output },],
        };
        return NgxMaterialDialComponent;
    }());

    var NgxMaterialDialModule = /** @class */ (function () {
        function NgxMaterialDialModule() {
        }
        NgxMaterialDialModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            NgxMaterialDialComponent
                        ],
                        exports: [
                            NgxMaterialDialComponent
                        ]
                    },] },
        ];
        return NgxMaterialDialModule;
    }());

    exports.NgxMaterialDialComponent = NgxMaterialDialComponent;
    exports.NgxMaterialDialModule = NgxMaterialDialModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
