import { ClientsService } from "./client.service";
import { Controller, Get, Param, Body, Put, Post, Delete } from "@nestjs/common";
import { Client } from "./client.entity";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CreateClientDto } from "./dto/create-client.dto";

@Controller('clients')
@ApiTags('Клиенты')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @ApiOperation({ summary: 'Информация о всех клиентах'})
    @Get ()
        findAll() {
            return this.clientsService.findAll();
        }

    @ApiOperation({ summary: 'Информация о конкретном клиенте'})
    @Get(':id')
        findByID(@Param('id') id: string){
            return this.clientsService.findByID(+id);
        }
    
    @ApiOperation({ summary: 'Изменить клиента'})
    @Put(':id')
        update(@Param('id') id: string, @Body() updateClient: Client){
            return this.clientsService.update(+id, updateClient);
        }
    @ApiOperation({ summary: 'Создать нового клиента'})
    @Post() 
        create(@Body() createClient: CreateClientDto){
            return this.clientsService.create(createClient);
        }
    @ApiOperation({ summary: 'Удалить клиента'})
    @Delete(':id')
        remove(@Param('id') id: string) {
            return this.clientsService.remove(+id);
        }
}