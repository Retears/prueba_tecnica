"use client"
import RoomCard from "@/components/RoomCard";
import { useState } from "react";

export default function PageSalas() {
    const salas = [
        { id: 1, sala: 'roja' },
        { id: 2, sala: 'morada' },
    ]
    const [loading, setLoading] = useState(false);

    const handleBuy = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/pagos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tipo : 'sala',
                    id : 1,
                    items:[{
                        nombre : 'sala',
                        precio: 100,
                        cantidad:1,
                }]
                    
                }) // monto en centavos
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url; // redirige a Stripe Checkout
            } else {
                console.error("Error al crear la sesión de pago");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error en la solicitud de pago:", error);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-1 items-center justify-center ">
            <section className="gap-6 md:grid-cols-2 lg:grid-cols-4 grid">
                <article>
                    <div className="">Bienvenido ROOM SCAPE</div>
                </article>

                <article>
                    {
                        salas.map(s => {
                            <ul key={s.id}>
                                <li className="text-black">{s.sala}</li>
                            </ul>
                        })
                    }
                    <h1 className="text-4xl font-bold mt-4">lentes</h1>
                    <p className="text-2xl mt-2">$19.99</p>
                    <button
                        onClick={handleBuy}
                        disabled={loading}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {loading ? "Procesando..." : "Comprar"}

                    </button>
                </article>
            </section>
        </div>
    )
}