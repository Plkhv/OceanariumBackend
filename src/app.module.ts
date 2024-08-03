import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { DatasourceModule } from './datasource/datasource.module';
import { ExhibitsModule } from './exhibits/exhibits.module';
import { TicketsModule } from './ticket/ticket.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ClientsModule, 
    DatasourceModule,
    ExhibitsModule,
    TicketsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'education',
      password: 'password',
      host: 'localhost',
      synchronize: false,
      logging: 'all',
      entities: ['dist/**/*.entity{.ts,.js}'],
    })],
  controllers: [],
  providers: [],
})

export class AppModule {}
