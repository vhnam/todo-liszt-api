import {BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

export interface IPricing extends Model {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly isDefault: boolean;
  readonly order: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type PricingModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IPricing;
};

export function getPricing(sequelize: Sequelize): PricingModelStatic {
  return <PricingModelStatic>sequelize.define(
    'Pricing',
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
      price: {
        type: DataTypes.FLOAT,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
