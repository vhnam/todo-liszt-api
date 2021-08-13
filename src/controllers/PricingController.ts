import {NextFunction, Request, Response} from 'express';

import Controller, {Methods} from '../core/Controller';

import PricingService from '../services/PricingService';

class PricingController extends Controller {
  path = '/pricing';
  routes = [
    {
      path: '/',
      method: Methods.GET,
      handler: this.getAllPricing,
      localMiddleware: [],
    },
  ];

  constructor() {
    super();
  }

  async getAllPricing(req: Request, res: Response, next: NextFunction) {
    const pricing = await PricingService.getAllPricing();
    super.sendSuccess(res, {
      data: pricing,
      total: pricing.length,
    });
  }
}

export default PricingController;
