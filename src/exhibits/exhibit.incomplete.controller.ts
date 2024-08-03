import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";
import { ExhibitsService } from "./exhibit.service";

@Controller('incomplete-exhibits')
@ApiTags('Экспозиции')
export class IncompleteExhibitController{
    constructor(private readonly exhibitsService: ExhibitsService) {}

    @ApiOperation({ summary: 'Краткая информация о всех экспозициях'})
    @Get ()
        findIncomplete(){
            return this.exhibitsService.findIncomplete();
        }
}