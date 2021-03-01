import { Form, Input, Select, Button } from 'antd';
import useSWR from 'swr';
import { companiesToOptionMap, formLayout } from "../../lib/helpers";
import { IUser, ICompany } from '../../types';
const { Option } = Select;


interface IUserForm {
    user?: IUser,
    isLoading?: boolean,
    submitTitle?: String
    handlerSubmit(formData: IUser): Promise<void>,
}

const UserForm = ({ user, isLoading = false, submitTitle = 'Enviar', handlerSubmit }: IUserForm) => {
  
    const { data: company } = useSWR<ICompany[]>('/company')

    return (
        <>
            <Form
                {...formLayout}
                name="basic"
                onFinish={handlerSubmit}
                initialValues={user}
            >
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: 'Por favor informe o nome do usuário.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[{ required: true, message: 'Por favor informe o email do usuário.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Empresa"
                    name="companyId"
                    rules={[{ required: true, message: 'Por favor selecione uma empresa.' }]}
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


export default UserForm