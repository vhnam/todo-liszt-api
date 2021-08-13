import db from '../models';
import {IPricing} from '../models/PricingModel';

class PricingService {
  public static async getAllPricing(): Promise<IPricing[]> {
    const pricing = await db.Pricing.findAll({
      order: [['order', 'ASC']],
      attributes: [
        'id', 'name', 'description', 'price', 'isDefault', 'order'
      ]
    });
    return pricing;
  }
}

export default PricingService;
