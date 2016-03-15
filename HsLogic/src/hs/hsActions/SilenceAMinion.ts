///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HsLogic {

    export interface ISilenceAMinionParam extends IHsActionParam {
        minion: Minion;
    }

    /**
     * SilenceAMinion
     *
 	 */
    export class SilenceAMinion<P extends ISilenceAMinionParam> extends HsAction<P> {

        resolve( _this_: SilenceAMinion<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        minion: Minion = param.minion,
                        triggers: Def.IDefTargetlessAction[] = minion.triggers.onSilenced;

                    minion.attack = minion.def.attack;
                    minion.hp += Math.min( minion.def.hp - minion.maxHp, minion.def.hp );
                    minion.maxHp = minion.def.hp;

                    minion.flags = {
                        immune: false,
                        elusive: false,
                        divine_shield: false,
                        charge: false,
                        forgetful: false,
                        freezed: false,
                        stealth: false,
                        taunt: false,
                        windfury: false,
                        silenced: true
                    }
                    minion.triggers = {};
                    minion.enchantments = [];
                    minion.counters = {};
                    minion.markers = new jsLogic.MarkersList();

                    resolve( [
                        gameCtx.actionFactory.executeTargetlessTriggers( {
                            source: param.source,
                            defActions: triggers
                        })
                    ] );
                }
            );
        }
    }
}