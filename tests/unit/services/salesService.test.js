const { expect } = require('chai');
const sinon = require('sinon');

const { salesModels } = require('../../../src/models');
const { salesServices } = require('../../../src/services');
const { sales } = require('./mocks/salesMock');

describe('Testes de unidade do service de vendas', () => {
  describe('Lista todas as vendas', () => {
    it('retorna a lista completa de vendas', async () => {
      sinon.stub(salesModels, 'findAll').resolves(sales);

      const result = await salesServices.findAll();

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal(sales);
    });

    afterEach(sinon.restore);
  });

  describe('Listando uma venda específica recuperado pelo ID', () => {
    it('retorna a venda solicitada', async () => {
      sinon.stub(salesModels, 'findById').resolves(sales[0]);
      const result = await salesServices.findById(1);

      expect(result.type).to.be.null;
      expect(result.message).to.deep.equal(sales[0]);
    });

    it('retorna um erro caso não encontre a venda', async () => {
      sinon.stub(salesModels, 'findById').resolves([]);
      const result = await salesServices.findById(1);

      expect(result.type).to.be.equal('SALES_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });

    afterEach(sinon.restore);
  });

  describe('Deletando uma venda existente', () => {
    beforeEach(() => {
      sinon.stub(salesModels, 'findById').resolves(sales[0]);
    });

    it('retorna uma mensagem "success" caso ocorra tudo certo', async () => {
      const result = await salesServices.deleteSale(1);

      expect(result.type).to.be.null;
      expect(result.message).to.be.equal('success');
    });

    afterEach(sinon.restore);
  });
});