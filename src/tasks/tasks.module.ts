import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { SubTask } from 'src/entities/subTask.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, SubTask])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
