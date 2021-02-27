import { useHistory, useParams } from "react-router-dom";
import useSWR from "swr";
import { ICompany } from '../../types';
import CompanyForm from "./CompanyForm";
import { message, Spin, Result } from 'antd';
import { updateCompany } from "../../controllers/CompanyController";
import { useState } from "react";

const UpdateCompany = () => {
    const { companyId } = useParams<Record<string, string | undefined>>();
    const { data: company, error } = useSWR<ICompany>(`/company/${companyId}`)
    const isDataLoading = !error && !company
    const history = useHistory()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    async function handlerSubmit(formData: ICompany) {
        setIsLoading(true)

        try {
            await updateCompany(company?._id, formData)
            message.success(`Empresa alterada com sucesso!`);
            history.push('/empresas')

        } catch (error) {
            message.error(`Erro ao atualizar empresa.`);
            setIsLoading(false)

        }

    }

    if (error) return (
        <Result
            status="500"
            title="Erro ao carregar dados da empresa."
            subTitle="Por favor, verifique se a empresa existe e se o servidor está respondendo corretamente"
        />
    )
    return (
        <>
        {JSON.stringify(error)}
        <h1>Editar empresa</h1>
            {isDataLoading ?
                <div className="center"><Spin /></div> :
                <CompanyForm
                    company={company}
                    handlerSubmit={handlerSubmit}
                    isLoading={isLoading}
                />

            }
        </>
    )
}

export default UpdateCompany