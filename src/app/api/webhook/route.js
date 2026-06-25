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



  if (evento.type === 'checkout.session.completed') {
    
  }

  if (evento.type === 'checkout.session.expired') {
    // El usuario no pagó en 30 minutos → cancelamos el pago


      if (error) {
      console.error('Error cancelando pago expirado:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  
  }

  // Siempre respondemos 200 para que Stripe sepa que recibimos el aviso
  return NextResponse.json({ received: true })
}