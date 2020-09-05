export interface DeleteInfoUseCase {
  deleteInfo(id: string): Promise<boolean>
}
