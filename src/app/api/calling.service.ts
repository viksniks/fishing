import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {environment} from "../../environments/environment";
import {Platform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class CallingService {

 config:any= environment.config;
 appname:any = environment.appname;
  constructor(private platform:Platform) {
   
   this.platform.ready().then(()=>{
     if(firebase.apps.length == 0)

     {
  firebase.initializeApp(this.config);
     }

   })
    
    
   }
   getMetaInfo(fn)
   {
    firebase.database().ref(this.appname+"/metainfo").once('value').then(function (snapshot) {
      let data =  snapshot.val();
      fn(data);
 
    });
     
   }
   insertMetaInfo(obj)
   {
    firebase.database().ref(this.appname+"/metainfo").set(obj);
     
   }
   deleteData(key,fn)
   {
    firebase.database().ref(this.appname + "/data/"+key+"/").remove(function (err) {
      if(err)
      {
        fn(JSON.stringify(err));
      }
      else{
         fn("Sikeresen törölve!!!");
      }
    });
   
   }
getBigFish(fn)
{
  firebase.database().ref(this.appname + "/bigfish").once('value').then(function (snapshot) {
    let data =  snapshot.val();
    fn(data);

  });
}
   insertBigFish(weight)
   {
    firebase.database().ref(this.appname + "/bigfish/").set(weight);
    
   }
   insertClickedTime(fn)
   {
   var time = new Date().toISOString().split("T")[0]+ " "+new Date().toTimeString().split("GMT")[0].trim();
    
    firebase.database().ref(this.appname + "/timestamp/").set(time).then(function(err)
    {
      fn("ok");
    })
    
   }

   getClickedTime(fn)
{
  firebase.database().ref(this.appname + "/timestamp").once('value').then(function (snapshot) {
    let data =  snapshot.val();
    fn(data);

  });
}

insertColName(val)
{

 
 firebase.database().ref(this.appname + "/colname/").set(val);
}



   getData(fn)
   {
    
    firebase.database().ref(this.appname + "/data/").once('value').then(function (snapshot) {
        let data =  snapshot.val();
        fn(data);
   
      });
   }

   insertData(obj,fn)
   {
    firebase.database().ref(this.appname + "/data/").set(obj, function (err) {
      if(err)
      {
        fn(JSON.stringify(err));
      }
      else{
         fn("Sikeresen mentve!!!");
      }
    });
   }
}