import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "../../domain/enums/task-status.enum";

@Entity('tasks')
export class TaskTypeOrmEntity {
    @PrimaryColumn('uuid')
    id!: string;

    @Column('text')
    title!: string;

    @Column('text', { nullable: true })
    description?: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.PENDING
    })
    status!: TaskStatus;

    @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP(6)', type: 'timestamp' })
    createdAt!: Date;

    @Column({ type: 'timestamp', nullable: true, default: null })
    updatedAt?: Date;
}