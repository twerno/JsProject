/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    export interface ISilenceAMinionParam extends IActionParam {
        minion: Minion;
    }

    /**
     * SilenceAMinion
     *
 	 */
    export class SilenceAMinion<P extends ISilenceAMinionParam> extends Action<P> {

        resolve( self: SilenceAMinion<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        minion: Minion = param.minion;

                    //@TODO fix for Shadow Madness
                    //triggers: Def.IDefTargetlessAction[] = minion.triggers.onSilenced;

                    //minion.attack = minion.def.attack;
                    //minion.hp() += Math.min( minion.def.health - minion.maxHp, minion.def.health );
                    //minion.maxHp = minion.def.health;

                    //                    minion.flags = {
                    //                        immune: false,
                    //                        elusive: false,
                    //                        divine_shield: false,
                    //                        charge: false,
                    //                        forgetful: false,
                    //                        freezed: false,
                    //                        stealth: false,
                    //                        taunt: false,
                    //                        windfury: false,
                    //                        silenced: true
                    //                    }
                    minion.triggers = [];
                    //minion.enchantments = [];
                    //                    minion.counters = {};
                    //                    minion.markers = new jsLogic.MarkersList();

                    resolve( jsAction.NO_CONSEQUENCES );
                    //                    resolve([
                    //                        gameCtx.actionFactory.executeTargetlessTriggers({
                    //                            source: param.source,
                    //                            defActions: triggers
                    //                        })
                    //                    ]);
                }
            );
        }
    }
}