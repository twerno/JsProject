///<reference path="../../core/event/IActionParam.ts"/>
///<reference path="../../core/event/EventHandlers.ts"/>
///<reference path="../HsActionFactory.ts"/>

"use strict";

namespace HSLogic {

    export class HsGameEnv implements jsLogic.IHasHandlersAndFactory {

        actionFactory: HsActionFactory<HsGameEnv> = new HsActionFactory<HsGameEnv>();

        handlers: jsLogic.EventHandlers<HsGameEnv, HsEventParam> = new jsLogic.EventHandlers<HsGameEnv, HsEventParam>();

        activePlayer: Player = null;

        players: Player[] = [];

        zonesMap: Collection.IStringMap<HsZones> = {};


        zonesOf(player: jsLogic.Entity | TargetPlayer): HsZones {
            let result: HsZones = null;

            if (player instanceof jsLogic.Entity)
                result = this.zonesMap[player.id];
            else if (player instanceof TargetPlayer)
                result = this.zonesMap[player.target.id];

            if (result)
                return result;
            else
                throw new Error(`No zones defined for player: ${player}.`);
        }


        zonesOfActivePlayer(): HsZones {
            return this.zonesOf(this.activePlayer);
        }
    }
}