/// <reference path="../model/zone.ts" />

"use strict";

namespace HsLogic {

    export class HsActionFactory<T extends HsGameCtx> {

        calculateAndDealDamage( param: DamageTargetsParam ): jsAction.IAction<T> {
            return new CalculateAndDealDamage( param );
        }

        calculateAndSplitDamage( param: SplitDamageParam ): jsAction.IAction<T> {
            return new CalculateAndSplitDamage( param );
        }

        multistepDamage( param: MultistepDamageParam ): jsAction.IAction<T> {
            return new MultistepDamage( param );
        }

        calculateAndHeal( param: HealTargetsParam ): jsAction.IAction<T> {
            return new CalculateAndHeal( param );
        }

        calculateAndSplitHeal( param: SplitHealParam ): jsAction.IAction<T> {
            return new CalculateAndSplitHeal( param );
        }

        multistepHeal( param: MultistepHealParam ): jsAction.IAction<T> {
            return new MultistepHeal( param );
        }

        equipHeroPower( param: EquipHeroPowerParam ): jsAction.IAction<T> {
            return new EquipHeroPower( param );
        }

        summonMinion( param: SummonMinionParam ): jsAction.IAction<T> {
            return new SummonMinion( param );
        }

        gainArmor( param: GainArmorParam ): jsAction.IAction<T> {
            return new GainArmor( param );
        }

        drawCard( drawParam: DrawParam ): DrawCard<DrawParam> {
            return new DrawCard( drawParam );
        }

        drawCards( param: DrawCardsParam ): jsAction.IAction<T> {
            return new DrawCards( param );
        }


        fatigue( param: TargetPlayerParam ): Fatigue<TargetPlayerParam> {
            return new Fatigue( param );
        }

        shuffleDeck( param: TargetPlayerParam ): ShuffleDeck<TargetPlayerParam> {
            return new ShuffleDeck( param );
        }

        payCostAndRemoveFromHand( param: PlayCardParam ): PayCostAndRemoveFromHand<PlayCardParam> {
            return new PayCostAndRemoveFromHand( param );
        }

        playCard( param: PlayCardParam ): jsAction.IAction<T> {
            return new PlayCardSequence( param );
        }

        playMinion( param: PlayMinionParam ): jsAction.IAction<T> {
            return new PlayMinionSequence( param );
        }

        playSpell( param: PlaySpellParam ): jsAction.IAction<T> {
            return new PlaySpellSequence( param );
        }

        playWeapon( param: PlayWeaponParam ): jsAction.IAction<T> {
            return new PlayWeaponSequence( param );
        }

        equipWeapon( param: IEquipWeaponParam ): jsAction.IAction<T> {
            return new EquipWeapon( param );
        }

        freeze( param: TargetCharactersParam ): jsAction.IAction<T> {
            return new Freeze( param );
        }

        transformMinion( param: TransformMinionParam ): jsAction.IAction<T> {
            return new TransformMinion( param );
        }

        putCardIntoOwnersHand( param: PutCardIntoOwnersHandParam ): jsAction.IAction<T> {
            return new PutCardIntoOwnersHand( param );
        }


    }
}