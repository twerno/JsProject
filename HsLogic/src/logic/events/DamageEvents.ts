import { SingleTargetDamageParam } from '../actions/Damage';
import { ActionEvent, PreActionEvent } from '../core/ActionEvent';


export class CalculateDamage extends ActionEvent<SingleTargetDamageParam> { }

export class CalculateReceivedDamage extends PreActionEvent<SingleTargetDamageParam> { }

export class PostDamageEvent extends ActionEvent<SingleTargetDamageParam> { }
