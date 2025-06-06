import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly taskService: TasksService
    ){}

@Post()
async createTaskAndSubTask(@Body() body){
    try {
        const data  = await this.taskService.create(body)
        return {
            'message': 'task created',
            data
        }
    } catch (error) {
        return  error
    }
}

@Get()
async findAllTask(){
    return await this.taskService.findAll()
}

@Get(':id')
async findOneTask(@Param('id') id){
    return await this.taskService.findOne(id)
}

@Delete(':id')
async deleteTask(@Param('id') id){
    return await this.taskService.deleteTask(id)
}


@Patch(':id')
async updateTask(@Body() body, @Param('id') id){
    return await this.taskService.update(id, body)
}





}
