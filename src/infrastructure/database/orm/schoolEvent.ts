import { Column, Entity, PrimaryColumn } from 'typeorm'
import { EventType } from '../../../entity/event'

@Entity()
export class SchoolEvent {
  @PrimaryColumn({
    type: 'date'
  })
  date!: string

  @Column()
  description!: string

  @Column({
    type: 'enum',
    enum: EventType
  })
  event_type!: EventType

  @Column({
    type: 'jsonb'
  })
  metadata!: any
}
