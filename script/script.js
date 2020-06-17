$(document).ready(function() {
    /*
        Next Updates:
            start button effect
                disable hover effect by default
                disable hover effect if inputs are invalid
                disable hover effect after timer starts
                only enable hover effect if inputs are valid        
    */

    ///////////////////////// validation function /////////////////////////
    
    function checkInput() {
        //fetch input values
        $noQuestionVal = $("#no-question").val();
        $durationVal = $("#duration").val();

        //convert str to int
        $noQuestionVal = parseInt($noQuestionVal);
        $durationVal = parseInt($durationVal);

        //check input validation
        if ($noQuestionVal > 0 && $durationVal > 0) {
            //enable start button
            $('#start-button').prop('disabled', false);
        }
        else {
            //disable start button
            $('#start-button').prop('disabled', true);
        }
    }

    //check input values once start button is hovered
    $('#start-button').hover(checkInput);

    //enable start button again after input values change
    $('#no-question, #duration').on("focus", function() {
        //enable start button
        $('#start-button').prop('disabled', false);

    });

    //enable start button again after input values change
    $('#no-question, #duration').keypress(function() {
        //enable start button
        $('#start-button').prop('disabled', false);

    });


    ///////////////////////// timer function /////////////////////////

    $('#start-button').on("click", function() {

        //disable start button
        $('#start-button').prop('disabled', true);

        //toggle reset button colors
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

        //fetch input values
        $noQuestionVal = $('#no-question').val();
        $durationVal = $('#duration').val();

        //convert str to int
        $noQuestionVal = parseInt($noQuestionVal);
        $durationVal = parseInt($durationVal);

        //round decimals to integers
        $durationVal = Math.round($durationVal);

        //revert condition details to defaults
        $('#no-question').val("");
        $('#duration').val("");

        //operation: question/time
        $timePerQ = ($durationVal / $noQuestionVal) * 60;

        //update display extract
        $('#no-question-extract').text($noQuestionVal);
        $('#duration-extract').text($durationVal);

        //updates question displayer
        $('#question-displayer').css('color', '#606060');
        $('#left-display-details p').css('color', '#606060');

        $i = 0;
    
        qCountdown();   //start the interval manually for the first time

        $qTimer = setInterval(qCountdown, $timePerQ*1000);

        function qCountdown() {
            $i++;

            if ($i > $noQuestionVal) {
                //reset question displayer to default
                $('#question-displayer').text("Q0");

                //reset extracts to default
                $('#no-question-extract').text(0);
                $('#duration-extract').text(0);

                //reset question displayer color to default
                $('#question-displayer').css('color', '#A9A9A9');

                //reest extracts colors to default
                $('#left-display-details p').css('color', '#A9A9A9');

                //reset time displayer color to default
                $('#time-displayer').css('color', '#A9A9A9');

                //enable start button
                $('#start-button').prop('disabled', false);

                //stop the timer
                clearInterval($qTimer);
            } else {
                $('#question-displayer').text("Q" + $i);
                $('#time-displayer').text($timePerQ);

                $('#time-displayer').css('color', '#A9DC76');

                //tTimer section
                $j = 1;
                $timePerPhase = $timePerQ / 3;

                $tTimer = setInterval(tCountdown, 1000);

                function tCountdown() {
                    if ($j == $timePerQ) {
                        if ($i <= $noQuestionVal) {
                            //reset the timer
                            $('#time-displayer').text($timePerQ);
                        } else {
                            $('#time-displayer').text(0);
                        }
                        
                        //stop the timer
                        clearInterval($tTimer);
                    } else {
                        //displayer time availble per question
                        $('#time-displayer').text($timePerQ - $j);

                        //change color for each phase
                        if (($timePerQ - $j) > ($timePerPhase * 2)) {
                            $('#time-displayer').css('color', '#A9DC76');
                        }
                        else if (($timePerQ - $j) > ($timePerPhase) && ($timePerQ - $j) <= ($timePerPhase * 2)) {
                            $('#time-displayer').css('color', '#FFD866');
                        }
                        else {
                            $('#time-displayer').css('color', '#FF6188');
                        }
                    
                        //increment
                        $j++;
                    }
                }

                //reset button function
                $('#reset-button').on('click', function() {
                    //reset question and time displayers to default
                    $('#question-displayer').text("Q0");
                    $('#time-displayer').text(0);

                    //reset extracts to default
                    $('#no-question-extract').text(0);
                    $('#duration-extract').text(0);

                    //reset question and time displayers color to default
                    $('#question-displayer').css('color', '#A9A9A9');
                    $('#time-displayer').css('color', '#A9A9A9');

                    //reset extracts colors to default
                    $('#left-display-details p').css('color', '#A9A9A9');

                    //disable reset button effect
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

                    //enable start button
                    $('#start-button').prop('disabled', false);

                    //stop qTimer and tTimer
                    clearInterval($qTimer);
                    clearInterval($tTimer);
                });
            }
        }
    });
});