import {DataTypes, Model, Sequelize} from 'sequelize';

import sequelizeConnection from '../db';

class Token extends Model {
  public id!: string;
  public token!: string;

  public readonly createdAt!: Date;
  public readonly expireAt!: Date;
  public readonly usedAt!: Date;
  public readonly deletedAt!: Date;
}

Token.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    usedAt: {
      type: DataTypes.DATE,
    },
    expireAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  },
);

export default Token;
