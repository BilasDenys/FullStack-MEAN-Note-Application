import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {NavbarComponent} from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
    exports: [HttpClientModule, ReactiveFormsModule, FormsModule, NavbarComponent, SpinnerComponent]
})
export class SharedModule {
}
