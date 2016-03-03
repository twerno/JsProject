///<reference path="../../core/event/IActionParam.ts"/>
///<reference path="../../core/event/EventHandlers.ts"/>

"use strict";

namespace HSLogic {

    export class HsGameEnv implements jsLogic.IHasHandlersAndBuilder {

        actionFactory: HsActionBuilder<HsGameEnv> = new HsActionBuilder<HsGameEnv>();

        handlers: jsLogic.EventHandlers<HsGameEnv, HsEventParam> = new jsLogic.EventHandlers<HsGameEnv, HsEventParam>();

        activePlayer: Player = null;

        players: Player[] = [];

        zonesMap: Collection.IStringMap<HsZones> = {};

        zonesOf(player: Player): HsZones {
            let result: HsZones = this.zonesMap[player.id];
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