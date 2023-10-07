import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class Farmer extends Model<InferAttributes<Farmer>, InferCreationAttributes<Farmer>> {
  declare id: CreationOptional<number>;
  declare companyName: string;
  declare tradingName: string;
  declare personIdentification: string;
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
      personIdentification: { type: DataTypes.STRING(15), allowNull: false },
      city: { type: DataTypes.STRING(50), allowNull: false },
      state: { type: DataTypes.STRING(50), allowNull: false },
      phoneNumber: { type: DataTypes.STRING(20) },
    },
    {
      tableName: 'farmer',
      sequelize,
    }
  );

export interface UnpersistedFarmer
  extends Pick<
    Farmer,
    'companyName' | 'tradingName' | 'personIdentification' | 'city' | 'state' | 'phoneNumber'
  > {}
