$(document).ready(function() {
    /*
        Next Updates:
            next button - button is clicked > add remaining time to timePerQ
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
        $('#question-displayer').css('color', '#606060');
        $('#left-display-details p').css('color', '#606060');
        $('#time-displayer').css('color', '#A9DC76');

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

                //reset question displayer color to default
                $('#question-displayer').css('color', '#A9A9A9');
                $('#left-display-details p').css('color', '#A9A9A9');

                //reset time displayer color to default
                $('#time-displayer').css('color', '#A9A9A9');

                //enable start button
                $('#condition-start-button').prop('disabled', false);

                //stop the timer
                clearInterval(qTimer);
            } else {
                $('#question-displayer').text("Q" + i);
                $('#time-displayer').text(timePerQ);

                //tTimer section
                var j = 1;
                var timePerPhase = timePerQ / 3;

                var tTimer = setInterval(tCountdown, 1000);

                function tCountdown() {
                    if (j == timePerQ) {
                        if (i <= noQuestion) {
                            //reset the timer
                            $('#time-displayer').text(timePerQ);

                            //reset the color to first phase
                            $('#time-displayer').css('color', '#A9DC76');
                        } else {
                            $('#time-displayer').text(0);
                        }
                        
                        //stop the timer
                        clearInterval(tTimer);
                    } else {
                        //displayer time availble per question
                        $('#time-displayer').text(timePerQ - j);

                        //change color for each phase
                        if ((timePerQ - j) > (timePerPhase * 2)) {
                            $('#time-displayer').css('color', '#A9DC76');
                        }
                        else if ((timePerQ - j) > (timePerPhase) && (timePerQ - j) < (timePerPhase * 2)) {
                            $('#time-displayer').css('color', '#FFD866');
                        }
                        else {
                            $('#time-displayer').css('color', '#FF6188');
                        }
                        

                        /*Note: change the above color to 
                                #A9DC76 first phase     green
                                #FFD866 second phase    yellow
                                #FF6188 third phase     pink
                                once conditions are filled*/


                        //increment
                        j++;
                    }
                }
            }
        }
    });
});