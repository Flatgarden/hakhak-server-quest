import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from '../board/board.model';
import { BaseModel } from '../shared/base.model';
import { Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseModel {
  @Column()
  @Field((_) => String)
  name!: string;

  @OneToMany(
    () => Board,
    (board) => board.author,
  )
  @Field((_) => [Board])
  boards!: Board[];
}
