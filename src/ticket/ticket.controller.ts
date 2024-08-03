import { TicketsService } from "./ticket.service";
import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { Ticket } from "./ticket.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateTicketDto } from "./dto/create-ticket.dto";

@Controller('tickets')
@ApiTags('Билеты')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService){}

    @ApiOperation({summary:'Информация о всех билетах'})
    @Get()
        findAll() {
            return this.ticketsService.findAll();
        }
    
    @ApiOperation({summary:'Информация о конкретном билете'})
    @Get(':id')
        findByID(@Param('id') id: string){
            return this.ticketsService.findByID(+id);
        }

    @ApiOperation({summary:'Изменить билет'})
    @Put(':id')
    update(@Param('id') id: string, @Body() updateTicket: Ticket){
        return this.ticketsService.update(+id, updateTicket);
    }

    @ApiOperation({summary:'Создать новый билет'})
    @Post() 
        create(@Body() createTicket: CreateTicketDto){
            return this.ticketsService.create(createTicket);
        }

    @ApiOperation({summary:'Удалить билет'})
    @Delete(':id')
        remove(@Param('id') id: string) {
            return this.ticketsService.remove(+id);
        }
}