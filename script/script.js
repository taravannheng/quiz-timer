$(document).ready(function() {
    /*
        Next Updates:
            decimal timePerQ - handle timePerQ in case it is decimal
    */

    


    //timer function
    $('#condition-start-button').on("click", function() {

        //disable start button
        $('#condition-start-button').prop('disabled', true);

        //change start button color to #A9A9A9 to disable the hover and focus effect
        $('#condition-start-button').css({
            'background': '#BEBEBE',
            'color': '#606060'
        });

        //change reset button color to #FF6188 in hover and #BEBEBE out hover
        $('#reset-button').hover(function() {
            $(this).css({
                'background': '#FF6188',
                'color': '#FFF'
            });
        }, function() {
            $(this).css({
                'background': '#BEBEBE',
                'color': '#606060'
            });
        });

        //enable reset button
        $('#reset-button').prop('disabled', false);

        

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

        var i = 0;
    
        qCountdown();   //start the interval manually for the first time

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

                //reest extracts colors to default
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

                $('#time-displayer').css('color', '#A9DC76');

                //tTimer section
                var j = 1;
                var timePerPhase = timePerQ / 3;

                var tTimer = setInterval(tCountdown, 1000);

                function tCountdown() {
                    if (j == timePerQ) {
                        if (i <= noQuestion) {
                            //reset the timer
                            $('#time-displayer').text(timePerQ);
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
                        else if ((timePerQ - j) > (timePerPhase) && (timePerQ - j) <= (timePerPhase * 2)) {
                            $('#time-displayer').css('color', '#FFD866');
                        }
                        else {
                            $('#time-displayer').css('color', '#FF6188');
                        }
                    
                        //increment
                        j++;
                    }
                }

                //reset button function
                $('#reset-button').on('click', function() {
                    //reset question and time displayers to default
                    $('#question-displayer').text("Q0");
                    $('#time-displayer').text(0);

                    //reset extracts to default
                    $('#no-question-extract').text(0);
                    $('#time-avail-extract').text(0);

                    //reset question and time displayers color to default
                    $('#question-displayer').css('color', '#A9A9A9');
                    $('#time-displayer').css('color', '#A9A9A9');

                    //reset extracts colors to default
                    $('#left-display-details p').css('color', '#A9A9A9');

                    //reset reset button to default
                    $('#reset-button').hover(function() {
                        $(this).css({
                            'background': '#BEBEBE',
                            'color': '#606060'
                        });
                    }, function() {
                        $(this).css({
                            'background': '#BEBEBE',
                            'color': '#606060'
                        });
                    });

                    //start but
                    $('#condition-start-button').hover(function() {
                        $(this).css({
                            'background': '#78DCE8',
                            'color': '#FFF'
                        });
                    }, function() {
                        $(this).css({
                            'background': '#BEBEBE',
                            'color': '#606060'
                        });
                    });

                    //enable start button
                    $('#condition-start-button').prop('disabled', false);
                    

                    //stop qTimer and tTimer
                    clearInterval(qTimer);
                    clearInterval(tTimer);
                });
            }
        }
    });
});