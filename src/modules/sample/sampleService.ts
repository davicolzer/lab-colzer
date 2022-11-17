import { DefaultError } from '../../shared/errors';
import { EResult, ISample } from '../../shared/infra/models/sample.model';
import { IRepository } from '../../shared/infra/repository/index.d';
import { sampleReport } from '../../utils/sampleReport';
import { CreateSampleValidator, ICreateSample } from './types/dtos';
import { ISampleService } from './types/funtions';

export function SampleService(
  repository: IRepository<ISample>
): ISampleService {
  async function createOne(data: ICreateSample) {
    const parsed = await CreateSampleValidator.safeParseAsync(data);
    if (!parsed.success) {
      throw new DefaultError({
        code: 400,
        message: 'Dados Incorretos',
        zodFields: parsed.error.issues,
      });
    }

    const foundSample = await repository.findOne({
      codigo_amostra: data.codigo_amostra,
    });

    if (foundSample) {
      throw new DefaultError({
        code: 400,
        message: 'Amostra já existente',
      });
    }

    const newData = sampleReport(data);

    const createdSample = await repository.createOne(newData);

    return createdSample;
  }

  async function findOne(sample: string) {
    const createdSample = await repository.findOne({ codigo_amostra: sample });

    if (!createdSample) {
      throw new DefaultError({
        code: 404,
        message: 'Amostra não encontrada',
      });
    }

    const { codigo_amostra, resultado } = createdSample;
    return {
      codigo_amostra,
      resultado,
    };
  }
  async function findAll() {
    const allSample = await repository.findAll();

    return allSample;
  }

  return {
    createOne,
    findOne,
    findAll,
  };
}
