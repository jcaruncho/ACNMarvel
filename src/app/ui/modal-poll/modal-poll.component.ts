import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store';

import { Heroe } from '../../classes/heroe';
import { setTeamHero } from '../../store/heroes.actions';

@Component({
  selector: 'nf-modal-poll',
  templateUrl: './modal-poll.component.html',
  styleUrls: ['./modal-poll.component.css']
})
export class ModalPollComponent implements OnInit {

  @Input() public title_modal: string;
  @Input() public team_selected: string;
  @Input() public hero: Heroe;
  @Output() setTeam: EventEmitter<string> = new EventEmitter<string>();

  public show_modal: boolean = false;

  constructor(private store: Store<{ heroes: Array<Heroe> }>) { }

  ngOnInit(): void {
  }

  toggle_modal(): void {
    this.show_modal = !this.show_modal;
  }

  send_team(team: string): void {
    this.setTeam.emit(team);
    this.toggle_modal();
    this.store.dispatch(
      setTeamHero({
        data: {
          id: this.hero.id,
          team
        }
      })
    );
  }

}
