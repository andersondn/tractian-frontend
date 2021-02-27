import { Row, Col, Space, Select } from 'antd';
import useSWR from 'swr';
import AssetsHealthChart from './AssetHealthChart';
import { IAsset, IUnit, IUser } from '../../types';
import AssetsStatusChart from './AssetStatusChart';
import AssetsPerUnitChart from './AssetsPerUnitChart';
import { unitsToOptionMap, usersToOptionMap } from '../../lib/helpers';
import useAssetFilter from '../../hooks/useFilter';
const { Option } = Select;

const HomePage = () => {
    const { data: assets } = useSWR<IAsset[]>('/asset')
    const { data: units } = useSWR<IUnit[]>('/unit')
    const { data: users } = useSWR<IUser[]>('/user')
    const [filteredAssets, setAssetFilter] = useAssetFilter(assets)

    const layoutCard = {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 0 },
        xl: { span: 12 },

    }

    return (
        <>
            <h1>Home</h1>
            <Space size={6} className='flex-gap' wrap={true}>

                <Select defaultValue="" style={{ width: 180 }} onChange={(unit: String) => setAssetFilter({ unit })}>
                    <Option value="">Todas unidades</Option>
                    {units?.map(unitsToOptionMap)}
                </Select>

                <Select defaultValue="" style={{ width: 180 }} onChange={(user: String) => setAssetFilter({ user })}>
                    <Option value="">Todos usuários</Option>
                    {users?.map(usersToOptionMap)}
                </Select>



            </Space>
            <Row>
                <Col {...layoutCard} style={{ padding: 10 }}>
                    <AssetsPerUnitChart assets={filteredAssets} />
                </Col>
                <Col {...layoutCard} style={{ padding: 10 }}>
                    <AssetsStatusChart assets={filteredAssets} />
                </Col>
                <Col span={24}>
                    <AssetsHealthChart assets={filteredAssets} />
                </Col>
            </Row>
        </>
    )
}

export default HomePage