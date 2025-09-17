import PropTypes from 'prop-types';

const OrderItem = ({ 
  id, 
  customer, 
  date, 
  status, 
  items 
}) => {
  return (
    <div className={`order-item ${status}`}>
      <h3>Pedido #{id}</h3>
      <p><strong>Cliente:</strong> {customer}</p>
      <p><strong>Fecha:</strong> {date.toLocaleDateString()}</p>
      <p>
        <strong>Estado:</strong> 
        <span className={`status-badge status-${status}`}>
          {status}
        </span>
      </p>
      
      <h4>Productos:</h4>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span>
            <span>
              {item.quantity} x ${item.price ? item.price.toFixed(2) : '0.00'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

OrderItem.propTypes = {
  id: PropTypes.number.isRequired,
  customer: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
  status: PropTypes.oneOf(['pending', 'shipped', 'delivered']),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: function(props, propName, componentName) {
        const value = props[propName];
        if (value === undefined || value === null) {
          return new Error(`Quantity es requerido en ${componentName}`);
        }
        if (typeof value !== 'number' || value <= 0) {
          return new Error(`Quantity debe ser mayor a 0 en ${componentName}`);
        }
      },
      price: PropTypes.number.isRequired
    })
  ).isRequired
};

OrderItem.defaultProps = {
  status: 'pending',
  date: new Date()
};

export default OrderItem;