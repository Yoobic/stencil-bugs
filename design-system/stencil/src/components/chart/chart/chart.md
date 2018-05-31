---
name: Chart
category: Advanced Components
---

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`options`|any|| the options related to the highcharts|

```yoo-chart.html
    <yoo-chart></yoo-chart>
```

```yoo-chart.js
    var chart = document.querySelector('yoo-chart');

    chart.options = {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Fruit Consumption'
      },
      xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
          title: {
              text: 'Fruit eaten'
          }
      },
      series: [{
          name: 'Jane',
          data: [1, 0, 4]
      }, {
          name: 'John',
          data: [5, 7, 3]
      }]
    };
```