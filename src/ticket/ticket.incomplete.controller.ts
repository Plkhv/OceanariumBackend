import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";
import { TicketsService } from "./ticket.service";

@Controller('incomplete-tickets')
@ApiTags('Билеты')
export class IncompleteTicketController{
    constructor(private readonly ticketsService: TicketsService) {}

    @ApiOperation({ summary: 'Краткая информация о всех билетах'})
    @Get ()
        findIncomplete(){
            return this.ticketsService.findIncomplete();
        }
}