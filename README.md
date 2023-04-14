# Chat　APP for Study

OpenAIのGPT-3.5を利用した簡単なチャットアプリケーションです。
[Let’s build ChatGPT Messenger 2.0 with REACT! (Next.js 13, Firebase, Tailwind CSS, TypeScript)](https://www.youtube.com/watch?v=V6Hq_EX2LLM&list=PPSV)
こちらの動画で紹介されているコードをベースとして利用しています。

## Features

- OpenAIのChatGPT APIを使ってAI搭載のチャットボットとチャットする。
- テキスト入力とWeb Speech APIを利用した音声入力の双方に対応
- AWS Polly APIを使用してボットの応答に対するTTS出力を生成する
- 開発環境はDockerを利用する
- 認証とデータ管理にFirebaseを採用
- ログイン機能は、NextAuthを使用
- モデルを指定可能ですが、現像チャット型モデルのみ動作可能です。

## Prerequisites

- Docker and Docker Compose
- OpenAI API key
- AWS API key
- FireBase config json
- GCP API key

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/opplol/chat-gpt-study.git
    cd chat-gpt-study
    ```

2. Create a `.env.local` file in the root of the project, based on the `.env.example` file provided:
    ```
    cp gpt-app/.env.default gpt-app/.env.local
    ```

3. Open the `.env.local` file and fill your API keys
   * To Use FireBase　Admin config from json file, `fix firebaseAdmin.ts`

4. Run docker compose up
   ```
   docker compose up
   ```


