"use strict";

namespace Def.Filter {

    export function OtherThan( otherThan: Entity ): IDefSetFilter<Entity> {
        return ( source: ISource, entity: Entity, context: HsGameCtx ): boolean => {
            return otherThan !== entity;
        }
    }

    export function Attack( mode: FILTER_COMPARE_MODE, value: number ): IDefSetFilter<Character> {
        return ( source: ISource, entity: Character, context: HsGameCtx ): boolean => {
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

    export function Hp( mode: FILTER_COMPARE_MODE, value: number ): IDefSetFilter<Character> {
        return ( source: ISource, entity: Character, context: HsGameCtx ): boolean => {
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


    export function TriggersOwnedBy( player: Player ): IDefSetFilter<Trigger> {
        return ( source: ISource, entity: Trigger, context: HsGameCtx ): boolean => {
            return entity.owner === player;
        }
    }


    export function TriggersNotOwnedBy( player: Player ): IDefSetFilter<Trigger> {
        return ( source: ISource, entity: Trigger, context: HsGameCtx ): boolean => {
            return entity.owner !== player;
        }
    }

}