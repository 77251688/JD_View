import React, { useEffect } from "react";
import * as echarts from "echarts";
import axios from "axios";

export default function HourView({ time, income }: {
    time: any[]
    income: any[]
}) {
    const renderView = (time: any[], income: any[]) => {
        const option = {
            color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
            title: {
                text: '小时/个'
            },
            tooltip: {
                confine: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
            },
            toolbox: {
                feature: {
                    saveAsImage: {
                        show: false
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: time,
                    axisTick: {
                        show: false
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Line 1',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(128, 255, 165)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(1, 191, 236)'
                            }
                        ])
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: income
                },
            ]
        };
        const chartDom = document.querySelector("#hour") as Element;
        const myChart = echarts.init(chartDom, null, { renderer: 'svg' });
        myChart.setOption(option);
        window.addEventListener("resize", () => {
            myChart.resize();
        });
    };
    useEffect(() => {
        axios.get("/getdata")
            .then((res: any) => {
                const time = res.data[0].data.map(e => e.min);
                const income = res.data[0].data.map(e => e.income);
                renderView(time, income);
            });
    }, []);
    useEffect(() => {
        renderView(time, income);
    }, [time]);
    return (
        <div id="hour">

        </div>
    );
}