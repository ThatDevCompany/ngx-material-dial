import { ElementRef, EventEmitter, OnInit } from '@angular/core';
export declare class NgxMaterialDialComponent implements OnInit {
    rootElement: ElementRef;
    value: number;
    valueChange: EventEmitter<number>;
    onClick(e: MouseEvent): void;
    calcAngle(x: number, y: number): number;
    redraw(): void;
    ngOnInit(): void;
}
