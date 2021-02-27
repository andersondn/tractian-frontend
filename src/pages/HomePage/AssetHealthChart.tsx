
import * as Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import { IAsset } from '../../types';



interface IAssetsHealthChart {
    assets?: IAsset[]

}

const AssetsHealthChart = ({assets}:IAssetsHealthChart) => {


const seriesData = assets?.map((asset:IAsset) =>({
    
        name: asset.assetName,
        y: asset.healthScore,

    
}))

    const options= {
        
        chart: {
            type: 'column',
            shadow: true

        },
        title: {
            text: 'Saúde dos ativos'
        },

        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            max:100,
            title: {
                text: 'Nível de saúde'
            
                
            }
    
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },
    
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
        },
    
        series: [
            {
                name: "Ativo",
                colorByPoint: true,
                data: seriesData
            }
        ],
    }
    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </>
    )
}

export default AssetsHealthChart