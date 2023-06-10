import Router from './Router';
import MetaTag from './components/SEO/MetaTag';
import GlobalStyle from './styles/GlobalStyle';
function App() {
  return (
    <>
      <MetaTag title="POPular" url="www.popular.com" />;
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
