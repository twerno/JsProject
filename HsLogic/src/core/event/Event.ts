///<reference path="EventHandlers.ts"/>

"use strict";

namespace jsLogic {

    export class ActionEvent<T extends IExtContext, P extends IActionParam> {

        type: string = ClassUtils.getNameOfClass( this );

        constructor( public param: P ) { }
    }

    export type EventBuilder<T extends IExtContext, P extends IActionParam> = ( param: P ) => ActionEvent<T, P>;
}