import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthenticationComponent} from './authentication/authentication.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [AuthenticationComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule,]
})
export class AuthModule {
}
