import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/task.entity';
import { SubTask } from 'src/entities/subTask.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

        @InjectRepository(SubTask)
        private readonly subtaskRepository: Repository<SubTask>
    ) { }


    async createTask(data) {
        let newTask = await this.taskRepository.create(data)
        return this.taskRepository.save(newTask)
    }

    async createSubTask({ title, description }, task) {
        let newTask = this.subtaskRepository.create({
            title, description, task

        })
        return this.subtaskRepository.save(newTask)
    }

    async create(data) {
        if (data.parentId) {
            const task = await this.taskRepository.findOne({ where: { id: data.parentId } })

            if (task) {
                return await this.createSubTask(data, task)
            }
            else{
                throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
            }
        }
        else {
            console.log('called')
            return await this.createTask(data)
        }
    }

    async findAll() {
        return this.taskRepository.findAndCount({relations: ['subTask']})
    }

    async findOne(id) {
        return this.taskRepository.find({ where: { id }, relations: ['subTask'] })
    }

    async deleteTask(id){
        return this.taskRepository.delete({id})
    }


    async updateTask(id, data){
        const task =await  this.taskRepository.findOne({
            where: {id}
        })

        if(task){
            return this.taskRepository.save({
                ...task,
                ...data
            })
        }
        else{
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

    }

    async updateSubTask(id, data){
        const task =await  this.subtaskRepository.findOne({
            where: {id}
        })

        if(task){
            return this.subtaskRepository.save({
                ...task,
                ...data
            })
        }
        else{
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
    }

    async update(id, data){
        if(data.parentId){
            return await this.updateSubTask(id, data)
        }else{
            return await this.updateTask(id, data)
        }
    }

}
