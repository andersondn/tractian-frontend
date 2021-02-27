
import * as Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'
import { IAsset, AssetStatus } from '../../types';



interface IAssetsStatusChart {
    assets?: IAsset[]

}

const AssetsStatusChart = ({ assets }: IAssetsStatusChart) => {

    const initialData = [
        {
            name: "Em alerta",
            status: AssetStatus.inAlert,
            color: "#dddf00",
            y: 0
        },
        {
            name: "Em operação",
            status: AssetStatus.inOperation,
            color: "#50b432",
            y: 0
        },
        {
            name: "Em parada",
            status: AssetStatus.inDowntime,
            color: "#ed561c",
            y: 0
        },
    ]
    const seriesData = assets?.reduce((acc: any, cur) => {
        const itemIndex = acc.findIndex((item: any) => item.status === cur.status)
        acc[itemIndex].y++
        return acc

    }, initialData)

    const options = {
        chart: {
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Status dos ativos'
        },
        tooltip: {
            pointFormat: 'total de ativos de ativos: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}'
                }
            }
        },
        series: [{
            name: 'Status',
            colorByPoint: true,
            data: seriesData
        }]
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

export default AssetsStatusChart