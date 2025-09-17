import { useState } from 'react';
import Dashboard from './components/Dashboard';
import { sampleOrders } from './data/orders';
import './App.css';

function App() {
  const [orders, setOrders] = useState(sampleOrders);

  const handleAddOrder = (newOrder) => {
    setOrders(prev => [...prev, newOrder]);
  };

  return (
    <div className="App">
      <Dashboard orders={orders} onAddOrder={handleAddOrder} />
    </div>
  );
}

export default App;