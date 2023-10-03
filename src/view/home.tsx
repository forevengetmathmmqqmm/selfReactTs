import { useEffect, useRef, useState } from "react";
import * as echarts from 'echarts';
import { EChartOption } from "echarts";
const home: React.FC = () => {
  const [adminCount, setAdminCount] = useState({
    pageView: 1000,
    TradingVolume: 1000,
    users: 1000,
    sealNum: 1000,
  })
  const [chartsWidth, setChartsWidth] = useState();
  const refDiv = useRef(null);
  useEffect(() => { 
    setAdminCount({
      pageView: Number((Math.random() * 10000).toFixed()),
      TradingVolume: Number((Math.random() * 10000).toFixed()),
      users: Number((Math.random() * 10000).toFixed()),
      sealNum: Number((Math.random() * 10000).toFixed()),
    });
    let chartDom = document.getElementById('charts-content')!;
    let myChart: any
    setTimeout(() => {
      setChartsWidth((refDiv.current as any)?.offsetWidth || 0);
      myChart = echarts.init(chartDom);
      let option:EChartOption = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
          }
        ]
      };
      myChart.setOption(option);
    }, 200);
  },[])
  return (
    <>
      <div className="w-full h-full pt-[12px]">
        <div className="h-[128px] flex justify-between ml-6" ref={ refDiv }>
          <div className="h-[128px] flex-1 flex flex-col justify-between mr-6 bg-[#0073b7] p-[12px] rounded-[12px]">
            <div className="text-[#eee982] font-semibold text-[14px]">访问量</div>
            <div className="text-[#eee982] text-[32px] font-semibold">{adminCount.pageView}</div>
            <div className="text-[#eee982] text-[12px]">用户单日的访问量</div>
          </div>
          <div className="h-[128px] flex-1 flex flex-col justify-between mr-6 bg-[#3498db] p-[12px] rounded-[12px]">
            <div className="text-[#eee982] font-semibold text-[14px]">交易量</div>
            <div className="text-[#eee982] text-[32px] font-semibold">{adminCount.TradingVolume}</div>
            <div className="text-[#eee982] text-[12px]">平台单日的交易量</div>
          </div>
          <div className="h-[128px] flex-1 flex flex-col justify-between mr-6 bg-[#605ca8] p-[12px] rounded-[12px]">
            <div className="text-[#eee982] font-semibold text-[14px]">用户量</div>
            <div className="text-[#eee982] text-[32px] font-semibold">{adminCount.users}</div>
            <div className="text-[#eee982] text-[12px]">平台的总的用户量</div>
          </div>
          <div className="h-[128px] flex-1 flex flex-col justify-between mr-6 bg-[#18bc9c] p-[12px] rounded-[12px]">
            <div className="text-[#eee982] font-semibold text-[14px]">注册量</div>
            <div className="text-[#eee982] text-[32px] font-semibold">¥ {adminCount.sealNum}</div>
            <div className="text-[#eee982] text-[12px]">平台当日的注册人数</div>
          </div>
        </div>
        <div className="w-full">
          <div className="h-[540px]" id="charts-content" style={{width: chartsWidth + 'px'}} ></div>
        </div>
      </div>
    </>
  )
}
export default home;