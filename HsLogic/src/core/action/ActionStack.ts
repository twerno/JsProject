///<reference path="IAction.ts"/>

"use strict";

namespace jsLogic {

    export type OnActionResolving = ( action: IAction<IContext>, resolvable: boolean ) => void;
    export type OnActionResolved = ( action: IAction<IContext>, executionTime?: number ) => void;
    export type OnActionRejected = ( action: IAction<IContext>, error: Error, executionTime?: number ) => void;


    export class ActionTimeoutError<T extends IContext> extends Error {
        constructor( message: string, public action: IAction<IContext> ) {
            super( message );
        }
    }

    /**
     *  ActionStack<IContext>
     * 
     */
    export class ActionStack {

        private _stackFILO: IActionType[] = []; // first in - last out
        private _timeoutHandler: number = null;
        private _currActionInfo: CurrentActionInfo;


        constructor(
            private _onActionResolving: OnActionResolving,
            private _onActionResolved: OnActionResolved,
            private _onActionRejected: OnActionRejected ) {
        }


        putOnTop( action: IActionType ): void {
            if ( action instanceof IAction )
                this._stackFILO.push( action );
            else
                throw new Error( `Action has to be an IAction class.` );
        }


        resolveTopAction( context: IContext ): void {
            if ( this._currActionInfo )
                throw new Error( `You can not resolve an action while another action ${this._currActionInfo.action} is beeing resolved.` );

            if ( this.isEmpty() )
                throw new Error( 'There is no action left to resolve!' );

            this._currActionInfo = new CurrentActionInfo( this._stackFILO.pop(), context );
            this._resolveAction( this, this._currActionInfo, context );
        }


        private _preResolveAction( self: ActionStack, resolving: CurrentActionInfo, context: IContext ): void {

            this._onActionResolving && this._onActionResolving( this._currActionInfo.action, this._currActionInfo.resolvable );

            if ( resolving.action.timelimit > UNLIMITED )
                this._timeoutHandler = setTimeout(() => self._onTimeout( resolving ), resolving.action.timelimit );

            resolving.startTimer();
        }


        private _resolveAction( self: ActionStack, resolving: CurrentActionInfo, context: IContext ): void {
            this._preResolveAction( self, self._currActionInfo, context );

            if ( resolving.resolvable )
                resolving.action.resolve( resolving.action, context )
                    .then(( consequences: IAction<IContext>[] ) => {
                        self._currActionInfo !== resolving && ActionStack._postMortemLog<IContext>( resolving, consequences );
                        self._currActionInfo === resolving && self._onSuccess( resolving, consequences );
                    })
                    .catch(( error: Error ) => {
                        self._currActionInfo !== resolving && ActionStack._postMortemLog<IContext>( resolving, error );
                        self._currActionInfo === resolving && self._onFail( resolving, error );
                    });
            else
                self._onSuccess( resolving, [] );
        }


        kill(): void {
            this._clearTimeout();
            this._stackFILO = [];
            this._currActionInfo = null;
            this._onActionResolving = null;
            this._onActionResolved = null;
            this._onActionRejected = null;
        }


        isEmpty(): boolean {
            return this._stackFILO.length === 0;
        }


        isBusy(): boolean {
            return this._currActionInfo !== null;
        }

        private static _postMortemLog<T extends IContext>( resolving: CurrentActionInfo, result: Object ): void {
            resolving.stopTimer();

            console.error( `Postmortem action log (executionTime: ${resolving.executionTimeStr()}, timelimit: ${StringUtils.msPrettyPrint( resolving.action.timelimit )})`,
                resolving.action, result );
            console.error( result );
        }

        private _onSuccess( resolving: CurrentActionInfo, consequences: IAction<IContext>[] ): void {
            resolving.stopTimer();
            this._clearTimeout();

            let action: IAction<IContext>;
            if ( consequences instanceof Array )
                while ( consequences.length > 0 ) {
                    action = consequences.pop();
                    action && this.putOnTop( action );
                }

            this._currActionInfo = null;
            !this._onActionResolved && ActionStack._postMortemLog<IContext>( resolving, consequences );
            this._onActionResolved && this._onActionResolved.call( undefined, resolving.action, resolving.executionTime() );
        }


        private _onFail( resolving: CurrentActionInfo, error: Error ): void {
            resolving.stopTimer();
            this._clearTimeout();

            this._currActionInfo = null;
            !this._onActionRejected && ActionStack._postMortemLog<IContext>( resolving, error );
            this._onActionRejected && this._onActionRejected.call( undefined, resolving.action, error, resolving.executionTime() );
        }


        private _onTimeout( resolving: CurrentActionInfo ): void {
            resolving.stopTimer();
            this._clearTimeout();

            let error: ActionTimeoutError<IContext>
                = new ActionTimeoutError<IContext>( `Timeout: ${resolving.action.timelimit}ms.`, resolving.action );

            this._currActionInfo = null;
            !this._onActionRejected && ActionStack._postMortemLog<IContext>( resolving, error );
            this._onActionRejected && this._onActionRejected( resolving.action, error, resolving.executionTime() );
        }


        private _clearTimeout(): void {
            clearTimeout( this._timeoutHandler );
            this._timeoutHandler = null;
        }
    }


    class CurrentActionInfo {

        startTime: number = null;
        finishTime: number = null;
        resolvable: boolean;

        constructor( public action: IAction<IContext>, context: IContext ) {
            this.resolvable = action.resolvable( action, context );
        }

        executionTime(): number {
            return ( this.finishTime ? this.finishTime : performance.now() ) - this.startTime;
        }

        executionTimeStr(): string {
            return StringUtils.msPrettyPrint( this.executionTime() );
        }

        startTimer(): void { this.startTime = performance.now() }

        stopTimer(): void { this.finishTime = performance.now() }
    }
}