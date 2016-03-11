///<reference path="../hs/entity/def/entity/ICard.ts"/>
///<reference path="../hs/entity/def/entity/IPlayer.ts"/>
///<reference path="../hs/entity/CardSet.ts"/>

"use strict";

namespace HSLogic {


    export
        var ClassicPlayer: IPlayer = {
            name: 'ClassicPlayer',
            card_type: CARD_TYPE.HERO,
            hp: 30,
            manaCrystals: 1,
            hero: 'THRALL',
            heroPower: null,
            flags: {}
        };


    export
        var Bloodfen_Raptor: IMinion = {
            name: 'Bloodfen Raptor',
            cost: 2,

            card_type: CARD_TYPE.MINION,
            minion_type: MINION_TYPE.BEAST,

            hp: 2,
            attack: 3
        }

    export
        var Perditions_Blade: IWeapon = {
            name: `Perdition's Blade`,
            cost: 3,

            card_type: CARD_TYPE.WEAPON,

            attack: 2,
            durability: 2,
            battlecry: DEF_TARGETED_ACTION({
                altTargets: DefTargetSetBuilder.CHARACTER,
                actions: null
            })
        }

    export
        var Big_Game_Hunter: IMinion = {
            name: `Big Game Hunter`,
            cost: 3,

            card_type: CARD_TYPE.MINION,
            minion_type: MINION_TYPE.GENERAL,

            attack: 4,
            hp: 2,
            battlecry: [
                //DEF_TARGETED_ACTION({
                //    altTargets: DefTargetFilter.MINION.addFilter(
                //        (caller, card, gameCtx): boolean => {
                //            return card instanceof Minion && card.attack >= 7
                //        }),
                //    actions: DefAction_.destroy_target
                //}),

                DEF_TARGETED_ACTION({

                    altTargets: DefTargetSetBuilder.MINION.ATTACK_GREATER_THAN_OR_EQAUL_TO(7),
                    actions: DefAction_.destroy_target
                })
            ]
        }

    var a = {
        targets: {

        },
    }

    export
        var classicSet: CardSet<ICard> = new CardSet<ICard>('classicSet');


    classicSet.registerCard(Bloodfen_Raptor);
}