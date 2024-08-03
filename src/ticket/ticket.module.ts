import { Module } from '@nestjs/common';
import { TicketsService } from './ticket.service';
import { TicketsController } from './ticket.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/client.entity';
import { Ticket } from './ticket.entity';
import { Exhibit } from 'src/exhibits/exhibit.entity';
import { IncompleteTicketController } from './ticket.incomplete.controller';

@Module({
    controllers: [TicketsController, IncompleteTicketController],
    providers: [TicketsService],
    imports: [DatasourceModule,
        TypeOrmModule.forFeature([Client, Ticket, Exhibit]),
    ],
})

export class TicketsModule {}