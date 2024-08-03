import { Module } from '@nestjs/common';
import { ExhibitsService } from './exhibit.service';
import { ExhibitsController } from './exhibits.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibit } from './exhibit.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { IncompleteExhibitController } from './exhibit.incomplete.controller';

@Module({
    controllers: [ExhibitsController, IncompleteExhibitController],
    providers: [ExhibitsService],
    imports: [DatasourceModule, 
        TypeOrmModule.forFeature([Exhibit, Ticket]),
    ],
})

export class ExhibitsModule {}