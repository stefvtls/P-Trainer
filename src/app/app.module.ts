import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { LandingPage } from './pages/landing/landing.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddPokemonButtonComponent } from './components/add-pokemon-button/add-pokemon-button.component';


@NgModule({
  declarations: [ // components
    AppComponent,
    LandingPage,
    TrainerPage,
    CataloguePage,
    LoginFormComponent,
    PokemonListComponent,
    PokemonItemComponent,
    NavbarComponent,
    AddPokemonButtonComponent
  ],
  imports: [ // modules
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
