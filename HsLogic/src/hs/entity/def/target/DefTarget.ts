"use strict";

namespace HSLogic {

    export interface IDefTarget<P extends ChooseActionParam> {
        setBuilder: IDefTargetSetBuilder,
        chooseActionBuilder: FChooseActionBuilder<P>
    }


    export class DefTargetBuilder {

        static get ARCANE_MISSILE_TARGET(): IDefTarget<ChooseAtRandomParam> {
            return {
                setBuilder: DefTargetSetBuilder.ENEMY.CHARACTER
                    .addFilter(
                    (caller, card, gameCtx): boolean => {
                        return (card instanceof Player)
                            || (card instanceof Minion && card.hp > 0);
                    }),

                chooseActionBuilder: ChooseAtRandomAction.buildAction,
            }
        }
    }
}