import { useHistory, useParams } from "react-router-dom";
import useSWR from "swr";
import { IUser } from '../../types';
import UserForm from "./UserForm";
import { message, Spin, Result } from 'antd';
import { updateUser } from "../../controllers/UserController";
import { useState } from "react";

const UpdateUser = () => {
    const { userId } = useParams<Record<string, string | undefined>>();
    const { data: user, error } = useSWR<IUser>(`/user/${userId}`)
    const isDataLoading = !error && !user
    const history = useHistory()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    async function handlerSubmit(formData: IUser) {
        setIsLoading(true)

        try {
            await updateUser(user?._id, formData)
            message.success(`Usuário alterado com sucesso!`);
            history.push('/usuarios')

        } catch (error) {
            message.error(`Erro ao cadastrar o ativo.`);
            setIsLoading(false)

        }

    }

    if (error) return (
        <Result
            status="500"
            title="Erro ao carregar dados do usuário."
            subTitle="Por favor, verifique se usuário existe e se o servidor está respondendo corretamente"
        />
    )
    return (
        <>
        <h1>Editar usuário</h1>
            {isDataLoading ?
                <div className="center"><Spin /></div> :
                <UserForm
                    user={user}
                    handlerSubmit={handlerSubmit}
                    isLoading={isLoading}
                />

            }
        </>
    )
}

export default UpdateUser