const types = {
  LectureRepository: Symbol.for('LectureRepository'),
  RemoteLectureRepository: Symbol.for('RemoteLectureRepository'),
  UpdateLectureDatabaseUseCase: Symbol.for('UpdateLectureDatabaseUseCase'),
  SearchLectureByKeywordUseCase: Symbol.for('SearchLectureByKeywordUseCase'),
  CreateUserUserCase: Symbol.for("CreateUserUseCase"),
  UserRepository: Symbol.for('UserRepository')
}

export { types }
