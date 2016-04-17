"use strict";

namespace HsLogic {

    export class HsGameCtx implements jsAction.IContext {

        actionFactory: HsActionFactory<HsGameCtx> = new HsActionFactory<HsGameCtx>();



        powerMgr: IPowerMgr;

        lethalMonitor: ILethalMonitor = new LethalMonitor();



        players: Player[] = [];

        activePlayer: Player = null;

        gameBoard: GameBoard;



        eventMgr: IEventMgr = new EventMgr();
    }
}