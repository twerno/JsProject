"use strict";

namespace HsLogic {

    export class HsGameCtx implements jsAction.IContext {

        actionFactory: HsActionFactory<HsGameCtx> = new HsActionFactory<HsGameCtx>();



        powerMgr: IPowerMgr = new PowerManager();

        lethalMonitor: ILethalMonitor = new LethalMonitor();



        players: Player[] = [];

        activePlayer: Player = null;


        gameBoard: GameBoard = new GameBoard();

        eventMgr: IEventMgr = new EventMgr();

        registerPlayer( player: Player ): void {
            this.players.push( player );
            this.gameBoard.zonesMap[player.id] = new Zones( player );
        }

        get inactivePlayer(): Player {
            for ( let player of this.players )
                if ( player !== this.activePlayer )
                    return player;

            return null;
        }
    }
}