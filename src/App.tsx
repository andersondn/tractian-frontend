import React from 'react';
import { Layout } from 'antd';
import Routes from './lib/router';
import { BrowserRouter as Router, } from "react-router-dom";
import api from './lib/api';
import { SWRConfig } from 'swr';
import AppSlider from './components/Slider';


const { Header, Content, Footer, } = Layout;


function App() {
	const fetcher = (url: string) => api(url).then(r => r.data)

	return (
			<SWRConfig value={{ fetcher: fetcher }}>
				<Router>
					<Layout style={{ minHeight: "100vh" }}>
						<AppSlider />
						<Layout>
							<Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
							<Content style={{ margin: '24px 16px 0' }}>
								<Routes />
							</Content>
							<Footer style={{ textAlign: 'center' }}>Sasho ©2021 Desenvolvido por Anderson Nunes </Footer>
						</Layout>
					</Layout>
				</Router>
			</SWRConfig>
	);
}

export default App;