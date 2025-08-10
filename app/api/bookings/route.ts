import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendFormEmail } from '@/src/actions/send-form-email';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Required fields: type, itemName, price, customerName, customerEmail, customerPhone, message, plus any car/tour-specific fields
    const {
      type,
      itemName,
      price,
      customerName,
      customerEmail,
      customerPhone,
      message,
      days,
      startDate,
      people,
      arrivalDate,
      deposit,
      total,
      ...rest
    } = body;

    // Compose booking object
    const booking = {
      type,
      item_name: itemName,
      price,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      message,
      status: 'pending',
      metadata: {
        days,
        startDate,
        people,
        arrivalDate,
        ...rest
      },
      deposit,
      total,
      created_at: new Date().toISOString(),
    };

    // Insert booking
    const { data, error } = await supabase.from('bookings').insert([booking]).select();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send emails
    await sendFormEmail({
      formType: type === 'car' ? 'Car Booking' : type === 'tour' ? 'Tour Booking' : 'Booking',
      formData: booking,
      userEmail: customerEmail,
      userName: customerName,
    });

    return NextResponse.json({ success: true, booking: data?.[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || String(error) }, { status: 500 });
  }
} 