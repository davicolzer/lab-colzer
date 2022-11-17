import { z } from 'zod';
import { ISample } from '../../../shared/infra/models/sample.model';

const IResultado = ["positivo", "negativo"] as const
export const CreateSampleValidator = z.object({
  codigo_amostra: z.string().max(8, "Número de amostra incorreta"),
  cocaina: z.number(),
  anfetamina: z.number(),
  metanfetamina: z.number(),
  mda: z.number(),
  mdma: z.number(),
  thc: z.number(),
  morfina: z.number(),
  codeina: z.number(),
  heroina: z.number(),
  benzoilecgonina: z.number(),
  cocaetileno: z.number(),
  norcocaina: z.number(),
});

export type ICreateSample = z.infer<typeof CreateSampleValidator>;

export type ISampleResponse = { _id: string } & ISample;
