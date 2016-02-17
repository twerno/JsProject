"use strict";

namespace HSLogic {

    export class DrawTest<T extends HsActionParam> {

        player: Player = new Player();
        zones: HsZones = new HsZones(this.player);

        constructor() {
            for (let i = 0; i < 5; i++)
                this.zones.deck.addEntity(new Card(this.player));
        }

        stack: jsLogic.ActionStack<T> = new jsLogic.ActionStack<T>(
            this._onResolving,
            this._onResolved,
            this._onRejected
        );


        private _onResolving = (action: jsLogic.IAction<T>): void => {
            console.log(action);
        }

        private _onResolved = (action: jsLogic.IAction<T>, isStackEmpty: boolean): void => {
            if (!isStackEmpty)
                this.stack.resolveTopAction(null);
            else
                console.log('finished');
        }

        private _onRejected = (action: jsLogic.IAction<T>, error: Error): void => {
            console.error(error);
        }

        draw(): void {
            let target: DrawTarget = new DrawTarget(this.player, this.zones);
            let action: HsAction = new DrawCard(null, target);

            this.stack.putOnTop(action);
            this.stack.resolveTopAction(null);
        }

    }
}