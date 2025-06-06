import { Entity, PrimaryGeneratedColumn,  Column, ManyToOne,CreateDateColumn,UpdateDateColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class SubTask {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;


    @ManyToOne(() => Task, (task)  => task.subTask, {onDelete: 'CASCADE'})
    task: Task
}