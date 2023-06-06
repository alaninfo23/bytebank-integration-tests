import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from './App'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../../routes";

describe('Componente <App/>', () => {
    test('Deve permitir adicionar uma transação em Extrato', () => {
        render(<App/>, {wrapper: BrowserRouter});

        const select = screen.getByRole('combobox');
        const campoValor = screen.getByPlaceholderText('Digite um valor');
        const botaoAdicionar = screen.getByRole('button');

        userEvent.selectOptions(select, 'Depósito');
        userEvent.type(campoValor, '100');
        userEvent.click(botaoAdicionar);

        const novaTransacao = screen.getByTestId('lista-transacoes');
        const itemExtrato = screen.getByRole('listitem');

        expect(novaTransacao).toContainElement(itemExtrato);
    });

    test('Deve navegar até a página correspondente ao link clicado', async () => {
        render(<AppRoutes />, {wrapper: BrowserRouter});

        const linkPaginaCartoes = screen.getByText('Cartões');
        expect(linkPaginaCartoes).toBeInTheDocument();

        userEvent.click(linkPaginaCartoes);

        /* Usamos o findByText porque nesse teste navegamos até a pagina correspondente
        ao link e isso pode demorar alguns segundos para ser carregado, é um processo 
        assyncrono por isso usamos o async e o await */
        const tituloPaginaCartoes = await screen.findByText('Meus cartões');
        expect(tituloPaginaCartoes).toBeInTheDocument();

    });

    test('Deve navegar até a página correspondente ao link clicado', async () => {
        render(<AppRoutes />, {wrapper: BrowserRouter});

        const linkPaginaInvestimentos = screen.getByText('Investimentos');
        expect(linkPaginaInvestimentos).toBeInTheDocument();

        userEvent.click(linkPaginaInvestimentos);

        /* Usamos o findByText porque nesse teste navegamos até a pagina correspondente
        ao link e isso pode demorar alguns segundos para ser carregado, é um processo 
        assyncrono por isso usamos o async e o await */
        const tituloPaginaInvestimentos = await screen.findByText('Renda variável');
        expect(tituloPaginaInvestimentos).toBeInTheDocument();

    });


});
