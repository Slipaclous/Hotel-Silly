/**
 * Props next/image pour l'aperçu flou d'un en-tête (blurDataURL calculé côté serveur
 * par withBlur). Sans miniature disponible : pas de placeholder.
 */
export function heroBlurProps(hero: unknown): { placeholder?: 'blur'; blurDataURL?: string } {
    const blur = (hero as { blurDataURL?: string | null } | null)?.blurDataURL;
    return blur ? { placeholder: 'blur', blurDataURL: blur } : {};
}
