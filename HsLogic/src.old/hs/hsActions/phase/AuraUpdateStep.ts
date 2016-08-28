/// <reference path="../../core/action.ts" />
/// <reference path="../../core/ActionEvent.ts" />
"use strict";

namespace HsLogic {


    export interface IAuraUpdateParam extends IActionParam {
        auraType: Def.AURA_TYPE,
    }

    /**
     * AuraUpdateStep
     *
 	 */
    export class AuraUpdateStep<P extends IAuraUpdateParam> extends Action<P> {

        resolve( self: AuraUpdateStep<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(

                ( resolve, reject ): void => {
                    let actions: ActionType[],
                        param: P = this.param;

                    // rebuild auras
                    actions = auraUpdate( param.auraType, gameCtx );

                    // refresh enchantments
                    actions.push( gameCtx.techActionFactory.inlineAction(( resolve, reject ) => {
                        let entities: PermanentExt[];

                        entities = Def.TargetFinder.ANY_ENCHANTED_PERMANENT_EXT.buildSet( param.source, gameCtx );

                        refreshEnchantments( entities );

                        resolve( jsAction.NO_CONSEQUENCES );
                    }) );

                    resolve( actions );
                });
        }
    }
}