import { useHistory, useParams } from "react-router-dom";
import useSWR from "swr";
import { IUnit } from '../../types';
import UnitForm from "./UnitForm";
import { message, Spin, Result } from 'antd';
import { updateUnit } from "../../controllers/UnitController";
import { useState } from "react";

const UpdateUnit = () => {
    const { unitId } = useParams<Record<string, string | undefined>>();
    const { data: unit, error } = useSWR<IUnit>(`/unit/${unitId}`)
    const isDataLoading = !error && !unit
    const history = useHistory()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    async function handlerSubmit(formData: IUnit) {
        setIsLoading(true)

        try {
            await updateUnit(unit?._id, formData)
            message.success(`Unidade alterada com sucesso!`);
            history.push('/unidades')

        } catch (error) {
            message.error(`Erro ao cadastrar unidade.`);
            setIsLoading(false)

        }

    }

    if (error) return (
        <Result
            status="500"
            title="Erro ao carregar dados da unidade."
            subTitle="Por favor, verifique se a unidade existe e se o servidor está respondendo corretamente"
        />
    )
    return (
        <>
        <h1>Editar Unidade</h1>
            {isDataLoading ?
                <div className="center"><Spin /></div> :
                <UnitForm
                    unit={unit}
                    handlerSubmit={handlerSubmit}
                    isLoading={isLoading}
                />

            }
        </>
    )
}

export default UpdateUnit