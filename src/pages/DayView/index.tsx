import React, { useEffect } from "react";
import * as echarts from "echarts";
import axios from "axios";

export default function DayView({ day, dayincome }): {
    day: any[]
    dayincome: any[]
} {
    const dayView = (day: string, dayincome: string) => {
        const option = {
            title: {
                text: '天',
            },
            xAxis: {
                data: day,
                axisLabel: {
                    inside: true,
                    color: '#fff'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#999'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            series: [
                {
                    type: 'bar',
                    showBackground: true,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#83bff6' },
                            { offset: 0.5, color: '#188df0' },
                            { offset: 1, color: '#188df0' }
                        ])
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#2378f7' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' }
                            ])
                        }
                    },
                    data: dayincome
                }
            ]
        };
        const chartDom = document.querySelector("#day");
        const myChart = echarts.init(chartDom, null, { renderer: 'svg' });
        myChart.setOption(option);
        window.addEventListener("resize", () => {
            myChart.resize();
        });
    };
    useEffect(() => {
        dayView(day, dayincome);
    }, [day]);
    useEffect(() => {
        axios.get("/getday")
            .then((res: any) => {
                const day = res.data[0].day;
                const dayincome = res.data[0].income;
                dayView(day, dayincome);
            });
    }, []);

    return (
        <div id="day">

        </div >
    );
}