import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request: NextRequest) {
  try {
    const { imageUrl, publicId } = await request.json();

    if (!publicId && !imageUrl) {
      return NextResponse.json(
        { error: 'Public ID ou URL de l\'image manquant' },
        { status: 400 }
      );
    }

    // Si on a seulement l'URL, extraire le public_id
    let idToDelete = publicId;
    if (!idToDelete && imageUrl) {
      // Extraire le public_id depuis l'URL Cloudinary
      // Format: https://res.cloudinary.com/cloud_name/image/upload/v123456/folder/filename.jpg
      const matches = imageUrl.match(/\/v\d+\/(.+)\.[^.]+$/);
      if (matches && matches[1]) {
        idToDelete = matches[1];
      }
    }

    if (!idToDelete) {
      return NextResponse.json(
        { error: 'Impossible d\'extraire le public ID' },
        { status: 400 }
      );
    }

    // Supprimer l'image
    const result = await cloudinary.uploader.destroy(idToDelete);

    if (result.result === 'ok') {
      return NextResponse.json({
        message: 'Image supprimée avec succès'
      });
    } else {
      return NextResponse.json(
        { error: 'Erreur lors de la suppression' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Erreur suppression:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du fichier' },
      { status: 500 }
    );
  }
}