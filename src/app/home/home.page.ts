import { Component } from '@angular/core';

import { CallingService } from "../api/calling.service";
import { ToastController, LoadingController } from "@ionic/angular";


@Component({

  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [CallingService]
})
export class HomePage {
  // private fieldArray: Array<any> = [];

  // private newAttribute: any = {name:"",sektor:"",weight:"",piece:"",time:""};

  obj: any = {};
  keys: any[] = [];
  location: string = "";
  comments: string = "";
  sorted: any[] = [];
  bigfish: string = "";
  totalweight: string = "";
  totalpiece: string = "";
  clickedtime: string = "";
  sektorObj: any = {};
  sektorKeys:string[]=[];
  disabledCalcultion:boolean = true;

  constructor(private service: CallingService, private loader: LoadingController, private toast: ToastController) {

  }

  
  getMetaInfo() {
    var ref = this;
    this.service.getMetaInfo(function (data) {
      if (data) {
        ref.location = data.location;
        ref.comments = data.comments;
      }
    })
  }
  insertMetaInfo() {
    this.service.insertMetaInfo({ location: this.location, comments: this.comments });
  }
  ngOnInit() {
    setTimeout(() => {


      this.getData();
    }, 1000)
  }


  numericOnly(event): boolean {
    let patter = /^([0-9])$/;
    let result = patter.test(event.key);
    return result;
  }



  calculate() {
    if (window.confirm("Attila! Elmentetted???? Biztos?")) {
      let temp = [];
      for (var i = 0; i < this.keys.length; i++) {
        var w = 0;
        var p = 0;
        if (this.obj[this.keys[i]].weight) {
          let arr = this.obj[this.keys[i]].weight.split('\n');

          for (var k = 0; k < arr.length; k++) {
            w = w + parseFloat(arr[k]);

          }
          //  temp.push({name:this.obj[this.keys[i]].name,weight:w});
          //   temp = temp.sort((a, b) => (a.weight > b.weight) ? 1 : -1 );
          //   temp = temp.reverse();
          //   this.sorted = temp;
        }
        if (this.obj[this.keys[i]].piece) {
          let arr = this.obj[this.keys[i]].piece.split('\n');

          for (var k = 0; k < arr.length; k++) {
            p = p + parseFloat(arr[k]);

          }
          //  temp.push({name:this.obj[this.keys[i]].name,weight:w});
          //   temp = temp.sort((a, b) => (a.weight > b.weight) ? 1 : -1 );
          //   temp = temp.reverse();
          //   this.sorted = temp;
        }
        if (w > 0) {
          temp.push({sektor:this.obj[this.keys[i]].sektor, name: this.obj[this.keys[i]].name, weight: w, piece: p });
        }

      }
      temp = temp.sort((a, b) => (a.weight > b.weight) ? 1 : -1);
      temp = temp.reverse();
      this.sorted = temp;

      console.log(JSON.stringify(temp));
      if (this.sorted.length > 0) {
        let totalweight = 0;
        let totalpiece = 0;
        console.log(JSON.stringify(this.sorted));
        for (var i = 0; i < this.sorted.length; i++) {
          totalweight = totalweight + parseInt(this.sorted[i].weight);
          totalpiece = totalpiece + parseInt(this.sorted[i].piece)

        }
        this.totalweight = totalweight.toString();
        this.totalpiece = totalpiece.toString();
      }
      var ref = this;
      this.service.insertClickedTime(function (data) {
        ref.service.getClickedTime(function (data1) {
          if (data1) {
            ref.clickedtime = data1;
          }
        })

      });
    }
  }

  getTotalWeightAndFish() {

  }

  addFieldValue() {
    this.obj[Date.now().toString()] = {};
    this.keys = Object.keys(this.obj);
    //  var obj = this.newAttribute;
    //   obj["new"] = true;
    //     this.fieldArray.push(obj);

    // this.newAttribute = {};
  }

  deleteFieldValue(key) {
    if (window.confirm("BIZTOS VAGY BENNE ATTILA? DE TUTI?")) {
      var ref = this;
      this.loader.create({
        message: "kérlek várj..."
      }).then((ele) => {

        ele.present();
        this.service.deleteData(key, function (data) {
          ele.dismiss();
          ref.showToast(data);
          ref.getData();
        })
      })
    }
  }

