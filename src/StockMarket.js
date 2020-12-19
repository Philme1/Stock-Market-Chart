import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import Axios from 'axios';
const Plot = createPlotlyComponent(Plotly);

const StockMarket = () => {
    
    const [xValue, setXValue] = useState([]);
    const [yValue, setYValue] = useState([]);
    
    useEffect(() => {
        fetchStock();
    }, [])
    
    const fetchStock = async () => {
        // const pointerToThis = this;
        // console.log(pointerToThis);
        const API_KEY = 'PGXVKI89J9D2XW5Q';
        let StockSymbol = 'FB';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        
        const { data } = await Axios.get(API_Call)
            console.log(data)
            
                for (var key in data['Time Series (Daily)']) {
                stockChartXValuesFunction.push(key);
                stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
              }
                
                setXValue(stockChartXValuesFunction);
                setYValue(stockChartYValuesFunction)
    }
    
    return (
        <div>
            <h1 style={{color: "rgb(210, 80, 30)"}}>Stock Market Chart</h1>
            <Plot
          data={[
            {
              x: xValue,
              y: yValue,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
        />
        </div>
    );
}

export default StockMarket;
