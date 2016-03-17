///<reference path="IAction.ts"/>

"use strict";

namespace jsLogic {

    export type OnActionResolving<T extends IContext> = ( action: IAction<T>, executionTime?: number ) => void;
    export type OnActionResolved<T extends IContext> = ( action: IAction<T>, executionTime?: number ) => void;
    export type OnActionRejected<T extends IContext> = ( action: IAction<T>, error: Error, executionTime?: number ) => void;


    export class ActionTimeoutError<T extends IContext> extends Error {
        constructor( message: string, public action: IAction<T> ) {
            super( message );
        }
    }

    /**
     *  ActionStack<T>
     * 
     */
    export class ActionStack<T extends IContext> {


        private _stackFILO: IActionType[] = []; // first in - last out
        private _timeoutHandler: number = null;
        private _resolving: Resolving;


        constructor(
            private _onActionResolving: OnActionResolving<T>,
            private _onActionResolved: OnActionResolved<T>,
            private _onActionRejected: OnActionRejected<T> ) {
        }


        putOnTop( action: IActionType ): void {
            if ( action instanceof IAction )
                this._stackFILO.push( action );
            else
                throw new Error( `Action has to be an IAction class.` );
        }


        resolveTopAction( context: T ): void {
            if ( this._resolving )
                throw new Error( `You can not resolve an action while another action ${this._resolving.action} is beeing resolved.` );

            if ( this.isEmpty() )
                throw new Error( 'There is no action left to resolve!' );

            this._resolving = new Resolving( this._stackFILO.pop() );
            this._resolveAction( this._resolving, context );
        }


        private _resolveAction( resolving: Resolving, context: T ): void {
            let self: ActionStack<T> = this;

            this._onActionResolving && this._onActionResolving( resolving.action );

            if ( resolving.action.timelimit > UNLIMITED )
                this._timeoutHandler = setTimeout(() => self._onTimeout( resolving ), resolving.action.timelimit );

            resolving.startTimer();
            resolving.action.resolve( resolving.action, context )
                .then(
                ( consequences: IAction<T>[] ) => {
                    self._resolving !== resolving && ActionStack._postMortemLog<T>( resolving, consequences );
                    self._resolving === resolving && self._onSuccess( resolving, consequences );
                })
                .catch(
                ( error: Error ) => {
                    self._resolving !== resolving && ActionStack._postMortemLog<T>( resolving, error );
                    self._resolving === resolving && self._onFail( resolving, error );
                });
        }


        kill(): void {
            this._clearTimeout();
            this._stackFILO = [];
            this._resolving = null;
            this._onActionResolving = null;
            this._onActionResolved = null;
            this._onActionRejected = null;
        }


        isEmpty(): boolean {
            return this._stackFILO.length === 0;
        }


        isBusy(): boolean {
            return this._resolving !== null;
        }

        private static _postMortemLog<T extends IContext>( resolving: Resolving, result: Object ): void {
            resolving.stopTimer();

            console.error( `Postmortem action log (executionTime: ${resolving.executionTimeStr()}, timelimit: ${StringUtils.msPrettyPrint( resolving.action.timelimit )})`,
                resolving.action, result );
            console.error( result );
        }

        private _onSuccess( resolving: Resolving, consequences: IAction<T>[] ): void {
            resolving.stopTimer();
            this._clearTimeout();

            let action: IAction<T>;
            if ( consequences instanceof Array )
                while ( consequences.length > 0 ) {
                    action = consequences.pop();
                    action && this.putOnTop( action );
                }

            this._resolving = null;
            !this._onActionResolved && ActionStack._postMortemLog<T>( resolving, consequences );
            this._onActionResolved && this._onActionResolved.call( undefined, resolving.action, resolving.executionTime() );
        }


        private _onFail( resolving: Resolving, error: Error ): void {
            resolving.stopTimer();
            this._clearTimeout();

            this._resolving = null;
            !this._onActionRejected && ActionStack._postMortemLog<T>( resolving, error );
            this._onActionRejected && this._onActionRejected.call( undefined, resolving.action, error, resolving.executionTime() );
        }


        private _onTimeout( resolving: Resolving ): void {
            resolving.stopTimer();
            this._clearTimeout();

            let error: ActionTimeoutError<T>
                = new ActionTimeoutError<T>( `Timeout: ${resolving.action.timelimit}ms.`, resolving.action );

            this._resolving = null;
            !this._onActionRejected && ActionStack._postMortemLog<T>( resolving, error );
            this._onActionRejected && this._onActionRejected( resolving.action, error, resolving.executionTime() );
        }


        private _clearTimeout(): void {
            clearTimeout( this._timeoutHandler );
            this._timeoutHandler = null;
        }
    }


    class Resolving {

        startTime: number = null;
        finishTime: number = null;

        constructor( public action: IAction<IContext> ) { }

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