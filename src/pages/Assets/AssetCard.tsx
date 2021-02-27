import { Card, Col, Image, Progress, Space, Menu, Dropdown } from 'antd';
import { SettingOutlined,  EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { IAsset } from '../../types';
import { statusIndicator } from '../../lib/helpers';
import { Link, } from "react-router-dom";
import { deleteAsset } from '../../controllers/AssetController';
const { Meta } = Card;

const layoutCard = {
    xs: { span: 24, offset: 0 },
    sm: { span: 12, offset: 0 },
    lg: { span: 8, offset: 0 },
    xl: { span: 6, offset: 0 },
}


interface IAssetGridView {
    asset: IAsset
}
const AssetCard = ({ asset }: IAssetGridView) => {
    const dropdownActions = (
        <Menu>
            <Menu.Item icon={<EditTwoTone />}>
                <Link to={`/ativos/editar/${asset._id}`}>
                    Editar
                </Link>
            </Menu.Item>
            <Menu.Item 
            onClick={() => deleteAsset(asset._id)} 
            icon={<DeleteTwoTone twoToneColor="#bb0e0e" />} >
                Apagar
            </Menu.Item>
        </Menu>
    );
    

    return (

        <Col {...layoutCard} >

            <Card
                style={{ width: "auto", margin: "10px" }}
                cover={
                    <Image
                        alt=""
                        placeholder={true}
                        style={{ objectFit: 'cover' }}
                        height={200}
                        src={asset.imageUrl}
                    />
                }
                actions={[
                    statusIndicator(asset.status),
                    <h4>{asset.unit?.unitName}</h4>,
                    <Dropdown overlay={dropdownActions} trigger={['click']}>
                        <SettingOutlined key="setting" />
                    </Dropdown>
                    ,
                ]}
            >
                <Meta
                    avatar={
                        <Space direction='vertical' align="center">
                            <Progress
                                type="circle"
                                percent={asset.healthScore}
                                width={60}
                                strokeWidth={5}
                                format={healthScore => `${healthScore}%`}


                            />
                        </Space>
                    }
                    title={asset.assetName}
                    description={<Space direction='vertical'>
                        {asset.description}
                        {`Responsável: ${asset.user.name}`}
                    </Space>}
                />
            </Card>
        </Col>
    )
}

export default AssetCard