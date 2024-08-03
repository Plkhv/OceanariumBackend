import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/clients/client.entity";
import { Exhibit } from "src/exhibits/exhibit.entity";
import { Column, 
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn } from "typeorm";

@Entity('tickets')
export class Ticket{
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Детский', description: 'Категория'})
    @Column()
    name: string;

    @ApiProperty({example: '1000', description: 'Цена'})
    @Column()
    cost: number;

    @ApiProperty({example: [1, 1], description: 'Клиенты, которые приобрели билет'})
    @ManyToMany((type) => Client, (client) => client.tickets)

    @JoinTable({
        name: 'client_ticket',
        joinColumn: {name: 'ticket_id'},
        inverseJoinColumn: {name: 'client_id'}
    })

    clients: Client[];

    @ApiProperty({example: [1, 1], description: 'Экспозиции, которые включены в билет'})
    @ManyToMany((type) => Exhibit, (exhibit) => exhibit.tickets)

    @JoinTable({
        name: 'exhibit_ticket',
        joinColumn: {name: 'ticket_id'},
        inverseJoinColumn: {name: 'exhibit_id'}
    })

    exhibits: Exhibit[];
}