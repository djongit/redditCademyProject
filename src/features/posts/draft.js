const datee =  1662359006
const timeDif = new Date().getTime() - datee*1000;



function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours/24);
// const sec = 1000;
  const min = 1000 * 60;
  const hour = min * 60;
  const day = hour * 24;
  // seconds = seconds % 60;
  // minutes = minutes % 60; 
  // hours = hours % 24;
  // days = days % 30;
  
  console.log('seconds: ' + seconds);
  console.log('minutes: ' +minutes);
  console.log('hours: ' + hours);
  // console.log('days: ' + days);
  const rtf = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
  });
  
  let a = Math.min.apply(Math, [seconds, minutes, hours, days].filter(Number))*-1;
  
 let c = '';
   
 if (milliseconds < min) {c ='second'} 
  else if (milliseconds < hour ) {c = 'minute'}
  else if (milliseconds < day) {c = 'hour'}
 else {c = 'days'};
  console.log(c);
  return console.log(rtf.format(a, c));
  
};
console.log(1000*60*60*24)
convertMsToTime(timeDif);


////-----------------------------------------------------------------///
  function relativeDays(timestamp) {
    const rtf = new Intl.RelativeTimeFormat('en', {
      numeric: 'auto',
    });
    const oneDayInMs = 1000 * 60 * 60 * 24;
    const daysDifference = Math.round(
      (timestamp - new Date().getTime()) / oneDayInMs,
    );
  
    return rtf.format(daysDifference, 'hour');
  }
  
  console.log(relativeDays(new Date('2022-09-05 15:00').getTime()));

//--------------------------------------------------------------
  const time = 1662373901*1000
const i = new Date(time);
let date = new Date();
let hTime = date.getTime();
const fromNow = hTime - time;
let hours = fromNow / 1000/60/60;
console.log('fromNow ' + new Date(fromNow));
console.log('currentDate ' + new Date());
console.log('redditDate ' + new Date(time));
console.log('right ' + hours);
console.log(fromNow);