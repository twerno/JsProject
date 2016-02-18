///<reference path="../hs/HsAction.ts"/>
///<reference path="../hs/HsCard.ts"/>
///<reference path="../hs/HsZone.ts"/>
///<reference path="../hs/HsActionParam.ts"/>
///<reference path="../core/action/ActionStack.ts"/>
///<reference path="../hs/trigger/OnAfterDamageTrigger.ts"/>
///<reference path="../hs/trigger/OnBeforeDamageTrigger.ts"/>
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
                (action, isStackEmpty) => { self._onResolved(action, isStackEmpty); },
                (action, error) => { self._onRejected(action, error); });

            this.param = new HSLogic.HsActionParam();
            this.param.handlers.registerTrigger(new OnAfterDamageTrigger());
            this.param.handlers.registerTrigger(new OnBeforeDamageTrigger());
            this.param.handlers.registerTrigger(new OnAfterCardDrawTrigger());
        }


        private _onResolving = (action: jsLogic.IAction<T>): void => {
            console.log(`${action}`, action);
        }


        private _onResolved = (action: jsLogic.IAction<T>, isStackEmpty: boolean): void => {
            if (!isStackEmpty)
                this.stack.resolveTopAction(this.param);
            else
                console.log(`Cards in hand: ${this.zones.hand.length}; Cards in deck: ${this.zones.deck.length}; Cards in graveyard: ${this.zones.graveyard.length}; Players health: ${this.player.counters[HpCounter.type].value}`);
        }


        private _onRejected = (action: jsLogic.IAction<T>, error: Error): void => {
            console.error(`${action}`, error);
        }


        draw(): void {
            let target: DrawTarget = new DrawTarget(this.player, this.zones);
            let action: DrawCard = new DrawCard(null, target);

            this.stack.putOnTop(action);
            this.stack.resolveTopAction(this.param);
        }

    }

    export var d: DrawTest<HsActionParam> = new DrawTest<HsActionParam>();
}