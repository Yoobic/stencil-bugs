---
name: Chart Js
category: Advanced Components
---

```tsx
export interface IChartData {
    labels: string[];
    datasets: any[];
}

export interface IChartOptions {
    scales?: any;
    title?: any;
    xAxes?: any;
    yAxes?: any;
}
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`type`|string|   |the type of the chart (bar, line, radar, pie, doughnut, bubble)|
|`data`|IChartData| |the dataset to display|
|`options`|IChartOptions||the options of the charts|

```yoo-chart-js.html
    <yoo-chart-js id="chartjs1" type="bar"></yoo-chart-js>
```

```yoo-chart-js.js
    var chartjs1 = document.querySelector('#chartjs1');

    var data = {
         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
         datasets: [{
             label: '# of Votes',
             data: [12, 19, 3, 5, 2, 3],
             backgroundColor: [
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)'
             ],
             borderColor: [
                 'rgba(255,99,132,1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)'
             ],
             borderWidth: 1
         }]
     }
    var options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    chartjs1.data = data;
    chartjs1.options = options;
```

```yoo-chart-line-radar-js.html
    <yoo-chart-js id="chartjs2" type="line"></yoo-chart-js>
    <yoo-chart-js id="chartjs3" type="radar"></yoo-chart-js>
```

```yoo-chart-line-radar-js.js
    var chartjs2 = document.querySelector('#chartjs2');
    var chartjs3 = document.querySelector('#chartjs3');

    var data = {
         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
         datasets: [{
             label: '# of Votes',
             data: [12, 19, 3, 5, 2, 3],
             backgroundColor: [
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)'
             ],
             borderColor: [
                 'rgba(255,99,132,1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)'
             ],
             borderWidth: 1
         }]
     }
    var options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    chartjs2.data = data;
    chartjs2.options = options;

    chartjs3.data = data;
    chartjs3.options = options;
```

```yoo-chart-pie-js.html
    <yoo-chart-js id="chartjs4" type="pie"></yoo-chart-js>
    <yoo-chart-js id="chartjs5" type="doughnut"></yoo-chart-js>
```

```yoo-chart-pie-js.js
    var chartjs4 = document.querySelector('#chartjs4');
    var chartjs5 = document.querySelector('#chartjs5');

    var data = {
     labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
     datasets: [{
       label: "Population (millions)",
       backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
       data: [2478,5267,734,784,433]
     }]
   };
    var options = {
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      };
    chartjs4.data = data;
    chartjs4.options = options;
    chartjs5.data = data;
    chartjs5.options = options;
```

```yoo-chart-bubble-js.html
    <yoo-chart-js id="chartjs6" type="bubble"></yoo-chart-js>
```

```yoo-chart-bubble-js.js
    var chartjs6 = document.querySelector('#chartjs6');
    var data = {
     labels: "Africa",
     datasets: [
       {
         label: ["China"],
         backgroundColor: "rgba(255,221,50,0.2)",
         borderColor: "rgba(255,221,50,1)",
         data: [{
           x: 21269017,
           y: 5.245,
           r: 15
         }]
       }, {
         label: ["Denmark"],
         backgroundColor: "rgba(60,186,159,0.2)",
         borderColor: "rgba(60,186,159,1)",
         data: [{
           x: 258702,
           y: 7.526,
           r: 10
         }]
       }, {
         label: ["Germany"],
         backgroundColor: "rgba(0,0,0,0.2)",
         borderColor: "#000",
         data: [{
           x: 3979083,
           y: 6.994,
           r: 15
         }]
       }, {
         label: ["Japan"],
         backgroundColor: "rgba(193,46,12,0.2)",
         borderColor: "rgba(193,46,12,1)",
         data: [{
           x: 4931877,
           y: 5.921,
           r: 15
         }]
       }
     ]
   };
    var options = {
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }, scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Happiness"
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: "GDP (PPP)"
            }
          }]
        }
      };
    chartjs6.data = data;
    chartjs6.options = options;
```