/// <reference path="../model/zone.ts" />

"use strict";

namespace HsLogic {

    export class HsActionFactory<T extends HsGameCtx> {

        //protected _damageFactory: HsDamageFactory<T> = new HsDamageFactory();
        protected _enchantments: HsEnchantmentActionFactory<T> = new HsEnchantmentActionFactory();
        protected _makeAChoice: MakeChoiceActionFactory<T> = new MakeChoiceActionFactory();

        addGeneratedCardIntoHand( param: PlayerAndCardParam ): AddGeneratedCardIntoHand<PlayerAndCardParam> {
            return new AddGeneratedCardIntoHand( param );
        }

        //get damage(): HsDamageFactory<T> { return this._damageFactory }
        get enchantment(): HsEnchantmentActionFactory<T> { return this._enchantments }
        get makeAChoice(): MakeChoiceActionFactory<T> { return this._makeAChoice }


        silenceAMinion( param: ISilenceAMinionParam ): jsAction.IAction<T> {
            return new SilenceAMinion( param );
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

        shuffleDeck( param: TargetPlayerParam ): ShuffleDeck<TargetPlayerParam> {
            return new ShuffleDeck( param );
        }

        shuffleGeneratedCardIntoDeck( source: ISource, cards: Card[], owner: Player ): ShuffleGeneratedCardIntoDeck<PlayerAndCardsParam> {
            return new ShuffleGeneratedCardIntoDeck( { source: source, cards: cards, player: owner });
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
    }
}