const envVariables: { [key: string]: string } = {
  PG_HOST: 'Postgres接続先',
  PG_USER: 'Postgresユーザー名',
  PG_PASSWORD: 'Postgresパスワード',
  PG_PORT: 'Postgres接続先ポート',
  PG_DATABASE: 'Postgresデータベース名',
  BASE_URL: '外部から見たときのURL',
  SESSION_SECRET: 'セッション',
  TWITTER_CONSUMER_KEY: 'Twitter Consumer Key',
  TWITTER_CONSUMER_SECRET: 'Twitter Consumer Secret',
  GOOGLE_CLIENT_ID: 'Google Client ID',
  GOOGLE_CLIENT_SECRET: 'Google Client Secret'
}

export default function() {
  const missingVariables = Object.keys(envVariables).filter(key => {
    if (!process.env[key])
      console.error(
        `環境変数: ${key} (${envVariables[key]}) が設定されていません。`
      )
    return !process.env[key]
  })
  if (missingVariables.length > 0) process.exit(-1)
}
