const envVariables: { [key: string]: { [key: string]: string } } = {
  Database: {
    PG_HOST: 'Postgres接続先',
    PG_USER: 'Postgresユーザー名',
    PG_PASSWORD: 'Postgresパスワード',
    PG_PORT: 'Postgres接続先ポート',
    PG_DATABASE: 'Postgresデータベース名'
  },
  RestApi: {
    BASE_URL: '外部から見たときのURL',
    SESSION_SECRET: 'セッション'
  },
  Auth: {
    TWITTER_CONSUMER_KEY: 'Twitter Consumer Key',
    TWITTER_CONSUMER_SECRET: 'Twitter Consumer Secret',
    GOOGLE_CLIENT_ID: 'Google Client ID',
    GOOGLE_CLIENT_SECRET: 'Google Client Secret'
  }
}

export default function(category?: string[]) {
  if (!category) category = Object.keys(envVariables)
  const missingVariables = category
    .map(c => {
      return Object.keys(envVariables[c]).filter((v): boolean => {
        if (!process.env[v]) {
          console.error(
            `環境変数: ${v} (${envVariables[c][v]}) が定義されていません。`
          )
          return true
        }
        return false
      })
    })
    .flat()
  if (missingVariables.length > 0) process.exit(1)
}
