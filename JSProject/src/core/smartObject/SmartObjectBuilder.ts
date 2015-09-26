"use strict";

namespace smartObj {

    export class SmartObjectBuilder {

        private map: IObjectMap = {};


        register(clazz: string, prototype: Object) {
            this.validateClazz(clazz);
            this.validatePrototype(clazz, prototype);

            this.map[clazz] = prototype;
        }


        build(clazz: string): SmartObject {
            this.validateClazz(clazz);

            let prototype: Object = this.map[clazz] || null;
            if (prototype === null)
                throw new Error(`No SmartObject "${clazz}" registered!`);

            return Object.create(prototype, { });
        }


        private validateClazz(clazz: string): void {
            if (clazz === '' || clazz === null || clazz === undefined)
                throw new Error(`Clazz can't be empty!`);
        }

        private validatePrototype(clazz: string, prototype: Object): void {
            let cachedPrototype: Object = this.map[clazz] || null;
            if (cachedPrototype != null && cachedPrototype != prototype)
                throw new Error(`Duplicated clazz name: "${clazz}"`); 
        }
    }
}