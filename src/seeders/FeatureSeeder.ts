import db from '../models';

const features: any[] = [
  {
    name: 'Security Management',
    description:
      'It is a long established fact that a reader will distracted by the readable content',
    icon: 'lock',
    createdAt: new Date(),
  },
  {
    name: 'Digital Agency',
    description:
      'It is a long established fact that a reader will distracted by the readable content',
    icon: 'flame',
    createdAt: new Date(),
  },
  {
    name: 'API Reference',
    description:
      'It is a long established fact that a reader will distracted by the readable content',
    icon: 'puzzle',
    createdAt: new Date(),
  },
  {
    name: 'Team Accounts',
    description:
      'It is a long established fact that a reader will distracted by the readable content',
    icon: 'team',
    createdAt: new Date(),
  },
  {
    name: 'User Administration',
    description:
      'It is a long established fact that a reader will distracted by the readable content',
    icon: 'user',
    createdAt: new Date(),
  },
  {
    name: 'Email Marketing',
    description:
      'It is a long established fact that a reader will distracted by the readable content',
    icon: 'email',
    createdAt: new Date(),
  },
];

class FeatureSeeder {
  public static async run() {
    try {
      for (let index = 0; index < features.length; index++) {
        await db.Feature.create({
          ...features[index],
          order: index,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default FeatureSeeder;
