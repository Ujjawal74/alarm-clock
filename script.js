/*
Created By: Connect/Follow me on LinkedIn.
=> https://www.linkedin.com/in/ujjawal-biswas-b40611142/
          _   _                         _  _      _                           
  _   _  (_) (_)  __ _ __      __ __ _ | || |__  (_) ___ __      __ __ _  ___ 
 | | | | | | | | / _` |\ \ /\ / // _` || || '_ \ | |/ __|\ \ /\ / // _` |/ __|
 | |_| | | | | || (_| | \ V  V /| (_| || || |_) || |\__ \ \ V  V /| (_| |\__ \
  \__,_|_/ |_/ | \__,_|  \_/\_/  \__,_||_||_.__/ |_||___/  \_/\_/  \__,_||___/
       |__/|__/                                                                                                                                                                               
*/


// initialized all elements
let alarms = document.getElementById("alarms");
let now = document.getElementById("now");
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let setAlarmBtn = document.getElementById("setAlarm");
let notifier = document.getElementById("notifier");

// alarm list
let alarmsList = [{ time: "00:30" }];
let addedAlarms = {};

// ringtone
let ringtone = new Audio("./assests/ringtone.mp3");
ringtone.loop = true;

// last alarm set
let lastAlarm;

// evenlistener on whole document and alarm button actions
document.addEventListener("click", eventHandler);
setAlarmBtn.addEventListener("click", addAlarm);

// updating time in DOM using setInterval in 1sec.
function updateTime() {
  var today = new Date();
  const hr = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();

  now.innerHTML = `${hr}:${min}:${sec}`;
  let key = `${hr}:${min}`;

  //   Alarm matches then ringtone plays and pop up shows
  if (addedAlarms[key] == true) {
    lastAlarm = key;
    notifier.style.display = "flex";
    document.getElementById("alarmTime").innerHTML = key;
    ringtone.play();
  }
}

// on window loaded setInterval starts.
window.onload = function () {
  setInterval(updateTime, 1000);
};

// delete button event handler
function eventHandler(e) {
  if (e.target.hasAttribute("data-id")) {
    let id = e.target.dataset.id;
    let index = id[0];
    deleteAlarm(index);
  }
}

// Adding an alarm
function addAlarm() {
  let hr = hours.value;
  let min = minutes.value;
  // check if alarm input is valid or not
  if (hr && min) {
    if (hr >= 0 && hr < 24 && min >= 0 && min < 60) {
      alarmsList.push({ time: `${hr}:${min}` });
      let key = `${hr}:${min}`;
      addedAlarms[key] = true;
      renderAlarms(alarmsList);
    } else {
      alert("Enter a valid time!");
      return;
    }
  } else alert("Fields can not be empty!");
}

// stopping an alarm
function stopAlarm() {
  notifier.style.display = "none";
  addedAlarms[lastAlarm] = false;
  ringtone.pause();
}

// deleting an alarm
function deleteAlarm(id) {
  alarmsList = alarmsList.filter((val, index) => index != id);
  renderAlarms(alarmsList);
}

// rendering all alarms in DOM
function renderAlarms(alarmsList) {
  alarms.innerHTML = "";

  for (let i = 0; i < alarmsList.length; i++) {
    let x = `<div class="alarm">
                    <div class="time"><h4>${alarmsList[i].time}</h4></div>
                    <div class="action"><i class="fa fa-trash" data-id="${i}alarm"></i></div>
                </div>`;

    alarms.insertAdjacentHTML("beforeend", x);
  }
}

// called renderlist at starting also.
renderAlarms(alarmsList);
