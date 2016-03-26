"use strict";

namespace HsLogic {

    export class DispatchEvents extends Action<IActionParam> {

        constructor( public events: ActionEvent<IActionParam>[] ) {
            super( null )
        }


        resolvable( context: HsGameCtx ): boolean {
            return ( this.events || [] ).length !== 0;
        }


        resolve( self: DispatchEvent, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let actions: ActionType[] = [];

                    for ( let i = 0; i < this.events.length; i++ )
                        if ( this.events[i].valid( context ) )
                            actions.push( new DispatchEvent( this.events[i] ) );

                    resolve( actions );
                }
            );
        }
    }


    export class DispatchSavedEvents extends DispatchEvents {

        constructor( eventClass: ActionEventClass, context: HsGameCtx ) {
            super( context.eventMgr.get( eventClass ) )
        }
    }

}