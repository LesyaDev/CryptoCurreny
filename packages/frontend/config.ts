import process from 'process';

const _port = process.env.SERVICE_PORT || 'http://127.0.0.1:8083';

export function getPort(): string{
    return _port;
}
