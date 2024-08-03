import { Exhibit } from "./exhibit.entity";
import { DatasourceService } from "src/datasource/datasource.service";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateExhibitDto } from "./dto/create-exhibit.dto";
import { IncompleteExhibitDto } from "./dto/incomplete-exhibit.dto";
import { Ticket } from "src/ticket/ticket.entity";

@Injectable()
export class ExhibitsService {
    constructor(
        @InjectRepository(Exhibit)
        private readonly exhibitRepository: Repository<Exhibit>,
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>
    ) {}

    async create(exhibitDto: CreateExhibitDto): Promise<Exhibit> {
        const exhibit = this.exhibitRepository.create();
        exhibit.name = exhibitDto.name;
        exhibit.fishAmount = exhibitDto.fishAmount;
        await this.exhibitRepository.save(exhibit);
        return exhibit;
    }

    async findByID (id: number): Promise<Exhibit> {
        return this.exhibitRepository.findOne({
            where: {id},
            relations: {tickets: true}
        });
    }

    async findAll(): Promise<Exhibit[]> {
        const exhibits = await this.exhibitRepository.find({
            relations: {tickets: true}
        });
        return exhibits;
    }

    async findIncomplete(): Promise<IncompleteExhibitDto[]>{
        const exhibits = await this.exhibitRepository.find();
        const incompleteExhibits: IncompleteExhibitDto[] = exhibits.map((exhibit) =>
        {
            const incompleteExhibit = new IncompleteExhibitDto();
            incompleteExhibit.name = exhibit.name;
            return incompleteExhibit;
        });
        return incompleteExhibits;
    }
    
    async update(id: number, updatedExhibit: Exhibit) {
        const exhibit = await this.exhibitRepository.findOne({where: {id}});
        exhibit.name = updatedExhibit.name;
        exhibit.fishAmount = updatedExhibit.fishAmount;

        const tickets = await this.ticketRepository.findBy({
            id: In(updatedExhibit.tickets),
        });
        exhibit.tickets = tickets;

        await this.exhibitRepository.save(exhibit);
        return exhibit;
    }

    remove (id: number){
        this.exhibitRepository.delete({id});
    }
}
