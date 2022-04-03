import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusEnum {
  DISCONNECTED = 0,
  CONNECTED = 1,
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

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.DISCONNECTED })
  status: StatusEnum;

  @Column({ type: 'boolean', default: true })
  isEnabled: boolean;

  @Column({ type: 'boolean', default: false })
  isBlocked: boolean;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
}
