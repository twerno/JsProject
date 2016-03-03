///<reference path="../hs/core/HsAction.ts"/>
///<reference path="../hs/HsCard.ts"/>
///<reference path="../hs/core/HsZone.ts"/>
///<reference path="../hs/core/HsGameEnv.ts"/>
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


    export class DrawTest<T extends HsGameEnv> {

        gameEnv: HsGameEnv = null;
        stack: jsLogic.ActionStack<HsGameEnv> = null;

        constructor() {
            let self: DrawTest<T> = this;
            this.stack = new jsLogic.ActionStack<T>(
                (action) => { self._onResolving(action); },
                (action) => { self._onResolved(action); },
                (action, error) => { self._onRejected(action, error); });

            this.init();
        }

        public init(): void {
            this.gameEnv = new HsGameEnv();
            this.gameEnv.activePlayer = this.initPlayer('player_1', this.gameEnv);
            this.initPlayer('player_2', this.gameEnv);
            this.gameEnv.handlers.registerTrigger(new OnAfterDamageTrigger());
            this.gameEnv.handlers.registerTrigger(new OnDamageCalculationTrigger());
            this.gameEnv.handlers.registerTrigger(new OnAfterCardDrawTrigger());
        }


        public initPlayer(name: string, gameEnv: HsGameEnv): Player {
            let player: Player = new Player(name);
            let zones: HsZones = new HsZones(player);
            gameEnv.players.push(player);
            gameEnv.zonesMap[player.id] = zones;

            for (let i = 0; i < CARDS_IN_DECK; i++)
                zones.deck.addEntity(new Card(player));

            return player;
        }


        private _onResolving = (action: jsLogic.IAction<T>): void => {
            console.log(`${action}`, action, `${action.source}`);
        }


        private _onResolved = (action: jsLogic.IAction<T>): void => {
            let zones: HsZones = this.gameEnv.zonesOfActivePlayer();
            if (!this.stack.isEmpty())
                this.stack.resolveTopAction(this.gameEnv);
            else
                console.log(`Cards in hand: ${zones.hand.length}; Cards in deck: ${zones.deck.length}; Cards in graveyard: ${zones.graveyard.length}; Players health: ${this.gameEnv.activePlayer.hp}`);
        }


        private _onRejected = (action: jsLogic.IAction<T>, error: Error): void => {
            console.error(`${action}`, error);
        }

        private _resolve(innerAction: jsLogic.IAction<T>[]): void {
            let action: Sequence = new Sequence(new EmptyAction(null, 'PlayerAction'), innerAction);

            this.stack.putOnTop(action);
            this.stack.resolveTopAction(this.gameEnv);
        }




        draw(): void {
            let action: DrawCard = new DrawCard(
                {
                    sourceAction: new EmptyAction(null, 'PlayerAction'),
                    target: this.gameEnv.activePlayer
                });

            this._resolve([action]);
        }


        discard(): void {
            let action: Discard = new Discard(
                {
                    sourceAction: new EmptyAction(null, 'PlayerAction'),
                    card: this.gameEnv.zonesOfActivePlayer().hand.getRawArray()[0],
                    target: this.gameEnv.activePlayer
                });

            // new EmptyAction(null, 'PlayerAction'), this.zones.hand.getRawArray()[0], this.zones);

            this._resolve([action]);
        }


        pickAtRandom(): void {
            let resultSet: Card[] = [];
            let selectorParam: jsLogic.SelectorParam<Card> = {
                options: this.gameEnv.zonesOfActivePlayer().deck.getRawArray(),
                amount: 1,
                removeSelectedFromOptions: false
            };
            let source: jsLogic.IAction<T> = new EmptyAction(null, 'PlayerAction');
            let actions: jsLogic.IAction<T>[] = [];

            actions.push(new jsLogic.RandomSelector<T, Card>(source, selectorParam, resultSet));
            actions.push(new SelectorResultToConsole(source, resultSet));

            this._resolve(actions);
        }

    }

    export var d: DrawTest<HsGameEnv> = new DrawTest<HsGameEnv>();
}