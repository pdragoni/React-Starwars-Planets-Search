import React from 'react';
import PlanetsTable from './components/PlanetsTable';
import Header from './components/Header';
import APIProvider from './providers/APIprovider';
import './App.css';

function App() {
  return (
    <APIProvider>
      <Header />
      <PlanetsTable />
    </APIProvider>
  );
}

export default App;
