import { ICreateSample } from '../modules/sample/types/dtos';
import { EResult, ISample } from '../shared/infra/models/sample.model';

type IValidator = Omit<
  ICreateSample,
  'codigo_amostra' | 'benzoilecgonina' | 'norcocaina' | 'cocaetileno'
>;

type validatorKeys = keyof IValidator;

const validator: IValidator = {
  cocaina: 0.5,
  anfetamina: 0.2,
  metanfetamina: 0.2,
  mda: 0.2,
  mdma: 0.2,
  thc: 0.05,
  morfina: 0.2,
  codeina: 0.2,
  heroina: 0.2,
};

const cocainaValidator = {
  benzoilecgonina: 0.05,
  cocaetileno: 0.05,
  norcocaina: 0.05,
};

export function sampleReport(data: ICreateSample): ISample {
  let isPositive = false;

  const cocainaIsHigh = validator.cocaina < data.cocaina;

  if (cocainaIsHigh) {
    isPositive =
      cocainaValidator.benzoilecgonina <= data.benzoilecgonina ||
      cocainaValidator.cocaetileno <= data.cocaetileno ||
      cocainaValidator.norcocaina <= data.norcocaina;
  }

  const entriesValidator = Object.entries(validator) as [
    validatorKeys,
    number
  ][];

  if (!isPositive) {
    for (const [key, value] of entriesValidator) {
      isPositive = value < data[key];
    }
  }

  const newData: ISample = {
    ...data,
    resultado: isPositive ? EResult.positivo : EResult.negativo,
  };
  return newData;
}
