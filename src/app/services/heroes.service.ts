import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Heroe } from '../classes/heroe';
import { setHeroes } from '../store/heroes.actions';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private protocol = 'http:';
  private ApiUrl = '//localhost:3000/bff/acnmarvel-bff/v1/'

  public page = 0;
  public step = 20;
  public total = 0;

  public teams = new Map();
  public group_colors = {
    "azul": "#1f8ff7",
    "violeta": "#a43de3",
    "naranjo": "#df5c0f",
    "verde": "#0ea521"
  }

  constructor(private http: HttpClient, private store: Store<{ heroes: Array<Heroe> }>) { }

  resetPager() {
    this.page = 0;
  }

  getHeroes(nameStartsWith?: string, page?: number) {
    this.page = (page || page === 0) ? page : this.page;
    const url = this.protocol + this.ApiUrl + 'getHeroes'
      + '?offset=' + (this.page * this.step)
      + (nameStartsWith ? ('&nameStartsWith=' + nameStartsWith) : '');
    this.http.get<any>(url).subscribe(data => {
      this.total = Math.ceil(data.response.total / this.step);
      const heroes = data.response.results.map(result => {
        return new Heroe(
          result.id,
          result.name,
          result.description,
          result.modified,
          result.thumbnail,
          result.resourceURI,
          result.team
        );
      });
      this.store.dispatch(setHeroes({ data: heroes }));
    });
  }

  setHeroeTeam(hero) {
    const url = this.protocol + this.ApiUrl + 'setHeroTeam';
    this.http.post<any>(url, hero.heroProfile).subscribe(data => {
      console.log(data);
    });
  }

  getHeroe(id: Number) {
    const url = this.protocol + this.ApiUrl + 'getHeroe/' + id;
    return this.http.get<any>(url);
  }
}