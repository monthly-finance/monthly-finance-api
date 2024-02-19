import { User } from 'src/user/entities/user.entity';
import { PrimaryGeneratedColumn, DeleteDateColumn, ManyToOne } from 'typeorm';

export class BaseMFEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
