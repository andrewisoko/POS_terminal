import { Controller,Get, UseGuards} from "@nestjs/common";
import { JwtAuthGuard } from "src/services/auth/authGuard";
import { Role } from "../web_terminal/entity/wt.entity";
import { Roles } from "../auth/roles/roles.decorators";
import { RolesGuard } from "src/services/auth/roles/roles.guard";
import { HttpService } from "@nestjs/axios";
import { TransactionService } from "./transaction.service";




@Controller("transaction")
export class TransactionController {
    constructor(
        private readonly httpService: HttpService,
        private readonly transactionService: TransactionService
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TERMINAL)
    @Get("orchestra")
    orchestrate() {
        try {
            const validateTerminal = () => this.httpService.get('http://localhost:3002/api.gateway/auth/validation-terminal/')
            validateTerminal()
            console.log("Web terminal validated ✅");

            const tokenisePan = () => this.httpService.get('http://localhost:3002/api.gateway/token/pan-tokenisation/') /* change it to post */
            tokenisePan()
            console.log("Pan tokenised 🔐");

            // const ruleEngine = () => this.httpService.post('http://localhost:3002/api.gateway/rule-engine/checks',)
            
        } catch (error) {
            console.log(`error ${error}`)
        }
        this.orchestrate()
    }
}
   

