import { Controller,Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/services/auth/authGuard";
import { Role } from "src/apps/web_terminal/entity/wt.entity";
import { Roles } from "src/services/auth/roles/roles.decorators";
import { RolesGuard } from "src/services/auth/roles/roles.guard";


@Controller('merchant')
export class MerchantController{

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.TERMINAL)
    @Get('auth-validation-terminal')
    validateTerminal(){
        return "Web terminal validated 🚀"
    }
}