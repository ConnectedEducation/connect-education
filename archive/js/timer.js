function Timer(){
    let startTime = new Date().valueOf();
    console.log('startTime:', startTime);
    this.stopTime = function stopTime(){
        let stopTime = new Date().valueOf();
        console.log('stopTime:',stopTime);
        let timerContainer = document.createElement('DIV');
        timerContainer.className = 'ce-panel';
        let difference = stopTime - startTime;
        console.log('difference:', difference);
        
        let timeString = "start time: " + startTime + ' ms<br>' + "stop time: " + stopTime + ' ms<br>' + "difference: " + difference + ' ms';
        console.log(timeString);

        timerContainer.innerHTML = timeString;
        document.body.appendChild(timerContainer);
    }
}

// Start the timer.
let startTimer = new Timer();