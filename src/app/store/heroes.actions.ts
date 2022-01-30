import { createAction, props } from '@ngrx/store';
import { Heroe } from '../classes/heroe';

export const setHeroes = createAction(
    '[Heroes] setHeroes',
    props<{ data: Array<Heroe> }>()
);