"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import Link from 'next/link';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotEmailError, setForgotEmailError] = useState('');
  const [showEmailSentModal, setShowEmailSentModal] = useState(false);

  const router = useRouter();

  // Lista de usuários padrão

  const users = [
    { email: 'usuario1@gmail.com', password: 'Senha123!' },
    { email: 'usuario2@gmail.com', password: 'Senha123@' }, 
    { email: 'usuario3@gmail.com', password: 'Senha123#' },
  ]; 

  //regex de email e senha

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    return passwordRegex.test(password);
  };

  //verificação de e-mail e senha no login

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('E-mail inválido. Insira um endereço de e-mail no formato correto.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais');
      valid = false;
    } else {
      setPasswordError('');
    }

    try {
      const response = await fetch('http://localhost:5000/api/Account/login', {
        method: 'POST',
        headers: {
          'Accept': '8/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });

      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }

      const data = await response.json();
      
      router.push('/dashboard');  
    } catch (error) {
      setLoginError('Credenciais inválidas. Verifique seu e-mail e senha e tente novamente.');
    }
  };

  //verificação de e-mail no recuperar senha
  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (!validateEmail(forgotEmail)) {
      setForgotEmailError('E-mail inválido. Insira um endereço de e-mail no formato correto.');
    } else {
      const user = users.find(user => user.email === forgotEmail)
      if(user){
        setForgotEmailError('');
        setShowForgotPassword(false);
        setShowEmailSentModal(true);
        // Lógica para enviar e-mail de recuperação
      } else{
        setForgotEmailError('E-mail inválido. Este endereço de e-mail não está cadastrado no sistema, verifique e tente novamente.')
      }
       
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm max-h-xs">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Digite seu e-mail"
              autoComplete="off"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 pr-12" 
                placeholder="Digite sua senha"
                maxLength={32}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3" 
              >
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div className="mb-4 text-right">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-blue-500 text-sm">
              Esqueci minha senha
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>

      {/* Modal de Recuperação de Senha */}
      {showForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl text-gray-700 font-bold mb-4">Recuperar Senha</h3>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
                <input
                  type="text"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  placeholder="Digite seu e-mail"
                  autoComplete="off"
                />
                {forgotEmailError && <p className="text-red-500 text-sm mt-1">{forgotEmailError}</p>}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600"
                >
                  Enviar Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de E-mail Enviado */}
      {showEmailSentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl text-gray-700 font-bold mb-4">E-mail Enviado</h3>
            <p className="text-x1 text-gray-700">Um link de recuperação de senha foi enviado para o seu e-mail.</p>
            <div className="flex justify-end mt-4">
                <Link href="/reset-password">
                  <button
                  onClick={() => setShowEmailSentModal(false)} 
                  className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600">
                  OK
                  </button>
                </Link>
                
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
