'use client'; 

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    return passwordRegex.test(password);
  };

  //verificação das senhas 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePassword(newPassword)) {
      setPasswordError('A senha deve conter entre 8 e 32 caracteres, incluindo letras maiúsculas, minúsculas, números e um caractere especial.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas não correspondem.');
      return;
    }

    setPasswordError('');
    setSuccessMessage('Senha alterada com sucesso!');
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Recuperar Senha</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nova Senha</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 pr-12"
                placeholder="Digite sua nova senha"
                maxLength={32}
                />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {showNewPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirmar Senha</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 pr-12"
                placeholder="Confirme sua nova senha"
                maxLength={32}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
          </div>
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          {successMessage && <p className="text-green-500 text-sm mt-1">{successMessage}</p>}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Alterar Senha
          </button>
        </form>
      </div>
    </div>
  );
}
