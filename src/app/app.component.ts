
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
  createAxisAndSeries(field, name, opposite, bullet,chart) {
    let valueAxis:any = chart.yAxes.push(new am4charts.ValueAxis());
    if(chart.yAxes.indexOf(valueAxis) != 0){
      valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
    }
    
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.yAxis = valueAxis;
    series.name = name;
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.tensionX = 0.8;
    series.showOnInit = true;
    
    let interfaceColors = new am4core.InterfaceColorSet();
    //let bullet1:any=null;

    switch(bullet) {
      case "triangle":
        const bullet1 = series.bullets.push(new am4charts.Bullet());
        bullet1.width = 12;
        bullet1.height = 12;
        bullet1.horizontalCenter = "middle";
        bullet1.verticalCenter = "middle";
        
        let triangle = bullet1.createChild(am4core.Triangle);
        triangle.stroke = interfaceColors.getFor("background");
        triangle.strokeWidth = 2;
        triangle.direction = "top";
        triangle.width = 12;
        triangle.height = 12;
        break;
      case "rectangle":
        const bullet2:any = series.bullets.push(new am4charts.Bullet());
        bullet2.width = 10;
        bullet2.height = 10;
        bullet2.horizontalCenter = "middle";
        bullet2.verticalCenter = "middle";
        
        let rectangle = bullet2.createChild(am4core.Rectangle);
        rectangle.stroke = interfaceColors.getFor("background");
        rectangle.strokeWidth = 2;
        rectangle.width = 10;
        rectangle.height = 10;
        break;
      default:
        const bullet3:any = series.bullets.push(new am4charts.CircleBullet());
        bullet3.circle.stroke = interfaceColors.getFor("background");
        bullet3.circle.strokeWidth = 2;
        break;
    }
    
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 2;
    valueAxis.renderer.line.stroke = series.stroke;
    valueAxis.renderer.labels.template.fill = series.stroke;
    valueAxis.renderer.opposite = opposite;
  }
  generateChartData() {
    let chartData = [];
    let firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 100);
    firstDate.setHours(0, 0, 0, 0);
  
    let visits = 1600;
    let hits = 2900;
    let views = 8700;
  
    for (var i = 0; i < 15; i++) {
      // we create date objects here. In your data, you can have date strings
      // and then set format of your dates using chart.dataDateFormat property,
      // however when possible, use date objects, as this will speed up chart rendering.
      let newDate = new Date(firstDate);
      newDate.setDate(newDate.getDate() + i);
  
      visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
      hits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
      views += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
  
      chartData.push({
        date: newDate,
        visits: visits,
        hits: hits,
        views: views
      });
    }
    return chartData;
  }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.colors.step = 2;
      let datadump = this.generateChartData();
      console.log("datadump ",datadump);


      chart.data =datadump;
      let dateAxis:any = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 50;
      
      this.createAxisAndSeries("visits", "Visits", false, "circle",chart);
      this.createAxisAndSeries("views", "Views", true, "triangle",chart);
      this.createAxisAndSeries("hits", "Hits", true, "rectangle",chart);
       
      chart.cursor = new am4charts.XYCursor();
      chart.legend = new am4charts.Legend();
     
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
