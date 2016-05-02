/// <reference path="effectmanager.ts" />
"use strict";

namespace HsLogic {


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
        if ( aura.auraBearer instanceof Hero
            || aura.auraBearer instanceof Player )
            return true
        else if ( aura.auraBearer instanceof Minion )
            return gameCtx.gameBoard.zonesOf( aura.auraBearer.owner ).battlefield.has( <Minion>aura.auraBearer )
        else if ( aura.auraBearer instanceof Weapon )
            return gameCtx.gameBoard.zonesOf( aura.auraBearer.owner ).weapon.has( <Weapon>aura.auraBearer )

        return false;
    }


    export function removeAura( aura: Aura, gameCtx: HsGameCtx ): ActionType[] {
        let result: ActionType[] = [],
            target: PermanentExt;

        for ( let key in aura.state.managedEffects ) {
            target = aura.state.managedEffects[key].target;

            result = result.concat(
                prepareOperations( aura, target, {
                    target: target, tags: [], triggers: [], enchantments: []
                }, gameCtx ) );
        }

        return result;
    }


    export function rebuildAura( aura: Aura, gameCtx: HsGameCtx ): ActionType[] {
        let result: ActionType[] = [],
            targets: PermanentExt[],
            refreshedEffets: Def.IEffects;

        targets = aura.targetBuilder( aura ).buildSet( aura.getSource(), gameCtx );

        for ( let target of targets ) {
            refreshedEffets = aura.effectBuilder( aura, target, gameCtx );
            updateEffectsData( aura, target, refreshedEffets );
            result = result.concat( prepareOperations( aura, target, refreshedEffets, gameCtx ) );
        }

        return result;
    }


    export function prepareOperations( aura: Aura, target: PermanentExt, refreshedEffets: Def.IEffects, gameCtx: HsGameCtx ): ActionType[] {

        let effects: Def.IEffects = aura.state.managedEffects[target.id];

        return tagsOperations( aura.getSource(), target, effects.tags, refreshedEffets.tags, gameCtx )
            .concat( triggersOperations( aura.getSource(), effects.triggers, refreshedEffets.triggers, gameCtx ) )
            .concat( enchantmentsOperations( aura.getSource(), effects.enchantments, refreshedEffets.enchantments, gameCtx ) );
    }


    function updateEffectsData( aura: Aura, target: PermanentExt, refreshedEffets: Def.IEffects ): void {
        refreshedEffets.target = target;
        refreshedEffets.tags = refreshedEffets.tags || [];
        refreshedEffets.triggers = refreshedEffets.triggers || [];
        refreshedEffets.enchantments = refreshedEffets.enchantments || [];

        for ( let trigger of refreshedEffets.triggers )
            trigger.orderOfPlay = aura.orderOfPlay;

        for ( let enchantment of refreshedEffets.enchantments ) {
            enchantment.orderOfPlay = aura.orderOfPlay;
            enchantment.isAura = true;
        }
    }

}