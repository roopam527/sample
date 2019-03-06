const socket = io.connect('https://iot-back.herokuapp.com/');


const getUrlVars =()=> {
    const vars = {};
    const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
    });
    return vars;
    }


let pause = false;
let animation_duration = 0;
let check_first=0;


const hash = getUrlVars()["id"];
console.log(hash);
const generateChart = (dataset=[],labels=[],id)=>{
    var ctx = document.getElementById(id).getContext('2d');
    if(check_first == 0){
        check_first = 1;
        animation_duration = 1000

    }
    else{
        animation_duration=0
    }
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Tempratures',
            
            data: dataset,
            
            
            borderWidth: 1
        }]
    },
    options: {
        animation: {
            duration:animation_duration, // general animation time
        },
        

        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        tooltips: {
            cornerRadius: 4,
            caretSize: 4,
            xPadding: 16,
            yPadding: 10,
            backgroundColor: 'rgba(0, 150, 100, 0.9)',
            titleFontStyle: 'normal',
            titleMarginBottom: 15
          }
    }
});

}


const temp_dataset = []
const temp_labels = []
socket.on('temp_data',(data)=>{
    const timestamp =new Date();
    let temp_status = "normal"
    if(data>40){
        temp_status="Very Hot"
    }else if(data>33){
        temp_status="Hot"
    }else if(data>23){
        temp_status="Normal"
    }else if(data>13){
        temp_status="Cool"
    }else{
        temp_status="Cold"
    }
         
    const time = `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;
    const date = `${timestamp.getDate()}-${timestamp.getMonth()+1}-${timestamp.getFullYear()}`;
    document.getElementById("temp_status").innerHTML=temp_status;
        
    document.getElementById("current_temp").innerHTML=data+"° C";
    document.getElementById("current_time").innerHTML="at "+time;
    document.getElementById("current_date").innerHTML="on "+date;
    temp_dataset.push(data);
    temp_labels.push(time);
    generateChart(temp_dataset,temp_labels,"temp-Chart");
          
})

const pulse_dataset = []
const pulse_labels = []
socket.on('pulse_data',(data)=>{
    const timestamp =new Date();
        
    const time = `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;
    const date = `${timestamp.getDate()}-${timestamp.getMonth()+1}-${timestamp.getFullYear()}`;
      
    document.getElementById("pulse_current_temp").innerHTML=data+"° C";
    document.getElementById("pulse_current_time").innerHTML="at "+time;
    document.getElementById("pulse_current_date").innerHTML="on "+date;
    pulse_dataset.push(data);
    pulse_labels.push(time);
    generateChart(pulse_dataset,pulse_labels,"pulse-Chart");
          
})


const body_temp_dataset = []
const body_temp_labels = []
socket.on('body_temp_data',(data)=>{
    const timestamp =new Date();
         
    const time = `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;
    const date = `${timestamp.getDate()}-${timestamp.getMonth()+1}-${timestamp.getFullYear()}`;
        
    document.getElementById("body_temp_current_temp").innerHTML=data+"° C";
    document.getElementById("body_temp_current_time").innerHTML="at "+time;
    document.getElementById("body_temp_current_date").innerHTML="on "+date;
    body_temp_dataset.push(data);
    body_temp_labels.push(time);
    generateChart(body_temp_dataset,body_temp_labels,"body-Chart");
          
})


const go_to_temperature_page = () =>{
    window.location.href = "https://roopam527.github.io/iot_ui/IOT_health/temperature.html";
}

const go_to_body_temperature_page = () =>{
    window.location.href = "https://roopam527.github.io/iot_ui/IOT_health/body_temperature.html";
}

const go_to_pulse_page = () =>{
    window.location.href = "https://roopam527.github.io/iot_ui/IOT_health/pulse.html";
}

const go_to_login_page = () =>{
    window.location.href = "https://roopam527.github.io/iot_ui";
}

