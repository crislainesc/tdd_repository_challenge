import Product from '../../domain/entity/product';
import ProductRepositoryInterface from '../../domain/repository/product-repository.interface';
import ProductModel from '../db/sequelize/model/product.model';

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      { name: entity.name, price: entity.price },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Product> {
    const productFound = await ProductModel.findOne({ where: { id: id } });
    return new Product(productFound.id, productFound.name, productFound.price);
  }

  async findAll(): Promise<Product[]> {
    const productsFound = await ProductModel.findAll();

    return productsFound.map((productFound) => {
      return new Product(
        productFound.id,
        productFound.name,
        productFound.price
      );
    });
  }
}
