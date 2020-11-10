<p align="center">
  <a href="https://flatgarden.imweb.me/" target="blank"><img src="https://cdn.imweb.me/thumbnail/20200527/8394b8cd5faa4.png" width="320" alt="hakhak Logo" /></a>
</p>

  <p align="center">입시 고민 메신저 학학이 서버 테스트 과제</p>
  
## Description

[Nest](https://github.com/nestjs/nest)와 [TypeOrm](https://typeorm.io/#/)을 이용해서 grpahql 서버를 짜는 과제입니다.

완성을 원하는 것이 아니라 코드 작성에 대한 과정 및 의도를 보려고 함이니 큰 부담 가지지 않으셔도 됩니다.

src 내에 app, board, user 도메인이 존재하고
test/app.e2e-spec.ts 안에 테스트에 맞춰 resolver와 service를 작성해주시면 됩니다.

database는 docker-compose를 통해 가동하셔서 진행하시면 되고 docker-compose 서버 컨테이너는 prod 환경으로 진행됩니다.

완료 기간은 1주일이내 완료해주시면 되고 해당 리포지토리를 clone하여 작성해주신 후

origin 을 따로 추가해서 개인 리포의 repository url을 mail(tech@flatgarden.kr)로 보내주시면 됩니다.

추가적으로 질문사항이나 궁금한 것이 있으면 [오픈채팅방](https://open.kakao.com/o/sULPN0Fc)에서 질문 바랍니다.

- Before you start

  개발에만 집중할 수 있도록, 일부 서버 환경(nestjs/typeorm)이 포함되어 있습니다.
  src 디렉토리에서 작업을 하시면 됩니다.
  이 레포지토리를 클론한 후에 다음의 명령어로 서버를 시작할 수 있습니다.

docker-compose 환경이 구축되어야합니다.

## docker

docker-compose환경에서 모든 것이 이루어집니다.
20201111 수정

- local에서 테스트 하기 어려운 지원자가 있을 것이라 예상되어 docker-compose 환경을 구축하였습니다.
- db, server, test 모두 service로 들어가 있습니다.

- `src/shared/util/typeOrmConfig`에 db connection 정보가 있습니다.

```typescript
export const typeormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  port: 5432,
  username: 'testuser',
  password: 'testpasswd',
  database: 'testdb',
  synchronize: true,
  entities: [`${path.join(__dirname, '..', '..', '**')}/*.model.[tj]s`],
  host,
};
```

### build

```bash
$ docker-compose build
```

### start all

```bash
$ docker-compose up -d
```

### start only api server

```bash
$ docker-compose up server
```

### start only test

```bash
$ docker-compose up test
```
### Stops containers and removes containers, networks, volumes

```bash
$ docker-compose down
```

## local 개발 환경

### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Test

```bash
# e2e tests
$ npm run test:e2e

```

e2e test에 적혀있는 3가지 테스트 케이스와 함께 추가적으로 CRUD에 대해서
작성할 수 있는 테스트 케이스를 작성하여 주세요.

## 기획

### 구현해야 될 것

유저가 글을 작성할 수 있는 게시판

유저를 생성할 수 있다.

유저는 글을 작성/수정/삭제 할 수 있다.

유저가 쓴 글을 모아서 볼 수 있다.

유저나 글에 대해서 검색을 할 수 있다 (id)

- Base Model

```typescript
@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @PrimaryGeneratedColumn('increment')
  @Field((_) => ID)
  id!: number;

  @CreateDateColumn()
  @Field((_) => Date)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field((_) => Date)
  updatedAt!: Date;

  @Column({ nullable: true })
  @Field((_) => Date, { nullable: true })
  deletedAt?: Date;
}
```

- User Model

```typescript
@ObjectType()
@Entity()
export class User extends BaseModel {
  @Column()
  @Field((_) => String)
  name!: string;

  @OneToMany(
    () => Board,
    (board) => board.author,
  )
  @Field((_) => [Board])
  boards!: Board[];
}
```

- Board Model

```typescript
@Entity()
@ObjectType()
export class Board extends BaseModel {
  @Column()
  @Field((_) => String)
  title!: string;

  @Column()
  @Field((_) => String)
  content!: string;

  @ManyToOne(
    () => User,
    (user) => user.boards,
  )
  @Field((_) => User)
  author!: User;
}
```

서버 개발시 꼭 데이터베이스를 이용해야하며 테스트 케이스에 통과된 개수로 채점을 진행합니다.
테스트 케이스를 작성하여 주세요.

### 최소 요구 API

유저 생성 : createUser

유저 삭제 : deleteUser ( soft delete )

board 작성 : createBoard

유저가 작성한 board 검색 : getBoards

## 제출 방법

과제를 받고 일주일 기한 안에 mail로 repository url을 보내주시면 됩니다.

## 채점 방법

e2e test 를 진행하여 test 통과 갯수로 진행합니다.

test 케이스를 다양하게 작성하시면 가산점이 적용됩니다.

### 가산점 항목

- [JWT](https://jwt.io/)를 이용하여서 authentication과 authorization을 구현하였을 경우
  - nest의 authguard를 사용할 수 있습니다.
- 도메인 별로 브랜치를 나누어서 개발했을 경우
- test case 를 직접 작성하였을 경우

## Support

[오픈채팅방](https://open.kakao.com/o/sULPN0Fc)

## Stay in touch

- mail - tech@flatgarden.kr
- Website - [https://www.hakhak.io](https://www.hakhak.io)
