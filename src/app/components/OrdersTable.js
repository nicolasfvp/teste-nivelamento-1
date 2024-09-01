import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FaTrash } from 'react-icons/fa';

const OrdersTable = ({ orders }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const itemsPerPage = isMobile ? 5 : 6;

  const paginate = (items, itemsPerPage) => {
    const pages = Math.ceil(items.length / itemsPerPage);
    const paginatedItems = [];
    for (let i = 0; i < pages; i++) {
      paginatedItems.push(items.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage));
    }
    return paginatedItems;
  };

  const paginatedOrders = paginate(orders, itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrev = () => setCurrentPage(Math.max(currentPage - 1, 0));
  const handleNext = () => setCurrentPage(Math.min(currentPage + 1, paginatedOrders.length - 1));


  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/api/Account/put-orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao deletar o pedido');
      }
  
      window.location.reload();
    } catch (error) {
      console.error('Erro ao deletar o pedido:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 bg-gray-100">
      <h1 className="text-gray-700 text-2xl font-bold mb-4">Lista de pedidos</h1>
      <div className="flex items-center mb-4">
        <input type="text" placeholder="Buscar..." className="border rounded-l-md py-2 px-4 flex-grow" />
        <button className="bg-orange-500 text-white rounded-r-md py-2 px-4">Filtrar</button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {!isMobile ? (
              <>
                <th className="text-gray-700 py-2 px-4 border-b">Num. Pedido</th>
                <th className="text-gray-700 py-2 px-4 border-b">Valor</th>
                <th className="text-gray-700 py-2 px-4 border-b">Data</th>
                <th className="text-gray-700 py-2 px-4 border-b">Forma de pagamento</th>
                <th className="text-gray-700 py-2 px-4 border-b">Status</th>
                <th className="text-gray-700 py-2 px-4 border-b">Ação</th>
              </>
            ) : (
              <>
                
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedOrders[currentPage].map((order, index) => (
            <tr key={index} className="border-b">
              {!isMobile ? (
                <>
                  <td className="text-blue-400 py-2 px-4">{order.id}</td>
                  <td className="text-gray-700 py-2 px-4">{order.value}</td>
                  <td className="text-gray-700 py-2 px-4">{order.date}</td>
                  <td className="text-gray-700 py-2 px-4">{order.paymentMethod}</td>
                  <td className="text-gray-700 py-2 px-4">{order.status}</td>
                  <td className="text-gray-700 py-2 px-4">
                    {order.status === 'Entregue' ? (
                    <button onClick={() => handleDelete(order.id)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  ) : (
                    <span>-</span>
                )}</td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4">
                    <div><strong>Num. Pedido:</strong> {order.id}</div>
                    <div><strong>Valor:</strong> {order.value}</div>
                    <div><strong>Data:</strong> {order.date}</div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button onClick={handlePrev} className="bg-gray-200 text-gray-600 py-2 px-4 rounded-l-md">
          <span className="material-icons">arrow_back</span> Anterior
        </button>
        <div className="flex-grow text-center">
          {paginatedOrders.map((_, index) => (
            <a key={index} href="#" onClick={() => setCurrentPage(index)} className={`mx-1 ${index === currentPage ? 'text-orange-500' : 'text-gray-600'}`}>
              {index + 1}
            </a>
          ))}
        </div>
        <button onClick={handleNext} className="bg-gray-200 text-gray-600 py-2 px-4 rounded-r-md">
          Próximo <span className="material-icons">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;
