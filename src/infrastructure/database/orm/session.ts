import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Session {
  @PrimaryColumn()
  sid!: string

  @Column({
    type: 'json'
  })
  sess!: any

  @Column({
    type: 'timestamp'
  })
  expire!: string
}
