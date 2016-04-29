/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    export class OnPlayPhaseEvent extends CancelableEvent<PlayCardParam> {
        static get type(): string { return OnPlayPhaseEvent.name }
    }


    /**
     * PlayPhase
     *
     * http://hearthstone.gamepedia.com/Advanced_rulebook#When_does_Overload_occur
     *
     *
 	 */
    export class PlayPhase<P extends PlayCardParam> extends Action<P> {

        resolve( self: PlayPhase<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    actions.push( new OnPlayPhaseEvent( param ).dispatch( gameCtx ) );

                    actions.push( new InlineActionExt(

                        () => !this.param.cancelAction.value
                            && param.card.overload > 0,

                        ( resolve, reject ) => {
                            let actions: ActionType[] = [];

                            for ( let i = 0; i < param.card.overload; i++ )
                                actions.push( gameCtx.techActionFactory.addTag( {
                                    source: param.source,
                                    targets: [param.source.player],
                                    tag: new Def.Future_Overload_Tag( param.source )
                                }) );

                            resolve( actions );
                        }) );


                    resolve( actions );
                });
        }
    }


}