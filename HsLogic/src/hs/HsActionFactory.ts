///<reference path="hsActions/AddGeneratedCardIntoHand.ts"/>
///<reference path="hsActions/AuraUpdateStep.ts"/>
///<reference path="hsActions/Damage.ts"/>
///<reference path="hsActions/DeathCreationStep.ts"/>
///<reference path="hsActions/DestroyCardInPlay.ts"/>
///<reference path="hsActions/Discard.ts"/>
///<reference path="hsActions/DrawCard.ts"/>
///<reference path="hsActions/EmptyAction.ts"/>
///<reference path="hsActions/Fatigue.ts"/>
///<reference path="hsActions/Heal.ts"/>
///<reference path="hsActions/MarkAsDestroyed.ts"/>
///<reference path="hsActions/MillCard.ts"/>
///<reference path="hsActions/PutCardIntoHand.ts"/>
///<reference path="hsActions/ReturnCardIntoHandFromPlayZone.ts"/>
///<reference path="hsActions/Sequence.ts"/>
///<reference path="hsActions/ShuffleDeck.ts"/>
///<reference path="hsActions/ShuffleGeneratedCardIntoDeck.ts"/>
///<reference path="../core/action/ActionFactory.ts"/>
///<reference path="core/HsZone.ts"/>
///<reference path="HsCard.ts"/>
///<reference path="core/HsAction.ts"/>
///<reference path="core/HsGameEnv.ts"/>


namespace HSLogic {

    export class HsActionFactory<T extends HsGameEnv> extends jsLogic.ActionFactory {

        addGeneratedCardIntoHand(source: jsLogic.IAction<T>, player: Player, card: Card): AddGeneratedCardIntoHand {
            return new AddGeneratedCardIntoHand(source, player, card);
        }

        auraUpdateStep(source: jsLogic.IAction<T>): AuraUpdateStep {
            return new AuraUpdateStep(source);
        }

        damage(damageParam: DamageParam): Damage {
            return new Damage(damageParam);
        }

        deathCreationStep(source: jsLogic.IAction<T>): DeathCreationStep {
            return new DeathCreationStep(source);
        }

        destroyCardInPlay(source: jsLogic.IAction<T>, card: Card): DestroyCardInPlay {
            return new DestroyCardInPlay(source, card);
        }

        discard(discardParam: DiscardParam): Discard {
            return new Discard(discardParam);
        }

        drawCard(drawParam: DrawParam): DrawCard {
            return new DrawCard(drawParam);
        }

        emptyAction(source: jsLogic.IAction<T>, message: string): EmptyAction {
            return new EmptyAction(source, message);
        }

        fatigue(source: jsLogic.IAction<T>, player: Player): Fatigue {
            return new Fatigue(source, player);
        }

        heal(healParam: HealParam): Heal {
            return new Heal(healParam);
        }

        markAsDestroyed(source: jsLogic.IAction<T>, card: Card): MarkAsDestroyed {
            return new MarkAsDestroyed(source, card);
        }

        millCard(source: jsLogic.IAction<T>, card: Card): MillCard {
            return new MillCard(source, card);
        }

        putCardIntoHand(source: jsLogic.IAction<T>, player: Player, card: Card): PutCardIntoHand {
            return new PutCardIntoHand(source, player, card);
        }

        returnCardIntoOwnersHandFrom(source: jsLogic.IAction<T>, sourceZone: HsZone, card: Card): ReturnCardIntoOwnersHandFrom {
            return new ReturnCardIntoOwnersHandFrom(source, sourceZone, card);
        }

        sequence(source: jsLogic.IAction<T>, innerActions: jsLogic.IAction<T>[]): Sequence {
            return new Sequence(source, innerActions);
        }

        shuffleDeck(source: jsLogic.IAction<T>, deckOwner: Player): ShuffleDeck {
            return new ShuffleDeck(source, deckOwner);
        }

        shuffleGeneratedCardIntoDeck(source: jsLogic.IAction<T>, cards: Card[], deckOwner: Player): ShuffleGeneratedCardIntoDeck {
            return new ShuffleGeneratedCardIntoDeck(source, cards, deckOwner);
        }
    }
}