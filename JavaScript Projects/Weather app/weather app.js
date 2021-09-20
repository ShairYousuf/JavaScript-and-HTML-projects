window.addEventListener("load",() => {
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let weather_icon = document.querySelector(".weathericon");
    let temperatureUnit= document.querySelector(".unit");
    let temperatureSection = document.querySelector(".temperature");
    let hourlycard = document.querySelector(".hourly-row");
    let dailycard = document.querySelector(".daily");
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let modalwhole = document.querySelector(".modalwhole");
    if ( navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            let key ="c53ea05219c8136724a2eb3b1f3f1adc" ;
            //const proxy = 'https://cors-anywhere.herokuapp.com/';
            //const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
            const apiApp = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
            exclude=minutely&appid=${key}`;
            
            fetch(apiApp)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    temperatureDegree.textContent = Math.round(data.current.temp - 273);
                    temperatureDescription.textContent = data.current.weather[0].main;
                    let mainbackground = document.querySelector(".current");
                    mainbackground.setAttribute("style","background-image:url(" + '"'+ setbackgroundgif(data.current.weather[0].main) + '"')
                    locationTimezone.textContent = data.timezone//+ " " + data.sys.country
                    //weather_icon.src= "http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png"
                    temperatureSection.addEventListener('click',()=>{
                        if(temperatureUnit.textContent ==="C"){
                            temperatureUnit.textContent="F";
                            temperatureDegree.textContent = Math.round((Math.round(data.current.temp - 273)*(9/5)) + 32 );
                        }else{
                            temperatureUnit.textContent="C";
                            temperatureDegree.textContent = Math.round(data.current.temp - 273);
                        }
                    });
                    data.hourly.forEach(create_card_hourly);
                    data.daily.forEach(create_card_daily);
                    function create_card_hourly(item,index){
                        //adding content
                        let card = document.createElement("div");
                        card.classList.add('card');
                        let cardcontent = document.createElement("div");
                        cardcontent.classList.add("card-body");
                        let cardtemp = document.createElement("h1");
                        let text = document.createTextNode(Math.round(item.temp - 273) + "C");
                        let cardtempdes = document.createElement("h1");
                        let text1 = document.createTextNode(item.weather[0].main);
                        let cardtemp2 = document.createElement("h1");
                        let hourlyicon = document.createElement("img");
                        //time setting for  hourly
                        let today = new Date();
                        let h = today.getHours();
                        let counter = h + index ;
                        if ((counter)>=24 && (counter)<48){
                            if ((counter-24) >= 12 ){
                                if ((counter -24) == 12){
                                    let text2 = document.createTextNode("Noon");
                                    cardtemp2.appendChild(text2);
                                    hourlyicon.setAttribute("src",hourlyimage(item.weather[0].main,counter-24));
                                    cardcontent.appendChild(hourlyicon);
                                }else{
                                    let text2 = document.createTextNode((counter-36)  + ":00pm");
                                    cardtemp2.appendChild(text2);
                                    hourlyicon.setAttribute("src",hourlyimage(item.weather[0].main,counter-24));
                                    cardcontent.appendChild(hourlyicon);
                                }
                            }else{
                                if ((counter-24) == 0){
                                    let text2 = document.createTextNode("Midnight");
                                    cardtemp2.appendChild(text2);
                                    hourlyicon.setAttribute("src",hourlyimage(item.weather[0].main,counter-24));
                                    cardcontent.appendChild(hourlyicon);
                                }else{
                                    let text2 = document.createTextNode((counter-24)  + ":00am");
                                    cardtemp2.appendChild(text2);
                                    hourlyicon.setAttribute("src",hourlyimage(item.weather[0].main,counter-24));
                                    cardcontent.appendChild(hourlyicon);
                                }
                            }
                            
                        }else if((counter)>=48){
                            if ((counter-48) >= 12 ){
                                if ((counter -48) == 12){
                                    let text2 = document.createTextNode("Noon");
                                    cardtemp2.appendChild(text2);
                                    hourlyicon.setAttribute("src",hourlyimage(item.weather[0].main,counter-48));
                                    cardcontent.appendChild(hourlyicon);
                                }else{
                                    let text2 = document.createTextNode((counter-60)  + ":00pm");
                                    cardtemp2.appendChild(text2);
                                    hourlyicon.setAttribute("src",hourlyimage(item.weather[0].main,counter-48));
                                    cardcontent.appendChild(hourlyicon);
                                }
                            }else{
                                if ((counter-48) == 0){
                                    let text2 = document.createTextNode("Midnight");
                                    cardtemp2.appendChild(text2);
                                    hourlyicon.setAttribute("src",hourlyimage(item.weather[0].main,counter-48));
                                    cardcontent.appendChild(hourlyicon);
                                }else{
                                    let text2 = document.createTextNode((counter-48)  + ":00am");
                                    cardtemp2.appendChild(text2);
                                    hourlyicon.setAttribute("src",hourlyimage(item.weather[0].main,counter-48));
                                    cardcontent.appendChild(hourlyicon);
                                }
                            }
                        }
                        else{
                            if(counter >= 12){
                                if (counter == 12){
                                    let text2 = document.createTextNode("Noon");
                                    cardtemp2.appendChild(text2);
                                    hourlyicon.setAttribute("src",hourlyimage(item.weather[0].main,counter));
                                    cardcontent.appendChild(hourlyicon);
                                }else{
                                    let text2 = document.createTextNode((counter-12)  + ":00pm");
                                    cardtemp2.appendChild(text2);
                                    hourlyicon.setAttribute("src",hourlyimage(item.weather[0].main,counter));
                                    cardcontent.appendChild(hourlyicon);
                                }
                                
                            }else{
                                if (counter == 0){
                                    let text2 = document.createTextNode("Midnight");
                                    cardtemp2.appendChild(text2);
                                    hourlyicon.setAttribute("src",hourlyimage(item.weather[0].main,counter));
                                    cardcontent.appendChild(hourlyicon);
                                }else{
                                    let text2 = document.createTextNode((counter)  + ":00am");
                                    cardtemp2.appendChild(text2);
                                    hourlyicon.setAttribute("src",hourlyimage(item.weather[0].main,counter));
                                    cardcontent.appendChild(hourlyicon);
                                }
                            }
                            
                        }
                        cardtemp.appendChild(text);
                        cardtempdes.appendChild(text1);
                        cardcontent.appendChild(cardtemp2);
                        cardcontent.appendChild(cardtemp);
                        cardcontent.appendChild(cardtempdes);
                        card.appendChild(cardcontent);
                        let column = document.createElement("td");
                        column.classList.add("column");
                        column.appendChild(card);
                        hourlycard.appendChild(column);   
                    }
                    function create_card_daily(item,index){
                        //create div and add info
                        let card = document.createElement("div");
                        card.classList.add('card');
                        let cardcontent = document.createElement("div");
                        cardcontent.classList.add("card-body");
                        let cardtemp = document.createElement("h1");
                        let text = document.createTextNode(Math.round(item.temp.day - 273) + "C");
                        let cardtempdes = document.createElement("h1");
                        let text1 = document.createTextNode(item.weather[0].main);
                        let cardtemp2 = document.createElement("h1");
                        let dailyicon = document.createElement("img");
                        dailyicon.setAttribute("src", dailyimage(item.weather[0].main));
                        cardcontent.appendChild(dailyicon);
                        //current day
                        let today = new Date();
                        let day = days[today.getDay() + index]
                        let text3 = document.createTextNode(day);
                        //button settings
                        let button = document.createElement("button");
                        button.classList.add("btn");
                        button.classList.add("btn-primary");
                        let text_button = document.createTextNode("Details");
                        button.appendChild(text_button);
                        button.setAttribute("type","button");
                        button.setAttribute("data-toggle","modal");
                        button.setAttribute("data-target","#modal"+ index);
                        //adding to main div
                        cardtemp2.appendChild(text3);
                        cardtemp.appendChild(text);
                        cardtempdes.appendChild(text1);
                        cardcontent.appendChild(cardtemp2);
                        cardcontent.appendChild(cardtemp);
                        cardcontent.appendChild(cardtempdes);
                        cardcontent.appendChild(button);
                        card.appendChild(cardcontent);
                        let column = document.createElement("td");
                        column.classList.add("column");
                        column.appendChild(card);
                        dailycard.appendChild(column);  
                        //modal settings
                        let modal = document.createElement("div");
                        modal.setAttribute("class","modal");
                        modal.classList.add("fade");
                        modal.setAttribute("id","modal" + index);
                        let modal_dialog = document.createElement("div");
                        modal.appendChild(modal_dialog);
                        modal_dialog.setAttribute("class","modal-dialog")
                        let modal_content = document.createElement("div");
                        modal_dialog.appendChild(modal_content);
                        modal_content.setAttribute("class","modal-content");
                        modal_body=document.createElement("div");
                        modal_body.setAttribute("class","modal-body");
                        modal_content.appendChild(modal_body);
                        let closebutton = document.createElement("button");
                        closebutton.setAttribute("type","button");
                        closebutton.setAttribute("class","close");
                        closebutton.setAttribute("data-dismiss","modal");
                        let text_button_close = document.createTextNode("X");
                        closebutton.appendChild(text_button_close);
                        modalwhole.appendChild(modal);
                        //adding content to modal
                        let modal_image_div = document.createElement("div");
                        modal_image_div.setAttribute("class","modalimage");
                        modal_image_div.setAttribute("style","background-image:url(" + '"'+ setbackgroundgif(item.weather[0].main) + '"')
                        let modal_condition = document.createElement("h1");
                        let modal_condition_text = document.createTextNode("Weather Condition= " + item.weather[0].main);
                        modal_condition.appendChild(modal_condition_text);
                        let modal_temp = document.createElement("h1");
                        let modal_temp_text = document.createTextNode("Average temperature= " + Math.round(item.temp.day - 273) + "C");
                        modal_temp.appendChild(modal_temp_text);
                        let modal_hightemp = document.createElement("h1");
                        let modal_hightemp_text = document.createTextNode("Maximum temperature= " + Math.round(item.temp.max - 273) + "C");
                        modal_hightemp.appendChild(modal_hightemp_text);
                        let modal_lowtemp = document.createElement("h1");
                        let modal_lowtemp_text = document.createTextNode("Minimum temperature= " + Math.round(item.temp.min - 273) + "C");
                        modal_lowtemp.appendChild(modal_lowtemp_text);
                        let modal_sunrise = document.createElement("h1");
                        let sunrise = new Date(item.sunrise * 1000).toLocaleTimeString("en-US");
                        let modal_sunrise_text = document.createTextNode("Sunrise= " + sunrise);
                        modal_sunrise.appendChild(modal_sunrise_text);
                        let modal_sunset = document.createElement("h1");
                        let sunset = new Date(item.sunset * 1000).toLocaleTimeString("en-US");
                        let modal_sunset_text = document.createTextNode("Sunset= " + sunset);
                        modal_sunset.appendChild(modal_sunset_text);
                        modal_body.appendChild(modal_image_div);
                        modal_body.appendChild(closebutton);
                        modal_body.appendChild(modal_condition)
                        modal_body.appendChild(modal_temp);
                        modal_body.appendChild(modal_hightemp);
                        modal_body.appendChild(modal_lowtemp);
                        modal_body.appendChild(modal_sunrise);
                        modal_body.appendChild(modal_sunset);
                    }
                    //function to set the background of main display
                    function setbackgroundgif(info){
                        if (info=="Thunderstorm"){
                            let weather= "https://media.giphy.com/media/3oEjHB1EKuujDjYFWw/giphy.gif";
                            return weather ;
                        }else if(info=="Drizzle"){
                            let weather = "https://media.giphy.com/media/l0IrIkq7Q3iRII0hy/giphy.gif";
                            return weather;
                        }else if(info=="Rain"){
                            let weather = "https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif";
                            return weather;
                        }else if(info == "Snow"){
                            let weather = "https://media.giphy.com/media/rRmBOCZDJJGU0/giphy.gif";
                            return weather;
                        }else if( info=="Mist" || info=="Smoke" || info=="Haze" || info=="Dust" ||info=="Fog" ){
                            let weather = "https://media.giphy.com/media/d6JfdOpurCisGQdzdA/giphy.gif";
                            return weather;
                        }else if(info == "Ash"){
                            let weather = "https://media.giphy.com/media/FR6X307rk1dC0/giphy.gif";
                            return weather;
                        }else if(info == "Squall"){
                            let weather = "https://media.giphy.com/media/5RHAxkNRlLPjy/giphy.gif";
                            return weather;
                        }else if(info == "Tornado"){
                            let weather = "https://media.giphy.com/media/5QXkoDtmD8NGi7MuFP/giphy.gif";
                            return weather;
                        }else if(info == "Clear"){
                            let weather = "https://media.giphy.com/media/mno6BJfy8USic/giphy.gif";
                            return weather;
                        }else {//if(info == "Clouds"){
                            let weather = "https://media.giphy.com/media/GFXNdR1tuMopi/giphy.gif";
                            return weather;
                        }
                    }
                    //function to set ghourly display icon
                    function hourlyimage(info,time){
                        if (info=="Thunderstorm" && (time > 6 && time < 18)){
                            let weather= "icons/thunder.svg";
                            return weather ;
                        }else if(info=="Thunderstorm" && (time <= 6 || time >= 18)){
                            let weather= "icons/thunder.svg";
                            return weather ;
                        }else if(info=="Drizzle" && (time > 6 && time < 18)){
                            let weather = "icons/rainy-2.svg";
                            return weather;
                        }else if(info=="Drizzle" && (time <= 6 || time >= 18)){
                            let weather = "icons/rainy-6.svg";
                            return weather;
                        }else if(info=="Rain" && (time > 6 && time < 18)){
                            let weather = "icons/rainy-2.svg";
                            return weather;
                        }else if(info=="Rain" && (time <= 6 || time >= 18)){
                            let weather = "icons/rainy-6.svg";
                            return weather;
                        }else if(info == "Snow" && (time > 6 && time < 18)){
                            let weather = "icons/snowy-2.svg";
                            return weather;
                        }else if(info == "Snow" && (time <= 6 || time >= 18)){
                            let weather = "icons/snowy-5.svg";
                            return weather;
                        }else if( (info=="Mist" && (time > 6 && time < 18)) || (info=="Smoke" &&( time > 6 && time < 18)) || (info=="Haze" && (time > 6 && time < 18)) || (info=="Dust" && (time > 6 && time < 18))  ||(info=="Fog"&& (time > 6 && time < 18)) ){
                            let weather = "icons/cloudy-day-2.svg";
                            return weather;
                        }else if( (info=="Mist" && (time <= 6 || time >= 18)) || (info=="Smoke"&& (time <= 6 || time >= 18)) || (info=="Haze" || (time <= 6 || time >= 18)) || (info=="Dust" && (time <= 6 || time >= 18))  ||(info=="Fog"&& (time <= 6 || time >= 18)) ){
                            let weather = "icons/cloudy-night-2.svg";
                            return weather;
                        }else if(info == "Ash" && (time > 6 || time < 18)){
                            let weather = "icons/cloudy.svg";
                            return weather;
                        }
                        else if(info == "Ash" && (time <= 6 || time >= 18)){
                            let weather = "icons/cloudy.svg";
                            return weather;
                        }else if(info == "Squall" && (time > 6 && time < 18)){
                            let weather = "icons/cloudy.svg";
                            return weather;
                        }
                        else if(info == "Squall" && (time <= 6 || time >= 18)){
                            let weather = "icons/cloudy.svg";
                            return weather;
                        }else if(info == "Tornado" && (time > 6 && time < 18)){
                            let weather = "icons/thunder.svg";
                            return weather;
                        }else if(info == "Tornado" && (time <= 6 || time >= 18)){
                            let weather = "icons/thunder.svg";
                            return weather;
                        }else if(info == "Clear" && (time > 6 && time < 18)){
                            let weather = "icons/day.svg";
                            return weather;
                        }else if(info == "Clear" && (time <= 6 || time >= 18)){
                            let weather = "icons/night.svg";
                            return weather;
                        }else if (info == "Clouds" && (time > 6 && time < 18)){
                            let weather = "icons/cloudy-day-1.svg";
                            return weather;
                        }else {
                            let weather = "icons/cloudy-night-1.svg";
                            return weather;
                        }
                    }
                    function dailyimage(info){
                        if (info=="Thunderstorm" ){
                            let weather= "icons/thunder.svg";
                            return weather ;
                        }else if(info=="Drizzle" ){
                            let weather = "icons/rainy-2.svg";
                            return weather;
                        }else if(info=="Rain" ){
                            let weather = "icons/rainy-2.svg";
                            return weather;
                        }else if(info == "Snow" ){
                            let weather = "icons/snowy-2.svg";
                            return weather;
                        }else if( (info=="Mist" ) || (info=="Smoke" ) || (info=="Haze" ) || (info=="Dust" )  ||(info=="Fog") ){
                            let weather = "icons/cloudy-day-2.svg";
                            return weather;
                        }else if(info == "Ash" ){
                            let weather = "icons/cloudy.svg";
                            return weather;
                        }
                        else if(info == "Squall" ){
                            let weather = "icons/cloudy.svg";
                            return weather;
                        }
                        else if(info == "Tornado"){
                            let weather = "icons/thunder.svg";
                            return weather;
                        }else if(info == "Clear" ){
                            let weather = "icons/day.svg";
                            return weather;
                        }else {
                            let weather = "icons/cloudy-day-1.svg";
                            return weather;
                        }
                    }

                });
        });
    }
});