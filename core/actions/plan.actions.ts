import { spotifyApi } from '../api/spotifyApi';
import { ApiSuscripcion } from '../../infrastructure/interfaces/api.interfaces';
import { Suscripcion } from '../../infrastructure/interfaces/app.interfaces';
import { mapSuscripcion } from '../../infrastructure/mappers/entity.mapper';

export const getPlanAction = async (userId: number): Promise<any> => {
    const { data } = await spotifyApi.get(`/usuarios/${userId}/plan`);
    return data;
};

export const upgradePremiumAction = async (userId: number): Promise<any> => {
    const { data } = await spotifyApi.post(`/usuarios/${userId}/premium`, {
        renovar_pago: true
    });
    return data;
};

export const getPaymentsAction = async (userId: number): Promise<any[]> => {
    const { data } = await spotifyApi.get(`/usuarios/${userId}/pagos`);
    return data;
};

export const getSubscriptionAction = async (subscriptionId: number): Promise<Suscripcion> => {
    const { data } = await spotifyApi.get<ApiSuscripcion>(`/suscripciones/${subscriptionId}`);
    return mapSuscripcion(data);
};
