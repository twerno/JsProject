"use strict";

namespace HsLogic {

    // action level: 
    //   player Action
    //   gameLogic
    //   hsPhases + turnActions 
    //   technicalActions
    //   calculateActions

    export function auraUpdate( auraType: Def.AURA_TYPE, gameCtx: HsGameCtx ): ActionType[] {
        let actions: ActionType[] = [],
            targets: PermanentExt[];

        gameCtx.gameBoard.auras = gameCtx.gameBoard.auras.sort( Entity.compare );

        for ( let aura of gameCtx.gameBoard.auras ) {
            if ( aura.auraType === auraType ) {

                if ( isAuraAlive( aura, gameCtx ) )
                    rebuildAura( aura, gameCtx )

                else
                    removeAura( aura, gameCtx );

            }
        }

        return actions;
    }

    export function isAuraAlive( aura: Aura, gameCtx: HsGameCtx ): boolean {
        return true;
    }

    export function removeAura( aura: Aura, gameCtx: HsGameCtx ): ActionType[] {
        return null;
    }

    export function rebuildAura( aura: Aura, gameCtx: HsGameCtx ): ActionType[] {
        let targets: PermanentExt[];

        targets = aura.targets( aura, gameCtx )
            .buildSet( aura.getSource(), gameCtx );

        for ( let target of targets ) {

        }


        return null;
    }


}