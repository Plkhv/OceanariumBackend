import { HttpStatus, Injectable } from "@nestjs/common";
import { Client } from "src/clients/client.entity";
import { Exhibit } from "src/exhibits/exhibit.entity";
import { Ticket } from "src/ticket/ticket.entity";


@Injectable()
export class DatasourceService {
    private clients: Client[] = [];
    private exhibits: Exhibit[] = [];
    private tickets: Ticket[] = [];

    getClients(): Client[] {
        return this.clients;
    }

    getExhibites(): Exhibit[] {
        return this.exhibits;
    }

    getTickets(): Ticket[] {
        return this.tickets;
    }
}