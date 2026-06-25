import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  // Verificamos que el aviso viene realmente de Stripe
  let evento
  try {
    evento = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 })
  }



  switch (evento.type) {
    case "checkout.session.completed": {
      const session = evento.data.object;
      console.log("Pago exitoso para la sesión:", session.id);

      const customerEmail = session.customer_details?.email || session.customer_email;
      const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : null;
      const currency = session.currency ? session.currency.toUpperCase() : 'EUR';

      console.log(`Detalles del pago: Email del cliente: ${customerEmail}, Monto total: ${amountTotal} ${currency}`);
      break;


    }
    default:
      console.log('evento no manejado:', evento.type);
  }
  return NextResponse.json({ received: true });
}