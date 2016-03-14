///<reference path="../hsActions/AddGeneratedCardIntoHand.ts"/>
///<reference path="../hsActions/AuraUpdateStep.ts"/>
///<reference path="../hsActions/Damage.ts"/>
///<reference path="../hsActions/DeathCreationStep.ts"/>
///<reference path="../hsActions/DestroyCardInPlay.ts"/>
///<reference path="../hsActions/Discard.ts"/>
///<reference path="../hsActions/DrawCard.ts"/>
///<reference path="../hsActions/EmptyAction.ts"/>
///<reference path="../hsActions/technical/Fatigue.ts"/>
///<reference path="../hsActions/Heal.ts"/>
///<reference path="../hsActions/MarkAsDestroyed.ts"/>
///<reference path="../hsActions/MillCard.ts"/>
///<reference path="../hsActions/PutCardIntoHand.ts"/>
///<reference path="../hsActions/ReturnCardIntoHandFromPlayZone.ts"/>
///<reference path="../hsActions/Sequence.ts"/>
///<reference path="../hsActions/ShuffleDeck.ts"/>
///<reference path="../hsActions/ShuffleGeneratedCardIntoDeck.ts"/>
///<reference path="../../core/action/ActionFactory.ts"/>
///<reference path="../core/HsZone.ts"/>
///<reference path="../entity/Card.ts"/>
///<reference path="../core/HsAction.ts"/>
///<reference path="../hsActions/main/PayCostAndRemoveFromHand.ts"/>
///<reference path="../hsActions/userAction/PlayMinion.ts"/>


"use strict";

namespace HSLogic {

    export class HsActionFactory<T extends HsGameCtx> extends jsLogic.ActionFactory {

        protected _damageFactory: HsDamageFactory<T> = new HsDamageFactory();
        protected _enchantments: HsEnchantmentActionFactory<T> = new HsEnchantmentActionFactory();

        addGeneratedCardIntoHand( param: PlayerAndCardParam ): AddGeneratedCardIntoHand<PlayerAndCardParam> {
            return new AddGeneratedCardIntoHand( param );
        }

        //auraUpdateStep(source: jsLogic.IAction<T>): AuraUpdateStep {
        //    return new AuraUpdateStep(source);
        //}

        get damage(): HsDamageFactory<T> { return this._damageFactory }
        get enchantment(): HsEnchantmentActionFactory<T> { return this._enchantments }

        deathCreationStep( param: IHsActionParam ): DeathCreationStep<IHsActionParam> {
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

        emptyAction( source: IHsSource, message: string ): EmptyAction<EmptyActionParam> {
            return new EmptyAction( { source: source, message: message, sourceType: SOURCE_TYPE.NONE });
        }

        fatigue( param: TargetPlayerParam ): Fatigue<TargetPlayerParam> {
            return new Fatigue( param );
        }

        heal( healParam: HealParam ): Heal<HealParam> {
            return new Heal( healParam );
        }

        //markAsDestroyed(source: jsLogic.IAction<T>, card: Card): MarkAsDestroyed {
        //    return new MarkAsDestroyed(source, card);
        //}

        millCard( source: IHsSource, card: Card ): MillCard<CardParam> {
            return new MillCard( { source: source, card: card });
        }

        putCardIntoHand( source: IHsSource, player: Player, card: Card ): PutCardIntoHand<PlayerAndCardParam> {
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

        shuffleGeneratedCardIntoDeck( source: IHsSource, cards: Card[], owner: Player ): ShuffleGeneratedCardIntoDeck<PlayerAndCardsParam> {
            return new ShuffleGeneratedCardIntoDeck( { source: source, cards: cards, player: owner });
        }

        payCostAndRemoveFromHand( param: PlayCardParam ): PayCostAndRemoveFromHand<PlayCardParam> {
            return new PayCostAndRemoveFromHand( param );
        }

        playCard( param: PlayCardParam ): jsLogic.IAction<T> {
            return new PlayCard( param );
        }

        playMinion( param: PlayMinionParam ): jsLogic.IAction<T> {
            return new PlayMinion( param ).wrapIt();
        }

        playSpell( param: PlayCardParam ): jsLogic.IAction<T> {
            return new PlaySpell( param ).wrapIt();
        }

        playWeapon( param: PlayCardParam ): jsLogic.IAction<T> {
            return new PlayWeapon( param ).wrapIt();
        }
    }
}