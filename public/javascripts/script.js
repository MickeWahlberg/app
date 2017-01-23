// HAMBURGER MENU
$( ".cross" ).hide();
$( ".menu" ).hide();
$( ".hamburger" ).click(function() {
$( ".menu" ).slideToggle( "slow", function() {
$( ".hamburger" ).hide();
$( ".cross" ).show();
});
});

$( ".cross" ).click(function() {
$( ".menu" ).slideToggle( "slow", function() {
$( ".cross" ).hide();
$( ".hamburger" ).show();
});
});


// CALCULATE BUTTON
$( "#calculate" ).click(function() {


	if (currentMethod == "garch1"){
		var ticker = $('input[name=ticker1]').val();
		var startDate = $('input[name=calStart1]').val();
		var endDate = $('input[name=calEnd1]').val();
		var backStart = $('input[name=backStart1]').val();
		var backEnd = $('input[name=backEnd1]').val();
		garch(ticker, startDate, endDate, backStart, backEnd)
	}else if(currentMethod == "garch2") {
		var ticker = $('input[name=ticker2]').val();
		var startDate = $('input[name=calStart2]').val();
		var endDate = $('input[name=calEnd2]').val();
		var backStart = $('input[name=backStart2]').val();
		var backEnd = $('input[name=backEnd2]').val();
		garch(ticker, startDate, endDate, backStart, backEnd)
	} else{
		var ticker = $('input[name=ticker3]').val();
		var startDate = $('input[name=calStart3]').val();
		var endDate = $('input[name=calEnd3]').val();
		var forecastDate = $('input[name=forecastStart]').val();
		var days = $('input[name=forecastDays]').val();
		forecastGarch(ticker, startDate, endDate, forecastDate, days)
	}

});

function forecastGarch(ticker, startDate, endDate, forecastStart, days) {
	if (validateDate(startDate, endDate)) {
				$('.loading').show();
		$.ajax({
		        type: "POST",
		        url: "garch/forecast",
		        data: {t: ticker, s: startDate, e: endDate, bs:forecastStart, be:forecastStart, method: currentMethod, d: days},
		        success: callbackFunc
		});
	}
}

function garch(ticker, startDate, endDate, backStart, backEnd) {
	if (validateDate(startDate, endDate) && validateDate(backStart, backEnd)) {
		$('.loading').show();
		$.ajax({
		        type: "POST",
		        url: "garch/python",
		        data: {t: ticker, s: startDate, e: endDate, bs: backStart, be:backEnd, method: currentMethod},
		        success: callbackFunc
		});
	};
}

function callbackFunc(response) {
	var responseMessage = response[0];
	if (response.length > 1) {
		$( ".popup" ).show();
		$( ".popup img" ).hide();
		$( ".popup p" ).show();
    	$( ".popup p" ).text(responseMessage + ' Please try again with correct input.');
	} else {
		$( ".popup" ).show();
		$( ".popup img" ).attr('src', responseMessage);
		$( ".popup img" ).show();
    	$( ".popup p" ).hide();	
	lastRun = currentMethod;
	};
	$('.loading').hide();    
};

function validateDate(startDate, endDate) {
	if (!isValidDate(startDate) || !isValidDate(endDate) || !startDateBeforeEndDate(startDate, endDate)) {
		$('.loading').hide();
		$( ".popup" ).show();
		$( ".popup p" ).show();
    	$( ".popup p" ).text( 'Please enter the correct date format and try again.');
    	return false;
    } else {
    	return true;
    };
};

// VALIDATE DATE
function isValidDate(dateString) {
    // First check for the pattern
    var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

    if(!regex_date.test(dateString))
    {
        return false;
    }

    // Parse the date parts to integers
    var parts   = dateString.split("-");
    var day     = parseInt(parts[2], 10);
    var month   = parseInt(parts[1], 10);
    var year    = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
    {
        return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

function startDateBeforeEndDate(startDate, endDate) {
	var startParts   = startDate.split("-");
    var startDay     = parseInt(startParts[2], 10);
    var startMonth   = parseInt(startParts[1], 10);
    var startYear    = parseInt(startParts[0], 10);

    var endParts   = endDate.split("-");
    var endDay     = parseInt(endParts[2], 10);
    var endMonth   = parseInt(endParts[1], 10);
    var endYear    = parseInt(endParts[0], 10);
   
    return (endYear + endMonth/12 + endDay/365) > (startYear + startMonth/12 + startDay/365);
};
