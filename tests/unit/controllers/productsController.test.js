const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { product, newProduct, productAltered } = require('./mocks/productsMocks');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('Testes de unidade do controller de produtos', () => {
  describe('Listando produtos', () => {
    it('lista todos os produtos', async () => {
      const req = {}
      const res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findAll')
        .resolves({ type: null, message: product });

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(product);
    });

    it('lista um produto específico recuperado pelo ID', async () => {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findById')
        .resolves({ type: null, message: product[0] });

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(product[0]);
    });

    it('retorna um erro caso não encontre o produto', async () => {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    afterEach(sinon.restore);
  });

  describe('Cadastrando um novo produto', () => {
    it('retorna o produto cadastrado', async () => {
      const req = { body: { name: 'ProdutoX' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createNewProduct')
        .resolves({ type: null, message: newProduct });
      
      await productsController.createNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
  });

  describe('Atualizando um produto pelo ID', () => {
    it('retorna o produto atualizado', async () => {
      const req = { params: { id: 1 }, body: { name: 'ProdutoX' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProductById')
        .resolves({ type: null, message: productAltered });

      await productsController.updateProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productAltered);
    });
  });

  describe('Lista os produtos pela propriedade name', () => {
    it('retorna os produto recuperados', async () => {
      const req = { query: 'Martelo' };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductByName')
        .resolves({ type: null, message: product[0] });

      await productsController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(product[0]);
    });
  });

  describe('Deletando um produto pelo ID', () => {
    it('verifica se ocorreu tudo certo ao deletar o produto', async () => {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'deleteProduct')
        .resolves({ type: null, message: 'success' });

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('retorna um erro caso não encontre um produto', async () => {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'deleteProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    afterEach(sinon.restore);
  });
});