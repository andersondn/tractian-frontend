
import * as Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import { IAsset } from '../../types';
require("highcharts/highcharts-more")(Highcharts);



interface IAssetsPerUnitChart {
    assets?: IAsset[]

}

const AssetsPerUnitChart = ({assets}:IAssetsPerUnitChart) => {


const seriesData = assets?.reduce((acc:any, cur) =>{
    const itemIdex = acc.findIndex((item:any)=> item.unitId === cur.unitId)
    const serieData ={
        name: cur.assetName,
        value:1,
        model: cur.model
    }

    if(itemIdex <0){
        console.log('entrou',itemIdex)
        acc.push({
            unitId: cur.unitId,
            name: cur.unit.unitName,
            data:[serieData]
        })
    // }
    }else{
        acc[itemIdex].data.push(serieData) 
    }

    return acc
},[])

    const options= {
        chart: {
            type: 'packedbubble',
        },
        title: {
            text: 'Ativos por unidade'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}</b><br> Modelo: {point.model}'
        },
        plotOptions: {
            packedbubble: {
                minSize: '50%',
                maxSize: '100%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    gravitationalConstant: 0.05,
                    splitSeries: true,
                    seriesInteraction: false,
                    dragBetweenSeries: true,
                    parentNodeLimit: true
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}asas - {point.value}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        // value: 250
                    },
              
                }
            }
        },
        series: seriesData,
        colors: [ '#77a1e5', 
         '#f28f43','#a6c96a', '#AA4643', '#89A54E', '#80699B', '#3D96AE', ]
 
    }
    return (
        <>
        {/* {JSON.stringify(seriesData)} */}
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </>
    )
}

export default AssetsPerUnitChart