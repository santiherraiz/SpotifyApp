import {
    ApiUsuario,
    ApiCancion,
    ApiAlbum,
    ApiArtista,
    ApiPlaylist,
    ApiPodcast,
    ApiCapitulo,
    ApiConfiguracion,
    ApiPlanFree,
    ApiPlanPremium,
    ApiSuscripcion,
} from '../interfaces/api.interfaces';

import {
    Usuario,
    Cancion,
    Album,
    Artista,
    Playlist,
    Podcast,
    Capitulo,
    Configuracion,
    PlanFree,
    PlanPremium,
    Suscripcion,
} from '../interfaces/app.interfaces';
import { getRandomImage, isValidImageUrl } from '../../presentation/utils/imageAssets';

// ─── Usuario ───
export const mapUsuario = (raw: ApiUsuario): Usuario => ({
    id: raw.id,
    username: raw.username,
    email: raw.email,
    genero: raw.genero,
    fechaNacimiento: raw.fecha_nacimiento,
    pais: raw.pais,
    codigoPostal: raw.codigo_postal,
});

// ─── Artista ───
export const mapArtista = (raw: any): Artista => {
    const data = raw.artista ? raw.artista : raw;
    return {
        id: data.id,
        nombre: data.nombre,
        imagen: isValidImageUrl(data.imagen) ? data.imagen : getRandomImage('artistas'),
    };
};

// ─── Album ───
export const mapAlbum = (raw: any): Album => {

    const data = raw.album ? raw.album : raw;

    return {
        id: data.id,
        titulo: data.titulo,
        imagen: isValidImageUrl(data.imagen) ? data.imagen : getRandomImage('albumes'),
        patrocinado: data.patrocinado,
        anyo: data.anyo,
        artista: data.artista ? mapArtista(data.artista) : { id: 0, nombre: 'Desconocido' },
    };
};

// ─── Cancion ───
export const mapCancion = (raw: any): Cancion => {
    const data = raw.cancion ? raw.cancion : raw;

    return {
        id: data.id,
        titulo: data.titulo,
        duracion: data.duracion,
        ruta: data.ruta,
        numeroReproducciones: data.numeroReproducciones ?? data.numero_reproducciones ?? 0,
        album: data.album ? mapAlbum(data.album) : { id: 0, titulo: '', imagen: getRandomImage('albumes'), patrocinado: false, artista: { id: 0, nombre: '' } },
    };
};

// ─── Playlist ───
export const mapPlaylist = (raw: ApiPlaylist): Playlist => ({
    id: raw.id,
    titulo: raw.titulo,
    imagen: getRandomImage('playlists'),
    numeroCanciones: raw.numero_canciones,
    fechaCreacion: raw.fecha_creacion,
    usuario: raw.usuario ? mapUsuario(raw.usuario) : { id: 0, username: '', email: '', fechaNacimiento: '' },
});


// ─── Podcast ───
export const mapPodcast = (raw: any): Podcast => {
    const data = raw.podcast ? raw.podcast : raw;
    return {
        id: data.id,
        titulo: data.titulo,
        imagen: isValidImageUrl(data.imagen) ? data.imagen : getRandomImage('podcasts'),
        descripcion: data.descripcion,
        anyo: data.anyo,
    };
};


// ─── Capitulo ───
export const mapCapitulo = (raw: ApiCapitulo): Capitulo => ({
    id: raw.id,
    titulo: raw.titulo,
    descripcion: raw.descripcion,
    duracion: raw.duracion,
    fecha: raw.fecha,
    numeroReproducciones: raw.numero_reproducciones,
    podcast: raw.podcast ? mapPodcast(raw.podcast) : { id: 0, titulo: '' },
});

// ─── Configuracion ───
export const mapConfiguracion = (raw: ApiConfiguracion): Configuracion => ({
    autoplay: raw.autoplay,
    ajuste: raw.ajuste,
    normalizacion: raw.normalizacion,
    calidad: raw.calidad ?? { id: 0, nombre: 'Normal' },
    tipoDescarga: raw.tipo_descarga ?? { id: 0, nombre: 'Normal' },
    idioma: raw.idioma ?? { id: 0, nombre: 'Español' },
});

// ─── PlanFree ───
export const mapPlanFree = (raw: ApiPlanFree): PlanFree => ({
    fechaRevision: raw.fecha_revision,
    tiempoPublicidad: raw.tiempo_publicidad,
    usuario: raw.usuario ? mapUsuario(raw.usuario) : { id: 0, username: '', email: '', fechaNacimiento: '' },
});

// ─── PlanPremium ───
export const mapPlanPremium = (raw: ApiPlanPremium): PlanPremium => ({
    fechaRenovacion: raw.fecha_renovacion,
    usuario: raw.usuario ? mapUsuario(raw.usuario) : { id: 0, username: '', email: '', fechaNacimiento: '' },
});

// ─── Suscripcion ───
export const mapSuscripcion = (raw: ApiSuscripcion): Suscripcion => ({
    id: raw.id,
    fechaInicio: raw.fecha_inicio,
    fechaFin: raw.fecha_fin,
    premiumUsuario: raw.premium_usuario
        ? mapPlanPremium(raw.premium_usuario)
        : { fechaRenovacion: '', usuario: { id: 0, username: '', email: '', fechaNacimiento: '' } },
});
