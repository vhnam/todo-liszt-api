import {BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

export interface SettingsModel extends Model {
  readonly id: string;
  readonly user: string;
  readonly language: string;
  readonly timezone: string;
  readonly weekStart: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type SettingsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SettingsModel;
};

export function getSettings(sequelize: Sequelize): SettingsModelStatic {
  return <SettingsModelStatic>sequelize.define(
    'Settings',
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
      freezeTableName: true,
    },
  );
}
