const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesServices } = require('../../../src/services');
const { sales } = require('./mocks/salesMock');

describe('Testes de unidade do controller de vendas', () => {
  describe('Listando vendas', () => {
    it('lista todas as vendas', async () => {
      const req = {}
      const res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'findAll')
        .resolves({ type: null, message: sales });

      await salesController.listSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
    });

    it('lista uma venda específica recuperado pelo ID', async () => {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'findById')
        .resolves({ type: null, message: sales[0] });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales[0]);
    });

    it('retorna um erro caso não encontre a venda', async () => {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'findById')
        .resolves({ type: 'SALES_NOT_FOUND', message: 'Sale not found' });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    afterEach(sinon.restore);
  });

  describe('Deletando uma venda pelo ID', () => {
    it('verifica se ocorreu tudo certo ao deletar a venda', async () => {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'deleteSale')
        .resolves({ type: null, message: 'success' });

      await salesController.deleteSaleById(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('retorna um erro caso não encontre uma venda', async () => {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'deleteSale')
        .resolves({ type: 'SALES_NOT_FOUND', message: 'Sale not found' });

      await salesController.deleteSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    afterEach(sinon.restore);
  });
});