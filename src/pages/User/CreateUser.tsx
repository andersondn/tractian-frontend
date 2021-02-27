import message from "antd/lib/message";
import { useState } from "react";
import { useHistory } from "react-router";
import { createUser } from "../../controllers/UserController";
import { IUser } from "../../types";
import UserForm from "./UserForm"

const CreateUser = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const history = useHistory()

    async function handlerSubmit(formData: IUser) {
        setIsLoading(true)
        try {
            await createUser(formData)
            message.success(`Usuário cadastrado com sucesso!`);
            history.push('/usuarios')

        } catch (error) {
            message.error(`Erro ao cadastrar o Usuário.`);
            setIsLoading(false)
        }

    }

    return (
        <>
        <h1>Adicionar Usuário</h1>
        <UserForm
            handlerSubmit={handlerSubmit}
            isLoading={isLoading}
            submitTitle="Adicionar"

        />
        </>
    )
}

export default CreateUser