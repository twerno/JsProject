import { HealParam } from '../actions/Heal';
import { ActionEvent, PreActionEvent } from '../core/ActionEvent';

export class CalculateHeal extends ActionEvent<HealParam> { }

export class PreHealEvent extends PreActionEvent<HealParam> { }

export class PostHealEvent extends ActionEvent<HealParam> { }
