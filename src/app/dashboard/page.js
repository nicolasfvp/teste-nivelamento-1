'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars, FaArrowRight, FaUser, FaHome, FaBell, FaCog, FaChartLine, FaEnvelope, FaFolderOpen, FaCalendar, FaSearch, FaListAlt, FaBox, FaClipboardList, FaChartBar } from 'react-icons/fa';
import OrdersTable from '../components/OrdersTable';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const router = useRouter();
  const orders = [
    { id: '001', value: 'R$ 100,00', date: '01/08/2024', paymentMethod: 'Cartão', status: 'Pago' },
    { id: '002', value: 'R$ 200,00', date: '02/08/2024', paymentMethod: 'Boleto', status: 'Pendente' },
    { id: '001', value: 'R$ 100,00', date: '01/08/2024', paymentMethod: 'Cartão', status: 'Pago' },
    { id: '002', value: 'R$ 200,00', date: '02/08/2024', paymentMethod: 'Boleto', status: 'Pendente' },
    { id: '001', value: 'R$ 100,00', date: '01/08/2024', paymentMethod: 'Cartão', status: 'Pago' },
    { id: '002', value: 'R$ 200,00', date: '02/08/2024', paymentMethod: 'Boleto', status: 'Pendente' },
    { id: '001', value: 'R$ 100,00', date: '01/08/2024', paymentMethod: 'Cartão', status: 'Pago' },
    { id: '002', value: 'R$ 200,00', date: '02/08/2024', paymentMethod: 'Boleto', status: 'Pendente' },
    
  ];
  const handleRedirect = (page) => {
    router.push(page);
  }
  return (
    <div className="flex min-h-lvh bg-gray-100">
      {/* Barra Lateral */}
      {sidebarOpen && (
        <div className={`bg-white min-h-lvh w-80 md:w-16 transition-all duration-300`}>
          <div className="flex flex-col items-center py-4 space-y-6 md:space-y-4">
            <div className="flex items-center mb-6">
              <FaUser className="text-gray-300" size={28} />
              <span className="block md:hidden text-gray-300 ml-2">Perfil</span>
            </div>
            <div className={`flex items-center mb-4 rounded-lg ${!sidebarOpen ? '' : 'bg-gray-200 shadow-md '} px-2 py-1`}>
              <FaHome className={`${sidebarOpen ? 'text-orange-600 md:text-gray-300' : ''}`} size={24} />
              <span className={`block md:hidden ml-2 ${sidebarOpen ? 'text-orange-600 md:text-gray-300' : ''}`}>Início</span>
            </div>
            <div className="flex items-center mb-4">
              <FaBell className="text-gray-300" size={24} />
              <span className="block md:hidden text-gray-300 ml-2">Notificações</span>
            </div>
            <div className="flex items-center mb-4">
              <FaCog className="text-gray-300" size={24} />
              <span className="block md:hidden text-gray-300 ml-2">Configurações</span>
            </div>
            <div className="flex items-center mb-4">
              <FaChartLine className="text-gray-300" size={24} />
              <span className="block md:hidden text-gray-300 ml-2">Métricas</span>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-gray-300" size={24} />
              <span className="block md:hidden text-gray-300 ml-2">Mensagens</span>
            </div>
            <div className="flex items-center mb-4">
              <FaFolderOpen className="text-gray-300" size={24} />
              <span className="block md:hidden text-gray-300 ml-2">Documentos</span>
            </div>
            <div className="flex items-center mb-4">
              <FaCalendar className="text-gray-300" size={24} />
              <span className="block md:hidden text-gray-300 ml-2">Calendário</span>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mt-6">
              <FaArrowRight className="text-gray-300" size={24} />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1">
        {/* Barra Superior */}
        <div className="bg-blue-900 p-4 h-[10vh] flex justify-between items-center">
          <div className="flex items-center w-full">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                <FaBars className="text-white mr-4" size={24} />
              </button>
            )}
            <div className={`pl-8 relative flex-grow ${sidebarOpen ? 'hidden' : 'block'} md:block`}>
              <input
                type="text"
                placeholder="Pesquisar..."
                className="w-full py-1 pr-10 border border-gray-300 rounded-md focus:outline-none"
              />
              <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center ml-4">
            <FaUser className="text-white mr-2" size={24} />
            <span className="text-white">Nome do Usuário</span>
          </div>
        </div>
        {/* cards 1 */}
        <div className="h-[45vh] md:h-[22.5vh] p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          <div onClick={() => handleRedirect("dashboard/orders")} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaClipboardList className="text-blue-600" size={32} />
            <span className="text-gray-700 font-semibold">Pedidos</span>
          </div>
          <div onClick={() => handleRedirect("dashboard/stock")} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaBox className="text-green-600" size={32} />
            <span className="text-gray-700 font-semibold">Estoque</span>
          </div>
          <div onClick={() => handleRedirect("dashboard/list")} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaListAlt className="text-red-600" size={32} />
            <span className="text-gray-700 font-semibold">Listas Escolares</span>
          </div>
        </div>
        {/* cards 2 */}
        <div className="h-[45vh] p-4 grid grid-rows-3 md:grid-rows-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-1 md:row-span-2 bg-white p-4 rounded-lg shadow-md flex">
              <FaChartBar className="text-blue-600 mr-4" size={48} />
              <div className="flex flex-col justify-center">
                <span className="text-gray-700 text-xl">Hoje</span>
                <span className="text-gray-700 text-lg">100 pedidos para entrega</span>
              </div>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-700 text-xl">Total </span>
              <span className="text-gray-700 text-lg">100 Produtos</span>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-700 text-xl">Total</span>
              <span className="text-gray-700 text-lg">2</span>
              <span className="text-gray-700 text-lg">Estoque Mínimo</span>
            </div>
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-700 text-xl">Total</span>
              <span className="text-gray-700 text-lg">100 Clientes</span>
            </div>
        </div>
        <div className='bg-gray-100 p-4 shadow-md overflow-x-auto'>
          <OrdersTable orders={orders} />
        </div>
      </div>
    </div>
  );
}
