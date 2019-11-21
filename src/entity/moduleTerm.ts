import {Moment} from "moment"
import {Module} from "twinte-parser"

export interface ModuleTerm {
  start: Moment
  end: Moment
  module: Module
}
