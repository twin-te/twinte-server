import {Moment} from "moment"
import {Module} from "twinte-parser"

export interface ModuleTerm {
  year: number
  start: Moment
  end: Moment
  module: Module
}
