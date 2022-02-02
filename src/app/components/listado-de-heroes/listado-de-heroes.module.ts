import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListadoDeHeroesRoutingModule } from './listado-de-heroes-routing.module';
import { ListadoDeHeroesComponent } from './listado-de-heroes.component';
import { HeroesService } from '../../services/heroes.service';

@NgModule({
    declarations: [ListadoDeHeroesComponent],
    imports: [
        CommonModule,
        FormsModule,
        ListadoDeHeroesRoutingModule
    ],
    providers: [HeroesService]
})
export class ListadoDeHeroesModule { }