import { Ticket } from "./ticket.entity";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { DatasourceService } from "src/datasource/datasource.service";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { IncompleteTicketDto } from "./dto/incomplete-ticket.dto";
import { Client } from "src/clients/client.entity";
import { Exhibit } from "src/exhibits/exhibit.entity";

@Injectable()
export class TicketsService{
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>,
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        @InjectRepository(Exhibit)
        private readonly exhibitRepository: Repository<Exhibit>
    ) {}

    async create(ticketDto: CreateTicketDto): Promise<Ticket> {
        const ticket = this.ticketRepository.create();
        ticket.name = ticketDto.name;
        ticket.cost = ticketDto.cost;
        await this.ticketRepository.save(ticket);
        return ticket;
    }

    async findByID (id: number): Promise<Ticket> {
       return this.ticketRepository.findOne({
        where: {id},
        relations: {clients: true, exhibits: true}
    });
    }

    async findAll ():Promise<Ticket[]> {
        const tickets = await this.ticketRepository.find({
            relations: {clients: true, exhibits: true}
        });
        return tickets;
    }

    async findIncomplete(): Promise<IncompleteTicketDto[]>{
        const tickets = await this.ticketRepository.find();
        const incompleteTickets: IncompleteTicketDto[] = tickets.map((ticket) =>
        {
            const incompleteTicket = new IncompleteTicketDto();
            incompleteTicket.name = ticket.name;
            return incompleteTicket;
        });
        return incompleteTickets;
    }

    async update (id: number, updatedTicket: Ticket) {
        const ticket = await this.ticketRepository.findOne({where: {id}});
        ticket.name = updatedTicket.name;
        ticket.cost = updatedTicket.cost;

        const clients = await this.clientRepository.findBy({
            id: In(updatedTicket.clients),
        });
        ticket.clients = clients;

        const exhibits = await this.exhibitRepository.findBy({
            id: In(updatedTicket.exhibits),
        });
        ticket.exhibits = exhibits;

        await this.ticketRepository.save(ticket);
        return ticket;
    }

    remove (id: number){
        this.ticketRepository.delete({id});
    }
}