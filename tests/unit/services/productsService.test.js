const { expect } = require('chai');
const sinon = require('sinon');

const { products, newProduct } = require('./mocks/productsMocks');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

describe('Testes de unidade do service de produtos', () => {
  describe('Lista todas os produtos', () => {
    it('retorna a lista completa de produtos', async () => {
      sinon.stub(productsModel, 'findAll').resolves(products);
      const result = await productsService.findAll();

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal(products);
    });

    afterEach(sinon.restore);
  });

  describe('Listando um produto específico recuperado pelo ID', () => {
    beforeEach(() => {
      sinon.stub(productsModel, 'findAll').resolves(products);
    });

    it('retorna o produto solicitado', async () => {
      const result = await productsService.findById(1);

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal(products[0]);
    });

    it('retorna um erro caso não exista um produto', async () => {
      const result = await productsService.findById(999);

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });

    afterEach(sinon.restore);
  });

  describe('Cadastrando um novo produto', () => {
    beforeEach(() => {
      sinon.stub(productsModel, 'findById').resolves(newProduct);
    });

    it('retorna o produto cadastrado', async () => {
      const result = await productsService.createNewProduct('ProdutoX');

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal({ id: 4, name: 'ProdutoX' });
    });

    afterEach(sinon.restore);
  });
});