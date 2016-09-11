import { ActionBuilder } from './ActionBuilder';
import { EventBuilder } from './EventBuilder';

export { ActionBuilder } from './ActionBuilder';
export { EventBuilder } from './EventBuilder';


export class HsContext {

    actionBuilder(hsCtx: HsContext): ActionBuilder {
        return new ActionBuilder(hsCtx);
    };

    eventBuilder: EventBuilder;

}

