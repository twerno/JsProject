///<reference path="../../../JSProjectECMA6/dist/jsProject6.d.ts"/>
///<reference path="../../../HsLogic/dist/hsLogic.d.ts"/>


interface TestContext {
    hsCtx: HsLogic.HsGameCtx,
    stack: jsAction.ActionStack
}

class ContextBuilder implements testEC6.ITestContextFactory {

    buildTestContext(): Object {
        let hsCtx: HsLogic.HsGameCtx = new HsLogic.HsGameCtx();
        hsCtx.activePlayer = this.initPlayer('player_1', hsCtx);

        return {
            hsCtx: hsCtx
        };
    }
    
    //        public init(): void {
    //            this.gameCtx = new HsGameCtx();
    //            this.gameCtx.activePlayer = this.initPlayer( 'player_1', this.gameCtx );
    //            this.initPlayer( 'player_2', this.gameCtx );
    //            //this.gameCtx.handlers.registerTrigger(new OnAfterDamageTrigger());
    //            //this.gameCtx.handlers.registerTrigger(new OnDamageCalculationTrigger());
    //            //this.gameCtx.handlers.registerTrigger(new OnAfterCardDrawTrigger());
    //        }
    //
    //
    initPlayer(name: string, gameCtx: HsLogic.HsGameCtx): HsLogic.Player {
        let player: HsLogic.Player = new HsLogic.Player(name),
            zones: HsLogic.Zones = new HsLogic.Zones(player);
        gameCtx.players.push(player);
        gameCtx.gameBoard.zonesMap[player.id] = zones;

        //        for (let i = 0; i < CARDS_IN_DECK; i++)
        //            zones.deck.addEntity(new Minion(player, Bloodfen_Raptor));

        return player;
    }
}

window.onload = () => {
    var testEngine: testEC6.TestEngine = new testEC6.TestEngine();
    //    testEngine.registerTestGroup('basic', null, [BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest]);
    //    //testEngine.registerTestGroup('basic', null, [BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest]);
    //    testEngine.registerTestGroup('basic2', null, [BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest, BasicTest]);
    //
    var resultPainter = new testEC6.LiveResultPainter(document.getElementById('result'));
    testEngine.run(resultPainter);
};