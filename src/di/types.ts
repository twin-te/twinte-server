const types = {
  LectureRepository: Symbol.for('LectureRepository'),
  RemoteLectureRepository: Symbol.for('RemoteLectureRepository'),
  UpdateLectureDatabaseUseCase: Symbol.for('UpdateLectureDatabaseUseCase'),
  FindLectureUseCase: Symbol.for('FindLectureUseCase'),
  CreateUserUserCase: Symbol.for('CreateUserUseCase'),
  UpsertAuthenticationUseCase: Symbol.for('UpsertAuthenticationUseCase'),
  LoginUseCase: Symbol.for('LoginUseCase'),
  UserRepository: Symbol.for('UserRepository'),
  TimetableRepository: Symbol.for('TimetableRepository'),
  UserLectureRepository: Symbol.for('UserLectureRepository'),
  CreateUserLectureUseCase: Symbol.for('CreateUserLectureUseCase'),
  GetTimetableUseCase: Symbol.for('GetTimetableUseCase'),
  UpsertPeriodUseCae: Symbol.for('UpsertPeriodUseCase'),
  RemovePeriodUseCase: Symbol.for('RemovePeriodUseCase'),
  FindUserLectureUseCase: Symbol.for('FindUserLectureUseCase'),
  UpdateUserLectureUseCase: Symbol.for('UpdateUserLectureUseCase'),
  SchoolCalenderRepository: Symbol.for('SchoolCalenderRepository'),
  UpdateSchoolCalenderUseCase: Symbol.for('UpdateSchoolCalenderUseCase'),
  GetSchoolCalenderUseCase: Symbol.for('GetSchoolCalenderUseCase'),
  RemoveUserLectureUseCase: Symbol.for('RemoveUserLectureUseCase')
}

export { types }
