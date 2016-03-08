"use strict";

namespace jsLogic {

    export interface MoveEntityBetweenZonesParam extends IActionParam<IActionContext> {
        entity: Entity,
        sourceZone: Zone<Entity>,
        targetZone: Zone<Entity>
    }

    /**
     * MoveEntityBetweenZones
     *
     */
    export class MoveEntityBetweenZones<T extends IActionContext> extends jsLogic.IAction<T> {


        resolve(_this_: MoveEntityBetweenZones<T>, context: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(
                (resolve, reject): void => {

                    _this_.param.sourceZone.removeEntity(_this_.param.entity);
                    _this_.param.targetZone.addEntity(_this_.param.entity);

                    resolve(null);
                });
        }

        constructor(public param: MoveEntityBetweenZonesParam) {
            super(param.sourceAction);
        };
    }
}