const { expect } = require('chai');
const sinon = require('sinon');

const { products, newProduct } = require('./mocks/productsMocks');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

describe('Testes de unidade do service de produtos', () => {
  describe('Lista todos os produtos', () => {
    it('retorna a lista completa de produtos', async () => {
      sinon.stub(productsModel, 'findAll').resolves(products);
      const result = await productsService.findAll();

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal(products);
    });

    afterEach(sinon.restore);
  });

  describe('Listando um produto específico recuperado pelo ID', () => {
    it('retorna o produto solicitado', async () => {
      sinon.stub(productsModel, 'findById').resolves(products[0]);
      const result = await productsService.findById(1);

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal(products[0]);
    });

    it('retorna um erro caso não encontre o produto', async () => {
      sinon.stub(productsModel, 'findById').resolves(undefined);
      const result = await productsService.findById(1);

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
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

  describe('Atualizando um novo produto', () => {
    it('retorna o produto atualizado', async () => {
      const name = 'Olávio';
      const productId = 4;

      const result = await productsService.updateProductById(name, productId);

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal({ id: 4, name: 'Olávio' });
    });
  });

  describe('Deletando um produto existente', () => {
    beforeEach(() => {
      sinon.stub(productsModel, 'findById').resolves(products[0]);
    });

    it('retorna uma mensagem "success" caso ocorra tudo certo', async () => {
      const result = await productsService.deleteProduct(1);

      expect(result.type).to.be.null;
      expect(result.message).to.be.equal('success');
    });

    afterEach(sinon.restore);
  });

  describe('Lista produtos recuperado pelo name', () => {
    it('retorna o produto encontrado pelo name', async () => {
      sinon.stub(productsModel, 'findAll').resolves(products);
      const name = 'Martelo';

      const result = await productsService.getProductByName(name);

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal([products[0]]);
    });
  });
});