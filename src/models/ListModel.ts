import {DataTypes, Model, Sequelize} from 'sequelize';

import sequelizeConnection from '../db';

class List extends Model {
  public id!: string;
  public user!: string;
  public name!: string;
  public description!: string;
  public startAt!: Date;
  public endAt!: Date;
  public color!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly blockedAt!: Date;
}

List.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    startAt: {
      type: DataTypes.DATE,
    },
    endAt: {
      type: DataTypes.DATE,
    },
    color: {
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
    blockedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  },
);

export default List;
