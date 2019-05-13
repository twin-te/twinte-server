# twinte-server

twinte のバックエンドです。WIP。

## Development

リポジトリをクローンして依存ライブラリをインストールします。

```
$ git clone git@github.com:twin-te/twinte-server.git
$ cd twinte-server
$ yarn
```

ローカルホストで動かします。

```
$ yarn dev
```

ビルドします。`build`に吐き出します。

```
$ yarn build
```

リントします。@typescript-eslint/parser を使っているのでちょっと遅いです。fix までするときは:fix をつけます。

```
$ yarn lint
or
$ yarn lint:fix
```

フォーマットをします。Prettier の標準ルールに準拠しています。

```
$ yarn format
```
