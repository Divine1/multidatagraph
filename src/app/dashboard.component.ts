import {Component} from '@angular/core'



@Component({
    "selector" : "app-dashboard",
    "templateUrl" : "./dashboard.component.html",
    "styleUrls" : ["./dashboard.component.css"]
})
export class DashboardComponent{
    loadState = "loading";

    onclick(event){
        console.log("in onclick()")
        console.log("event ",event.target)
        this.loadState="finished-m";
    }

}