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
    ADMIN_USER_ID: '管理者のTwin:te ID',
    TWITTER_CONSUMER_KEY: 'Twitter Consumer Key',
    TWITTER_CONSUMER_SECRET: 'Twitter Consumer Secret',
    GOOGLE_CLIENT_ID: 'Google Client ID',
    GOOGLE_CLIENT_SECRET: 'Google Client Secret',
    APPLE_CLIENT_ID: 'Apple Client ID',
    APPLE_TEAM_ID: 'Apple Team ID',
    // APPLE_SCOPE: 'Apple Scope',
    APPLE_KEY_ID: 'Apple Key ID',
    APPLE_PRIVATE_KEY_LOCATION:
      'Appleから１回限りDLできる Private Key ファイルの設置場所 (ワーキングディレクトリからの相対パスも可)'
  },
  Stripe: {
    STRIPE_API_KEY: 'Stripe Api Key',
    STRIPE_SUCCESS_URL: '決済完了後に遷移するurl',
    STRIPE_CANCEL_URL: 'キャンセル時に遷移するurl'
  }
}

const logger = getLogger('main')

export default function(category?: string[]) {
  if (!category) category = Object.keys(envVariables)
  const missingVariables = category.map(c => {
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
  const res = missingVariables.some(el => el.some(v => v.length > 0))
  if (res) process.exit(1)
  logger.info('環境変数のチェックが完了しました')
}
