"use strict";

namespace HsLogic {


    export class LethalMonitor implements ILethalMonitor {

        private _candidates: Collection.IStringMap<ILethalCandidate> = {};

        registerCandidate( target: Character, lethalSource: ISource ): void {
            this._candidates[target.id] = { target, lethalSource };
        }

        clear(): void {
            this._candidates = {};
        }

        getSourceFor( target: Character ): ISource {
            if ( this._candidates.hasOwnProperty( target.id ) )
                return this._candidates[target.id].lethalSource || null;
            else
                return null;
        }
    }


    interface ILethalCandidate {
        target: Character,
        lethalSource: ISource
    }

}