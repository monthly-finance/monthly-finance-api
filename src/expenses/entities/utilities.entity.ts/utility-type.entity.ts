import { Entity, Column, OneToMany } from 'typeorm';

import { BaseMFEntity } from 'src/shared/base-mf-entity.entity';
import { Utility } from './utility.entity';

@Entity()
export class UtilityType extends BaseMFEntity {
  @Column()
  name: string;

  @OneToMany(() => Utility, (utility) => utility.type)
  utility: Utility[];
}
