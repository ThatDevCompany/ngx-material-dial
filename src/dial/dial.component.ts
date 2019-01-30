import {
	Component,
	Input,
	ViewChild,
	ElementRef,
	Output,
	EventEmitter,
	OnInit
} from '@angular/core'

@Component({
	selector: 'ngx-material-dial',
	templateUrl: './dial.component.html',
	styleUrls: ['./dial.component.css']
})
export class NgxMaterialDialComponent implements OnInit {
	@ViewChild('rootElement')
	rootElement: ElementRef

	@Input()
	value: number = 180

	@Output()
	valueChange = new EventEmitter<number>()

	onClick(e: MouseEvent) {
		this.value = this.calcAngle(e.offsetX, e.offsetY)
		this.valueChange.emit(this.value)
		this.redraw()
	}

	calcAngle(x: number, y: number) {
		return Math.round(Math.atan2(y - 50, x - 50) * (180 / Math.PI)) + 90
	}

	redraw() {
		this.rootElement.nativeElement.style.transform =
			'rotate(' + this.value + 'deg)'
	}

	ngOnInit() {
		this.redraw()
	}
}
