import { ApiProperty } from "@nestjs/swagger";
import { execArgv } from "process";
import { ServerDescription } from "typeorm";

export class CreateClientDto {
    @ApiProperty({ example: 'Поляховская Ольга Александровна', description: 'ФИО'})
    fullname: string;
    @ApiProperty({example: '1234123412341234', description: 'Номер привязанной карты'})
    payCard: string;
}