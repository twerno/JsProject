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
///<reference path="../core/action/ActionBuilder.ts"/>
///<reference path="core/HsZone.ts"/>
///<reference path="HsCard.ts"/>
///<reference path="core/HsAction.ts"/>
///<reference path="core/HsActionParam.ts"/>


namespace HSLogic {

    export class HsActionBuilder<T extends HsActionParam> extends jsLogic.ActionBuilder {

        addGeneratedCardIntoHand(source: jsLogic.IAction<T>, card: Card, hand: HsZone): AddGeneratedCardIntoHand {
            return new AddGeneratedCardIntoHand(source, card, hand);
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

        fatigue(source: jsLogic.IAction<T>, target: Player): Fatigue {
            return new Fatigue(source, target);
        }

        heal(healParam: HealParam): Heal {
            return new Heal(healParam);
        }

        markAsDestroyed(source: jsLogic.IAction<T>, card: Card): MarkAsDestroyed {
            return new MarkAsDestroyed(source, card);
        }

        millCard(source: jsLogic.IAction<T>, card: Card, graveyard: HsZone): MillCard {
            return new MillCard(source, card, graveyard);
        }

        putCardIntoHand(source: jsLogic.IAction<T>, card: Card, zones: HsZones): PutCardIntoHand {
            return new PutCardIntoHand(source, card, zones);
        }

        returnCardIntoHandFromPlayZone(source: jsLogic.IAction<T>, card: Card, sourceZone: HsZone, hand: HsZone): ReturnCardIntoHandFromPlayZone {
            return new ReturnCardIntoHandFromPlayZone(source, card, sourceZone, hand);
        }

        sequence(source: jsLogic.IAction<T>, innerActions: jsLogic.IAction<T>[]): Sequence {
            return new Sequence(source, innerActions);
        }

        shuffleDeck(source: jsLogic.IAction<T>, zone: HsZone): ShuffleDeck {
            return new ShuffleDeck(source, zone);
        }

        shuffleGeneratedCardIntoDeck(source: jsLogic.IAction<T>, cards: Card[], deck: HsZone): ShuffleGeneratedCardIntoDeck {
            return new ShuffleGeneratedCardIntoDeck(source, cards, deck);
        }
    }
}