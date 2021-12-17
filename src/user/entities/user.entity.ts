import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusEnum {
  DISCONNECTED = 0,
  CONNECT = 1,
  AFK = 2,
  DO_NOT_DISTURB = 3,
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column()
  birthday: Date;

  @Column({ enum: StatusEnum })
  status: StatusEnum;

  @Column({ default: true })
  isEnabled: boolean;

  @Column({ default: false })
  isBlocked: boolean;
}
