import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.model';

@Injectable()
export class BoardService {
  constructor(@InjectRepository(Board) _boardRepository: Repository<Board>) {
    console.log('use this repository board', Board);
  }
}
