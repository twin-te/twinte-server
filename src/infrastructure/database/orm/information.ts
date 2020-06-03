import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Information {
  @PrimaryColumn({
    type: 'uuid'
  })
  info_id!: string

  @Column()
  title!: string

  @Column({
    type: 'text'
  })
  content!: string

  @Column({
    type: 'timestamptz'
  })
  date!: string

  @Column()
  tag!: string
}
