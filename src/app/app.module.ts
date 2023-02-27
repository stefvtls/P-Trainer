import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingPage } from './pages/landing/landing.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { LoginFormComponent } from './components/login-form/login-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    TrainerPage,
    CataloguePage,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
