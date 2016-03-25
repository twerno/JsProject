///<reference path="../hsActions/AddGeneratedCardIntoHand.ts"/>
///<reference path="../hsActions/DestroyCardInPlay.ts"/>
///<reference path="../hsActions/Discard.ts"/>
///<reference path="../hsActions/DrawCard.ts"/>
///<reference path="../hsActions/EmptyAction.ts"/>
///<reference path="../hsActions/technical/Fatigue.ts"/>
///<reference path="../hsActions/MarkAsDestroyed.ts"/>
///<reference path="../hsActions/MillCard.ts"/>
///<reference path="../hsActions/PutCardIntoHand.ts"/>
///<reference path="../hsActions/ReturnCardIntoHandFromPlayZone.ts"/>
///<reference path="../hsActions/Sequence.ts"/>
///<reference path="../hsActions/ShuffleDeck.ts"/>
///<reference path="../hsActions/ShuffleGeneratedCardIntoDeck.ts"/>
///<reference path="../core/HsZone.ts"/>
///<reference path="../entity/Card.ts"/>
///<reference path="../core/HsAction.ts"/>


"use strict";

namespace HsLogic {

    export class HsActionFactory<T extends HsGameCtx> {

        protected _damageFactory: HsDamageFactory<T> = new HsDamageFactory();
        protected _enchantments: HsEnchantmentActionFactory<T> = new HsEnchantmentActionFactory();
        protected _makeAChoice: MakeChoiceActionFactory<T> = new MakeChoiceActionFactory();

        addGeneratedCardIntoHand( param: PlayerAndCardParam ): AddGeneratedCardIntoHand<PlayerAndCardParam> {
            return new AddGeneratedCardIntoHand( param );
        }

        //auraUpdateStep(source: jsLogic.IAction<T>): AuraUpdateStep {
        //    return new AuraUpdateStep(source);
        //}

        get damage(): HsDamageFactory<T> { return this._damageFactory }
        get enchantment(): HsEnchantmentActionFactory<T> { return this._enchantments }
        get makeAChoice(): MakeChoiceActionFactory<T> { return this._makeAChoice }


        executeTargetlessTriggers( param: ITargetlessTriggersParam ): jsLogic.IAction<T> {
            return new ExecuteTargetlessTriggers( param );
        }

        silenceAMinion( param: ISilenceAMinionParam ): jsLogic.IAction<T> {
            return new SilenceAMinion( param );
        }

        acquireTargets( param: IAcquireTargetsParam ): AcquireTargets {
            return new AcquireTargets( param );
        }


        deathCreationStep( param: IActionParam ): DeathCreationStep<IActionParam> {
            return new DeathCreationStep( param );
        }

        destroyCardInPlay( param: CardParam ): DestroyCardInPlay<CardParam> {
            return new DestroyCardInPlay( param );
        }

        discard( discardParam: PlayerAndCardParam ): Discard<PlayerAndCardParam> {
            return new Discard( discardParam );
        }

        drawCard( drawParam: DrawParam ): DrawCard<DrawParam> {
            return new DrawCard( drawParam );
        }

        emptyAction( source: ISource, message: string ): EmptyAction<EmptyActionParam> {
            return new EmptyAction( { source: source, message: message, sourceType: SOURCE_TYPE.NONE });
        }

        fatigue( param: TargetPlayerParam ): Fatigue<TargetPlayerParam> {
            return new Fatigue( param );
        }

        //heal( healParam: HealTargetsParam ): Heal<HealTargetsParam> {
        //    return new Heal( healParam );
        //}

        //markAsDestroyed(source: jsLogic.IAction<T>, card: Card): MarkAsDestroyed {
        //    return new MarkAsDestroyed(source, card);
        //}

        millCard( source: ISource, card: Card ): MillCard<CardParam> {
            return new MillCard( { source: source, card: card });
        }

        putCardIntoHand( source: ISource, player: Player, card: Card ): PutCardIntoHand<PlayerAndCardParam> {
            return new PutCardIntoHand( {
                source: source,
                player: player,
                card: card
            });
        }

        returnCardIntoOwnersHandFrom( param: ReturnCardIntoOwnersHandParam ): ReturnCardIntoOwnersHandFrom<ReturnCardIntoOwnersHandParam> {
            return new ReturnCardIntoOwnersHandFrom( param );
        }

        //        sequence(source: jsLogic.IAction<T>, innerActions: jsLogic.IAction<T>[]): Sequence {
        //            return new Sequence({ action: source, card: null, caller: null }, innerActions);
        //        }

        shuffleDeck( param: TargetPlayerParam ): ShuffleDeck<TargetPlayerParam> {
            return new ShuffleDeck( param );
        }

        shuffleGeneratedCardIntoDeck( source: ISource, cards: Card[], owner: Player ): ShuffleGeneratedCardIntoDeck<PlayerAndCardsParam> {
            return new ShuffleGeneratedCardIntoDeck( { source: source, cards: cards, player: owner });
        }

        payCostAndRemoveFromHand( param: PlayCardParam ): PayCostAndRemoveFromHand<PlayCardParam> {
            return new PayCostAndRemoveFromHand( param );
        }

        playCard( param: PlayCardParam ): jsLogic.IAction<T> {
            return new PlayCard( param );
        }

        playMinion( param: PlayMinionParam ): jsLogic.IAction<T> {
            return new PlayMinion( param );
        }

        playSpell( param: PlayCardParam ): jsLogic.IAction<T> {
            return new PlaySpell( param );
        }

        playWeapon( param: IEquipWeaponParam ): jsLogic.IAction<T> {
            return new PlayWeapon( param );
        }
    }
}