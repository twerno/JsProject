///<reference path="../HsAction.ts"/>

"use strict";

namespace HSLogic {
	
    /**
     * Fatigue
     *
 	 */
    export class Fatigue extends HsAction {

        resolve(param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    let counters: number = (++this.target.counters[FatigueCounter.type].value);
                    let dealDamageAction: Damage = new Damage(
                        {
                            source: this,
                            target: this.target,
                            amount: counters
                        });

                    resolve([dealDamageAction]);
                });
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public target: Player) {
            super(source);
        };
    }
}