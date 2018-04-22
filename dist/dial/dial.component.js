var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
var NgxMaterialDialComponent = /** @class */ (function () {
    function NgxMaterialDialComponent() {
        this.value = 180;
        this.valueChange = new EventEmitter();
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
    __decorate([
        ViewChild('rootElement')
    ], NgxMaterialDialComponent.prototype, "rootElement", void 0);
    __decorate([
        Input()
    ], NgxMaterialDialComponent.prototype, "value", void 0);
    __decorate([
        Output()
    ], NgxMaterialDialComponent.prototype, "valueChange", void 0);
    NgxMaterialDialComponent = __decorate([
        Component({
            selector: 'ngx-material-dial',
            templateUrl: './dial.component.html',
            styleUrls: ['./dial.component.css']
        })
    ], NgxMaterialDialComponent);
    return NgxMaterialDialComponent;
}());
export { NgxMaterialDialComponent };
//# sourceMappingURL=dial.component.js.map