import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('ProductController', () => {
  let app: INestApplication;
  const productService = {
    updateProduct: jest.fn().mockImplementation((id, update) => ({
      ...update,
      id,
    })),
    validateProduct: jest.fn().mockResolvedValue(true),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: productService }],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('/PUT api/inventory/product/:productId should update the product successfully', async () => {
    const productId = new Types.ObjectId().toString();
    const updatedFields = { name: 'Updated Product', price: 100 };

    const response = await request(app.getHttpServer())
      .put(`/api/inventory/product/${productId}`)
      .send(updatedFields)
      .expect(200);

    expect(response.body).toEqual({
      ...updatedFields,
      id: productId,
    });

    const objectId = new Types.ObjectId(productId); // Convert to ObjectId for comparison

    expect(productService.updateProduct).toHaveBeenCalledWith(objectId, updatedFields);
  });

  it('/PUT api/inventory/product/:productId should return an error if product update fails', async () => {
    const productId = new Types.ObjectId().toString();
    const updatedFields = { name: 'Updated Product', price: 100 };
    productService.updateProduct.mockRejectedValueOnce(
      new NotFoundException('Product not found'),
    );

    const response = await request(app.getHttpServer())
      .put(`/api/inventory/product/${productId}`)
      .send(updatedFields)
      .expect(404);

    expect(response.body).toEqual({
      statusCode: 404,
      message: 'Product not found',
      error: 'Not Found',
    });

    const objectId = new Types.ObjectId(productId); // Convert to ObjectId for comparison

    expect(productService.updateProduct).toHaveBeenCalledWith(objectId, updatedFields);
  });

  afterAll(async () => {
    await app.close();
  });
});
