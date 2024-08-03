import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";
import { ClientsService } from "./client.service";

@Controller('incomplete-clients')
@ApiTags('Клиенты')
export class IncompleteClientController{
    constructor(private readonly clientsService: ClientsService) {}

    @ApiOperation({ summary: 'Краткая информация о всех клиентах'})
    @Get ()
        findIncomplete(){
            return this.clientsService.findIncomplete();
        }
}