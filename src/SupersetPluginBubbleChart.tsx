/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef, useState } from 'react';
import { styled } from '@superset-ui/core';
import { SupersetPluginBubbleChartProps, SupersetPluginBubbleChartStylesProps } from './types';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<SupersetPluginBubbleChartStylesProps>`
  /*background-color: ${({ theme }) => theme.colors.secondary.light2};*/
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  h3 {
    /* You can use your props to control CSS! */
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) => theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) => theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  pre {
    height: ${({ theme, headerFontSize, height }) => (
      height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]
    )}px;
  }
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function SupersetPluginBubbleChart(props: SupersetPluginBubbleChartProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width } = props;

  const rootElem = createRef<HTMLDivElement>();
  const [seriesData, setseriesData] = useState([]);

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    // console.log('Plugin element', root);
  });
useEffect(()=>{
  const allSeriesData:any  = data && data[0] && Object.keys(data[0]).map((res, i)=>{
    return (
      res != 'count' ?   {
        name: res,
        data: generateData(i+1, res, data.length, {
          min: 10,
          max: 60
        })
      }:''
  );
  })
  setseriesData(allSeriesData)
},[])
  const options: ApexOptions = {
    colors: ["#49C0F2", "#28C76F","#FF9100","#122EA8","#5A2A27","#2B908F","#E5408F","#CF59E0","#AD81EA","#FF7976","#5653FE","#7450B2"],

    chart: {
      height: 350,
      type: "bubble",
      redrawOnWindowResize: true,

    //   zoom: {
    //     enabled: true,
    //     type: 'X',
    //     autoScaleYaxis: true,
    //     zoomedArea: {
    //       fill: {
    //         color: '#90CAF9',
    //         opacity: 0.4
    //       },
    //       stroke: {
    //         color: '#0D47A1',
    //         opacity: 0.4,
    //         width: 1
    //       },

    //     }
    // }
    },

    dataLabels: {
      enabled: false
    },
    fill: {
      gradient: {
        shade: 'dark',
        type: "horizontal"

    },


    },
    // title: {
    //   text: 'Bubble Chart'
    // },
    xaxis: {
      tickAmount: 5,
      type: 'datetime',
      labels: {
          rotate: 0,
      },


    },
    yaxis: {
      max: 15,
      show: false,

    },
    theme: {
      palette: 'palette',

    },
    grid: {
      padding: {
        left: 20, // or whatever value that works
        right: 20 // or whatever value that works
      }
    },
    legend: {
      show: true,
      position: 'right',
      fontSize: '10px',
      markers: {
        width: 8,
        height: 8,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: undefined,
        radius: 5,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0
    },


    },
    // tooltip: {
    //   enabled: true,
    //   x: {
    //     show: true,
    //     format: 'dd MMM ',
    //     formatter: undefined,
    // },
    // y: {
    //     formatter: undefined,
    //     title: {
    //         formatter: (seriesName) => seriesName,
    //     },
    // },
    // z: {
    //     formatter: undefined,
    //     title: 'Size: '
    // },

    // }
    tooltip: {
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        return (
          '<div class="Kalpesh" style="padding:10px; font-size:10px"><div class=""><div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-y-label">Modified Date:</span><span class="apexcharts-tooltip-text-y-value"> '+ new Date(w.globals.initialSeries[seriesIndex]?.data[dataPointIndex][0]).toDateString() + ' </span></div><div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label">Modified Data: </span><span class="apexcharts-tooltip-text-z-value">'+ w.globals.initialSeries[seriesIndex]?.data[dataPointIndex][3] +'</span></div></div></div>'
            )
          // console.log("seriesIndex",seriesIndex)
          // console.log("dataPointIndex",dataPointIndex)
          // console.log("WW",w.globals.initialSeries)
          // console.log("WW",w.globals.initialSeries[seriesIndex]?.data[dataPointIndex])
          // console.log("DATE", new Date(w.globals.initialSeries[seriesIndex]?.data[dataPointIndex][0]).toDateString())


      }
    },

  }
  function generateData(YbarNo:number,res:any, count:number, yrange:any) {
    // var modifiedDates = ['3 Aug 2022 GMT','24 Sep 2022 GMT','19 Dec 2022 GMT','16 Feb 2023 GMT','24 Mar 2023 GMT','02 Apr 2023 GMT','13 Apr 2023 GMT','22 Apr 2023 GMT','03 May 2023 GMT','11 May 2023 GMT','19 May 2023 GMT','17 Aug 2023 GMT']
    var i = 0;
    var series = [];
    var y = 0;
    var k :any = "";
    let modifyDate:any;
    while (i < count) {
      // var x =Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
      //var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      y = YbarNo;
      // var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
      var z = 3.6;
      modifyDate = data[i]['LastModifiedDate'];
      k = data[i][res];
      //series.push([baseval, y, z]);
      series.push([new Date(modifyDate).getTime() + 86400000, y, z,k]);

      // baseval += 86400000;
      i++;
    }

    return series;
  }



  // const items = [
  // ]

  const formatResult = (item:any) => {
    return (
      <div className="result-wrapper">
      {/* <span className="result-span">id: {item.id}</span> */}
      <span className="result-span">{item.name}</span>
    </div>
    )
  }
  const handleOnSearch = (string:any, results:any) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result:any) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item:any) => {
    // the item selected
    console.log("Select",item)
    console.log("SET",seriesData)
    setseriesData(seriesData)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
        <header className="App-header">
        <div style={{ width: 400 }}>
          {/* <ReactSearchAutocomplete
            items={seriesData}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling={{ zIndex: 1 }}
          /> */}
        </div>
      </header>
      <div id="chart" >
        <ReactApexChart options={options} series={seriesData} type="bubble" height={350} />
      </div>
    </Styles>
  );
}
