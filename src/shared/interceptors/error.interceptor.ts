import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError, timeout, TimeoutError } from 'rxjs';
import { AppError } from '../models/interfaces/app-error.interface';

const REQUEST_TIMEOUT_MS = 15000;
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    timeout(REQUEST_TIMEOUT_MS),
    catchError((error: unknown) => {
      const appError = toAppError(error);
      return throwError(() => appError);
    })
  );
};

function toAppError(error: unknown): AppError {
  if (error instanceof TimeoutError) {
    return {
      kind: 'timeout',
      status: 0,
      message: 'La solicitud tardó demasiado en responder. Intenta nuevamente.'
    };
  }

  if (error instanceof HttpErrorResponse) {
    // Sin conexión / error de red (status 0)
    if (error.status === 0) {
      return {
        kind: 'offline',
        status: 0,
        message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.'
      };
    }

    switch (error.status) {
      case 400:
      case 422:
        return {
          kind: 'validation',
          status: error.status,
          message: extractMessage(error) ?? 'Los datos enviados no son válidos.',
          fieldErrors: extractFieldErrors(error)
        };
      case 404:
        return {
          kind: 'not_found',
          status: 404,
          message: extractMessage(error) ?? 'El recurso solicitado no existe.'
        };
      case 409:
        return {
          kind: 'conflict',
          status: 409,
          message: extractMessage(error) ?? 'La operación entra en conflicto con el estado actual del recurso.'
        };
      default:
        if (error.status >= 500) {
          return {
            kind: 'server',
            status: error.status,
            message: 'Ocurrió un error en el servidor. Intenta de nuevo más tarde.'
          };
        }
        return {
          kind: 'unknown',
          status: error.status,
          message: extractMessage(error) ?? 'Ocurrió un error inesperado.'
        };
    }
  }

  return {
    kind: 'unknown',
    status: 0,
    message: 'Ocurrió un error inesperado.'
  };
}

function extractMessage(error: HttpErrorResponse): string | undefined {
  const body = error.error;
  if (typeof body === 'string') return body;
  if (body && typeof body === 'object' && 'message' in body) {
    return String((body as { message: unknown }).message);
  }
  return undefined;
}

function extractFieldErrors(error: HttpErrorResponse): Record<string, string> | undefined {
  const body = error.error;
  if (body && typeof body === 'object' && 'errors' in body) {
    return (body as { errors: Record<string, string> }).errors;
  }
  return undefined;
}
