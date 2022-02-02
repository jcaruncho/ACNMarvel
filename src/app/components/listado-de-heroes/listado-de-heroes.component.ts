import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../classes/heroe';

@Component({
  selector: 'nf-listado-de-heroes',
  templateUrl: './listado-de-heroes.component.html',
  styleUrls: ['./listado-de-heroes.component.css']
})
export class ListadoDeHeroesComponent implements OnInit {

  public title = 'Tutorial de Angular - Héroes de Marvel';
  public searchString: string;
  public heroesList$: Observable<Array<Heroe>>;
  public heroesList: Array<Heroe>;
  public heroesSubscription: Subscription;

  constructor(private heroesService: HeroesService, private store: Store<{ heroes: Array<Heroe> }>) { }

  ngOnInit(): void {
    this.heroesList$ = this.store.select('heroes');
    this.heroesSubscription = this.heroesList$.subscribe(({ heroes }: any) => {
      this.heroesList = heroes;
    });
    this.heroesService.getHeroes();
  }

  ngOnDestroy(): void {
    this.heroesSubscription.unsubscribe();
  }

  submitSearch(): void {
    this.heroesService.getHeroes(this.searchString);
  }

  prevPage(): void {
    this.heroesService.getHeroes(this.searchString, this.heroesService.page - 1);
  }

  nextPage(): void {
    this.heroesService.getHeroes(this.searchString, this.heroesService.page + 1);
  }

  getHeroesServiceData(): any {
    const { page, total } = this.heroesService;
    return { page, total };
  }
}
