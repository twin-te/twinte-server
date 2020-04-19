import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Lecture } from './lecture'

@Entity()
export class LectureStandardYear {
  @PrimaryGeneratedColumn()
  id!: number
  @ManyToOne(() => Lecture)
  lecture!: Lecture
  @Column()
  standardYear!: number
}
