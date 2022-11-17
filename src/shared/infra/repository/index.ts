import { Model, FilterQuery } from 'mongoose';
import { DefaultError } from '../../errors';
import { IRepository } from './index.d';

export function Repository<IData>(model: Model<IData>): IRepository<IData> {
  async function createOne(data: IData): Promise<{ _id: string } & IData> {
    try {
      const item = await model.create(data);
      await item.save();

      const foundItem: { _id: string } & IData = await model
        .findOne({ _id: item._id })
        .lean();

      return foundItem;
    } catch (e) {
      console.log('Mongoose', e);
      throw new DefaultError({ code: 500, message: JSON.stringify(e) });
    }
  }

  async function findOne(
    data: FilterQuery<IData>
  ): Promise<{ _id: string } & IData> {
    try {
      const foundItem: { _id: string } & IData = await model
        .findOne(data)
        .lean();

      return foundItem;
    } catch (e) {
      console.log('Mongoose', e);
      throw new DefaultError({ code: 500, message: JSON.stringify(e) });
    }
  }

  async function findAll(): Promise<({ _id: string } & IData)[]> {
    try {
      const foundItem: ({ _id: string } & IData)[] = await model
        .find({})
        .lean();

      return foundItem;
    } catch (e) {
      console.log('Mongoose', e);
      throw new DefaultError({ code: 500, message: JSON.stringify(e) });
    }
  }
  return {
    createOne,
    findOne,
    findAll,
  };
}
