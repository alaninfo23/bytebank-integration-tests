import api from './api';
import { buscaTransacoes, salvaTransacao } from './transacoes';
import { buscaSaldo } from './saldo';

beforeEach(() => {
    api.get.mockClear();
  });

//mockando a API
jest.mock('./api');

//Mock de retorno(o que a API vai devolver)
const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósitos',
    valor: 100,
    data: '22/11/2022',
    mes: 'Novembro',
  },
];

//Função que simula o retorno da API
const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno,
      });
    }, 200);
  });
};

const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

const mockRequisicaoPost = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 201,
        });
      }, 200);
    });
  };

  const mockRequisicaoPostErro = () => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject();
      }, 200);
    });
  };

describe('Requisicoes para API', () => {
  test('Deve retornar uma lista de transacoes', async () => {
    //mockando a API e chamando a função com retorno da API
    api.get.mockImplementation(() => mockRequisicao(mockTransacao));
    //variavel que armazena o retorno da função
    const transacoes = await buscaTransacoes();
    //espero que o retorno da função seja igual ao retorno da API Mockada.
    expect(transacoes).toEqual(mockTransacao);
    //verificando se a função está sendo chamada com algum parâmetro
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  test('Deve retornar uma lista vazia quando a requisição falhar', async () => {
    //mockando a API e chamando a função de erro com retorno da API
    api.get.mockImplementation(() => mockRequisicaoErro());
    //variavel que armazena o retorno da função
    const transacoes = await buscaTransacoes();
    //espero que o retorno da função seja igual uma lista vazia
    expect(transacoes).toEqual([]);
    //verificando se a função está sendo chamada com algum parâmetro
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  const mockSaldo = {
    valor: 50,
  };
  test('Deve retornar o saldo atual', async () => {

    api.get.mockImplementation(() => mockRequisicao(mockSaldo));
    const saldo = await buscaSaldo();

    expect(saldo).toEqual(mockSaldo.valor);
    expect(api.get).toHaveBeenCalledWith('/saldo');
    expect(api.get).toHaveBeenCalledTimes(1);
  });
  test('Deve retornar o saldo de 1000', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());
    const saldo = await buscaSaldo();

    expect(saldo).toEqual(1000);
    expect(api.get).toHaveBeenCalledWith('/saldo');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um status 201 - (Created) após uma requisição POST', async () => {
    api.post.mockImplementation(() => mockRequisicaoPost());
    const status = await salvaTransacao(mockTransacao[0]);
    expect(status).toBe(201);
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
  });

});
