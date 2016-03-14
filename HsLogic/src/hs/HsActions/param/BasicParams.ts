"use strict";

namespace HSLogic {

    export interface CardsParam extends TargetPlayerParam {
        cards: Card[]
    }


    export interface TargetPlayerParam extends IHsActionParam {
        target: Player
    }


    export interface PlayerAndCardParam extends IHsActionParam {
        card: Card,
        player: Player
    }


    export interface CardParam extends IHsActionParam {
        card: Card
    }

    export interface PlayerAndCardsParam extends IHsActionParam {
        cards: Card[],
        player: Player
    }

}