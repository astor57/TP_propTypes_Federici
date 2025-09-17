import PropTypes from 'prop-types';

const OrderStats = ({ total, pendiente, enviado, entregado }) => {
  return (
    <div className="order-stats">
      <h2>Estadísticas</h2>
      <p>Total: {total}</p>
      <p>Pendientes: {pendiente}</p>
      <p>Enviados: {enviado}</p>
      <p>Entregados: {entregado}</p>
    </div>
  );
};

OrderStats.propTypes = {
  total: PropTypes.number.isRequired,
  pendiente: PropTypes.number.isRequired,
  enviado: PropTypes.number.isRequired,
  entregado: PropTypes.number.isRequired
};

export default OrderStats;