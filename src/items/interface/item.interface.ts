import { Class } from '../../users/interfaces/user.interface';

export enum ItemTypes {
  HEAL = 'heal',
  RESOURCE = 'resource',
  ARMOR = 'armor',
  WEAPON = 'weapon',
  TOOL = 'tool',
  HAT = 'hat',
  TROUSER = 'trouser',
  SHOE = 'shoe',
}

export interface Effect {
  str?: number;
  agi?: number;
  end?: number;
  int?: number;
  def?: number;
  atk?: number;
  maxLp?: number;
  maxMp?: number;
}

export interface Item {
  name: string;
  type: ItemTypes;
  effect?: Effect;
  restricted?: Class;
}
