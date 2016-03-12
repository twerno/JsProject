///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {


    export class OnWeaponPlaying<P extends PlayCardParam> extends HsActionEvent<P> {
        static get type(): string { return OnWeaponPlaying.name }
    }

    export class OnWeaponPlayed<P extends PlayCardParam> extends HsActionEvent<P> {
        static get type(): string { return OnWeaponPlayed.name }
    }

    /**
     * PlayCard
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing_a_weapon
     *
 	 */
    export class PlayWeapon<P extends PlayCardParam> extends jsLogic.CancelableAction<HsGameCtx, P> {

        cancelAction( eventParam: P ): boolean { return eventParam.cancelAction.value }
        cancelOnAfterEvent( eventParam: P ): boolean { return eventParam.cancelAction.value }

        onBeforeEventBuilder( param: P ): HsActionEvent<P> { return new OnWeaponPlaying( param ) }
        onAfterEventBuilder( param: P ): HsActionEvent<P> { return new OnWeaponPlayed( param ) }


        resolve( _this_: PlayWeapon<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let weapon: Weapon = <Weapon>_this_.param.card;

                    // equiping phase

                    resolve( null );
                }
            );
        }
    }
}