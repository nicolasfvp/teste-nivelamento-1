'use client';

import { useState } from 'react';
import { FaBars, FaArrowRight, FaUser, FaHome, FaBell, FaCog, FaChartLine, FaEnvelope, FaFolderOpen, FaCalendar, FaSearch, FaListAlt, FaBox, FaClipboardList } from 'react-icons/fa';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barra Lateral */}
      {sidebarOpen && (
        <div className={`bg-white w-80 md:w-16 transition-all duration-300`}>
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
        <div className="bg-blue-900 p-4 flex justify-between items-center">
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
        <div className="h-2/4 md:h-1/4 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaClipboardList className="text-blue-600" size={32} />
            <span className="text-gray-700 font-semibold">Pedidos</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaBox className="text-green-600" size={32} />
            <span className="text-gray-700 font-semibold">Estoque</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FaListAlt className="text-red-600" size={32} />
            <span className="text-gray-700 font-semibold">Listas Escolares</span>
          </div>
        </div>
        <div className="p-4">
          {/* Conteúdo da página vai aqui */}
        </div>
      </div>
    </div>
  );
}
