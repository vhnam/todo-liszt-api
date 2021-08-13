import db from '../models';

const pricing: any[] = [
  {
    name: 'Starter',
    price: 0,
    description:
      '1 Non-Commercial Site\n100 GB System Storage\nSingleton Branding',
    isDefault: false,
    createdAt: new Date(),
  },
  {
    name: 'Singleton Plus',
    price: 39,
    description:
      '10 Non-Commercial Site\n500 GB System Storage\nCustom Branding',
    isDefault: true,
    createdAt: new Date(),
  },
  {
    name: 'Starter',
    price: 99,
    description: '30 Non-Commercial Site\n1 TB System Storage\nCustom Branding',
    isDefault: false,
    createdAt: new Date(),
  },
];

class PricingSeeder {
  public static async run() {
    try {
      for (let index = 0; index < pricing.length; index++) {
        await db.Pricing.create({
          ...pricing[index],
          order: index,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default PricingSeeder;
