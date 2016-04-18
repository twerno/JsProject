"use strict";

namespace Def.Filter {

    export function OtherThan( otherThan: Entity | Entity[] ): ITargetSetBuilderFilter<Entity> {
        return ( source: ISource, entity: Entity, gameCtx: HsGameCtx ): boolean => {

            if ( otherThan instanceof Array ) {
                for ( let entityFromArray of otherThan ) {
                    if ( entityFromArray === entity )
                        return false;
                }
            }

            return otherThan !== entity;
        }
    }


    export function OtherThanSource(): ITargetSetBuilderFilter<Entity> {
        return ( source: ISource, entity: Entity, gameCtx: HsGameCtx ): boolean => {
            return source.entity !== entity;
        }
    }


    export function Attack( mode: FILTER_COMPARE_MODE, value: number ): ITargetSetBuilderFilter<Character> {
        return ( source: ISource, entity: Character, gameCtx: HsGameCtx ): boolean => {
            if ( mode === FILTER_COMPARE_MODE.EQUAL_TO )
                return entity.body.attack === value;

            else if ( mode === FILTER_COMPARE_MODE.GREATER_THAN )
                return entity.body.attack > value;

            else if ( mode === FILTER_COMPARE_MODE.GREATER_THAN_OR_EQUAL_TO )
                return entity.body.attack >= value;

            else if ( mode === FILTER_COMPARE_MODE.LESS_THAN )
                return entity.body.attack < value;

            else if ( mode === FILTER_COMPARE_MODE.LESS_THAN_OR_EQUAL_TO )
                return entity.body.attack <= value;

            else if ( mode === FILTER_COMPARE_MODE.NOT_EQUAL_TO )
                return entity.body.attack !== value;

            else
                throw new Error( `Unknown FILTER_COMPARE_MODE: ${mode}!` );
        }
    }


    export function Hp( mode: FILTER_COMPARE_MODE, value: number ): ITargetSetBuilderFilter<Character> {
        return ( source: ISource, entity: Character, gameCtx: HsGameCtx ): boolean => {
            if ( mode === FILTER_COMPARE_MODE.EQUAL_TO )
                return entity.body.hp() === value;

            else if ( mode === FILTER_COMPARE_MODE.GREATER_THAN )
                return entity.body.hp() > value;

            else if ( mode === FILTER_COMPARE_MODE.GREATER_THAN_OR_EQUAL_TO )
                return entity.body.hp() >= value;

            else if ( mode === FILTER_COMPARE_MODE.LESS_THAN )
                return entity.body.hp() < value;

            else if ( mode === FILTER_COMPARE_MODE.LESS_THAN_OR_EQUAL_TO )
                return entity.body.hp() <= value;

            else if ( mode === FILTER_COMPARE_MODE.NOT_EQUAL_TO )
                return entity.body.hp() !== value;

            else
                throw new Error( `Unknown FILTER_COMPARE_MODE: ${mode}!` );
        }
    }


    export function ownedBy( player: Player ): ITargetSetBuilderFilter<Entity> {
        return ( source: ISource, entity: Entity, gameCtx: HsGameCtx ): boolean => {
            return entity.owner === player;
        }
    }


    export function notOwnedBy( player: Player ): ITargetSetBuilderFilter<Entity> {
        return ( source: ISource, entity: Entity, gameCtx: HsGameCtx ): boolean => {
            return entity.owner !== player;
        }
    }

}