import { mutate } from "swr";
import api from "../lib/api";
import { IAsset } from '../types';

export const createAsset = async (formData: IAsset) => {
    const { data: newAsset } = await api.post<IAsset>('/asset', formData)

    mutate('/user', async (asset: IAsset[]) =>
        asset && [...asset, newAsset])

}

export const updateAsset = async (assetId: string | undefined, formData: IAsset,) => {
    const { data: updatedAsset } = await api.put<IAsset>(`/asset/${assetId}`, formData)

    mutate(`/asset/${assetId}`, updatedAsset)
    mutate('/asset', (assets: IAsset[]) =>
        assets && assets.map(asset => asset._id === assetId ? updatedAsset : asset))
}


export const deleteAsset = (assetId: string) => {
    api.delete(`/asset/${assetId}`)
    mutate('/asset', (assets: IAsset[]) => assets.filter(asset => asset._id !== assetId))
}