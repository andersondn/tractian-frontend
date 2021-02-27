import { Form, Input, Button, Select, Upload, Image, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { unitsToOptionMap, usersToOptionMap, convertImageToBase64, formLayout } from '../../lib/helpers';
import useSWR from 'swr';
import { useState } from 'react';
import { AssetStatus, IAsset, IUnit, IUser } from '../../types';

const { Option } = Select;

interface IAssetForm {
    asset?: IAsset
    isLoading?: boolean,
    submitTitle?: String
    handlerSubmit(formData: IUser): Promise<void>,
}

const AssetForm = ({ asset, isLoading = false, submitTitle = 'Enviar', handlerSubmit }: IAssetForm) => {
    const [files, setFiles] = useState<any>()
    const { data: units } = useSWR<IUnit[]>('/unit')
    const { data: users } = useSWR<IUser[]>('/user')

    const InitialValues = {
        status: AssetStatus.inOperation,
        ...asset
    }

    const uploadProps = {
        multiple: false,
        maxCount: 1,
        showUploadList: false,
        async onChange({ file }: any) {
            if (file.status !== 'removed') {
                setFiles(await convertImageToBase64(file))
            }
        },
        beforeUpload: () => false
    };



    async function includeImageOnFormData(formData: any) {
        handlerSubmit({
            ...formData,
            imageBase64: files
        })
    }


    return (
        <Form
            {...formLayout}
            name="basic"
            onFinish={includeImageOnFormData}
            initialValues={InitialValues}
        >
            <Form.Item
                label="Nome do ativo"
                name="assetName"
                rules={[{ required: true, message: 'Por favor informe o nome do ativo' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Imagem"
            >
                <div className="img-preview">
                    <Image
                        placeholder={true}
                        width={200}
                        height={200}
                        src={files || asset?.imageUrl}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <Upload {...uploadProps} >

                    <Button icon={<UploadOutlined />}>Selecionar uma imagem</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                label="Descrição"
                name="description"
                rules={[{ required: true, message: 'Por favor informe a descrição do ativo.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Modelo"
                name="model"
                rules={[{ required: true, message: 'Por favor informe o modelo do ativo.' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Saúde do ativo"
                name="healthScore"
            >
                <InputNumber
                    defaultValue={100}
                    min={0}
                    max={100}
                    formatter={value => `${value}%`}
                    parser={(value: any) => value.replace('%', '')}

                />
            </Form.Item>

            <Form.Item label="Status" name="status"  >
                <Select allowClear>
                    <Option value={AssetStatus.inOperation}>Em Operação</Option>
                    <Option value={AssetStatus.inAlert}>Em Alerta</Option>
                    <Option value={AssetStatus.inDowntime}>Em Parada</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Responsável"
                name="userId"
                rules={[{ required: true, message: 'Por favor selecione um usuário.' }]}
            >
                <Select defaultValue="" allowClear>
                    <Option value="">Selecionar usuário</Option>
                    {users?.map(usersToOptionMap)}
                </Select>
            </Form.Item>

            <Form.Item
                label="Unidade"
                name="unitId"
                rules={[{ required: true, message: 'Por favor selecione uma unidade.' }]}

            >
                <Select defaultValue="" allowClear>
                    <Option value="">Selecionar unidade</Option>
                    {units?.map(unitsToOptionMap)}
                </Select>

            </Form.Item>
            <Form.Item wrapperCol={{ offset: 1, span: 6 }}>
                <Button
                    type="primary"
                    loading={isLoading}
                    htmlType="submit"
                >
                    {isLoading ? 'Salvando...' : submitTitle}
                </Button>
            </Form.Item>
        </Form>

    )
}

export default AssetForm