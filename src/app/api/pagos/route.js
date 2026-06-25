import Stripe from 'stripe'
import { NextResponse } from 'next/server'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {

    try {
        const session = await stripe.checkout.sessions.create({

            payment_method_types: ['card', 'klarna'],
            line_items: lineItems,
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: "Lentes",
                        },
                        unit_amount: 1999,
                    },
                    quantity: 1,
                }
            ],

            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pago`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancelado`
        })
        return NextResponse.json({
            url: session.url,
        });

    }
    catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );

    }
}
