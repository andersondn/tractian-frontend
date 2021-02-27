import { Row } from 'antd';
import React from 'react';
import { IAsset } from '../../types';
import AssetCard from './AssetCard';


interface IAssetGridView {
	assets: IAsset[] 
}


function AssetGridView({assets}: IAssetGridView) {

    return (
        <>
        <Row >
          {assets.map((asset)=> <AssetCard  asset={asset}/>)}
          
         
        </Row>
        

        </>
    )

}

export default AssetGridView


