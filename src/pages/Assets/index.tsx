import { UnorderedListOutlined, AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { usersToOptionMap, unitsToOptionMap } from '../../lib/helpers';
import { Select, Button,   Space } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useState } from 'react';
import AssetListView from './ListView';
import AssetGridView from './GridView';
import { Link } from 'react-router-dom';
import useSWR from "swr"
import { IAsset, IUnit, IUser } from '../../types';
import useAssetFilter from '../../hooks/useFilter';
const { Option } = Select;

const AssetsPage = () => {

	const { data: assets, error } = useSWR<IAsset[]>('/asset')
	const { data: units } = useSWR<IUnit[]>('/unit')
	const { data: users } = useSWR<IUser[]>('/user')
	const [isListView, setListView] = useState<Boolean>(true)
    const isDataLoading = !error && !assets

	const [filteredAssets, setAssetFilter] = useAssetFilter(assets)


	const handlerListView = () => {
		setListView((value: Boolean) => !value)
	}

	return (
		<>
			<h1>Ativos</h1>
			<Space size={6} className='flex-gap' wrap={true}>
				<Search placeholder="Pesquisar ativo" allowClear onChange={(event) => setAssetFilter({search:event.target.value})} style={{ width: 200 }} />

				<Select defaultValue="" style={{ width: 180 }} onChange={(unit: String) => setAssetFilter({unit})}>
					<Option value="">Todas unidades</Option>
					{units?.map(unitsToOptionMap)}
				</Select>

				<Select defaultValue="" style={{ width: 180 }} onChange={(user: String) => setAssetFilter({user})}>
					<Option value="">Todos usuários</Option>
					{users?.map(usersToOptionMap)}
				</Select>

				<Button icon={isListView ? <AppstoreOutlined /> : <UnorderedListOutlined />} onClick={handlerListView} />
				
				<Link to="/ativos/adicionar">
					<Button icon={<PlusOutlined />}>Adicionar</Button>
				</Link>

			</Space>

			{isListView ?
				<AssetListView assets={filteredAssets} isLoading={isDataLoading} />:
				<AssetGridView assets={filteredAssets} />
			}

		</>

	)
}

export default AssetsPage