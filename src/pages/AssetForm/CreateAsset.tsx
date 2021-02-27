import { createAsset } from "../../controllers/AssetController";
import { useHistory } from "react-router";
import message from "antd/lib/message";
import { useState } from "react";
import AssetForm from "./AssetForm";

const CreateAsset = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const history = useHistory()

    async function handlerSubmit(data: any) {
        setIsLoading(true)

        try {
            await createAsset(data)
            message.success(`Ativo cadastrado com sucesso!`);
            history.push('/ativos')

        } catch (error) {
            message.error(`Erro ao cadastrar o ativo.`);
            setIsLoading(false)

        }
    }


    return (
        <>
            <h1>Adicionar novo ativo</h1>
            <AssetForm
                handlerSubmit={handlerSubmit}
                isLoading={isLoading}
            />
        </>
    )
}


export default CreateAsset