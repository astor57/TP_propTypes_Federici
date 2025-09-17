import PropTypes from 'prop-types';
import OrderItem from './OrderItem';
import './OrderList.css';

const OrderList = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <h3>No hay pedidos para mostrar</h3>
        <p>Utiliza el filtro o crea un nuevo pedido</p>
      </div>
    );
  }

  return (
    <div className="order-list">
      {orders.map(order => (
        <OrderItem key={order.id} {...order} />
      ))}
    </div>
  );
};

OrderList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customer: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date),
      status: PropTypes.oneOf(['pending', 'shipped', 'delivered']),
      items: PropTypes.array.isRequired
    })
  ).isRequired
};

export default OrderList;