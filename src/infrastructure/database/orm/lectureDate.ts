import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Day, Module } from 'twinte-parser'
import { Lecture } from './lecture'

@Entity()
export class LectureDate {
  @PrimaryGeneratedColumn()
  id!: number

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

  @ManyToOne(
    () => Lecture,
    lecture => lecture.dates
  )
  lecture!: Lecture
}
