import {UserEntity} from '../entity/user'
import {PeriodEntity} from '../entity/period'

export interface RemovePeriodUseCase {
  removePeriod(user:UserEntity,period: PeriodEntity): Promise<boolean>
}
