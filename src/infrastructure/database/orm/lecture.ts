import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm'
import { LectureDate } from './lectureDate'

@Entity()
@Unique('UQ_YEAR_LECTURE_CODE', ['year', 'lecture_code'])
export class Lecture {
  @PrimaryColumn({
    type: 'uuid'
  })
  twinte_lecture_id!: string

  @Column()
  year!: number

  @Column({
    type: 'char',
    length: 7
  })
  lecture_code!: string

  @Column()
  lecture_name!: string

  @Column()
  instructor!: string

  @OneToMany(
    () => LectureDate,
    lectureDate => lectureDate.lecture,
    {
      cascade: true
    }
  )
  dates!: LectureDate[]
}
