import {BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

export interface IFeature extends Model {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly icon: string;
  readonly order: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type FeatureModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IFeature;
};

export function getFeature(sequelize: Sequelize): FeatureModelStatic {
  return <FeatureModelStatic>sequelize.define(
    'Feature',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      icon: {
        type: DataTypes.STRING,
      },
      order: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
    },
  );
}
