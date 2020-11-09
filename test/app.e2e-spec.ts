/* eslint-disable @typescript-eslint/no-unused-vars */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { config } from 'dotenv';
import { resolve } from 'path';
import { AppModule } from '../src/app.module';
import request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    config({ path: resolve(__dirname, `../.${process.env.NODE_ENV}.env`) });
    console.log(process.env.NODE_ENV);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get hello', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{hello}' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.hello).toBe('Hello World!');
      });
  });

  it('user create', () => {
    const name = 'hakhak';
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: `mutation {createUser(name: "${name}"){name}}` })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.createUser.name).toBe(name);
      });
  });

  it('user create board', () => {
    const board = {
      title: '학학이 소개',
      content: '학학이는 살아있어요',
    };

    const name = 'hakhak';

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {createBoard(title: "${board.title}", content:"${board.content}", userName:"${name}"){content}}`,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.createBoard.title).toBe(board.title);
      });
  });

  it('boards of user', () => {
    const name = 'hakhak';

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query {getBoards(userName:"${name}"){author {name}}}`,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.getBoards).toBe(expect.arrayContaining(['author']));
      });
  });
});
