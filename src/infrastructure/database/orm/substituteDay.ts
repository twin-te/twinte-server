import { Column, Entity, PrimaryColumn } from 'typeorm'
import { Day } from 'twinte-parser'

@Entity()
export class SubstituteDay {
  @PrimaryColumn({
    type: 'date'
  })
  date!: string

  @Column({
    type: 'enum',
    enum: Day
  })
  change_to!: Day
}
