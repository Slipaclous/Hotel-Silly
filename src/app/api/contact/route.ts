import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_EMAIL || 'info@hoteldesilly.be';

export async function POST(request: NextRequest) {
    try {
        const { name, email, subject, message } = await request.json();

        // Validation basique
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Tous les champs sont requis.' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Email invalide.' },
                { status: 400 }
            );
        }

        // Envoi de l'email via Resend
        const { data, error } = await resend.emails.send({
            from: 'Hotel de Silly <onboarding@resend.dev>', // Sera à changer par un domaine vérifié
            to: [contactEmail],
            subject: `Contact: ${subject} - ${name}`,
            replyTo: email,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #2c3840; border-bottom: 2px solid #C6ad7a; padding-bottom: 10px;">Nouveau message de contact</h2>
                    <p><strong>Nom:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Sujet:</strong> ${subject}</p>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #C6ad7a;">
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="margin-top: 30px; font-size: 12px; color: #888;">Ce message a été envoyé depuis le formulaire de contact du site Hotel de Silly.</p>
                </div>
            `,
        });

        if (error) {
            console.error('Erreur Resend:', error);
            return NextResponse.json(
                { error: 'Erreur lors de l\'envoi de l\'email.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Message envoyé avec succès !', id: data?.id },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erreur serveur contact:', error);
        return NextResponse.json(
            { error: 'Une erreur interne est survenue.' },
            { status: 500 }
        );
    }
}
