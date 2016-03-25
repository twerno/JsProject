"use strict";

namespace HsLogic {

    //export class SaveEvent<P extends IActionParam> extends Action<P> {

    //    constructor( public event: ActionEvent<P> ) {
    //        super( event.param )
    //    }

    //    resolve( self: SaveEvent<P>, gameCtx: HsGameCtx ): PromiseOfActions {
    //        return new Promise<jsLogic.IAction<HsGameCtx>[]>(
    //            ( resolve, reject ): void => {

    //                gameCtx.pendingEvents.general.push( this.event );

    //                return jsLogic.NO_CONSEQUENCES;
    //            }
    //        );
    //    }
    //}


    //export class DispatchSaved<P extends IActionParam> extends Action<P> {

    //    constructor( public event: ActionEvent<P> ) {
    //        super( event.param )
    //    }

    //    resolve( self: DispatchSaved<P>, gameCtx: HsGameCtx ): PromiseOfActions {
    //        return new Promise<jsLogic.IAction<HsGameCtx>[]>(
    //            ( resolve, reject ): void => {

    //                gameCtx.pendingEvents.general.push( this.event );

    //                return jsLogic.NO_CONSEQUENCES;
    //            }
    //        );
    //    }
    //}


}