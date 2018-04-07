import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as TDC from '@tdc/angular';
import * as Helloworld from '../components';

let comp:    Helloworld.AppComponent;
let fixture: ComponentFixture<Helloworld.AppComponent>;

describe('helloworld.component.app', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TDC.MaterialStubModule
			],
			declarations: [
				Helloworld.AppComponent
			],
			schemas: [
				NO_ERRORS_SCHEMA
			]
		})
        .compileComponents().then(() => {
			fixture = TestBed.createComponent(Helloworld.AppComponent);
			comp    = fixture.componentInstance;
		});
	}));
	tests();
});

function tests() {
	beforeEach(() => {});

	it('can instantiate the component', () => {
		expect(comp).not.toBeNull();
	});
}
