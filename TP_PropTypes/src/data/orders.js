export const sampleOrders = [
    {
      id: 1,
      customer: "Juan Pérez",
      date: new Date('2024-01-15'),
      status: 'pending',
      items: [
        { productId: 101, name: "Laptop", quantity: 1, price: 1200 },
        { productId: 102, name: "Mouse", quantity: 2, price: 25 }
      ]
    },
    {
      id: 2,
      customer: "María García",
      date: new Date('2024-01-14'),
      status: 'shipped',
      items: [
        { productId: 103, name: "Teclado", quantity: 1, price: 80 }
      ]
    }
  ];