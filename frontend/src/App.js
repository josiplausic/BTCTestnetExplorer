import './App.css';
import React from 'react';
import HomePage from './HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlockInfo from './BlockInfo';
import TransactionInfo from './TransactionInfo'

function App(){
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blockInfo/:value" element={<BlockInfo />} />
          <Route path="/transactionInfo/:value" element={<TransactionInfo />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
