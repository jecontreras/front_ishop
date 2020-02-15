import { Action } from "@ngrx/store";

export let NAMEAPP          = '[App] Nameapp';

export class NameappAction implements Action {
    readonly type = NAMEAPP;
    constructor( public payload: object,  public opt: string){}
}

export type actions = NameappAction         ;