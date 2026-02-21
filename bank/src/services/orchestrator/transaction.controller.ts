import { Controller,Get, UseGuards} from "@nestjs/common";
import { JwtAuthGuard } from "src/services/auth/authGuard";
import { Role } from "../web_terminal/entity/wt.entity";
import { Roles } from "../auth/roles/roles.decorators";
import { RolesGuard } from "src/services/auth/roles/roles.guard";
import { HttpService } from "@nestjs/axios";




@Controller("transaction")
export class TransactionController {
    constructor(private readonly httpService: HttpService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TERMINAL)
    @Get("orchestra")
    orchestrate() {
        try {
            const validateTerminal = () => this.httpService.get('http://localhost:3002/api.gateway/auth/validation-terminal/')
            validateTerminal()
            console.log("Web terminal validated ✅");

            const tokenisePan = () => this.httpService.get('http://localhost:3002/api.gateway/token/pan-tokenisation/')
            tokenisePan()
            console.log("Pan tokenised 🔐");
            
        } catch (error) {
            console.log(`error ${error}`)
        }
        this.orchestrate()
    }
}
   

