import { Row, Table, Button, Space, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { IUser } from '../../types';
import { Link } from 'react-router-dom';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { deleteUser } from '../../controllers/UserController';



const UserPage = () => {

	const { data: users, error } = useSWR<IUser[]>('/user')
	const isDataLoading = !error && !users

	const actionsButtons = (text: string, user: any) => (
		<Space>
			<Tooltip title="Editar">
				<Link to={`/usuarios/editar/${user._id}`}>
					<Button
						shape="circle"
						icon={<EditTwoTone />}
					/>
				</Link>
			</Tooltip>
			<Tooltip title="Apagar">
				<Button
					shape="circle"
					onClick={() => deleteUser(user._id)}
					icon={<DeleteTwoTone twoToneColor="#bb0e0e" />}
					danger
				/>
			</Tooltip>
		</Space>
	)

	const columns: any = [
		{
			title: 'Nome',
			dataIndex: 'name',

		},
		{
			title: 'E-mail',
			dataIndex: 'email',

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
			<h1>Usuários</h1>
			<Row justify='end'>
				<Link to="/usuarios/adicionar">

					<Button icon={<PlusOutlined />}>Adicionar</Button>
				</Link>

			</Row>
			<Table
				columns={columns}
				dataSource={users}
				rowKey="_id"
				loading={isDataLoading}
			/>
		</>

	)
}

export default UserPage