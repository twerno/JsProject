
export type IDefTargetFilter<T> = ( candidate: T, source: Object, gameEnv: Object ) => boolean;



export abstract class IDefTarget<T> {

    protected _filters: IDefTargetFilter<T>[] = [];

    protected abstract _internalResultSet( source: Object, gameEnv: Object ): T[];
    
    protected abstract _compare( a: T, b: T ): number;


    addFilter( filter: IDefTargetFilter<T> ): this {
        this._filters.push( filter );
        return this;
    }


    resultSet( source: Object, gameEnv: Object ): T[] {
        return this._internalResultSet( source, gameEnv ).sort( this._compare ) ;
    }


    protected testAgainstFilters( candidate: T, source: Object, gameEnv: Object ): boolean {

        for ( let i = 0; i < this._filters.length; i++ ) {
            if ( !this._filters[i]( candidate, source, gameEnv ) )
                return false;
        }
        return true;
    }
}
