///<reference path="../hs/core/HsAction.ts"/>
///<reference path="../hs/HsCard.ts"/>
///<reference path="../hs/core/HsZone.ts"/>
///<reference path="../hs/core/HsActionParam.ts"/>
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


    export class DrawTest<T extends HsActionParam> {

        player: Player = new Player();
        zones: HsZones = new HsZones(this.player);
        param: HsActionParam = new HsActionParam();

        stack: jsLogic.ActionStack<HsActionParam> = null;

        constructor() {
            for (let i = 0; i < CARDS_IN_DECK; i++)
                this.zones.deck.addEntity(new Card(this.player));

            let self: DrawTest<T> = this;
            this.stack = new jsLogic.ActionStack<T>(
                (action) => { self._onResolving(action); },
                (action) => { self._onResolved(action); },
                (action, error) => { self._onRejected(action, error); });

            this.param = new HSLogic.HsActionParam();
            this.param.handlers.registerTrigger(new OnAfterDamageTrigger());
            this.param.handlers.registerTrigger(new OnDamageCalculationTrigger());
            this.param.handlers.registerTrigger(new OnAfterCardDrawTrigger());
        }


        private _onResolving = (action: jsLogic.IAction<T>): void => {
            console.log(`${action}`, action, `${action.source}`);
        }


        private _onResolved = (action: jsLogic.IAction<T>): void => {
            if (!this.stack.isEmpty())
                this.stack.resolveTopAction(this.param);
            else
                console.log(`Cards in hand: ${this.zones.hand.length}; Cards in deck: ${this.zones.deck.length}; Cards in graveyard: ${this.zones.graveyard.length}; Players health: ${this.player.counters[HpCounter.type].value}`);
        }


        private _onRejected = (action: jsLogic.IAction<T>, error: Error): void => {
            console.error(`${action}`, error);
        }

        private _resolve(innerAction: jsLogic.IAction<T>[]): void {
            let action: Sequence = new Sequence(new EmptyAction(null, 'PlayerAction'), innerAction);

            this.stack.putOnTop(action);
            this.stack.resolveTopAction(this.param);
        }




        draw(): void {
            let target: DrawTarget = new DrawTarget(this.player, this.zones);
            let action: DrawCard = new DrawCard(new EmptyAction(null, 'PlayerAction'), target);

            this._resolve([action]);
        }


        discard(): void {
            let action: Discard = new Discard(new EmptyAction(null, 'PlayerAction'), this.zones.hand.getRawArray()[0], this.zones);

            this._resolve([action]);
        }


        pickAtRandom(): void {
            let resultSet: Card[] = [];
            let selectorParam: jsLogic.SelectorParam<Card> = {
                options: this.zones.deck.getRawArray(),
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

    export var d: DrawTest<HsActionParam> = new DrawTest<HsActionParam>();
}