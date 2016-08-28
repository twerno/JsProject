"use strict";

namespace HsLogic {

    export function handSizeLimit( player: Player, gameCtx: HsGameCtx ): number {
        return gameCtx.consts.hand_size_limit;
    }

    export function isHandFull( hand: Zone<Card>, gameCtx: HsGameCtx ): boolean {
        return hand.length >= handSizeLimit( hand.owner, gameCtx );
    }
}