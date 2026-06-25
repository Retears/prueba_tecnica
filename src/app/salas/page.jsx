"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/pagos", {
        method: "POST",
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // 👉 redirige a Stripe
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🧪 Simulación de pago Stripe</h1>

      <button
        onClick={handlePay}
        disabled={loading}
        style={{
          padding: "12px 20px",
          background: "black",
          color: "white",
          marginTop: "20px",
        }}
      >
        {loading ? "Procesando..." : "Pagar 19.99€"}
      </button>
    </div>
  );
}



