


export const toHumanTime = (unixTime) => {
  if (unixTime === undefined) {
    return null
  }
    const timeDif = new Date().getTime() - unixTime*1000;
    let seconds = Math.floor( timeDif / 1000 );
    let minutes = Math.floor( seconds / 60 );
    let hours = Math.floor( minutes / 60 );
    let days = Math.floor( hours / 24 );
    let months = Math.floor(days/30);
    let years = Math.floor(months/12);
  
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
         
    let a = Math.min.apply(Math, [seconds, minutes, hours, days, months, years].filter(Number))*-1;
    
   let c = '';    
   if (timeDif < minute) {c ='second'} 
        else if (timeDif < hour ) { c = 'minute' }
        else if (timeDif < day) { c = 'hour' }
        else if (timeDif < month) { c = 'day' }
        else if (timeDif < year) { c = 'months' }
   else {c = 'years'};
  //   console.log(c);
  const rtf = new Intl.RelativeTimeFormat('en', {numeric: 'auto',});
    return (rtf.format(a, c));
    
  };