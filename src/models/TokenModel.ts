import {BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

export interface TokenModel extends Model {
  readonly id: string;
  readonly token: string;

  readonly createdAt: Date;
  readonly expireAt: Date;
  readonly usedAt: Date;
  readonly blockedAt: Date;
}

export type TokenModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TokenModel;
};

export function getToken(sequelize: Sequelize): TokenModelStatic {
  return <TokenModelStatic>sequelize.define(
    'Token',
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
      blockedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true,
    },
  );
}
