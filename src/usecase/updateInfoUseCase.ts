import { Information } from '../entity/info'

export interface UpdateInfoUseCase {
  updateInfo(info: Information): Promise<Information>
}
