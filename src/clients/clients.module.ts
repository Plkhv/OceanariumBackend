import { Module } from '@nestjs/common';
import { ClientsService } from './client.service';
import { ClientsController } from './clients.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { IncompleteClientController } from './client.incomlete.controller';

@Module({
    controllers: [ClientsController, IncompleteClientController],
    providers: [ClientsService],
    imports: [DatasourceModule, 
        TypeOrmModule.forFeature([Client, Ticket]),
    ],
})

export class ClientsModule {}