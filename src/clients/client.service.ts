import { Client } from "./client.entity";
import { DatasourceService } from "src/datasource/datasource.service";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateClientDto } from "./dto/create-client.dto";
import { IncompleteClientDto } from "./dto/incomplete-client.dto";
import { Ticket } from "src/ticket/ticket.entity";

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>
    ) {}

    async create(clientDto: CreateClientDto): Promise<Client> {
        const client = this.clientRepository.create();
        client.fullname = clientDto.fullname;
        client.payCard = clientDto.payCard;
        await this.clientRepository.save(client);
        return client;
    }

    async findByID (id: number): Promise<Client> {
        return this.clientRepository.findOne({
            where: {id},
            relations: {tickets: true}
        });
    }

    async findAll(): Promise<Client[]> {
        const clients = await this.clientRepository.find({
            relations: {tickets: true}
        });
        return clients;
    }

    async findIncomplete(): Promise<IncompleteClientDto[]>{
        const clients = await this.clientRepository.find();
        const incompleteClients: IncompleteClientDto[] = clients.map((client) =>
        {
            const incompleteClient = new IncompleteClientDto();
            incompleteClient.fullname = client.fullname;
            incompleteClient.tickets = client.tickets;
            return incompleteClient;
        });
        return incompleteClients;
    }

    async update(id: number, updatedClient: Client) {
        const client = await this.clientRepository.findOne({where: {id}});
        client.fullname = updatedClient.fullname;
        client.payCard = updatedClient.payCard;

        const tickets = await this.ticketRepository.findBy({
            id: In(updatedClient.tickets),
        });
        client.tickets = tickets;

        await this.clientRepository.save(client);
        return client;
    }

    remove (id: number){
        this.clientRepository.delete({id});
    }
}
