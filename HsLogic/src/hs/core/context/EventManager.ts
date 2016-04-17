"use strict";

namespace HsLogic {

    export class EventMgr implements IEventMgr {
        protected _events: ActionEvent<IActionParam>[] = []


        save( event: ActionEvent<IActionParam> ): void {
            this._events.push( event );
        }


        get( eventClass: ActionEventClass ): ActionEvent<IActionParam>[] {
            let result: ActionEvent<IActionParam>[] = [];

            for ( let event of this._events )
                if ( event instanceof eventClass )
                    result.push( event );

            return result;
        }


        count( eventClass: ActionEventClass ): number {
            return this.get( eventClass ).length;
        }


        has( eventClass: ActionEventClass ): boolean {
            return this.count( eventClass ) > 0;
        }
    }

}