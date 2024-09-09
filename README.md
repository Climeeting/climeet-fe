# Climeet FE ✨

## Skill

- pnpm
- React, TS
- SCSS
- Tanstack Query

## How To Deploy

1. [AWS Command interface 를 설치한다.](https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/cli-chap-getting-started.html)
2. 다음 CLI 를 입력한다.

VITE_S3_ACCESS_KEY, VITE_S3_SECRET_ACCESS_KEY는 `.env` 에 있는 값을 사용하면 된다.
```zsh
$ aws configure --profile climeet-fe
AWS Access Key ID [None]: ${VITE_S3_ACCESS_KEY}
AWS Secret Access Key [None]: ${VITE_S3_SECRET_ACCESS_KEY}
Default region name [None]: ap-northeast-2
Default output format [None]: json
```

3. `pnpm run deploy` 입력하면 S3에 배포 완료된다.

## How to start

```bash
# install
pnpm i

# start dev
pnpm run dev

# build
pnpm run build
```

## How to track issue

1. 깃허브에서 이슈를 생성한다.

2. 이슈 번호를 딴 브랜치를 생성한다.
   ex) `feature/1-first-start`

3. 작업 시 커밋에 이슈 번호를 넣는다.
   ex) `#1 feat: 첫 기능 구현`

4. 추가적인 이슈나 공유해야할 내용이 생기면 이슈에 커멘트를 남긴다.

5. 작업이 완료되면 PR을 생성하고 코드 리뷰 후에 main으로 머지한다.
