"use strict";

namespace HsLogic.event {


    export class OnCardDraw extends ActionEvent<DrawParam> {
        static get type(): string { return OnCardDraw.name }
    }

    export class OnCardDrawn extends ActionEvent<DrawParam> {
        static get type(): string { return OnCardDrawn.name }
    }

}