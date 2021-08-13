import {NextFunction, Request, Response} from 'express';

import Controller, {Methods} from '../core/Controller';

import FeatureService from '../services/FeatureService';

class FeatureController extends Controller {
  path = '/features';
  routes = [
    {
      path: '/',
      method: Methods.GET,
      handler: this.getFeatures,
      localMiddleware: [],
    },
  ];

  constructor() {
    super();
  }

  async getFeatures(req: Request, res: Response, next: NextFunction) {
    const features = await FeatureService.getFeatures();
    super.sendSuccess(res, {
      data: features,
      total: features.length,
    });
  }
}

export default FeatureController;
