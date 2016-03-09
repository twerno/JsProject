///<reference path="../../core/action/IActionContext.ts"/>


"use strict";

namespace HSLogic {

    export interface HsActionParam extends jsLogic.IActionParam<HsGameCtx> { }


    export class HsGameCtx implements jsLogic.IContext {

        actionFactory: HsActionFactory<HsGameCtx> = new HsActionFactory<HsGameCtx>();

        handlers: jsLogic.EventHandlers<HsGameCtx, HsActionParam> = new jsLogic.EventHandlers<HsGameCtx, HsActionParam>();

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


        zoneOf(player: jsLogic.Entity | TargetPlayer, zoneId: string): HsZone {
            return this.zonesOf(player).get(zoneId);
        }


        zonesOfActivePlayer(): HsZones {
            return this.zonesOf(this.activePlayer);
        }
    }
}