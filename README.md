# SNS App

React クライアント、Express API、MongoDB で構成された SNS アプリです。

## 構成

| Service | Container | Port | 用途 |
| --- | --- | --- | --- |
| client | `sns-client-app` | `5173` | React / Vite |
| api | `sns-api-app` | `8000` | Express API |
| mongo | `mongo-db` | `27017` | MongoDB |
| mongo-express | `mongo-express` | `8081` | MongoDB 管理画面 |

## 事前準備

Docker Desktop を起動しておきます。

環境変数ファイルは以下を使用します。

- `api/.env`
- `client/.env`

Docker Compose から起動する場合、API から MongoDB へ接続するホスト名は `localhost` ではなく Compose のサービス名 `mongo` です。

`api/.env` の MongoDB 接続例:

```env
MONGO_URI=mongodb://root:example@mongo:27017/sns?authSource=admin
DATABASE_URL=mongodb://root:example@mongo:27017/sns?authSource=admin
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRES_IN=10m
REFRESH_TOKEN_SECRET_KEY=your_refresh_token_secret_key
REFRESH_TOKEN_EXPIRES_IN=24h
```

`client/.env` の API 接続例:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Docker コンテナの起動

リポジトリ直下で実行します。

```bash
docker compose up -d
```

起動状態を確認します。

```bash
docker compose ps
```

## 依存パッケージのインストール

初回起動時、または `package.json` が変わった場合は、各コンテナ内で依存パッケージをインストールします。

API:

```bash
docker exec -it sns-api-app /bin/sh
cd /app/api
npm install
```

Client:

```bash
docker exec -it sns-client-app /bin/sh
cd /app/client
npm install
```

## API の起動

API コンテナに入ります。

```bash
docker exec -it sns-api-app /bin/sh
```

API ディレクトリへ移動して dev server を起動します。

```bash
cd /app/api
npm run dev
```

API は以下で起動します。

```text
http://localhost:8000
```

## Client の起動

別ターミナルで client コンテナに入ります。

```bash
docker exec -it sns-client-app /bin/sh
```

Client ディレクトリへ移動して Vite を起動します。

```bash
cd /app/client
npm run dev
```

ブラウザで以下を開きます。

```text
http://localhost:5173
```

## MongoDB の起動

MongoDB は `docker compose up -d` で `mongo` サービスとして起動します。

接続情報:

```text
Host: localhost
Port: 27017
Username: root
Password: example
```

API コンテナから接続する場合のホスト名は `mongo` です。

```text
mongodb://root:example@mongo:27017/sns?authSource=admin
```

ホスト PC から MongoDB クライアントで接続する場合は `localhost` を使います。

```text
mongodb://root:example@localhost:27017/sns?authSource=admin
```

## Mongo Express

MongoDB の管理画面は以下で開けます。

```text
http://localhost:8081
```

Basic 認証:

```text
Username: root
Password: example
```

## 停止

コンテナを停止します。

```bash
docker compose stop
```

停止してコンテナを削除します。

```bash
docker compose down
```

MongoDB のデータは `./mongo/db` と `./mongo/configdb` に保存されます。データも削除したい場合は、対象ディレクトリを削除してください。

## よく使うコマンド

ログ確認:

```bash
docker compose logs -f api
docker compose logs -f client
docker compose logs -f mongo
```

コンテナに入る:

```bash
docker exec -it sns-api-app /bin/sh
docker exec -it sns-client-app /bin/sh
docker exec -it mongo-db mongosh -u root -p example --authenticationDatabase admin
```

依存パッケージを再インストール:

```bash
docker exec -it sns-api-app /bin/sh
cd /app/api
npm install

docker exec -it sns-client-app /bin/sh
cd /app/client
npm install
```
