import {NgModule, enableProdMode} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgxMaterialDialComponent} from '../dial/dial.component';
import {AppComponent} from './app/app.component';
import 'hammerjs';

@NgModule({
	imports: [
        FormsModule,
        CommonModule,
        FlexLayoutModule
	],
	entryComponents: [],
	declarations: [
        NgxMaterialDialComponent,
		AppComponent
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class NgxMaterialDialExample {}

platformBrowserDynamic().bootstrapModule(NgxMaterialDialExample);
