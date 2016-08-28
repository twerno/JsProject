"use strict";

namespace HsLogic {

    export class EventMgr implements IEventMgr {
        protected _events: ActionEvent<IActionParam>[] = []


        save( event: ActionEvent<IActionParam> ): void {
            this._events.push( event );
        }


        get( eventClass: ActionEventClass ): ActionEvent<IActionParam>[] {
            let result: ActionEvent<IActionParam>[] = [];

            if ( eventClass )
                for ( let event of this._events )
                    if ( event instanceof eventClass )
                        result.push( event );

            for ( let event of result )
                Collection.removeFrom( this._events, event );

            return result;
        }


        count( eventClass: ActionEventClass ): number {
            return this.get( eventClass ).length;
        }


        has( eventClass: ActionEventClass ): boolean {
            return this.count( eventClass ) > 0;
        }

        isEmpty(): boolean {
            return this._events.length === 0;
        }
    }

}