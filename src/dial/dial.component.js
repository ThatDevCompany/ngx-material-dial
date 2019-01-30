"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NgxMaterialDialComponent = /** @class */ (function () {
    function NgxMaterialDialComponent() {
        this.value = 180;
        this.valueChange = new core_1.EventEmitter();
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
        this.rootElement.nativeElement.style.transform =
            'rotate(' + this.value + 'deg)';
    };
    NgxMaterialDialComponent.prototype.ngOnInit = function () {
        this.redraw();
    };
    __decorate([
        core_1.ViewChild('rootElement')
    ], NgxMaterialDialComponent.prototype, "rootElement", void 0);
    __decorate([
        core_1.Input()
    ], NgxMaterialDialComponent.prototype, "value", void 0);
    __decorate([
        core_1.Output()
    ], NgxMaterialDialComponent.prototype, "valueChange", void 0);
    NgxMaterialDialComponent = __decorate([
        core_1.Component({
            selector: 'ngx-material-dial',
            templateUrl: './dial.component.html',
            styleUrls: ['./dial.component.css']
        })
    ], NgxMaterialDialComponent);
    return NgxMaterialDialComponent;
}());
exports.NgxMaterialDialComponent = NgxMaterialDialComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQVFzQjtBQU90QjtJQUxBO1FBVUMsVUFBSyxHQUFXLEdBQUcsQ0FBQTtRQUduQixnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBVSxDQUFBO0lBb0J6QyxDQUFDO0lBbEJBLDBDQUFPLEdBQVAsVUFBUSxDQUFhO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDakMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2QsQ0FBQztJQUVELDRDQUFTLEdBQVQsVUFBVSxDQUFTLEVBQUUsQ0FBUztRQUM3QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDckUsQ0FBQztJQUVELHlDQUFNLEdBQU47UUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUztZQUM3QyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUE7SUFDakMsQ0FBQztJQUVELDJDQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDZCxDQUFDO0lBekJEO1FBREMsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7aUVBQ0Y7SUFHdkI7UUFEQyxZQUFLLEVBQUU7MkRBQ1c7SUFHbkI7UUFEQyxhQUFNLEVBQUU7aUVBQytCO0lBUjVCLHdCQUF3QjtRQUxwQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ25DLENBQUM7T0FDVyx3QkFBd0IsQ0E0QnBDO0lBQUQsK0JBQUM7Q0FBQSxBQTVCRCxJQTRCQztBQTVCWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRDb21wb25lbnQsXG5cdElucHV0LFxuXHRWaWV3Q2hpbGQsXG5cdEVsZW1lbnRSZWYsXG5cdE91dHB1dCxcblx0RXZlbnRFbWl0dGVyLFxuXHRPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLWRpYWwnLFxuXHR0ZW1wbGF0ZVVybDogJy4vZGlhbC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2RpYWwuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsRGlhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdEBWaWV3Q2hpbGQoJ3Jvb3RFbGVtZW50Jylcblx0cm9vdEVsZW1lbnQ6IEVsZW1lbnRSZWZcblxuXHRASW5wdXQoKVxuXHR2YWx1ZTogbnVtYmVyID0gMTgwXG5cblx0QE91dHB1dCgpXG5cdHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KClcblxuXHRvbkNsaWNrKGU6IE1vdXNlRXZlbnQpIHtcblx0XHR0aGlzLnZhbHVlID0gdGhpcy5jYWxjQW5nbGUoZS5vZmZzZXRYLCBlLm9mZnNldFkpXG5cdFx0dGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpXG5cdFx0dGhpcy5yZWRyYXcoKVxuXHR9XG5cblx0Y2FsY0FuZ2xlKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG5cdFx0cmV0dXJuIE1hdGgucm91bmQoTWF0aC5hdGFuMih5IC0gNTAsIHggLSA1MCkgKiAoMTgwIC8gTWF0aC5QSSkpICsgOTBcblx0fVxuXG5cdHJlZHJhdygpIHtcblx0XHR0aGlzLnJvb3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID1cblx0XHRcdCdyb3RhdGUoJyArIHRoaXMudmFsdWUgKyAnZGVnKSdcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMucmVkcmF3KClcblx0fVxufVxuIl19