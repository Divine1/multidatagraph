

import { Component, NgZone, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as moment from 'moment';

am4core.useTheme(am4themes_animated);


const dumpdata = [
  {
      "previousPeriod": 990,
      "cardStatusUpdatedAt": "2020-07-01",
      "previousIndicator": false,
      "currentPeriod": 2767
  },
  {
      "previousPeriod": 3582,
      "cardStatusUpdatedAt": "2020-07-02",
      "previousIndicator": false,
      "currentPeriod": 0
  },
  {
      "previousPeriod": 12814,
      "cardStatusUpdatedAt": "2020-07-03",
      "previousIndicator": false,
      "currentPeriod": 427
  },
  {
      "previousPeriod": 1379,
      "cardStatusUpdatedAt": "2020-07-04",
      "previousIndicator": true
  },
  {
      "previousPeriod": 2896,
      "cardStatusUpdatedAt": "2020-07-05",
      "previousIndicator": true
  },
  {
      "currentPeriod": 0,
      "cardStatusUpdatedAt": "2020-07-06",
      "previousIndicator": false
  },
  {
      "currentPeriod": 500,
      "cardStatusUpdatedAt": "2020-07-07",
      "previousIndicator": false
  },
  {
      "previousPeriod": 2153,
      "cardStatusUpdatedAt": "2020-07-08",
      "previousIndicator": false,
      "currentPeriod": 445
  },
  {
      "previousPeriod": 1792,
      "cardStatusUpdatedAt": "2020-07-09",
      "previousIndicator": false,
      "currentPeriod": 3432
  },
  {
      "previousPeriod": 456,
      "cardStatusUpdatedAt": "2020-07-10",
      "previousIndicator": false,
      "currentPeriod": 4332
  },
  {
      "previousPeriod": 6065,
      "cardStatusUpdatedAt": "2020-07-11",
      "previousIndicator": true
  },
  {
      "previousPeriod": 2935,
      "cardStatusUpdatedAt": "2020-07-12",
      "previousIndicator": true
  },
  {
      "currentPeriod": 1601,
      "cardStatusUpdatedAt": "2020-07-13",
      "previousIndicator": false
  },
  {
      "currentPeriod": 3795,
      "cardStatusUpdatedAt": "2020-07-14",
      "previousIndicator": false
  },
  {
      "previousPeriod": 0,
      "cardStatusUpdatedAt": "2020-07-15",
      "previousIndicator": false,
      "currentPeriod": 717
  },
  {
      "previousPeriod": 4224,
      "cardStatusUpdatedAt": "2020-07-16",
      "previousIndicator": false,
      "currentPeriod": 0
  },
  {
      "previousPeriod": 1914,
      "cardStatusUpdatedAt": "2020-07-17",
      "previousIndicator": false,
      "currentPeriod": 0
  },
  {
      "previousPeriod": 2436,
      "cardStatusUpdatedAt": "2020-07-18",
      "previousIndicator": true
  },
  {
      "previousPeriod": 8805,
      "cardStatusUpdatedAt": "2020-07-19",
      "previousIndicator": true
  },
  {
      "currentPeriod": 1424,
      "cardStatusUpdatedAt": "2020-07-20",
      "previousIndicator": false
  },
  {
      "currentPeriod": 0,
      "cardStatusUpdatedAt": "2020-07-21",
      "previousIndicator": false
  },
  {
      "previousPeriod": 0,
      "cardStatusUpdatedAt": "2020-07-22",
      "previousIndicator": false,
      "currentPeriod": 0
  },
  {
      "previousPeriod": 2058,
      "cardStatusUpdatedAt": "2020-07-23",
      "previousIndicator": false,
      "currentPeriod": 0
  },
  {
      "previousPeriod": 3146,
      "cardStatusUpdatedAt": "2020-07-24",
      "previousIndicator": false,
      "currentPeriod": 0
  },
  {
      "previousPeriod": 2572,
      "cardStatusUpdatedAt": "2020-07-25",
      "previousIndicator": true
  },
  {
      "previousPeriod": 3468,
      "cardStatusUpdatedAt": "2020-07-26",
      "previousIndicator": true
  },
  {
      "currentPeriod": 0,
      "cardStatusUpdatedAt": "2020-07-27",
      "previousIndicator": false
  },
  {
      "previousPeriod": 11984,
      "cardStatusUpdatedAt": "2020-07-29",
      "previousIndicator": true
  },
  {
      "previousPeriod": 0,
      "cardStatusUpdatedAt": "2020-07-30",
      "previousIndicator": true
  }
];
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) { }

  ngOnInit(): void {
  }
  createAxisAndSeries(field, name, opposite, bullet, chart) {
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //valueAxis.renderer.labels.template.fill = am4core.color("#ff0000");
    //valueAxis.renderer.labels.template.fontSize = 40;
    //valueAxis.renderer.labels.template.color="red";
    
    if (chart.yAxes.indexOf(valueAxis) != 0) {
      valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
    }

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = "date";
    // series.labels.template.stroke=am4core.color("red");
    if(field == "previousPeriod"){
      series.stroke = am4core.color("#b97c0c");
    }
    else{
      series.stroke = am4core.color("green");
    }
    
    series.strokeWidth = 1;
    series.yAxis = valueAxis;
    series.name = name;
    
    
    //series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.tooltipText = "[bold]{valueY}[/]";
    series.tensionX = 0.8;
    //series.showOnInit = true;
    
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 1;
    valueAxis.renderer.line.stroke = series.stroke;
    valueAxis.renderer.labels.template.fill = series.stroke;
    valueAxis.renderer.opposite = opposite;
    
  }
  transformChartData(dumpdata) {
    let chartData = [];
    for (var i = 0; i < dumpdata.length; i++) {
      let item = dumpdata[i];
      chartData.push({
        date: item.cardStatusUpdatedAt,
        previousPeriod : item.previousPeriod,
        currentPeriod: item.currentPeriod,
      });
    }
    return chartData;
  }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdivcart", am4charts.XYChart);

      chart.colors.step = 2;
      let datadump = this.transformChartData(dumpdata);


      chart.data = datadump;
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 60;
      dateAxis.fontWeight="400";
      
      dateAxis.renderer.labels.template.fill = am4core.color("red");

      // dateAxis.fontWeight = "300";
      // dateAxis.stroke=am4core.color("#ffffff");
      // dateAxis.strokeWidth=0.7;
      // //dateAxis.strokeOpacity=1;

      this.createAxisAndSeries("previousPeriod", "Previous Period", false, "", chart);
      this.createAxisAndSeries("currentPeriod", "Current Period", true, "", chart);
      //this.createAxisAndSeries("previousPeriod", "Previous Period", false, "circle", chart);
      //this.createAxisAndSeries("currentPeriod", "Current Period", true, "triangle", chart);
     // this.createAxisAndSeries("hits", "Hits", true, "rectangle", chart);
     
     chart.scale=1;
      chart.cursor = new am4charts.XYCursor();
      chart.legend = new am4charts.Legend();

      chart.legend.position="top";
      //chart.legend.userClassName="legend"
      //chart.legend.stroke=am4core.color("red");
      //chart.legend.background.disabled=true;
      
     // chart.legend.strokeWidth = 1;
      //chart.legend.strokeOpacity = 0.6;
      chart.legend.labels.template.fill=am4core.color("red");
      
      
      this.chart = chart;
    });
  }



  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }



}
