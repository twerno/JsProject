
/// <reference path="../core/action.ts" />
/// <reference path="../core/actionevent.ts" />

"use strict";

namespace HsLogic {

    export interface TargetCharactersParam extends IActionParam {
        targets: Character[];
    }

    //export interface CardsParam extends TargetPlayerParam {
    //    cards: Card[]
    //}


    export interface TargetPlayerParam extends IActionParam {
        player: Player
    }


    //export interface PlayerAndCardParam extends IActionParam {
    //    card: Card,
    //    player: Player
    //}


    //export interface CardParam extends IActionParam {
    //    card: Card
    //}

    //export interface PlayerAndCardsParam extends IActionParam {
    //    cards: Card[],
    //    player: Player
    //}

}