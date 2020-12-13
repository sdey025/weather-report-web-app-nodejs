const curDate = document.getElementById("date");
let weatherCond = document.getElementById("weather");
const tempStatus = "clouds";
const getCurrentDay = () => {
  let weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tueday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thrusday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  let currentTime = new Date();
  let day = weekdays[currentTime.getDay()];
  return day;
};
const getCurrentTime = () => {
  let months = [
    "jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let now = new Date();
  let num = now.getMonth();
  let month = months[num];
  let date = now.getDate();
  let hours = now.getHours();
  let mins = now.getMinutes();
  let period = "AM";
  console.log(month);
  if (hours > 11) {
    period = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  return ` ${month} ${date} | ${hours}:${mins}${period}`;
};
curDate.innerHTML = getCurrentDay() + "|" + getCurrentTime();
