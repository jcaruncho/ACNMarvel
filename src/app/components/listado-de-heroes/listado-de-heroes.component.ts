import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../classes/heroe';

@Component({
  selector: 'app-listado-de-heroes',
  templateUrl: './listado-de-heroes.component.html',
  styleUrls: ['./listado-de-heroes.component.css']
})
export class ListadoDeHeroesComponent implements OnInit {

  public title = 'Tutorial de Angular - Héroes de Marvel';
  public searchString: string;
  public heroesList$: Observable<Array<Heroe>>;
  public heroesList: Array<Heroe>;

  constructor(private heroesService: HeroesService, private store: Store<{ heroes: Array<Heroe> }>) { }

  ngOnInit(): void {
    this.heroesList$ = this.store.select('heroes');
    this.heroesList$.subscribe(({ heroes }: any) => {
      heroes ? this.heroesList = heroes.data : '';
      console.log(this.heroesList);
    });
    this.heroesService.getHeroes();
  }

  submitSearch() {
    this.heroesService.getHeroes(this.searchString);
  }

  prevPage() {
    this.heroesService.getHeroes(this.searchString, this.heroesService.page - 1);
  }

  nextPage() {
    this.heroesService.getHeroes(this.searchString, this.heroesService.page + 1);
  }

  getHeroesService() {
    return { ...this.heroesService }
  };
}
