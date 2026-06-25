import Image from "next/image";
import Link from "next/link";

export default function Home() {


  
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-100">
      <main className="min-h-screen flex items-center justify-center ">
        <div className="max-w-2xl text-center bg-white p-10 rounded-2xl shadow-lg">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ¡Bienvenida! 👋
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Este es mi proyecto desarrollado con Next.js.
            Estoy aprendiendo programación y construyendo cosas increíbles.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/salas" className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              login
            </Link>

            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">

              Más información
            </button>
          </div>
        </div>
      </main>
    </div >
  );
}
