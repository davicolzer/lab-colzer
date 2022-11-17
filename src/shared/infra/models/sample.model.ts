import { model, Schema } from 'mongoose';

export enum EResult {
  positivo = 'positivo',
  negativo = 'negativo',
}

export type ISample = {
  codigo_amostra: string;
  cocaina: number;
  anfetamina: number;
  metanfetamina: number;
  mda: number;
  mdma: number;
  thc: number;
  morfina: number;
  codeina: number;
  heroina: number;
  benzoilecgonina: number;
  cocaetileno: number;
  norcocaina: number;
  resultado: EResult;
};

const SampleSchema = new Schema<ISample>({
  codigo_amostra: String,
  cocaina: Number,
  anfetamina: Number,
  metanfetamina: Number,
  mda: Number,
  mdma: Number,
  thc: Number,
  morfina: Number,
  codeina: Number,
  heroina: Number,
  benzoilecgonina: Number,
  cocaetileno: Number,
  norcocaina: Number,
  resultado: String,
});

export const Sample = model('Sample', SampleSchema);
