import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeComponent } from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';

import 'hammerjs';
import { FeedbackComponent } from './feedback/feedback.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    SignupComponent,
    HeaderComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule
  ],
  entryComponents: [
    SignupComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
