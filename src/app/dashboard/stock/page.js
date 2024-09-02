'use client';

import { useState } from 'react';
import { IoSchoolOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { BiCube, BiHomeAlt, BiArchive, BiCategoryAlt, BiUser, BiLeftArrowAlt, BiRightArrowAlt, BiSearch   } from "react-icons/bi";
import { FaBars} from 'react-icons/fa';
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
        <div className="h-2/4 md:h-1/4 md:w-2/4 p-4 gap-4">
            <div  className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">  
                    <span className="text-gray-700 font-semibold">Página relativa ao estoque</span>
                    <span className="text-gray-700 font-semibold">Podendo ser futuramente implementada</span>
            </div>
        </div>
      </div>
    </div>
  );
}
