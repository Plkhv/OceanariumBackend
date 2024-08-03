import { ApiProperty } from "@nestjs/swagger";
import { Ticket } from "src/ticket/ticket.entity";
import { Column, 
    Entity, 
    JoinTable, 
    ManyToMany, 
    PrimaryGeneratedColumn } from "typeorm";

@Entity('exhibits')
export class Exhibit {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Дельфинарий', description: 'Название экспозиции'})
    @Column()
    name: string;

    @ApiProperty({example: '123', description: 'Количество рыб в экспозиции'})
    @Column()
    fishAmount: number;

    @ApiProperty({example: [1, 1], description: 'Билеты, в которые включена экспозиция'})
    @ManyToMany((type) => Ticket, (ticket) => ticket.exhibits)

    @JoinTable({
        name: 'exhibit_ticket',
        joinColumn: {name: 'exhibit_id'},
        inverseJoinColumn: {name: 'ticket_id'},
    })

    tickets: Ticket[];
}