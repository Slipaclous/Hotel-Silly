import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configuration avec l'URL complète Cloudinary
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé. Utilisez JPG, PNG, WEBP ou GIF.' },
        { status: 400 }
      );
    }

    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux. Taille maximale: 5MB' },
        { status: 400 }
      );
    }

    // Convertir le fichier en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload vers Cloudinary via un stream
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'hotel-silly', // Dossier dans Cloudinary
          resource_type: 'auto',
          transformation: [
            { width: 2000, crop: 'limit' }, // Limite la largeur à 2000px
            { quality: 'auto' }, // Optimisation automatique
            { fetch_format: 'auto' } // Format automatique (WebP si supporté)
          ]
        },
        (error, result) => {
          if (error) {
            console.error('Erreur Cloudinary:', error);
            reject(error);
          } else {
            resolve(result as UploadApiResponse);
          }
        }
      );

      uploadStream.end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
      message: 'Upload réussi',
      publicId: result.public_id // Utile pour supprimer l'image plus tard
    });

  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
