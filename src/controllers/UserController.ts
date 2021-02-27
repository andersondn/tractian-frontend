import api from '../lib/api';
import { IUser } from '../types';
import { mutate } from 'swr';


export const createUser = async (formData: IUser) => {
    const { data: newUser } = await api.post('/user', formData)
    mutate('/user', async (users: IUser[]) =>
        users && [...users, newUser])
}

export const updateUser = async (userId: String | undefined, formData: IUser) => {
    const { data: updatedUser } = await api.put(`/user/${userId}`, formData)
    mutate(`/user/${userId}`, updatedUser)
    mutate('/user', (users: IUser[]) =>
    users && users.map(user => user._id === userId ? updatedUser : user))
}

export const deleteUser = (userId: string) => {
    api.delete(`/user/${userId}`)
    mutate('/user', (users: IUser[]) =>
        users && users.filter(user => user._id !== userId), true)

}