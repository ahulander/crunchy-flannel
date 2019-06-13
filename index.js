
function nextDay(date) {
  var result = new Date(date);
  result.setDate(result.getDate() + 1);
  result.setHours(0);
  result.setMinutes(0);
  result.setSeconds(0);
  result.setMilliseconds(0);
  return result;
}

function timeLeftBetweenDates(d0, d1) {
  var seconds = (d1 - d0) / 1000;
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds - h * 3600) / 60);
  var s = Math.floor(seconds - h * 3600 - m * 60);

  return {
    hours: h,
    minutes: m,
    seconds: s,
  };
}

function prependZero(time) {
  return time >= 10 ? time : '0' + time;
}

function calculateWhosTurnItIs(date, numberOfParticipants) {
  // Good enough, its a shirt!
  var y = date.getFullYear();
  var m = date.getMonth();
  var d = date.getDate();
  var fakeDay = y * 372 + m * 31 + d;
  return fakeDay % numberOfParticipants;
}

function toImagePath(person) {
  return 'images/' + person.toLocaleLowerCase() + '.svg';
}

function tickTimer(timer, who) {
  var today = new Date();
  var tomorrow = nextDay(today);
  var timeRemaining = timeLeftBetweenDates(today, tomorrow);
  
  timer.hours.textContent = prependZero(timeRemaining.hours);
  timer.minutes.textContent = prependZero(timeRemaining.minutes);
  timer.seconds.textContent = prependZero(timeRemaining.seconds);

  var people = [
    'Alex',
    'Jonas',
  ];
  var shirtPerson = people[calculateWhosTurnItIs(tomorrow, people.length)];
  who.src = toImagePath(shirtPerson);
  document.title = 'Dagens Skjorta - ' + shirtPerson;
}

var timeout;
function onready(e) {
  if (timeout) return;

  var timer = {
    hours: document.getElementById("timer-hours"),
    minutes: document.getElementById("timer-minutes"),
    seconds: document.getElementById("timer-seconds"),
  };
  var who = document.getElementById("who");
  var ticker = tickTimer.bind(null, timer, who);

  timeout = setInterval(ticker, 1000);
  ticker();
}
document.onreadystatechange = onready;