  // deleteFieldValue(key) {
  //    // this.fieldArray.splice(index, 1);
  //    delete this.obj[key];
  //    this.keys = Object.keys(this.obj);
  // }
  getBigFish() {
    var ref = this;
    this.service.getBigFish(function (data) {
      if (data) {
        ref.bigfish = data;
      }

    })

  }
  insertData() {
    //this.fieldArray.push(this.newAttribute);

    // alert(JSON.stringify(this.fieldArray));
    // let  = [];
    let ref = this;
    //    for(var i = 0;i<this.keys.length;i++)
    //    {
    //      console.log(this.obj[this.keys[i]]);
    //      if(this.obj[this.keys[i]].name != "" || this.obj[this.keys[i]].sektor != "" || this.obj[this.keys[i]].weight != "" || this.obj[this.keys[i]].piece != ""  || this.obj[this.keys[i]].time != "")
    //      {

    // delete this.obj[this.keys[i]];
    //      // arr.push(this.fieldArray[i]);

    //      }


    //    }
    //(JSON.stringify(arr));

    this.loader.create({
      message: "kérlek várj..."
    }).then((ele) => {

      ele.present();
      this.service.insertData(this.obj, function (str) {
        //alert(str);
        ele.dismiss();
        ref.showToast(str);
        ref.insertMetaInfo();
        ref.service.insertBigFish(ref.bigfish);
        ref.getData();

      });
    })

  }

  // getData()
  // {
  //   let ref = this;
  //   this.loader.create({
  //     message:"kérlek várj..."
  //   }).then((ele)=>{

  //   ele.present();
  //   this.service.getData(function(data)
  //   {
  //     ele.dismiss();
  //     if(data)
  //     {
  //     console.log(JSON.stringify(data));
  //     ref.keys = Object.keys(data);
  //     ref.obj = data;
  //     ref.getMetaInfo();

  //     }
  //   })
  // })

  // }

  // getData()
  // {
  //   let ref = this;
  //   this.loader.create({
  //     message:"please wait..."
  //   }).then((ele)=>{

  //   ele.present();
  //   this.service.getData(function(data)
  //   {
  //     ele.dismiss();
  //     if(data)
  //     {
  //     console.log(JSON.stringify(data));
  //     ref.keys = Object.keys(data);
  //     ref.obj = data;


  //     }
  //     else{
  //     ref.getMetaInfo();
  //     ref.keys = [];
  //     ref.obj = {};
  //     }
  //   })
  // })

  // }

  getData() {
   
    let ref = this;
    this.loader.create({
      message: "kérlek várj..."
    }).then((ele) => {

      ele.present();
      this.service.getData(function (data) {
        ele.dismiss();
        if (data) {
          console.log(JSON.stringify(data));
          ref.keys = Object.keys(data);
          ref.obj = data;
          ref.getMetaInfo();
          ref.getBigFish();
          ref.service.getClickedTime(function (data1) {
            if (data1) {
              ref.clickedtime = data1;
            }
          })
        

          //ref.calculate();

          //alert(JSON.stringify(keys));
          //   let arr = [];
          //   for(var i = 0;i<keys.length;i++)
          //   {
          //     console.log(data[keys[i]]);
          //    arr = arr.concat(data[keys[i]]);
          //   }
          //  // alert(JSON.stringify(arr));
          //   if(arr.length > 0)
          //   {
          //     ref.fieldArray = [];
          //     ref.fieldArray = arr;
          //   }
        }
        else {
          ref.getMetaInfo();
          ref.getBigFish();
          ref.keys = [];
          ref.obj = {};

          ref.service.getClickedTime(function (data1) {
            if (data1) {
              ref.clickedtime = data1;
            }
          })

        }
      })
    })

  }


  showToast(msg) {
    this.toast.create({
      message: msg,
      duration: 3000
    }).then((ele) => {
      ele.present();
    })
  }

orderBySektor()
{
  var ref = this;
  var sektorTemp = [];
  this.sektorObj = {};
 
  for (var i = 0; i < ref.keys.length; i++) {
    if(ref.obj[ref.keys[i]].sektor != "")
    {
    sektorTemp.push(ref.obj[ref.keys[i]].sektor[0]);
    }

  }
  console.log(sektorTemp);
  sektorTemp = sektorTemp.filter((c, index) => {
    return sektorTemp.indexOf(c) === index;
});
sektorTemp = sektorTemp.sort();
console.log(sektorTemp);
for(var j = 0;j<sektorTemp.length;j++)
{
  var arrtemp = [];
  for(var k = 0;k<ref.keys.length;k++)
  {
   if(sektorTemp[j] == ref.obj[ref.keys[k]].sektor.trim()[0])
   {
     arrtemp.push(ref.obj[ref.keys[k]])
   }

  }
  ref.sektorObj[sektorTemp[j]] = arrtemp;
}
ref.sektorKeys = Object.keys(ref.sektorObj);
console.log(ref.sektorObj);
ref.disabledCalcultion = false;
}


}



