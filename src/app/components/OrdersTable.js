import React, { useState} from 'react';
import { useMediaQuery } from 'react-responsive';
import { BiTrash, BiLeftArrowAlt, BiRightArrowAlt, BiSearch, BiFilterAlt } from 'react-icons/bi';

const OrdersTable = ({ orders }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateOption, setSelectedDateOption] = useState('Todos');
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [currentPage, setCurrentPage] = useState(0);

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

  let paginatedOrders = paginate(filteredOrders, itemsPerPage);

  const handlePrev = () => setCurrentPage(Math.max(currentPage - 1, 0));
  const handleNext = () => setCurrentPage(Math.min(currentPage + 1, paginatedOrders.length - 1));

  //inativar pedido
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
  //filtro 
  const handleFilter = () => {
    let filtered = orders;

    const now = new Date();
    if (selectedDateOption === 'Até 7 dias') {
      filtered = filtered.filter(order => new Date(order.date) >= new Date(now.setDate(now.getDate() - 7)));
    } else if (selectedDateOption === 'Até 15 dias') {
      filtered = filtered.filter(order => new Date(order.date) >= new Date(now.setDate(now.getDate() - 15)));
    } else if (selectedDateOption === 'Até 30 dias') {
      filtered = filtered.filter(order => new Date(order.date) >= new Date(now.setDate(now.getDate() - 30)));
    } else if (selectedDateOption === 'Mais de 30 dias') {
      filtered = filtered.filter(order => new Date(order.date) < new Date(now.setDate(now.getDate() - 30)));
    } else if (selectedDateOption === 'Personalizado' && customDateRange.start && customDateRange.end) {
      filtered = filtered.filter(order => 
        new Date(order.date) >= new Date(customDateRange.start) &&
        new Date(order.date) <= new Date(customDateRange.end)
      );
    }

    if (selectedStatus !== 'Todos') {
      filtered = filtered.filter(order => order.status.toLowerCase() === selectedStatus.toLowerCase());
    }

    setFilteredOrders(filtered);
    setCurrentPage(0); 
    setIsModalOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedDateOption('Todos');
    setCustomDateRange({ start: '', end: '' });
    setSelectedStatus('Todos');
  };

  //paginação
  const renderPagination = () => {
    const totalPages = paginatedOrders.length;
  
    if (isMobile) {
      return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); 
            setCurrentPage(currentPage);
          }}
          className="mx-1 px-3 py-1 rounded bg-orange-100 text-orange-600"
        >
          {currentPage + 1}
        </a>
      );
    }
  
    const pageLinks = [];
  
    const renderPageLink = (pageIndex) => (
      <a
        key={pageIndex}
        href="#"
        onClick={(e) => {
          e.preventDefault(); 
          setCurrentPage(pageIndex);
        }}
        className={`mx-1 px-3 py-1 rounded ${
          pageIndex === currentPage ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
        }`}
      >
        {pageIndex + 1}
      </a>
    );
  
    if (currentPage >= 0) {
      pageLinks.push(renderPageLink(0));
      if (currentPage > 1) {
        pageLinks.push(<span key="dots1" className="mx-1">...</span>);
      }
    }
  
    for (let i = Math.max(currentPage, 1); i < Math.min(currentPage + 2, totalPages); i++) {
      pageLinks.push(renderPageLink(i));
    }
  
    if (totalPages > currentPage + 4) {
      if (currentPage < totalPages - 2) {
        pageLinks.push(<span key="dots2" className="mx-1">...</span>);
      }
      for (let i = totalPages - 3; i < totalPages; i++) {
        pageLinks.push(renderPageLink(i));
      }
    } else {
      for (let i = currentPage + 2; i < totalPages; i++) {
        pageLinks.push(renderPageLink(i));
      }
    }
  
    return pageLinks;
  };
  return (
    <div className="container mx-auto px-4 bg-gray-100">
      <h1 className="text-gray-700 text-2xl font-bold mb-4">Lista de pedidos</h1>
      <div className="flex items-center mb-4 relative">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Pesquise aqui"
            className="w-full pl-3 py-1 pr-10 border border-gray-300 rounded-xl focus:outline-none"
          />
          <BiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200" />
        </div>
        {!isMobile ? (
          <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 flex flex-row items-baseline text-white rounded-md py-2 px-4 ml-2">
          <BiFilterAlt className='mr-2'/>
          Filtrar</button>
        ) : (
          <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 flex flex-row items-baseline text-white rounded-md py-2 px-4 ml-2">
          <BiFilterAlt/></button>
        )}
        
      </div>
      {/* Filtro */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl text-gray-700 font-semibold">Filtro</span>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 font-bold">X</button>
            </div>
            <hr />

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-gray-700">Por data</h3>
              <div className="flex flex-col space-y-2 text-gray-700">
                {['Todos', 'Até 7 dias', 'Até 15 dias', 'Até 30 dias', 'Mais de 30 dias', 'Personalizado'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="date"
                      value={option}
                      checked={selectedDateOption === option}
                      onChange={() => setSelectedDateOption(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
              {selectedDateOption === 'Personalizado' && (
                <div className="mt-4 space-y-2 ">
                  <input
                    type="date"
                    value={customDateRange.start}
                    onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                    className="border border-gray-300 rounded-md px-2 py-1 text-gray-700"
                  />
                  <input
                    type="date"
                    value={customDateRange.end}
                    onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                    className="border border-gray-300 rounded-md px-2 py-1 text-gray-700"
                  />
                </div>
              )}
            </div>
            <hr className="my-4" />

            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Por Status</h3>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1 text-gray-700"
              >
                <option value="Todos">Todos</option>
                <option value="Entregue">Entregue</option>
                <option value="Em preparação">Em preparação</option>
                <option value="Em entrega">Em entrega</option>
              </select>
            </div>
            <hr className="my-4" />

            <div className="flex justify-between mt-4">
              <button onClick={handleClearSelection} className="px-4 py-2 bg-gray-300 rounded-md">
                Limpar seleção
              </button>
              <button onClick={handleFilter} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                Filtrar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Tabela */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {!isMobile ? (
              <>
                <th className="text-gray-700 py-2 px-4 border-b text-center">Num. Pedido</th>
                <th className="text-gray-700 py-2 px-4 border-b text-center">Valor</th>
                <th className="text-gray-700 py-2 px-4 border-b text-center">Data</th>
                <th className="text-gray-700 py-2 px-4 border-b text-center">Forma de pagamento</th>
                <th className="text-gray-700 py-2 px-4 border-b text-center">Status</th>
                <th className="text-gray-700 py-2 px-4 border-b text-center">Ação</th>
              </>
            ) : (
              <>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedOrders[currentPage]?.map((order, index) => (
            <tr key={index} className="border-b">
              {!isMobile ? (
                <>
                  <td className="text-blue-400 py-2 px-4 text-center">{order.id}</td>
                  <td className="text-gray-800 py-2 px-4 text-center">{order.value}</td>
                  <td className="text-gray-800 py-2 px-4 text-center">{order.date}</td>
                  <td className="text-gray-800 py-2 px-4 text-center">{order.paymentMethod}</td>
                  <td className={`text-center rounded-full h-[1vh] ${
                    order.status.toLowerCase() === 'entregue' ? 'text-green-600 bg-green-200' :
                    order.status.toLowerCase() === 'em preparação' ? 'text-blue-600 bg-blue-200' :
                    order.status.toLowerCase() === 'em entrega' ? 'text-orange-600 bg-orange-200' :
                    'bg-gray-300'
                  }`}>
                    {order.status}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {order.status === 'Entregue' ? (
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-gray-600"
                      >
                        <BiTrash />
                      </button>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </>
              ) : (
                <td className="py-2 px-4 text-left">
                  <div className="flex flex-row justify-around">
                    <div className="flex flex-col text-blue-400"><strong className="text-gray-800">Num. Pedido</strong> {order.id}</div>
                    <div className="flex flex-col"><strong>Valor</strong> {order.value}</div>
                    <div className="flex flex-col"><strong>Data</strong> {order.date}</div>
                  </div>
                  
                  <div className={`text-center rounded-full items-baseline w-[80vw] h-[2vh] ${
                    order.status.toLowerCase() === 'entregue' ? 'text-green-600 bg-green-200' :
                    order.status.toLowerCase() === 'em preparação' ? 'text-blue-600 bg-blue-200' :
                    order.status.toLowerCase() === 'em entrega' ? 'text-orange-600 bg-orange-200' :
                    'bg-gray-300'
                  }`}>
                    {order.status}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginação */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex-1 flex justify-start">
          {currentPage > 0 && (
            <button onClick={handlePrev} className="mx-1 px-3 py-1 rounded text-orange-600 flex items-center">
              <BiLeftArrowAlt className="mr-1" />
              Anterior
            </button>
          )}
        </div>
        <div className="flex-1 flex justify-center">
          {renderPagination()}
        </div>
        <div className="flex-1 flex justify-end">
          {currentPage < paginatedOrders.length - 1 && (
            <button onClick={handleNext} className="mx-1 px-3 py-1 rounded text-orange-600 flex items-center">
              Próximo
              <BiRightArrowAlt className="ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
