import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { heroesReducer } from './store/heroes.reducer';

import { HeroesService } from './services/heroes.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ heroes: heroesReducer })
  ],
  providers: [HeroesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
