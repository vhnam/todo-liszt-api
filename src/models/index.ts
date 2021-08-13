import {Sequelize} from 'sequelize';

import {DATABASE_URL} from '../config';
import Seeder from '../seeders';

import {FeatureModelStatic, getFeature, IFeature} from './FeatureModel';
import {getPricing, IPricing, PricingModelStatic} from './PricingModel';

interface IDatabase {
  sequelize: Sequelize;
  Feature: FeatureModelStatic;
  Pricing: PricingModelStatic;
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

const Feature = getFeature(sequelize);
const Pricing = getPricing(sequelize);

const db: IDatabase = {
  sequelize,
  Feature,
  Pricing,
};

db.sequelize
  .sync({force: true})
  .then(() => {
    console.log('Database & tables synced');
  })
  .then(async () => {
    await Seeder.run();
  })
  .catch((err) => {
    console.error(err);
  });

export default db;
export type FeatureModel = IFeature;
export type PricingModel = IPricing;
