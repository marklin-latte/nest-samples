import { transports, format } from 'winston';

export default () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      format: format.combine(
        format.timestamp(),
        format.printf((info) => {
          return `[ ${info.timestamp} ] [ ${info.level} ] : ${info.message}`;
        }),
      ),
      transports: [
        new transports.File({
          filename: `${process.cwd()}/logs/error.log`,
          level: 'error',
        }),
        new transports.File({
          filename: `${process.cwd()}/logs/info.log`,
          level: 'info',
          tailable: true,
        }),
      ],
    };
  }

  return {
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      format.printf((info) => {
        return `[ ${info.timestamp} ] [ ${info.level} ] : ${info.message}`;
      }),
    ),
    transports: [new transports.Console()],
  };
};
