import { ExhibitsService } from "./exhibit.service";
import { Controller, Get, Param, Body, Put, Post, Delete } from "@nestjs/common";
import { Exhibit } from "./exhibit.entity";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CreateExhibitDto } from "./dto/create-exhibit.dto";

@Controller('exhibits')
@ApiTags('Экспозиции')
export class ExhibitsController {
    constructor(private readonly exhibitsService: ExhibitsService) {}

    @ApiOperation({ summary: 'Информация о всех экспозициях'})
    @Get ()
        findAll() {
            return this.exhibitsService.findAll();
        }

    @ApiOperation({ summary: 'Информация о конкретной экспозиции'})
    @Get(':id')
        findByID(@Param('id') id: string){
            return this.exhibitsService.findByID(+id);
        }
    
    @ApiOperation({ summary: 'Изменить экспозицию'})
    @Put(':id')
        update(@Param('id') id: string, @Body() updateExhibit: Exhibit){
            return this.exhibitsService.update(+id, updateExhibit);
        }
    @ApiOperation({ summary: 'Создать новую экспозицию'})
    @Post() 
        create(@Body() createExhibit: CreateExhibitDto){
            return this.exhibitsService.create(createExhibit);
        }

    @ApiOperation({ summary: 'Удалить экспозицию'})
    @Delete(':id')
        remove(@Param('id') id: string) {
            return this.exhibitsService.remove(+id);
        }
}