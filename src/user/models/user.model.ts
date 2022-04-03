import { Field, ObjectType } from '@nestjs/graphql';
import { StatusEnum } from '../entities/user.entity';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  username: string;

  //   @Field()
  //   password: string;

  @Field()
  birthday: Date;

  @Field()
  status: StatusEnum;

  @Field()
  isEnabled: boolean;

  @Field()
  isBlocked: boolean;

  @Field()
  isAdmin: boolean;
}
