import { AppErrorKind } from "../types/app-error.type";

export interface AppError {
    kind: AppErrorKind;
    message: string;
    status: number;
    fieldErrors?: Record<string, string>;
}