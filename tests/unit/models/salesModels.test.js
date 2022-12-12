const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/database/connection');
const { salesModels } = require('../../../src/models');
const { salesMock, salesDeleted } = require('./mocks/salesMocks');

describe('Testes de unidade do model de vendas', () => {
  describe('Lista todas as vendas', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([salesMock]);
    });

    it('com o tipo array', async () => {
      const sales = await salesModels.findAll();

      expect(sales).to.be.a('array');
    });

    it('com sucesso', async () => {
      const sales = await salesModels.findAll();

      expect(sales).to.deep.equal(salesMock);
    });

    afterEach(sinon.restore);
  });

  describe('Listando uma venda específica recuperado pelo ID', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([salesMock[0]]);
    });

    it('com o tipo objeto', async () => {
      const sales = await salesModels.findById(1);

      expect(sales).to.be.a('object');
    });

    it('com sucesso', async () => {
      const sales = await salesModels.findById(1);

      expect(sales).to.be.deep.equal(salesMock[0]);
    });

    afterEach(sinon.restore);
  });

  describe('Deletando uma venda pelo ID', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(salesDeleted);
    });

    it('validando se ocorreu tudo certo com a exclusão do Dado', async () => {
      const saleId = 1;

      const [result] = await salesModels.deleteSale(saleId);

      expect(result.affectedRows).to.be.deep.equal(1);
    });

    afterEach(sinon.restore);
  });
});