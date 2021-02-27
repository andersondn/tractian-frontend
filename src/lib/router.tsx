import { Switch, Route,} from "react-router-dom";
import HomePage from "../pages/HomePage";
import CompanyPage from '../pages/Company';
import AssetsPage from "../pages/Assets";
import UserPage from "../pages/User";
import UpdateAsset from '../pages/AssetForm/UpdateAsset';
import UpdateUser from "../pages/User/UpdateUser";
import CreateUser from '../pages/User/CreateUser';
import CreateAsset from '../pages/AssetForm/CreateAsset';
import CreateCompany from '../pages/Company/CreateCompany';
import UpdateCompany from '../pages/Company/UpdateCompany';
import UnitPage from '../pages/Unit';
import CreateUnit from '../pages/Unit/CreateUnit';
import UpdateUnit from '../pages/Unit/UpdateUnit';

export default function Routes() {

    return (
    
            <Switch>

                <Route exact path="/"  component={HomePage} />
                {/* Assets Routes */}
                <Route exact path="/ativos"  component={AssetsPage} />
                <Route exact path="/ativos/adicionar"  component={CreateAsset} />
                <Route exact path="/ativos/editar/:assetId"  component={UpdateAsset} />
                {/* User Routes */}
                <Route exact path="/usuarios"  component={UserPage} />
                <Route exact path="/usuarios/adicionar"  component={CreateUser} />
                <Route exact path="/usuarios/editar/:userId"  component={UpdateUser} />
               {/* Company Routes */}
               <Route exact path="/empresas"  component={CompanyPage} />
                <Route exact path="/empresas/adicionar"  component={CreateCompany} />
                <Route exact path="/empresas/editar/:companyId"  component={UpdateCompany} />

               {/* Unit Routes */}
               <Route exact path="/unidades"  component={UnitPage} />
                <Route exact path="/unidades/adicionar"  component={CreateUnit} />
                <Route exact path="/unidades/editar/:unitId"  component={UpdateUnit} />



            </Switch>



    )

}