const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/database/connection');
const { salesModels } = require('../../../src/models');
const { salesMock } = require('./mocks/salesMocks');

describe('Testes de unidade do model de vendas', () => {
  /* describe('Lista todas as vendas', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([sales]);
    });

    it('com o tipo array', async () => {
      const sales = await salesModels.findAll();

      expect(sales).to.be.a('array');
    });

    it('com sucesso', async () => {
      const sales = await salesModels.findAll();

      expect(sales).to.deep.equal(sales);
    });

    afterEach(sinon.restore);
  }); */
});