import { Form, Input, Select, Button } from 'antd';
import useSWR from 'swr';
import { companiesToOptionMap, formLayout } from "../../lib/helpers";
import { IUnit, ICompany } from '../../types';
const { Option } = Select;


interface IUnitForm {
    unit?: IUnit,
    isLoading?: boolean,
    submitTitle?: String
    handlerSubmit(formData: IUnit): Promise<void>,
}

const UnitForm = ({ unit, isLoading = false, submitTitle = 'Enviar', handlerSubmit }: IUnitForm) => {
  
    const { data: company } = useSWR<ICompany[]>('/company')

    return (
        <>
            <Form
                {...formLayout}
                name="basic"
                onFinish={handlerSubmit}
                initialValues={unit}
            >
                <Form.Item
                    label="Nome"
                    name="unitName"
                    rules={[{ required: true, message: 'Por favor informe o nome do usuário.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Empresa"
                    name="companyId"
                    rules={[{ required: true, message: 'Por favor selecione um usuário.' }]}
                >
                    <Select defaultValue="">
                        <Option value="">Selecionar empresa</Option>
                        {company?.map(companiesToOptionMap)}
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

        </>
    )
}


export default UnitForm