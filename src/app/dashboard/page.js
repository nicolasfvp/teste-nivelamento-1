'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoSchoolOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { BiCube, BiHomeAlt, BiListCheck, BiArchive, BiCategoryAlt, BiUser, BiLeftArrowAlt, BiRightArrowAlt, BiSearch   } from "react-icons/bi";
import { FaBars, FaUser } from 'react-icons/fa';
import OrdersTable from '../components/OrdersTable';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  
  const handleRedirect = (page) => {
    router.push(page);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [metricsRes, ordersRes] = await Promise.all([
          fetch('http://localhost:5000/api/Account/get-metrics'),
          fetch('http://localhost:5000/api/Account/get-orders'),
        ]);

        const metricsData = await metricsRes.json();
        const ordersData = await ordersRes.json();

        setOrders(ordersData);
        setMetrics(metricsData);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }
  return (
    <div className="flex min-h-lvh bg-gray-100">
      {/* Barra Lateral */}
      {sidebarOpen ? (
        <div className={`bg-white min-h-lvh w-[80vw] md:w-[20vw] transition-all duration-300`}>
          <div className="flex flex-col items-start ml-5 py-4 space-y-6 md:space-y-4">
            <div className="flex items-center mb-6">
              <img src="https://i.imgur.com/KZUlf9M.png" className="text-gray-400" size={28} />
            </div>
            <div className="flex flex-start mb-4">
              <BiHomeAlt className="text-gray-400" size={16} />
              <span className="block text-gray-600 ml-2">Home</span>
            </div>
            <div className="flex flex-start mb-4">
              <BiCube className="text-gray-400" size={16} />
              <span className="block text-gray-600 ml-2">Estoque</span>
            </div>
            <div className="flex flex-start mb-4">
              <BiCategoryAlt className="text-gray-400" size={16} />
              <span className="block text-gray-600 ml-2">Categorias</span>
            </div>
            <div className="flex flex-start mb-4">
              <IoSchoolOutline className="text-gray-400" size={16} />
              <span className="block text-gray-600 ml-2">Escolas </span>
            </div>
            <div className="flex flex-start mb-4">
              <BiArchive className="text-gray-400" size={16} />
              <span className="block text-gray-600 ml-2">Gestão de pedidos</span>
            </div>
            <div className="flex flex-start mb-4">
              <FiUsers className="text-gray-400" size={16} />
              <span className="block text-gray-600 ml-2">Usuários</span>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mt-6 flex flex-row">
              <BiLeftArrowAlt className="bg-gray-100 shadow-md text-gray-400 rounded-full" size={24} />
              <span className="block text-gray-600 ml-2">Recolher</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={`bg-white min-h-lvh hidden md:block w-[80vw] md:w-[5vw] transition-all duration-300`}>
          <div className="flex flex-col items-start ml-3 py-4 space-y-6 md:space-y-4">
            <div className="flex items-center mb-6">
              <img src="https://i.imgur.com/KZUlf9M.png" className="text-gray-400" size={28} />
            </div>
            <div className="flex flex-start mb-4">
              <BiHomeAlt className="text-gray-400" size={16} />
            </div>
            <div className="flex flex-start mb-4">
              <BiCube className="text-gray-400" size={16} />
            </div>
            <div className="flex flex-start mb-4">
              <BiCategoryAlt className="text-gray-400" size={16} />
            </div>
            <div className="flex flex-start mb-4">
              <IoSchoolOutline className="text-gray-400" size={16} />
            </div>
            <div className="flex flex-start mb-4">
              <BiArchive className="text-gray-400" size={16} />
            </div>
            <div className="flex flex-start mb-4">
              <FiUsers className="text-gray-400" size={16} />
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mt-6">
              <BiRightArrowAlt className="bg-gray-100 shadow-md text-gray-400 rounded-full" size={24} />
            </button>
          </div>
        </div>
      )}
      <div className={`${sidebarOpen ? 'hidden' : 'block'} md:block flex-1 max-w-[100vw]`}>
        {/* Barra Superior */}
        <div className="bg-blue-900 p-4 h-auto">
          {/* Layout para versão desktop */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex items-center w-full">
              {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
                  <FaBars className="text-white md:hidden" size={24} />
                </button>
              )}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Pesquise aqui"
                  className="w-full pl-3 py-1 pr-10 border border-gray-300 rounded-xl focus:outline-none"
                />
                <BiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-200" />
              </div>
            </div>
            <div className="flex items-center ml-4">
              <div className="flex items-center justify-center bg-white text-orange-600 rounded-full w-[6vh] h-[5vh]">
                <BiUser size={24} />
              </div>
              <span className="text-white ml-2">Admin</span>
            </div>
          </div>

          {/* Layout para versão mobile */}
          <div className="flex flex-col md:hidden justify-between items-center">
            <div className="flex justify-between w-full">
              <button className="flex flex-row" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <FaBars className="text-white" size={24} />
                <span className="text-white ml-2">Home</span>
              </button>
              <div className="flex items-center justify-center bg-white text-orange-600 rounded-full w-[5vh] h-[5vh]">
                <BiUser size={24} />
              </div>
            </div>
            <div className="relative mt-4 w-full">
              <input
                type="text"
                placeholder="Pesquise aqui"
                className="w-full pl-3 py-1 pr-10 border border-gray-300 rounded-xl focus:outline-none"
              />
              <BiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-200" />
            </div>
          </div>
        </div>
        {/* cards 1 */}
        <div className="h-[45vh] md:h-[22.5vh] p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          <div onClick={() => handleRedirect("dashboard/orders")} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <BiArchive className="text-orange-400" size={40} />
            <span className="text-gray-700 font-semibold">Pedidos</span>
          </div>
          <div onClick={() => handleRedirect("dashboard/stock")} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <BiCube className="text-green-400" size={40} />
            <span className="text-gray-700 font-semibold">Estoque</span>
          </div>
          <div onClick={() => handleRedirect("dashboard/list")} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <BiListCheck className="text-yellow-400" size={40} />
            <span className="text-gray-700 font-semibold">Listas Escolares</span>
          </div>
        </div>
        {/* cards 2 */}
        <div className="h-[45vh] p-4 grid grid-rows-3 md:grid-rows-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-1 md:row-span-2 bg-white p-4 rounded-lg shadow-md flex">
              <img src='https://i.imgur.com/doLFUMJ.png' className="text-blue-600 mr-4" size={48} />
              <div className="flex flex-col justify-center">
                <span className="text-gray-700 text-xl">Hoje</span>
                <span className="text-gray-700 font-bold text-4xl md:text-6xl">{metrics[0].orders}</span>
                <span className="text-gray-700 text-lg">pedidos para entrega</span>
              </div>
            </div>
            <div className="flex flex-col justify-center col-span-1 bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-700 text-xl">Total </span>
              <span className="text-gray-700 font-bold text-4xl">{metrics[0].total}</span>
              <span className="text-gray-700 text-lg">Produtos</span>
            </div>
            <div className="flex flex-col justify-center col-span-1 bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-700 text-xl">Total</span>
              <span className="text-red-700 font-bold text-4xl">{metrics[0].stock}</span>
              <span className="text-gray-700 text-lg">Estoque Mínimo</span>
            </div>
            <div className="flex flex-col justify-center col-span-2 bg-white p-4 rounded-lg shadow-md">
              <span className="text-gray-700 text-xl">Total</span>
              <span className="text-gray-700 font-bold text-4xl">{metrics[0].users}</span>
              <span className="text-gray-700 text-lg">Novos clientes</span>
            </div>
        </div>
        <div className='bg-gray-100 p-4 shadow-md overflow-x-auto'>
          <OrdersTable orders={orders} />
        </div>
      </div>
    </div>
  );
}
