interface ServerErrorOptions {
  message: string;
  status: number;
  data?: unknown;
}

export default class ServerError extends Error {
  status: number;
  data: unknown;

  constructor({ message, status, data }: ServerErrorOptions) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
