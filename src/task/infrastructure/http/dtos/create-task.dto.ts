import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { TaskStatus } from "../../../domain/enums/task-status.enum";

export class CreateTaskDto {
    @ApiProperty({
        example: 'Mi primera tarea',
        description: 'Ingresa un titulo'
    })
    @IsString()
    @MinLength(1, { message: 'El titulo es requerido' })
    @MaxLength(100, { message: 'El titulo no puede tener mas de 100 caracteres' })
    @IsNotEmpty()
    title!: string;

    @ApiProperty({
        example: 'pending',
        description: 'Ingresa un estado de la tarea',
        enum: TaskStatus
    })
    @IsNotEmpty()
    @IsEnum(TaskStatus, { message: 'El estado de la tarea debe ser pending, in_progress o done' })
    status!: TaskStatus

    @ApiPropertyOptional({
        example: 'Esta es una descripcion para la tarea',
        description: 'Descripcion  de la tarea'
    })
    @IsOptional()
    @IsString()
    @MaxLength(500, { message: 'la descripción no puede tener mas de 500 caracteres' })
    description?: string;
}