import message from "antd/lib/message";
import { useState } from "react";
import { useHistory } from "react-router";
import { createUnit } from "../../controllers/UnitController";
import { IUnit } from "../../types";
import UnitForm from "./UnitForm"

const CreateUnit = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const history = useHistory()

    async function handlerSubmit(formData: IUnit) {
        setIsLoading(true)
        try {
            await createUnit(formData)
            message.success(`Unidade cadastrada com sucesso!`);
            history.push('/unidades')

        } catch (error) {
            message.error(`Erro ao cadastrar unidade.`);
            setIsLoading(false)
        }

    }

    return (
        <>
        <h1>Adicionar Unidade</h1>
        <UnitForm
            handlerSubmit={handlerSubmit}
            isLoading={isLoading}
            submitTitle="Adicionar"
        />
        </>
    )
}

export default CreateUnit