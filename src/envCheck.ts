import { getLogger } from 'log4js'

const envVariables: { [key: string]: { [key: string]: string } } = {
  Database: {
    PG_HOST: 'Postgres接続先',
    PG_USER: 'Postgresユーザー名',
    PG_PASSWORD: 'Postgresパスワード',
    PG_PORT: 'Postgres接続先ポート',
    PG_DATABASE: 'Postgresデータベース名'
  },
  RestApi: {
    PORT: '稼働ポート',
    BASE_URL: '外部から見たときのURL',
    SESSION_SECRET: 'セッション',
    REDIRECT_URL: 'ログイン後にリダイレクトするURL'
  },
  Auth: {
    TWITTER_CONSUMER_KEY: 'Twitter Consumer Key',
    TWITTER_CONSUMER_SECRET: 'Twitter Consumer Secret',
    GOOGLE_CLIENT_ID: 'Google Client ID',
    GOOGLE_CLIENT_SECRET: 'Google Client Secret'
  }
}

const logger = getLogger('main')

export default function(category?: string[]) {
  if (!category) category = Object.keys(envVariables)
  const missingVariables = category
    .map(c => {
      return Object.keys(envVariables[c]).filter((v): boolean => {
        if (!process.env[v]) {
          logger.fatal(
            `環境変数: ${v} (${envVariables[c][v]}) が設定されていません。`
          )
          return true
        }
        return false
      })
    })
    .flat()
  if (missingVariables.length > 0) process.exit(1)
  logger.info('環境変数のチェックが完了しました')
}
