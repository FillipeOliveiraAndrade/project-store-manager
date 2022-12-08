const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { product } = require('./mocks/productsMocks');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('Testes de unidade do controller de produtos', () => {
  describe('Lista todas os produtos', () => {
    it('listando produtos', async () => {
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
  });
});