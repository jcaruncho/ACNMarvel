import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Heroe } from '../../classes/heroe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.css']
})
export class HeroProfileComponent implements OnInit {

  @ViewChild('modal') modal;

  private id: Number;
  public heroe: Heroe;
  public question_modal: string;
  public team: string = "";
  public heroeSubscription: Subscription;
  public heroes$: Observable<Array<Heroe>>;

  constructor(private route: ActivatedRoute, private heroesService: HeroesService, private location: Location, private store: Store<{ heroes: Array<Heroe> }>) { }

  ngOnInit(): void {
    this.heroes$ = this.store.select('heroes');
    this.heroeSubscription = this.heroes$.subscribe((data: any) => {
      if (Object.keys(data.heroProfile).length !== 0) {
        this.team = data.heroProfile.team;
        this.heroesService.setHeroeTeam(data);
      }
    });
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.heroesService.getHeroe(this.id).subscribe((data: any) => {
        const temp = data.response.results[0];
        this.team = temp.team;
        this.heroe = new Heroe(temp.id, temp.name, temp.description, temp.modified, temp.thumbnail, temp.resourceURI, temp.team);
      });
    });
  }

  ngOnDestroy(): void {
    this.heroeSubscription.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  launchModal(): void {
    this.question_modal = "¿En cual grupo quieres colocar a tu súper héroe?";
    this.modal.toggle_modal();
  }

  getTeam(team): void {
    this.team = team;
    this.heroesService.teams.set(this.heroe.id, this.team);
  }
}
