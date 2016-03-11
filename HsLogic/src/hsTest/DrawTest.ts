///<reference path="../hs/core/HsAction.ts"/>
///<reference path="../hs/entity/Card.ts"/>
///<reference path="../hs/entity/Player.ts"/>
///<reference path="../hs/core/HsZone.ts"/>
///<reference path="../core/action/ActionStack.ts"/>
///<reference path="../hs/trigger/OnAfterDamageTrigger.ts"/>
///<reference path="../hs/trigger/OnDamageCalculationTrigger.ts"/>
///<reference path="../hs/trigger/OnAfterCardDrawTrigger.ts"/>


"use strict";

namespace HSLogic {



    /*
     *  compiler error
     *
        class A { }

        class B<T extends A> {
            a: T = new A();
        }
    */

    const CARDS_IN_DECK: number = 20;


    export class DrawTest<T extends HsGameCtx> {

        gameCtx: HsGameCtx = null;
        stack: jsLogic.ActionStack<HsGameCtx> = null;

        constructor() {
            let self: DrawTest<T> = this;
            this.stack = new jsLogic.ActionStack<T>(
                (action) => { self._onResolving(action); },
                (action) => { self._onResolved(action); },
                (action, error) => { self._onRejected(action, error); });

            this.init();
        }

        public init(): void {
            this.gameCtx = new HsGameCtx();
            this.gameCtx.activePlayer = this.initPlayer('player_1', this.gameCtx);
            this.initPlayer('player_2', this.gameCtx);
            //this.gameCtx.handlers.registerTrigger(new OnAfterDamageTrigger());
            //this.gameCtx.handlers.registerTrigger(new OnDamageCalculationTrigger());
            //this.gameCtx.handlers.registerTrigger(new OnAfterCardDrawTrigger());
        }


        public initPlayer(name: string, gameCtx: HsGameCtx): Player {
            let player: Player = new Player(name);
            let zones: HsZones = new HsZones(player);
            gameCtx.players.push(player);
            gameCtx.zonesMap[player.id] = zones;

            for (let i = 0; i < CARDS_IN_DECK; i++)
                zones.deck.addEntity(new Minion(player, Bloodfen_Raptor));

            return player;
        }


        private _onResolving = (action: jsLogic.IAction<T>): void => {
            console.log(`${action}`, action, `${action.source}`);
        }


        private _onResolved = (action: jsLogic.IAction<T>): void => {
            let zones: HsZones = this.gameCtx.zonesOfActivePlayer();
            if (!this.stack.isEmpty())
                this.stack.resolveTopAction(this.gameCtx);
            else
                console.log(`Cards in hand: ${zones.hand.length}; Cards in deck: ${zones.deck.length}; Cards in graveyard: ${zones.graveyard.length}; Players health: ${this.gameCtx.activePlayer.hp}`);
        }


        private _onRejected = (action: jsLogic.IAction<T>, error: Error): void => {
            console.error(`${action}`, error);
        }

        //private _resolve(innerAction: jsLogic.IAction<T>[]): void {
        //    let action: Sequence = new Sequence(new EmptyAction(null, 'PlayerAction'), innerAction);

        //    this.stack.putOnTop(action);
        //    this.stack.resolveTopAction(this.gameCtx);
        //}




        //draw(): void {
        //    let action: DrawCard = new DrawCard(
        //        {
        //            source: new EmptyAction(null, 'PlayerAction'),
        //            target: this.gameCtx.activePlayer
        //        });

        //    this._resolve([action]);
        //}


        //discard(): void {
        //    let action: Discard = new Discard(
        //        {
        //            source: new EmptyAction(null, 'PlayerAction'),
        //            card: this.gameCtx.zonesOfActivePlayer().hand.getRawArray()[0],
        //            target: this.gameCtx.activePlayer
        //        });

        //    // new EmptyAction(null, 'PlayerAction'), this.zones.hand.getRawArray()[0], this.zones);

        //    this._resolve([action]);
        //}


        //pickAtRandom(): void {
        //    let resultSet: Card[] = [];
        //    let selectorParam: jsLogic.SelectorParam<Card> = {
        //        options: this.gameCtx.zonesOfActivePlayer().deck.getRawArray(),
        //        amount: 1,
        //        removeSelectedFromOptions: false
        //    };
        //    let source: jsLogic.IAction<T> = new EmptyAction(null, 'PlayerAction');
        //    let actions: jsLogic.IAction<T>[] = [];

        //    actions.push(new jsLogic.RandomSelector<T, Card>(source, selectorParam, resultSet));
        //    actions.push(new SelectorResultToConsole(source, resultSet));

        //    this._resolve(actions);
        //}

    }

    export var d: DrawTest<HsGameCtx> = new DrawTest<HsGameCtx>();
}