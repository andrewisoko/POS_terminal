import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/services/merchant.service.ts/entity/wt.entity';

export function Roles(...roles:Role[]){
    return SetMetadata("ROLES_KEY",roles)
}