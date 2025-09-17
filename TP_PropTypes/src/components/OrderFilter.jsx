import PropTypes from 'prop-types';

const OrderFilter = ({ filter, onFilterChange }) => {
  return (
    <div className="order-filter">
      <label>Filtrar por estado: </label>
      <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="all">Todos los pedidos</option>
        <option value="pendiente"> Pendientes</option>
        <option value="enviado"> Enviados</option>
        <option value="entregado"> Entregados</option>
      </select>
    </div>
  );
};

OrderFilter.propTypes = {
  filter: PropTypes.oneOf(['all', 'pendiente', 'enviado', 'entregado']),
  onFilterChange: PropTypes.func.isRequired
};

OrderFilter.defaultProps = {
  filter: 'all'
};

export default OrderFilter;