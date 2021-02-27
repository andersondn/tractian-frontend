import { Form, Input, Button } from 'antd';
import {  formLayout } from "../../lib/helpers";
import { ICompany } from '../../types';


interface ICompanyForm {
    company?: ICompany,
    isLoading?: boolean,
    submitTitle?: String
    handlerSubmit(formData: ICompany): Promise<void>,
}

const CompanyForm = ({ company, isLoading = false, submitTitle = 'Enviar', handlerSubmit }: ICompanyForm) => {
  
    return (
        <>
            <Form
                {...formLayout}
                name="basic"
                onFinish={handlerSubmit}
                initialValues={company}
            >
                <Form.Item
                    label="Nome"
                    name="companyName"
                    rules={[{ required: true, message: 'Por favor informe o nome da empresa.' }]}
                >
                    <Input />
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


export default CompanyForm