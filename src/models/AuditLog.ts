import {DataTypes, Model, Sequelize} from 'sequelize';

import sequelizeConnection from '../db';

class AuditLog extends Model {
  public id!: string;
  public actionBy!: string;
  public module!: string;
  public data!: object;
  public requestMethod!: string;
  public requestUrl!: string;

  public readonly createdAt!: Date;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    actionBy: {
      type: DataTypes.STRING,
    },
    module: {
      type: DataTypes.STRING,
    },
    requestMethod: {
      type: DataTypes.STRING,
    },
    requestUrl: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.JSON,
    },
    createdAt: {
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

export default AuditLog;
