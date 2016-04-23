"use strict";

namespace DbgUtils {

    export function model2JSON( model: Object ): any {
        return JSON.stringify( model,
            ( key, value ): any => {
                if ( value instanceof HsLogic.Card )
                    return card2JSON( value );
                else if ( value instanceof HsLogic.Player )
                    return player2JSON( value );
                else if ( value instanceof HsLogic.Trigger )
                    return trigger2JSON( value );
                else if ( value instanceof jsAction.Entity )
                    return `[${ClassUtils.getNameOfClass( value )}:${value.id}]`;
                else
                    return value;
            });
    }

    export function card2JSON( card: HsLogic.Card ): string {
        return `[${ClassUtils.getNameOfClass( card )}:${card.id}; '${card.name}']`;
    }

    export function player2JSON( player: HsLogic.Player ): string {
        return `[${ClassUtils.getNameOfClass( player )}:${player.id}; '${player.name}']`;
    }

    export function trigger2JSON( trigger: HsLogic.Trigger ): string {
        let eventStr: string = trigger.respondsTo.join( ',' );

        return `[Trigger:${trigger.id}; '${trigger.keyword}'; '${eventStr}'; ${model2JSON( trigger.attachedTo )}]`;
    }

    export function actionChainStr( action: jsAction.IActionType ): string {
        return ( action.parent ? actionChainStr( action.parent ) + ' >> ' : '' ) + action.className;
    }

    export function actionChainStrExclude( action: jsAction.IActionType, excludes: jsAction.IActionClass[] ): string {
        if ( excludedAction( action, excludes ) )
            return ( action.parent ? actionChainStrExclude( action.parent, excludes ) : '' );

        return ( action.parent ? actionChainStrExclude( action.parent, excludes ) + ' >> ' : '' ) + action.className;
    }

    export function excludedAction( action: jsAction.IActionType, excludes: jsAction.IActionClass[] ): boolean {
        for ( let exclude of excludes || [] ) {
            if ( action instanceof exclude )
                return true;
        }
        return false;
    }

}