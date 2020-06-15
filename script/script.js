$(document).ready(function() {
    /*
        Next Updates:
            next button - button is clicked > add remaining time to timePerQ     
            colorize timer - change color of timer through 3 phases: green, yellow, red
            reset button - button is clicked > reset displayer to default > enable the form to receive input again
    */


    
    $('#condition-start-button').on("click", function() {

        //disable start button
        $('#condition-start-button').prop('disabled', true);

        //fetch condition details
        var noQuestion = $('#no-question').val();
        var timeAvail = $('#time-avail').val();

        //convert str to int
        noQuestion = parseInt(noQuestion);
        timeAvail = parseInt(timeAvail);

        //revert condition details to defaults
        $('#no-question').val("");
        $('#time-avail').val("");

        //operation: question/time
        var timePerQ = (timeAvail / noQuestion) * 60;

        //update display extract
        $('#no-question-extract').text(noQuestion);
        $('#time-avail-extract').text(timeAvail);

        //updates question displayer
        var i = 0;
    
        qCountdown();

        var qTimer = setInterval(qCountdown, timePerQ*1000);

        function qCountdown() {
            i++;

            if (i > noQuestion) {
                //reset question displayer to default
                $('#question-displayer').text("Q0");

                //reset extracts to default
                $('#no-question-extract').text(0);
                $('#time-avail-extract').text(0);

                //enable start button
                $('#condition-start-button').prop('disabled', false);

                //stop the timer
                clearInterval(qTimer);
            } else {
                $('#question-displayer').text("Q" + i);
                $('#time-displayer').text(timePerQ);

                //tTimer section
                var j = 1;

                var tTimer = setInterval(tCountdown, 1000);

                function tCountdown() {
                    

                    if (j == timePerQ) {
                        if (i <= noQuestion) {
                            //reset the timer to 60
                            $('#time-displayer').text(timePerQ);
                        } else {
                            $('#time-displayer').text(0);
                        }
                        
                        //stop the timer
                        clearInterval(tTimer);
                    } else {
                        $('#time-displayer').text(timePerQ - j);
                        j++;
                    }
                }
            }
        }
    });
});