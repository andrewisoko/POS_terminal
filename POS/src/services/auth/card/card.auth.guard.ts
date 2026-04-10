import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class CardAuthGuard extends AuthGuard('card-jwt') {}
