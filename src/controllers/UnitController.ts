import api from '../lib/api';
import { IUnit } from '../types';
import { mutate } from 'swr';


export const createUnit = async (formData: IUnit) => {
    const { data: newUnit } = await api.post('/unit', formData)
    mutate('/unit', async (units: IUnit[]) =>
        units && [...units, newUnit])
}

export const updateUnit = async (unitId: String | undefined, formData: IUnit) => {
    const { data: updatedUnit } = await api.put(`/unit/${unitId}`, formData)
    mutate(`/unit/${unitId}`, updatedUnit)
    mutate('/unit', (units: IUnit[]) =>
    units && units.map(unit => unit._id === unitId ? updatedUnit : unit))
}

export const deleteUnit = (unitId: string) => {
    api.delete(`/unit/${unitId}`)
    mutate('/unit', (units: IUnit[]) =>
        units && units.filter(unit => unit._id !== unitId), true)

}