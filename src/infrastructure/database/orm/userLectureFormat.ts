import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { LectureFormat } from '../../../entity/lecture'
import { UserLecture } from './userLecture'

@Entity()
export class UserLectureFormat {
  @PrimaryGeneratedColumn()
  id!: number
  @Column({
    type: 'enum',
    enum: LectureFormat
  })
  format!: LectureFormat
  @ManyToOne(
    () => UserLecture,
    ul => ul.formats
  )
  userLecture!: UserLecture
}
