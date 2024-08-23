'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Bem-vindo!</h2>
        <div className="flex items-center justify-center">
          <Image
            src="/imgs/trajeton-magazine.png" 
            alt="Imagem de boas-vindas"
            width={600}
            height={400}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
