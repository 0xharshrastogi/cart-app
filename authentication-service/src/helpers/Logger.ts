import debug, { Debugger } from 'debug';

export class DebugLogger {
  private constructor(private readonly logger: Debugger) {}

  log(formatter: unknown, ...args: unknown[]) {
    this.logger(formatter, ...args);
  }

  static create(logFor: string): DebugLogger {
    return new DebugLogger(debug(logFor));
  }
}
