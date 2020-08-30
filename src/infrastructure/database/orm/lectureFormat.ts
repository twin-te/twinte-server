import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Lecture } from './lecture'
import { LectureFormat as LF } from '../../../entity/lecture'

@Entity()
export class LectureFormat {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: 'enum',
    enum: LF
  })
  format!: LF

  @ManyToOne(
    () => Lecture,
    lecture => lecture.formats
  )
  lecture!: Lecture
}
