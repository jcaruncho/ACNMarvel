import { createAction, props } from '@ngrx/store';
import { Heroe } from '../classes/heroe';

export const setHeroes = createAction(
    '[Heroes] setHeroes',
    props<{ data }>()
);

export const setTeamHero = createAction(
    '[Hero Component] AddHeroes',
    props<{ data }>()
);