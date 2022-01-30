import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Heroe } from '../classes/heroe';
import { setHeroes } from '../store/heroes.actions';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private protocol = 'https:';
  private ApiUrl = '//gateway.marvel.com:443/v1/public/';

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
    const url = this.protocol + this.ApiUrl + 'characters?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b'
      + '&offset=' + (this.page * this.step)
      + (nameStartsWith ? ('&nameStartsWith=' + nameStartsWith) : '');
    this.http.get<any>(url).subscribe(data => {
      this.total = Math.ceil(data.data.total / this.step);
      const heroes = data.data.results.map(result => {
        return new Heroe(
          result.id,
          result.name,
          result.description,
          result.modified,
          result.thumbnail,
          result.resourceURI,
          this.getTeamColor(result.id)
        );
      });
      this.store.dispatch(setHeroes({ data: heroes }));
    });
  }

  getHeroe(id: Number) {
    const url = this.protocol + this.ApiUrl + 'characters/' + id + '?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b';
    return this.http.get<any>(url);
  }

  getTeamColor(id: String): string {
    return this.teams.get(id) !== undefined ? this.teams.get(id) : "";
  }
}