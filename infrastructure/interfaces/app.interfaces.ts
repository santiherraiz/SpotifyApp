// ─── Clean App Interfaces ───
// These are the domain models used throughout the app

export interface Usuario {
    id: number;
    username: string;
    email: string;
    genero?: string;
    fechaNacimiento: string;
    pais?: string;
    codigoPostal?: string;
}

export interface Cancion {
    id: number;
    titulo: string;
    duracion: number;
    ruta?: string;
    numeroReproducciones: number;
    album: Album;
}

export interface Album {
    id: number;
    titulo: string;
    imagen: any;
    patrocinado: boolean;
    anyo?: string;
    artista: Artista;
}

export interface Artista {
    id: number;
    nombre: string;
    imagen?: any;
}

export interface Playlist {
    id: number;
    titulo: string;
    imagen?: any;
    numeroCanciones?: number;
    fechaCreacion?: string;
    usuario: Usuario;
}

export interface Podcast {
    id: number;
    titulo: string;
    imagen?: any;
    descripcion?: string;
    anyo?: string;
}

export interface Capitulo {
    id: number;
    titulo: string;
    descripcion?: string;
    duracion: number;
    fecha: string;
    numeroReproducciones: number;
    podcast: Podcast;
}

export interface Configuracion {
    autoplay: boolean;
    ajuste: boolean;
    normalizacion: boolean;
    calidad: { id: number; nombre: string };
    tipoDescarga: { id: number; nombre: string };
    idioma: { id: number; nombre: string };
}

export interface PlanFree {
    fechaRevision: string;
    tiempoPublicidad: number;
    usuario: Usuario;
}

export interface PlanPremium {
    fechaRenovacion: string;
    usuario: Usuario;
}

export interface Suscripcion {
    id: number;
    fechaInicio: string;
    fechaFin: string;
    premiumUsuario: PlanPremium;
}

export interface AuthResponse {
    token: string;
    user: Usuario;
}

// Search result type
export interface SearchResults {
    canciones: Cancion[];
    artistas: Artista[];
    albums: Album[];
    playlists: Playlist[];
    podcasts: Podcast[];
}
