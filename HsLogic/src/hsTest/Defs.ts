///<reference path="../hs/entities/def/ICard.ts"/>
///<reference path="../hs/entities/def/IPlayer.ts"/>
///<reference path="../hs/entities/CardSet.ts"/>

"use strict";

namespace HSLogic {


    export
        var ClassicPlayer: IPlayer = {
            name: 'ClassicPlayer',
            type: CARD_TYPE.HERO,
            hp: 30,
            manaCrystals: 1,
            hero: 'THRALL',
            heroPower: null
        };


    export
        var Bloodfen_Raptor: IMinion = {
            name: 'Bloodfen Raptor',
            cost: 2,

            type: CARD_TYPE.MINION,
            sub_type: MINION_TYPE.BEAST,

            hp: 2,
            attack: 3
        }

    export
        var Perditions_Blade: IWeapon = {
            name: `Perdition's Blade`,
            cost: 3,

            type: CARD_TYPE.WEAPON,

            attack: 2,
            durability: 2,


        }

    export
        var classicSet: CardSet<ICard> = new CardSet<ICard>('classicSet');


    classicSet.registerCard(Bloodfen_Raptor);
}