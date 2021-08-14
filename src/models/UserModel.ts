import {BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

export interface UserModel extends Model {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly avatar: string;
  readonly role: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly blockedAt: Date;
}

export type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export function getUser(sequelize: Sequelize): UserModelStatic {
  return <UserModelStatic>sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.TEXT,
      },
      role: {
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
