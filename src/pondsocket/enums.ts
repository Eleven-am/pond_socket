export enum ServerActions {
    ERROR = 'ERROR', MESSAGE = 'MESSAGE', PRESENCE = 'PRESENCE', CLOSE = 'CLOSE',
}

export enum ClientActions {
    JOIN_CHANNEL = 'JOIN_CHANNEL',
    LEAVE_CHANNEL = 'LEAVE_CHANNEL',
    UPDATE_PRESENCE = 'UPDATE_PRESENCE',
    BROADCAST_FROM = 'BROADCAST_FROM',
    BROADCAST = 'BROADCAST',
    SEND_MESSAGE_TO_USER = 'SEND_MESSAGE_TO_USER'
}

export enum PondSenders {
    SERVER = 'SERVER', ENDPOINT = 'ENDPOINT', POND_CHANNEL = 'POND_CHANNEL',
}
