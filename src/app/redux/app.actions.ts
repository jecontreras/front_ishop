import { Action } from "@ngrx/store";

export let NAMEAPP          = '[App] Nameapp';
export let PERSONA          = '[App] Persona';

export class NameappAction implements Action {
    readonly type = NAMEAPP;
    constructor( public payload: object,  public opt: string){}
}

export class PersonaAction implements Action {
    readonly type = PERSONA;
    constructor( public payload: object,  public opt: string){}
}

export type actions = NameappAction         |
                      PersonaAction         ;