import { useState } from 'react';
import PropTypes from 'prop-types';

const OrderForm = ({ onAddOrder }) => {
  const [formData, setFormData] = useState({
    customer: '',
    status: 'pending',
    items: [{ productId: '', name: '', quantity: 1, price: '' }]
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar cliente
    if (formData.customer.length < 3) {
      newErrors.customer = 'El cliente debe tener al menos 3 caracteres';
    }

    // Validar items
    formData.items.forEach((item, index) => {
      if (!item.productId) {
        newErrors[`productId-${index}`] = 'ID de producto requerido';
      }
      if (!item.name) {
        newErrors[`name-${index}`] = 'Nombre de producto requerido';
      }
      if (!item.quantity || item.quantity <= 0) {
        newErrors[`quantity-${index}`] = 'Cantidad debe ser mayor a 0';
      }
      if (!item.price || item.price <= 0) {
        newErrors[`price-${index}`] = 'Precio debe ser mayor a 0';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', name: '', quantity: 1, price: '' }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        items: newItems
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer: formData.customer,
      date: new Date(),
      status: formData.status,
      items: formData.items.map(item => ({
        productId: Number(item.productId),
        name: item.name,
        quantity: Number(item.quantity),
        price: Number(item.price)
      }))
    };

    onAddOrder(newOrder);
    
    // Reset form
    setFormData({
      customer: '',
      status: 'pending',
      items: [{ productId: '', name: '', quantity: 1, price: '' }]
    });
    setErrors({});
  };

  return (
    <div className="order-form">
      <h2>Nuevo Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cliente: </label>
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleInputChange}
            className={errors.customer ? 'error' : ''}
          />
          {errors.customer && <span className="error-text">{errors.customer}</span>}
        </div>

        <div>
          <label>Estado: </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="pending">Pendiente</option>
            <option value="shipped">Enviado</option>
            <option value="delivered">Entregado</option>
          </select>
        </div>

        <h4>Productos:</h4>
        {formData.items.map((item, index) => (
          <div key={index} className="form-item">
            <div>
              <input
                type="number"
                placeholder="ID Producto"
                value={item.productId}
                onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                className={errors[`productId-${index}`] ? 'error' : ''}
              />
              {errors[`productId-${index}`] && (
                <span className="error-text">{errors[`productId-${index}`]}</span>
              )}
            </div>
            
            <div>
              <input
                type="text"
                placeholder="Nombre"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                className={errors[`name-${index}`] ? 'error' : ''}
              />
              {errors[`name-${index}`] && (
                <span className="error-text">{errors[`name-${index}`]}</span>
              )}
            </div>
            
            <div>
              <input
                type="number"
                placeholder="Cantidad"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                min="1"
                className={errors[`quantity-${index}`] ? 'error' : ''}
              />
              {errors[`quantity-${index}`] && (
                <span className="error-text">{errors[`quantity-${index}`]}</span>
              )}
            </div>
            
            <div>
              <input
                type="number"
                placeholder="Precio"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                min="0"
                step="0.01"
                className={errors[`price-${index}`] ? 'error' : ''}
              />
              {errors[`price-${index}`] && (
                <span className="error-text">{errors[`price-${index}`]}</span>
              )}
            </div>
            
            <button type="button" onClick={() => removeItem(index)}>
              ✕
            </button>
          </div>
        ))}

        <button type="button" onClick={addItem}>
          + Agregar Producto
        </button>

        <button type="submit">Crear Pedido</button>
      </form>
    </div>
  );
};

OrderForm.propTypes = {
  onAddOrder: PropTypes.func.isRequired
};

export default OrderForm;