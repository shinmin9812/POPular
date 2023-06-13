import { useState } from 'react';
import Router from './Router';
import GlobalStyle from './styles/GlobalStyle';
import Modal from './components/common/Modal/Modal';

function App() {
  return (
    <div className="app">
      <GlobalStyle />
      <Router />
      {/* {isOpen && (
        <Modal
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <></>
        </Modal>
      )} */}
    </div>
  );
}

export default App;
