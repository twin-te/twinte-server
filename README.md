# twinte-server

twinteのバックエンドです。

# 構成
twinte-serverはクリーンアーキテクチャで構築されています。

# Frameworks & Drivers
## WebAPI
[typescript-rest](https://github.com/thiagobustamante/typescript-rest) (express) を使用しています。
## Database
[TypeORM](https://github.com/typeorm/typeorm) (postgres) を使用しています

# 開発
```
$ git clone git@github.com:twin-te/twinte-server.git
$ cd twinte-server
$ yarn
$ yarn dev
```
起動に必要な環境変数は `./src/envCheck.ts` 内を参照してください。
また、開講情報は `yarn updateLectureDatabase` を実行することでkdbから自動インポートされます。

# プロダクション起動
```
$ yarn start
```

twinteは開講情報の他に学年暦のデータを必要とします。
現状、手動でデータを定義しインポートします。
2019年度の定義ファイルは作成済みです。

## モジュール期間の定義をインポート
```
$ yarn importModuleDefinition ./schoolCalender/module2019.json
```
## 振替授業の定義をインポート
```
$ yarn importSubstituteDefinition ./schoolCalender/substitute2019.json
```
## 臨時休業や試験などのスケジュールをインポート
```
$ yarn importEventDefinition ./schoolCalender/events2019.json
```
