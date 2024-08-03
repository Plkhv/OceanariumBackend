import { ApiProperty } from "@nestjs/swagger";
import { Ticket } from "src/ticket/ticket.entity";
import { Column, 
    Entity, 
    JoinTable, 
    ManyToMany, 
    PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class Client {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Поляховская Ольга Александровна', description: 'ФИО'})
    @Column({})
    fullname: string;

    @ApiProperty({example: '1234123421341234', description: 'Номер привязанной банковской карты'})
    @Column()
    payCard: string;

    @ApiProperty({example: [1, 1], description: 'Приобретенные билеты'})
    @ManyToMany((type) => Ticket, (ticket) => ticket.clients)

    @JoinTable({
        name: 'client_ticket',
        joinColumn: {name: 'client_id'},
        inverseJoinColumn: {name: 'ticket_id'},
    })

    tickets: Ticket[];
}