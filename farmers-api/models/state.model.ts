import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class State extends Model<InferAttributes<State>, InferCreationAttributes<State>> {
  declare id: CreationOptional<number>;
  declare code: string;
  declare name: string;
}

export const stateModel = (sequelize: Sequelize) =>
  State.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      code: { type: DataTypes.CHAR(2), allowNull: false, unique: true },
      name: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    },
    {
      tableName: 'state',
      timestamps: false,
      sequelize,
    }
  );

export interface UnpersistedState extends Pick<State, 'code' | 'name'> {}
