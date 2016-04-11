"use strict";

namespace HsLogic {


    /**
     * Sequence
     *
 	 */
    export class Sequence extends jsLogic.IAction<HsGameCtx> {

        resolve( self: Sequence, context: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {

                    let actions: ActionType[] = [];

                    while ( self.innerActions && self.innerActions.length > 0 )
                        actions.push( self.innerActions.shift() );

                    //actions.push(context.actionFactory.auraUpdateStep(self.source));
                    actions.push( context.actionFactory.deathCreationStep( { source: self.source }) );

                    resolve( actions );
                });
        }

        constructor( public source: ISource, public innerActions: ActionType[] ) {
            super();
        }

    }
}