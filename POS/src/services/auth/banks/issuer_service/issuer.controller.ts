import { Controller, Post, Body } from '@nestjs/common';
import { IssuerService } from './issuer.service';

@Controller('issuer')
export class IssuerController {
  constructor(private readonly issuerService: IssuerService) {}

  @Post('graphql')
  async handleGraphQL(
    @Body() payload: any
) {
    const { query, variables } = payload;

    return {
      data: query,
      variables: variables,
    };
  }
}
