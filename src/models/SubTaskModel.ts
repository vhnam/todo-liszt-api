import {BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

export interface SubTaskModel extends Model {
  readonly id: string;
  readonly listID: string;
  readonly name: string;
  readonly description: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly blockedAt: Date;
}

export type SubTaskModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SubTaskModel;
};

export function getSubTask(sequelize: Sequelize): SubTaskModelStatic {
  return <SubTaskModelStatic>sequelize.define(
    'SubTask',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      listID: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
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
