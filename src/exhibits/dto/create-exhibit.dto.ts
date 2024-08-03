import { ApiProperty } from "@nestjs/swagger";
import { execArgv } from "process";
import { ServerDescription } from "typeorm";

export class CreateExhibitDto {
    @ApiProperty({ example: 'дельфинарий', description: 'Название экспозиции'})
    name: string;
    @ApiProperty({example: '123', description: 'Количество рыб в экспозиции'})
    fishAmount: number;
}