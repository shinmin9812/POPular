import Router from './Router';
import MetaTag from './components/SEO/MetaTag';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <div className="app">
      <MetaTag title="POPULAR" url="www.popular.com" />
      <GlobalStyle />
      <Router />
    </div>
  );
}

export default App;
