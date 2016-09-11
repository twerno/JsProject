import * as ClassHelper from '../helper/ClassHelper';


/**
 *  Entity
 *
 */
export class Entity {
    id: string;

    toString(): string {
        return `[${ClassHelper.getNameOfClass(this)}:${this.id}]`;
    }

    constructor() {
        this.id = generateNewId();
    }
}




var _entityIdGenerator: number = 0;

/**
 *  generateNewId
 *
 */
function generateNewId(): string {
    return (++_entityIdGenerator).toString();
}

