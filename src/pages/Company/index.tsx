import { Row, Table, Button, Space, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { ICompany } from '../../types';
import { Link } from 'react-router-dom';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { deleteCompany } from '../../controllers/CompanyController';



const CompanyPage = () => {

	const { data: companies, error } = useSWR<ICompany[]>('/company')
	const isDataLoading = !error && !companies

	const actionsButtons = (text: string, company: any) => (
		<Space>
			<Tooltip title="Editar">
				<Link to={`/empresas/editar/${company._id}`}>
					<Button
						shape="circle"
						icon={<EditTwoTone />}
					/>
				</Link>
			</Tooltip>
			<Tooltip title="Apagar">
				<Button
					shape="circle"
					onClick={() => deleteCompany(company._id)}
					icon={<DeleteTwoTone twoToneColor="#bb0e0e" />}
					danger
				/>
			</Tooltip>
		</Space>
	)

	const columns: any = [
		{
			title: 'Nome',
			dataIndex: 'companyName',

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
			<h1>Empresas</h1>
			<Row justify='end'>
				<Link to="/empresas/adicionar">
					<Button icon={<PlusOutlined />}>Adicionar</Button>
				</Link>

			</Row>
			<Table
				columns={columns}
				dataSource={companies}
				rowKey="_id"
				loading={isDataLoading}
			/>
		</>

	)
}

export default CompanyPage