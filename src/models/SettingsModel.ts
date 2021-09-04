import {DataTypes, Model, Sequelize} from 'sequelize';

import sequelizeConnection from '../db';

class Settings extends Model {
  public id!: string;
  public user!: string;
  public language!: string;
  public timezone!: string;
  public weekStart!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Settings.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING,
    },
    timezone: {
      type: DataTypes.STRING,
    },
    weekStart: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  },
);

export default Settings;
