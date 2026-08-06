export type AppErrorKind =
    | 'validation'
    | 'not_found'
    | 'conflict'
    | 'server'
    | 'timeout'
    | 'offline'
    | 'unknown';