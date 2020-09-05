import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { Lecture } from './lecture'
import { Period } from './period'
import { User } from './user'
import { UserLectureFormat } from './userLectureFormat'

@Entity()
export class UserLecture {
  @PrimaryColumn({
    type: 'uuid'
  })
  user_lecture_id!: string

  @ManyToOne(
    () => User,
    user => user.twinte_user_id
  )
  user!: User

  @Column()
  lecture_name!: string

  @Column()
  year!: number

  @Column()
  instructor!: string

  @ManyToOne(
    () => Lecture,
    lecture => lecture.twinte_lecture_id,
    {
      nullable: true
    }
  )
  twinte_lecture?: Lecture

  @OneToMany(
    () => Period,
    period => period.user_lecture,
    {
      cascade: true
    }
  )
  periods!: Period[]

  @Column()
  attendance!: number

  @Column()
  absence!: number

  @Column()
  late!: number

  @Column()
  memo!: string

  @Column({
    type: 'numeric',
    default: 0
  })
  credits!: number

  @OneToMany(
    () => UserLectureFormat,
    uf => uf.userLecture,
    {
      cascade: true
    }
  )
  formats!: UserLectureFormat[]
}
