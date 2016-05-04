/// <reference path="../core/actionevent.ts" />
"use strict";

namespace HsLogic.event {

    export class CardDrawGlobalEvent<P extends DrawParam> extends ActionEvent<P> { }

    export class CardDrawSelfEvent<P extends DrawParam> extends ActionEvent<P> { }

}