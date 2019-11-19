import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Day, Module } from 'twinte-parser'
import { UserLecture } from './userLecture'
import { User } from './user'

@Entity()
export class Period {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, user => user.twinte_user_id)
  user!: User

  @ManyToOne(() => UserLecture, ulecture => ulecture.user_lecture_id)
  user_lecture!: UserLecture

  @Column()
  year!: number

  @Column({
    type: 'enum',
    enum: Module
  })
  module!: Module

  @Column({
    type: 'enum',
    enum: Day
  })
  day!: Day

  @Column()
  period!: number

  @Column()
  room!: string
}
