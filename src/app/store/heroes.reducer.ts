import { createReducer, on } from '@ngrx/store';

import {
    setHeroes,
    setTeamHero
} from './heroes.actions';
import { Heroe } from '../classes/heroe';

type stateType = {
    heroes: Array<Heroe>,
    heroProfile: Object
}

export const initialState: stateType = {
    heroes: [],
    heroProfile: {}
}

export const heroesReducer = createReducer(
    initialState,
    on(setHeroes, (state, { type, data }) => {
        console.log(state);
        return {
            ...state,
            heroes: data
        }
    }),
    on(setTeamHero, (state, { type, data }) => {
        console.log(state);
        console.log(data);
        return {
            ...state,
            heroProfile: data
        }
    }),

);