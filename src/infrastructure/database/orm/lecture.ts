import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm'
import { LectureDate } from './lectureDate'
import { LectureStandardYear } from './lectureStandardYear'

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

  @Column({
    type: 'numeric',
    default: 0
  })
  credits!: number

  @Column({
    type: 'varchar',
    length: 2048,
    default: ''
  })
  overview!: string

  @Column({
    type: 'varchar',
    length: 2048,
    default: ''
  })
  remarks!: string

  @Column({
    type: 'smallint'
  })
  type!: number

  @OneToMany(
    () => LectureStandardYear,
    lectureStandardYear => lectureStandardYear.lecture,
    {
      cascade: true
    }
  )
  standardYear!: LectureStandardYear[]

  @OneToMany(
    () => LectureDate,
    lectureDate => lectureDate.lecture,
    {
      cascade: true
    }
  )
  dates!: LectureDate[]
}
