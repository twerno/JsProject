///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {

    export class OnMinionPlaying<P extends PlayCardParam> extends HsActionEvent<P> {
        static get type(): string { return OnMinionPlaying.name }
    }

    export class OnMinionSummoned<P extends PlayCardParam> extends HsActionEvent<P> {
        static get type(): string { return OnMinionSummoned.name }
    }

    //export class OnSpellTargetingPhase extends HsActionEvent<PlayCardParam> {
    //    static get type(): string { return OnSpellTargetingPhase.name }
    //}

    /**
     * PlayCard
     *
 	 */
    export class PlayMinion<P extends PlayMinionParam> extends jsLogic.CancelableAction<HsGameCtx, P> {

        cancelAction(eventParam: P): boolean { return eventParam.cancelAction }
        cancelOnAfterEvent(eventParam: P): boolean { return eventParam.cancelAction }

        onBeforeEventBuilder(param: P): HsActionEvent<P> { return new OnMinionPlaying(param) }
        onAfterEventBuilder(param: P): HsActionEvent<P> { return new OnMinionSummoned(param) }


        resolve(_this_: PlayMinion<P>, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction[]>(

                (resolve, reject): void => {
                    let actions: jsLogic.IAction<HsGameCtx>[] = [
                        gameCtx.actionFactory.payCostAndRemoveFromHand(_this_.param)
                    ];

                    //if (_this_.param.card.type === CARD_TYPE.MINION)



                    // pay cost & remove from hand
                    // delegate to play spell, play minon or play weapon action
                    // 

                    resolve(actions);
                }
            );
        }
    }
}