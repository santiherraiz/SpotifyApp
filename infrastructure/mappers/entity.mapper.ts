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
export const mapArtista = (raw: ApiArtista): Artista => ({
    id: raw.id,
    nombre: raw.nombre,
    imagen: raw.imagen,
});

// ─── Album ───
export const mapAlbum = (raw: ApiAlbum): Album => ({
    id: raw.id,
    titulo: raw.titulo,
    imagen: raw.imagen,
    patrocinado: raw.patrocinado,
    anyo: raw.anyo,
    artista: raw.artista ? mapArtista(raw.artista) : { id: 0, nombre: 'Desconocido' },
});

// ─── Cancion ───
export const mapCancion = (raw: ApiCancion): Cancion => ({
    id: raw.id,
    titulo: raw.titulo,
    duracion: raw.duracion,
    ruta: raw.ruta,
    numeroReproducciones: raw.numero_reproducciones,
    album: raw.album ? mapAlbum(raw.album) : { id: 0, titulo: '', imagen: '', patrocinado: false, artista: { id: 0, nombre: '' } },
});

// ─── Playlist ───
export const mapPlaylist = (raw: ApiPlaylist): Playlist => ({
    id: raw.id,
    titulo: raw.titulo,
    numeroCanciones: raw.numero_canciones,
    fechaCreacion: raw.fecha_creacion,
    usuario: raw.usuario ? mapUsuario(raw.usuario) : { id: 0, username: '', email: '', fechaNacimiento: '' },
});

// ─── Podcast ───
export const mapPodcast = (raw: ApiPodcast): Podcast => ({
    id: raw.id,
    titulo: raw.titulo,
    imagen: raw.imagen,
    descripcion: raw.descripcion,
    anyo: raw.anyo,
});

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
