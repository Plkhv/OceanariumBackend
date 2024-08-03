import { ApiProperty } from "@nestjs/swagger";
import { execArgv } from "process";
import { ServerDescription } from "typeorm";

export class CreateTicketDto {
    @ApiProperty({ example: 'Льготный', description: 'Название билета'})
    name: string;
    @ApiProperty({example: '12500', description: 'Цена билета'})
    cost: number;
}