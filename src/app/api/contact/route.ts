import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_EMAIL || 'info@hoteldesilly.be';
const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hotel-silly.com';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('Requête de contact reçue:', body);
        const { name, email, subject, message } = body;

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

        const logoUrl = `${appUrl}/images/logo-clef.png`;

        // --- TEMPLATE EMAIL POUR L'HÔTEL ---
        const hotelHtmlContent = `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
                <div style="background-color: #2c3840; padding: 50px 20px; text-align: center; border-bottom: 4px solid #C6ad7a;">
                    <img src="${logoUrl}" alt="Villa Dolce" style="height: 100px; width: auto; margin-bottom: 20px;">
                    <h1 style="color: #C6ad7a; margin: 0; font-size: 22px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase;">Demande de Contact</h1>
                </div>
                <div style="padding: 40px 35px; color: #374151; line-height: 1.8;">
                    <p style="font-size: 16px; margin-bottom: 30px; text-align: center; font-style: italic; color: #6b7280;">Nouvelle demande reçue via ${appUrl.replace('https://', '')}</p>
                    <div style="background-color: #fdfbf7; border-radius: 8px; padding: 30px; border: 1px solid #f3f4f6; position: relative;">
                        <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background-color: #C6ad7a; border-radius: 8px 0 0 8px;"></div>
                        <div style="margin-bottom: 20px;">
                            <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #C6ad7a; font-weight: bold; margin-bottom: 4px;">Informations Client</span>
                            <p style="margin: 0; font-size: 15px;"><strong>${name}</strong></p>
                            <p style="margin: 0; font-size: 15px;"><a href="mailto:${email}" style="color: #2c3840; text-decoration: none; border-bottom: 1px dotted #C6ad7a;">${email}</a></p>
                        </div>
                        <div style="margin-bottom: 25px;">
                            <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #C6ad7a; font-weight: bold; margin-bottom: 4px;">Sujet</span>
                            <p style="margin: 0; font-size: 15px; font-weight: 500;">${subject}</p>
                        </div>
                        <div style="margin-top: 25px; padding-top: 25px; border-top: 1px solid #e5e7eb;">
                            <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #C6ad7a; font-weight: bold; margin-bottom: 10px;">Message</span>
                            <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; border: 1px solid #f3f4f6;">
                                <p style="white-space: pre-wrap; margin: 0; color: #1f2937; font-size: 14px;">${message}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="background-color: #f9fafb; padding: 25px; text-align: center; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; letter-spacing: 1px; text-transform: uppercase;">Villa Dolce Hôtel ✨ Silly, Belgique</p>
                </div>
            </div>
        `;

        // --- TEMPLATE EMAIL POUR LE CLIENT (CONFIRMATION) ---
        const clientHtmlContent = `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
                <div style="background-color: #2c3840; padding: 50px 20px; text-align: center; border-bottom: 4px solid #C6ad7a;">
                    <img src="${logoUrl}" alt="Villa Dolce" style="height: 100px; width: auto; margin-bottom: 20px;">
                    <h1 style="color: #C6ad7a; margin: 0; font-size: 22px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase;">Accusé de réception</h1>
                </div>
                <div style="padding: 40px 35px; color: #374151; line-height: 1.8;">
                    <h2 style="color: #2c3840; font-size: 20px; font-weight: 400; margin-bottom: 20px;">Bonjour ${name},</h2>
                    <p style="font-size: 16px; margin-bottom: 25px;">Nous avons bien reçu votre message concernant : <strong>"${subject}"</strong>.</p>
                    <p style="font-size: 16px; margin-bottom: 25px;">Toute l'équipe de la <strong>Villa Dolce</strong> vous remercie de votre intérêt. Nous traiterons votre demande dans les plus brefs délais et reviendrons vers vous rapidement.</p>
                    
                    <div style="margin: 40px 0; padding: 20px; border-left: 3px solid #C6ad7a; background-color: #f9f9f9;">
                        <p style="margin: 0; font-size: 14px; color: #6b7280; font-style: italic;">"L'élégance et le confort au cœur de Silly."</p>
                    </div>

                    <p style="font-size: 14px; color: #9ca3af; margin-top: 40px;">Ceci est un message automatique, merci de ne pas y répondre directement.</p>
                </div>
                <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <div style="margin-bottom: 15px;">
                        <a href="${appUrl}" style="color: #2c3840; text-decoration: none; font-size: 13px; font-weight: bold; letter-spacing: 1px;">${appUrl.replace('https://', '').toUpperCase()}</a>
                    </div>
                    <p style="margin: 0; font-size: 11px; color: #9ca3af; letter-spacing: 1px; text-transform: uppercase;">Place Communale 9, 7830 Silly, Belgique</p>
                </div>
            </div>
        `;

        // Envoi des deux emails
        const [hotelResponse, clientResponse] = await Promise.all([
            // 1. Email pour l'hôtel
            resend.emails.send({
                from: `Villa Dolce <${senderEmail}>`,
                to: [contactEmail],
                subject: `Nouvelle demande: ${subject} - ${name}`,
                replyTo: email,
                html: hotelHtmlContent,
            }),
            // 2. Email de confirmation pour le client
            resend.emails.send({
                from: `Villa Dolce <${senderEmail}>`,
                to: [email],
                subject: `Confirmation de réception - Villa Dolce`,
                html: clientHtmlContent,
            })
        ]);

        if (hotelResponse.error) {
            console.error('Erreur Resend Hôtel:', hotelResponse.error);
            return NextResponse.json({ error: 'Erreur lors du transfert du message.' }, { status: 500 });
        }

        return NextResponse.json(
            { message: 'Messages envoyés avec succès !', hotelId: hotelResponse.data?.id, clientId: clientResponse.data?.id },
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
