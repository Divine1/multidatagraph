
import { Component, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as moment from 'moment';

am4core.useTheme(am4themes_animated);

import {dumpdata} from './input.js';


const timelinedata = dumpdata;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    //this.chart.svgContainer.resizeSensor.reset();

    
  }
  transformTimelineData(dumpdata){
    let sorted = dumpdata.sort((a,b)=>{
        let adata:any = new Date(a.cardStatusUpdatedAt);
        let bdata:any = new Date(b.cardStatusUpdatedAt )
        return adata - bdata;
    })
    let obj = {};
    for(let i=0;i<sorted.length;i++){
        let item = sorted[i];
        let date = moment(item.cardStatusUpdatedAt).utc().format("YYYY-MM-DD");
        console.log("date ",date)
        if(obj[date]){
            let current = obj[date];
            current.value+=Number(item.value);
            let val = current["value1"] ? current["value1"] : 0;
            current["value1"] =val+Number(item.value+(Math.floor(Math.random()*100)));

        }
        else{
            obj[date]={
                _id : item._id,
                value : Number(item.value),
                value1 :0,
                dealTitle : item.dealTitle,
                cardStatusUpdatedAt : date
            }
        }
    }
    let transformeddata = [];
    for(let i in obj){
        let item = obj[i];
        console.log("item ",item);
        transformeddata.push(item);
    }
    console.log(transformeddata);
    return transformeddata;
}


  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      // for (let i = 1; i < 31; i++) {
      //   //visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      //   visits =Math.floor(Math.random()*500);
      //   data.push({ date: new Date(2020, 0, i), name: "name" + i, value: visits });
      // }
      let sorted:any = this.transformTimelineData(dumpdata);
    
      for (let i = 0; i < sorted.length; i++) {
        let item = sorted[i];
        data.push({ date: item.cardStatusUpdatedAt, name1: item.dealTitle, currentValue: item.value,previousValue: item.value1 });
      }

      console.log("data ",data)
      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series1 = chart.series.push(new am4charts.LineSeries());
      series1.dataFields.dateX = "date";
      series1.name="Current Month";
      series1.dataFields.valueY = "currentValue";
      series1.strokeWidth= 3;
      //series1.tooltipText = "{valueY.value}";
      series1.tooltipText = "Current: {valueY}";
      series1.showOnInit = true;


      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.dateX = "date";
      series2.name="Previous Month";
      series2.dataFields.valueY = "previousValue";
      //series2.strokeWidth= 5;
      //series2.fill=;
      series2.strokeDasharray="3,3";
      series2.strokeWidth= 3;
      series2.stroke = am4core.color("#CDA2AB");
      series2.tooltipText = "Previous: {valueY}";
      series2.tooltip.getFillFromObject = false;
      series2.tooltip.background.fill = am4core.color("#CDA2AB");
      series2.showOnInit = true;
      //series2.tooltip.userClassName="series2";
      
      //series2.tooltip.background.stroke = am4core.color("red");
      //series2.tooltip.background.fill = am4core.color("orange");
      //series2.tooltip.background.className="series2";
      
      chart.cursor = new am4charts.XYCursor();
      chart.legend = new am4charts.Legend();
      // let scrollbarX = new am4charts.XYChartScrollbar();
      // scrollbarX.series.push(series);
      // chart.scrollbarX = scrollbarX;

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
