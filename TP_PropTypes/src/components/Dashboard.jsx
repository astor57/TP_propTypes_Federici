import { useState, useMemo } from 'react';
import OrderList from './OrderList';
import OrderFilter from './OrderFilter';
import OrderStats from './OrderStats';
import OrderForm from './OrderForm';
import './Dashboard.css';

const Dashboard = ({ orders, onAddOrder }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredOrders = useMemo(() => {
    if (filter === 'all') return orders;
    return orders.filter(order => order.status === filter);
  }, [orders, filter]);

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  }), [orders]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Gestión de Pedidos - MailAméricas</h1>
        <p>Sistema de administración de envíos y logística</p>
      </header>
      
      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <OrderStats {...stats} />
          <OrderFilter filter={filter} onFilterChange={setFilter} />
        </div>
        
        <div className="dashboard-main">
          <OrderForm onAddOrder={onAddOrder} />
          <OrderList orders={filteredOrders} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;