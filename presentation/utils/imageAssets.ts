export type ImageCategory = 'albumes' | 'artistas' | 'canciones' | 'playlists' | 'podcasts';

const categoryImages: Record<ImageCategory, any[]> = {
    albumes: [
        require('../../assets/images/albumes/imagen1.jpeg'),
        require('../../assets/images/albumes/imagen2.jpeg'),
        require('../../assets/images/albumes/imagen3.jpeg'),
        require('../../assets/images/albumes/imagen4.jpeg'),
        require('../../assets/images/albumes/imagen5.jpeg'),
        require('../../assets/images/albumes/imagen6.jpeg'),
        require('../../assets/images/albumes/imagen7.jpeg'),
        require('../../assets/images/albumes/imagen8.jpg'),
        require('../../assets/images/albumes/imagen9.jpg'),
        require('../../assets/images/albumes/imagen10.jpg'),
    ],
    artistas: [
        require('../../assets/images/artistas/imagen1.avif'),
        require('../../assets/images/artistas/imagen2.webp'),
        require('../../assets/images/artistas/imagen3.avif'),
        require('../../assets/images/artistas/imagen4.avif'),
        require('../../assets/images/artistas/imagen5.jpg'),
        require('../../assets/images/artistas/imagen6.avif'),
        require('../../assets/images/artistas/imagen7.jpg'),
        require('../../assets/images/artistas/imagen8.jpeg'),
        require('../../assets/images/artistas/imagen9.jpg'),
        require('../../assets/images/artistas/imagen10.webp'),
    ],
    canciones: [
        require('../../assets/images/canciones/imagen1.jpg'),
        require('../../assets/images/canciones/imagen2.jpeg'),
        require('../../assets/images/canciones/imagen3.jpg'),
        require('../../assets/images/canciones/imagen4.jpeg'),
        require('../../assets/images/canciones/imagen5.jpg'),
        require('../../assets/images/canciones/imagen6.jpg'),
        require('../../assets/images/canciones/imagen7.jpeg'),
        require('../../assets/images/canciones/imagen8.jpeg'),
        require('../../assets/images/canciones/imagen9.jpg'),
        require('../../assets/images/canciones/imagen10.jpg'),
    ],
    playlists: [
        require('../../assets/images/playlists/imagen1.webp'),
        require('../../assets/images/playlists/imagen2.webp'),
        require('../../assets/images/playlists/imagen3.webp'),
        require('../../assets/images/playlists/imagen4.jpeg'),
        require('../../assets/images/playlists/imagen5.jpg'),
        require('../../assets/images/playlists/imagen6.jpeg'),
        require('../../assets/images/playlists/imagen7.webp'),
        require('../../assets/images/playlists/imagen9.jpg'),
        require('../../assets/images/playlists/imagen10.jpg'),
    ],
    podcasts: [
        require('../../assets/images/podcasts/imagen1.jpg'),
        require('../../assets/images/podcasts/imagen2.jpg'),
        require('../../assets/images/podcasts/imagen3.jpg'),
        require('../../assets/images/podcasts/imagen4.jpeg'),
        require('../../assets/images/podcasts/imagen5.webp'),
        require('../../assets/images/podcasts/imagen6.webp'),
        require('../../assets/images/podcasts/imagen7.jpeg'),
        require('../../assets/images/podcasts/imagen8.jpeg'),
        require('../../assets/images/podcasts/imagen9.webp'),
        require('../../assets/images/podcasts/imagen10.jpeg'),
    ],
};

export const getRandomImage = (category: ImageCategory = 'canciones') => {
    const images = categoryImages[category] || categoryImages.canciones;
    return images[Math.floor(Math.random() * images.length)];
};

export const isValidImageUrl = (url?: string | null): boolean => {
    if (!url) return false;
    if (typeof url !== 'string') return false;
    const cleanUrl = url.trim().toLowerCase();
    if (cleanUrl === '' || cleanUrl === 'null' || cleanUrl === 'undefined') return false;

    return cleanUrl.startsWith('http');
};

export const getImageSource = (image: any) => {
    if (!image) return null;
    if (typeof image === 'string') {
        if (image.startsWith('http') || image.startsWith('https')) {
            return { uri: image };
        }
        return null;
    }
    return image;
};
