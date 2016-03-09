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
            battlecry: DEF_TARGETED_ACTION({
                altTargets: DefTargetFilter.CHARACTER,
                actions: null
            })
        }

    export
        var Big_Game_Hunter: IMinion = {
            name: `Big Game Hunter`,
            cost: 3,

            type: CARD_TYPE.MINION,
            sub_type: MINION_TYPE.GENERAL,

            attack: 4,
            hp: 2,
            battlecry: [
                DEF_TARGETED_ACTION({
                    altTargets: DefTargetFilter.MINION.addFilter(
                        (caller, card, gameCtx): boolean => {
                            return card instanceof Minion && card.attack >= 7
                        }),
                    actions: DefAction_.destroy_target
                }),

                DEF_TARGETED_ACTION({
                    altTargets: DefTargetFilter.MINION.ATTACK_GREATER_THAN_OR_EQAUL_TO(7),
                    actions: DefAction_.destroy_target
                })
            ]
        }

    export
        var classicSet: CardSet<ICard> = new CardSet<ICard>('classicSet');


    classicSet.registerCard(Bloodfen_Raptor);
}