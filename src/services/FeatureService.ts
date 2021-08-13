import db from '../models';
import {IFeature} from '../models/FeatureModel';

class FeatureService {
  public static async getFeatures(): Promise<IFeature[]> {
    const features = await db.Feature.findAll({
      order: [['order', 'ASC']],
      attributes: [
        'id', 'name', 'description', 'icon', 'order'
      ]
    });
    return features;
  }
}

export default FeatureService;
