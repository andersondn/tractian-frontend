import { Row, Table, Button, Space, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { IUnit } from '../../types';
import { Link } from 'react-router-dom';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { deleteUnit } from '../../controllers/UnitController';



const UnitPage = () => {

	const { data: units, error } = useSWR<IUnit[]>('/unit')
	const isDataLoading = !error && !units

	const actionsButtons = (text: string, unit: any) => (
		<Space>
			<Tooltip title="Editar">
				<Link to={`/unidades/editar/${unit._id}`}>
					<Button
						shape="circle"
						icon={<EditTwoTone />}
					/>
				</Link>
			</Tooltip>
			<Tooltip title="Apagar">
				<Button
					shape="circle"
					onClick={() => deleteUnit(unit._id)}
					icon={<DeleteTwoTone twoToneColor="#bb0e0e" />}
					danger
				/>
			</Tooltip>
		</Space>
	)

	const columns: any = [
		{
			title: 'Nome',
			dataIndex: 'unitName',

		},
		{
			title: 'Empresa',
			dataIndex: ['company', 'companyName'],
		},
		{
			title: 'Ações',
			key: 'actions',
			width: 20,
			render: actionsButtons
		},
	]


	return (
		<>
			<h1>Unidades</h1>
			<Row justify='end'>
				<Link to="/unidades/adicionar">

					<Button icon={<PlusOutlined />}>Adicionar</Button>
				</Link>

			</Row>
			<Table
				columns={columns}
				dataSource={units}
				rowKey="_id"
				loading={isDataLoading}
			/>
		</>

	)
}

export default UnitPage