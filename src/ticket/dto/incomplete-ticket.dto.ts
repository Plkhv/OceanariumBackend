import { Exhibit } from "src/exhibits/exhibit.entity";

export class IncompleteTicketDto {
    name: string;
    exhibits: Exhibit[];
}