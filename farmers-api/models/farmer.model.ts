import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export type FarmerAttributes = {
  companyName: string;
  tradingName: string;
  identification: string;
  city: string;
  state: string;
  phoneNumber: string | null;
};

export class Farmer extends Model<InferAttributes<Farmer>, InferCreationAttributes<Farmer>> {
  declare id: CreationOptional<number>;
  declare companyName: string;
  declare tradingName: string;
  declare identification: string;
  declare city: string;
  declare state: string;
  declare phoneNumber: string | null;
}

export const farmerModel = (sequelize: Sequelize) =>
  Farmer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      companyName: { type: DataTypes.STRING, allowNull: false },
      tradingName: { type: DataTypes.STRING, allowNull: false },
      identification: { type: DataTypes.STRING(15), allowNull: false },
      city: { type: DataTypes.STRING(50), allowNull: false },
      state: { type: DataTypes.STRING(50), allowNull: false },
      phoneNumber: { type: DataTypes.STRING(20) },
    },
    {
      tableName: 'farmers',
      sequelize,
    }
  );

export const farmerRequiredFields: Array<keyof Farmer> = [
  'companyName',
  'tradingName',
  'identification',
  'city',
  'state',
];
