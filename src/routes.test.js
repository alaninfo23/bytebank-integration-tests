import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './paginas/Principal/App';
import Cartoes from './componentes/Cartoes';
import AppRoutes from './routes';

describe('Rotas', () => {
  test('Deve renderizar a rota princiapl', () => {
    render(<App />, { wrapper: BrowserRouter }); //para renderizar a rota principal

    const usuario = screen.getByText('Olá, Joana :)!');
    expect(usuario).toBeInTheDocument();
  });

  test('Deve renderizar a rota cartões', () => {
    /*      criando a estrutura de rotas com MemoryRouter, Routes e Route e definindo
        uma props para acessar a rota cartões */

    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const meusCartoes = screen.getByText('Meus cartões');
    expect(meusCartoes).toHaveTextContent('Meus cartões');
  });

  test('Deve renderizar a localização da rota atual', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <App />
      </MemoryRouter>
    );

    /*
       foi criado um noscript com datatest id dentro do return do app:
        <noscript data-testid="local">{location.pathname}</noscript>
        com isso conseguimos visualizar a rota atual pelo inspect element do navegador 
        */
    const localizacaoAtual = screen.getByTestId('local');
    expect(localizacaoAtual).toHaveTextContent('/cartoes');
  });

  test('Deve renderizar a página 404', () => {
    const rota = '/extrato';

    render(
      <MemoryRouter initialEntries={[rota]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const paginaError = screen.getByTestId('pagina-404');
    expect(paginaError).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
  });
});
