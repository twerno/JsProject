"use strict";

namespace HSLogic {

    export interface CardsParam extends PlayerParam {
        cards: Card[]
    }


    export interface PlayerParam extends HsActionParam {
        player: Player
    }


    export interface PlayerAndCardParam extends HsActionParam {
        card: Card,
        player: Player
    }


    export interface CardParam extends HsActionParam {
        card: Card
    }

    export interface PlayerAndCardsParam extends HsActionParam {
        cards: Card[],
        player: Player
    }

}