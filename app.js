const Info = document.querySelector('.info-weather');
const Btn = document.querySelector('.search-btn');
const Bar = document.querySelector('.side-bar');
const Close = document.querySelector('.icon-close');
const Search = document.querySelector('.input-city');
const Search_Btn = document.querySelector('.btn-search');
const Img_Weather = document.querySelector('.img-weather img');
const Tem = document.querySelector('.tem');
const Status = document.querySelector('.status');
const Calendar = document.querySelector('.calendar');
const Name_City = document.querySelector('.name-city');
const APP_ID = '77735331ea2eff47b16232b79d4d4dc0';
const Wind = document.querySelector('.number-wind');
const Visibility = document.querySelector('.number-visibility');
const humidity = document.querySelector('.number-humidity');
const ItemWeatherDay = document.querySelectorAll('.item-day h2');
var locationWeather = document.querySelector('.location-weather');
const AirPressure = document.querySelector('.number-pressure');
var Info_Content = document.querySelector('.info-content-weather');
const img_item_day = document.querySelectorAll('.item-day img');

const Default = '--';
var index = 0;
const Day_number = document.querySelector('.day');
var Month = document.querySelector('.month');
const DayName = document.querySelector('.day-name');
const Item_Day = document.querySelectorAll('.item-day h2');
const temp_left = document.querySelectorAll('.left');
const temp_right = document.querySelectorAll('.right');

Btn.addEventListener('click', function() {
    Bar.classList.add('active');
});
Close.addEventListener('click', function() {
    Bar.classList.remove('active');
});

var Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//lấy thời gian hiện tại
function getDay() {
    const time = new Date();
    const month = time.getMonth();
    const Day = time.getDay();

    const date = time.getDate();
    Months.forEach((value, index) => {
        if (index == month) {
            Month.innerHTML = value;
        }
    });
    for (var i = 0; i < Days.length; i++) {
        if (i == Day) {
            DayName.innerHTML = Days[i];
        } else if (i > Day) {
            for (var j = i; j < Item_Day.length; j++) {
                Item_Day[j].innerHTML = Days[i + 1];
            }
        }
    }



    Day_number.innerHTML = date;


}
getDay();


Search_Btn.addEventListener('click', GetWeatherWorld);

function GetWeatherWorld() {
    Bar.classList.remove('active');
    const Value = Search.value;
    // Api tìm kiếm nhiệt độ bất kì của các thành phố trên thế giới
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Value}&appid=${APP_ID}&units=metric`)
        .then(async res => {
            const data = await res.json();
            console.log(data);
            // lấy dữ liệu và hiển thị lên màn hình
            Img_Weather.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            Name_City.innerHTML = data.name || Default;
            Tem.innerHTML = Math.round(data.main.temp) || Default;
            Status.innerHTML = data.weather[0].description || Default;
            Wind.innerHTML = data.wind.speed || Default;
            humidity.innerHTML = data.main.humidity + '%' || Default;
            Visibility.innerHTML = (data.visibility) / 1000 + 'miles' || Default;
            AirPressure.innerHTML = data.main.pressure + 'mb' || Default;
        })
}
//change background
// locationWeather.addEventListener('click', function() {
//     index++;
//     var i = index;
//     if (i % 2 == 0) {
//         document.querySelector('.info-weather').style.background = '#262729';
//     } else {
//         document.querySelector('.info-weather').style.background = 'green';
//     }
// });
function GetWeatherCurrent() {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;
        // Api lấy dữ liệu của một thành phố hiện tại được định vị trên thiết bị trong vòng 7 ngày
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${APP_ID}&units=metric`).then(async res => {
            const data = await res.json();
            console.log(data);
            Tem.innerHTML = Math.round(data.current.temp);
            Status.innerHTML = `<h2 class="status">
                       ${data.current.weather[0].description}
            </h2>`;
            // lấy độ dài của hình ảnh
            var img_item_day_length = img_item_day.length;
            // lấy độ dài của nhiệt đô ban đêm
            var temp_left_length = temp_left.length;
            // lấy độ dài của nhiệt độ ban ngày
            var temp_right_length = temp_right.length;
            // Lấy nhiệt độ ban đêm và in ra màn hình
            for (var i = 0; i < temp_left_length; i++) {
                temp_left[i].innerHTML = Math.round(data.daily[i].temp.night) + '°C';
            }
            // lấy nhiệt độ ban ngày và in ra màn hình
            for (var j = 0; j < temp_right_length; j++) {
                temp_right[j].innerHTML = Math.round(data.daily[j].temp.day) + '°C';
            }
            // lấy hình ảnh và in ra màn hình
            for (var z = 0; z < img_item_day_length; z++) {
                img_item_day[z].setAttribute('src', `http://openweathermap.org/img/wn/${data.daily[z].weather[0].icon}@2x.png`)
            }
        })
    })
}
GetWeatherCurrent();