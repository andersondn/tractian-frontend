import api from '../lib/api';
import { ICompany } from '../types';
import { mutate } from 'swr';


export const createCompany = async (formData: ICompany) => {
    const { data: newCompany } = await api.post('/company', formData)
    mutate('/company', async (companies: ICompany[]) =>
        companies && [...companies, newCompany])
}

export const updateCompany = async (companyId: String | undefined, formData: ICompany) => {
    const { data: updatedCompany } = await api.put(`/company/${companyId}`, formData)
    mutate(`/company/${companyId}`, updatedCompany)
    mutate('/company', (companies: ICompany[]) =>
    companies && companies.map(company => company._id === companyId ? updatedCompany : company))
}

export const deleteCompany = (companyId: string) => {
    api.delete(`/company/${companyId}`)
    mutate('/company', (companies: ICompany[]) =>
        companies && companies.filter(company => company._id !== companyId), true)

}