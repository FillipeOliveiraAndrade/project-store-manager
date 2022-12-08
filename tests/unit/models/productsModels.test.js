const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/database/connection');
const { productsModel } = require('../../../src/models');
const { products } = require('./mocks/productsMocks');

describe('Testes de unidade do model de produtos', () => {
  describe('Lista todos os produtos', () => { 
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([products]);
    });

    it('com o tipo array', async () => {
      const products = await productsModel.findAll();

      expect(products).to.be.a('array');
    });

    it('com sucesso', async () => {
      const products = await productsModel.findAll();

      expect(products).to.deep.equal(products);
    });

    afterEach(sinon.restore);
  });

  describe('Listando um produto específico recuperado pelo ID', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([[products[0]]]);
    });

    it('com o tipo objeto', async () => {
      const product = await productsModel.findById(1);

      expect(product).to.be.a('object');
    });

    it('com sucesso', async () => {
      const product = await productsModel.findById(1);

      expect(product).to.be.deep.equal(products[0]);
    });

    afterEach(sinon.restore);
  });

  describe('Cadastrando um novo produto', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    });

    it('retorna o insertId do produto cadastrado', async () => {
      const result = await productsModel.createNewProduct('Olávio');
      expect(result).to.be.equal(4);
    });

    afterEach(sinon.restore);
  });
});