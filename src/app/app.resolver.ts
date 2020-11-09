import { Args, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver((_) => String)
export class AppResolver {
  constructor(private readonly _appService: AppService) {}
  @Query((_) => String)
  hello(@Args('data', { type: () => String, nullable: true }) data?: string) {
    return this._appService.getHello(data);
  }
}
