import message from "antd/lib/message";
import { useState } from "react";
import { useHistory } from "react-router";
import { createCompany } from "../../controllers/CompanyController";
import { ICompany } from "../../types";
import CompanyForm from "./CompanyForm"

const CreateCompany = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const history = useHistory()

    async function handlerSubmit(formData: ICompany) {
        setIsLoading(true)
        try {
            await createCompany(formData)
            message.success(`Empresa cadastrado com sucesso!`);
            history.push('/empresas')

        } catch (error) {
            message.error(`Erro ao cadastrar empresa.`);
            setIsLoading(false)
        }

    }

    return (
        <>
        <h1>Adicionar Empresa</h1>
        <CompanyForm
            handlerSubmit={handlerSubmit}
            isLoading={isLoading}
        />
        </>
    )
}

export default CreateCompany