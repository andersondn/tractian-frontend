import { Table, Progress, Image, Space, Tooltip, Button } from 'antd';
import { AssetStatus, IAsset } from '../../types';
import { statusIndicator } from '../../lib/helpers';
import { ColumnsType } from 'antd/lib/table';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { deleteAsset } from '../../controllers/AssetController';

interface IAssetListView {
	assets: IAsset[],
	isLoading: boolean

}


const AssetListView = ({ assets, isLoading }: IAssetListView) => {

	const actionsButtons = (text: string, asset: any) => (
		<Space>
			<Tooltip title="Editar">
				<Link to={`/ativos/editar/${asset._id}`}>
					<Button
						shape="circle"
						icon={<EditTwoTone />}
					/>
				</Link>
			</Tooltip>
			<Tooltip title="Apagar">
				<Button
					shape="circle"
					onClick={() => deleteAsset(asset._id)}
					danger
					icon={<DeleteTwoTone twoToneColor="#bb0e0e" />}
				/>
			</Tooltip>
		</Space>
	)

	const columns: ColumnsType<object> = [
		{
			title: 'Imagem',
			dataIndex: 'imageUrl',

			render: (text: any) => <Image
				src={text}
				width={80}
				placeholder={true}
				style={{ objectFit: 'cover' }}
				height={80}
			/>,
			width: 120,
			// responsive: ["sm"]
		},
		{
			title: 'Ativo / Descrição',
			dataIndex: 'assetName',
			key: 'assetName',
			render: (assetName: string, asset: any) => (
				<Space direction="vertical" >
					<span>{assetName}</span>
					<span>{asset.description}</span>
				</Space>),


		},
		{
			title: 'Modelo',
			dataIndex: 'model',
			key: 'unitId',

		},
		{
			title: 'Unidade',
			dataIndex: ['unit', 'unitName'],
			key: 'unitId',

		},

		{
			title: 'Responsável',
			dataIndex: ['user', 'name'],
			key: 'unitId',
		},
		{
			title: 'Saúde',
			dataIndex: 'healthScore',
			render: (healthScore: number) => <Progress
				percent={healthScore}
				size="default"
				format={healthScore => `${healthScore}%`}

			/>,
			width: 160,
		},

		{
			title: 'Empresa',
			dataIndex: ['unit', 'company', 'companyName'],
		},
		{
			title: 'Status',
			dataIndex: 'status',
			width: 150,
			render: (status: AssetStatus) => (
				<span>
					{statusIndicator(status)}
				</span>
			),
		},
		{
			title: 'Ações',
			key: 'actions',
			width: 20,
			render: actionsButtons
		},
	];

	return (
		<div >

			<Table
				columns={columns}
				loading={isLoading}
				dataSource={assets}
				rowKey="_id"
				className="responsive-table"

			/>
		</div>

	)

}

export default AssetListView