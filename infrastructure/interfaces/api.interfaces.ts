// ─── Raw API Response Interfaces ───
// These match the exact shape returned by the backend API

export interface ApiLoginResponse {
    token: string;
    usuario: ApiUsuario;
}

export interface ApiUsuario {
    id: number;
    username: string;
    email: string;
    genero?: string;
    fecha_nacimiento: string;
    pais?: string;
    codigo_postal?: string;
    roles?: string[];
}

export interface ApiCancion {
    id: number;
    titulo: string;
    duracion: number;
    ruta?: string;
    numero_reproducciones: number;
    album?: ApiAlbum;
}

export interface ApiAlbum {
    id: number;
    titulo: string;
    imagen: string;
    patrocinado: boolean;
    anyo?: string;
    artista?: ApiArtista;
}

export interface ApiArtista {
    id: number;
    nombre: string;
    imagen?: string;
}

export interface ApiPlaylist {
    id: number;
    titulo: string;
    numero_canciones?: number;
    fecha_creacion?: string;
    usuario?: ApiUsuario;
}

export interface ApiPodcast {
    id: number;
    titulo: string;
    imagen?: string;
    descripcion?: string;
    anyo?: string;
}

export interface ApiCapitulo {
    id: number;
    titulo: string;
    descripcion?: string;
    duracion: number;
    fecha: string;
    numero_reproducciones: number;
    podcast?: ApiPodcast;
}

export interface ApiCalidad {
    id: number;
    nombre: string;
}

export interface ApiTipoDescarga {
    id: number;
    nombre: string;
}

export interface ApiIdioma {
    id: number;
    nombre: string;
}

export interface ApiConfiguracion {
    autoplay: boolean;
    ajuste: boolean;
    normalizacion: boolean;
    calidad?: ApiCalidad;
    tipo_descarga?: ApiTipoDescarga;
    idioma?: ApiIdioma;
}

export interface ApiPlanFree {
    fecha_revision: string;
    tiempo_publicidad: number;
    usuario?: ApiUsuario;
}

export interface ApiPlanPremium {
    fecha_renovacion: string;
    usuario?: ApiUsuario;
}

export interface ApiSuscripcion {
    id: number;
    fecha_inicio: string;
    fecha_fin: string;
    premium_usuario?: ApiPlanPremium;
}
