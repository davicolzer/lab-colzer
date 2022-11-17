import { ZodIssue } from 'zod';

export type IDefaultError = {
  code: number;
  message: string;
  zodFields?: ZodIssue[];
};

const teste: IDefaultError = {
  code: 400,
  message: "string",
  zodFields: []
}

const bolado: string = "";

export class DefaultError extends Error {
  code: number;
  error: string;
  fields?: { field: string | number; message: string }[];

  constructor({ code, message, zodFields }: IDefaultError) {
    super(message);
    this.error = message;
    this.code = code;

    if (zodFields) {
      this.fields = zodFields.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));
    }
  }
}
