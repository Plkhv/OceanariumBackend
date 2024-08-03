import { Ticket } from "src/ticket/ticket.entity";

export class IncompleteClientDto {
    fullname: string;
    tickets: Ticket[];
}