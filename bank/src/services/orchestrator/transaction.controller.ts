import { Controller,Get, Redirect} from "@nestjs/common";

@Controller("transaction")
export class TransactionController {

    @Get() /* merchant service*/
    @Redirect('http://localhost:3002/api.gateway/merchant/auth-validation-terminal', 302)
    redirectToTerminalValidation(){
        }
    }
