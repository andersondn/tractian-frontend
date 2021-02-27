import { useHistory, useParams } from "react-router";
import useSWR from "swr";
import { IAsset } from '../../types';
import { message, Spin, Result } from 'antd';
import { useState } from "react";
import { updateAsset } from '../../controllers/AssetController';
import AssetForm from "./AssetForm";

export default function UpdateAsset() {
    const { assetId } = useParams<Record<string, string | undefined>>();
    const { data: asset, error } = useSWR<IAsset>(`/asset/${assetId}`)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const isDataLoading = !error && !asset
    const history = useHistory()

    async function handlerSubmit(data: any) {
        setIsLoading(true)

        try {
            await updateAsset(assetId, data)
            message.success(`Ativo alterado com sucesso!`);
            history.push('/ativos')

        } catch (error) {
            message.error(`Erro ao cadastrar o ativo.`);
            setIsLoading(false)

        }
    }

    if (error) return (
        <Result
            status="500"
            title="Erro ao carregar ativo."
            subTitle="Por favor, verifique se o ativo existe e se o servidor está respondendo corretamente"
        />
    )

    return (
        <>
        <h1>Editar ativo</h1>
            {isDataLoading ?
                <div className="center"><Spin /></div> :
                <AssetForm
                    asset={asset}
                    handlerSubmit={handlerSubmit}
                    isLoading={isLoading}
                />


            }
        </>
    )
}