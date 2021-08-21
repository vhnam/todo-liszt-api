import {BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

export interface ListModel extends Model {
  readonly id: string;
  readonly user: string;
  readonly name: string;
  readonly description: string;
  readonly startAt: Date;
  readonly endAt: Date;
  readonly color: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly blockedAt: Date;
}

export type ListModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ListModel;
};

export function getList(sequelize: Sequelize): ListModelStatic {
  return <ListModelStatic>sequelize.define(
    'List',
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
      freezeTableName: true,
    },
  );
}
