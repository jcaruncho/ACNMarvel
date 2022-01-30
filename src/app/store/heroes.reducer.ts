import { createReducer, on } from '@ngrx/store';

import { setHeroes } from './heroes.actions';
import { Heroe } from '../classes/heroe';

export const initialState: Array<Heroe> = [];

export const heroesReducer = createReducer(
    initialState,
    on(setHeroes, (state, data) => {
        return {
            ...state,
            heroes: data
        }
    })
);