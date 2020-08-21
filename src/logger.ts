import winston from 'winston';
const { combine, timestamp, simple, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp: stamp }) => {
    return `[${stamp}] ${level}: ${message}`;
});

const l = winston.createLogger({
    format: combine(
        timestamp(),
        simple(),
        logFormat
    ),
    transports: [
        new winston.transports.Console()
    ]
});

if (process.env.NODE_ENV !== 'production') {
    l.format = combine(
        colorize(),
        timestamp(),
        simple(),
        logFormat
    );
}

export default l;
