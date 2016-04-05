"use strict";

namespace HsLogic {

    export interface IEventMgr {
        save( event: ActionEvent<IActionParam> ): void;
        get( eventClass: ActionEventClass ): ActionEvent<IActionParam>[];
        count( eventClass: ActionEventClass ): number;
        has( eventClass: ActionEventClass ): boolean;
    }

    export interface IPendingEvents {
        summon: event.Summon[],
        death: ActionEvent<IActionParam>[],
        //general: ActionEvent<IActionParam>[]
    }

    export interface PowerMgr {
        getHealPower( source: ISource ): number;
        getDamagePower( source: ISource, damageType: Def.DAMAGE_TYPE ): number;
    }

    //export interface LethalMonitorElement {
    //    target: Character,
    //    SourceBuffer: ISource
    //}

    export interface LethalMonitor {
        registerCandidate( target: Character, source: ISource ): void;
        clear(): void;
        getSourceFor( target: Character ): ISource;
    }


    export class HsGameCtx implements jsLogic.IContext {

        actionFactory: HsActionFactory<HsGameCtx> = new HsActionFactory<HsGameCtx>();

        activePlayer: Player = null;

        players: Player[] = [];

        zonesMap: Collection.IStringMap<HsZones> = {};

        powerMgr: PowerMgr;

        lethalMonitor: LethalMonitor;


        zonesOf( player: jsLogic.Entity ): HsZones {
            let result: HsZones = null;

            if ( player instanceof jsLogic.Entity )
                result = this.zonesMap[player.id]

            if ( result )
                return result;
            else
                throw new Error( `No zones defined for player: ${player}.` );
        }


        zoneOf<T extends Card>( player: jsLogic.Entity, zoneId: string ): HsZone<T> {
            return <HsZone<T>>this.zonesOf( player ).get( zoneId );
        }


        zonesOfActivePlayer(): HsZones {
            return this.zonesOf( this.activePlayer );
        }

        pendingEvents: IPendingEvents = {
            summon: [],
            death: []
        };

        eventMgr: IEventMgr;
    }
}