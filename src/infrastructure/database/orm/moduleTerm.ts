import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Module } from 'twinte-parser'

@Unique('UQ_MODULE', ['year', 'module'])
@Entity()
export class ModuleTerm {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  year!: number

  @Column({
    type: 'enum',
    enum: Module
  })
  module!: Module

  @Column({
    type: 'date'
  })
  start!: string

  @Column({
    type: 'date'
  })
  end!: string
}
