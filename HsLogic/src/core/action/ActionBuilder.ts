namespace jsLogic {

    export class ActionBuilder<T> {

        addEntityToZone(source: IAction<T>, entity: Entity, zone: Zone<Entity>): AddEntityToZone<T> {
            return new AddEntityToZone<T>(source, entity, zone);
        }
    }
}