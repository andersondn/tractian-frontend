import { message, Select, Tag } from 'antd';
import { IUnit, IUser, AssetStatus, ICompany } from '../types';
import { SyncOutlined, ExclamationCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
const { Option } = Select;


export function usersToOptionMap(user: IUser) {
    return <Option key={user._id} value={user._id} >{user.name}</Option>

}
export function unitsToOptionMap(unit: IUnit) {
    return <Option key={unit._id} value={unit._id} >{unit.unitName}</Option>

}
export function companiesToOptionMap(company: ICompany) {
    return <Option key={company._id} value={company._id} >{company.companyName}</Option>

}

export function convertImageToBase64(file: any) {
    return new Promise((resolve, reject) => {

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Formato inválido, envie um arquivo JPG/PNG.');
            return
        }       
        ///Verify file size
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Sua imagem deve ser menor que 2MB!');
            return
        }
        ///Prepare base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {

            resolve(reader.result);
        };
        reader.onerror = (error) => {
            message.error(`${file.name} Erro ao carregar a imagem.`);
            resolve(null)
        };
    })

}



export function statusIndicator(status: AssetStatus) {

    switch (status) {

        case AssetStatus.inAlert:
            return <Tag icon={<ExclamationCircleOutlined />} color="warning">Em Alerta</Tag>
                ;
        case AssetStatus.inDowntime:
            return <Tag icon={<MinusCircleOutlined />} color="error">Em Parada</Tag>
                ;
        case AssetStatus.inOperation:
            return <Tag icon={<SyncOutlined spin />} color="success">Em Operação</Tag>
                ;

    }
}


export const formLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
        lg: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        lg: { span: 6 }
    },
};