// TEEST
//Trigger a click on item with id: test1
//$("#test1").trigger("click");

var text1 = "Calibrate the Garch parameters and plot how the volatility model would have evolved on a given backtest period."
var text2 = "Compare 1000 day historical Value at Risk(VaR) against Garch. To see what method is preferable, look how often VaR/Garch is breached by the negative return bars"
var text3 = "Make a daily Garch forecast. This is forcasted with the assumption of normally distributed returns. Note that each run will generate different results."
var currentMethod = "";
var currentLocation = window.location;
var pageName = (currentLocation.pathname).toString().replace('/','');


$(document).ready(function() {
	$('.btnList').not("#test1").removeClass(pageName + 'active');
	//setActiveColor()
    $("#test1").toggleClass(pageName + 'active');
    showGarch1("slow")
    currentMethod = "garch1"
});

$( ".btnList" ).click(function(e) {
	setActiveColor(this)
    e.preventDefault();



	if(this.id == 'test1') {
		showGarch1("slow")
	} else if (this.id == 'test2') {
		showGarch2("slow")
	} else{
		showGarch3("slow")
	};

    if(currentMethod == lastRun) {
        $( ".popup" ).show();
    } else{
    	$( ".popup" ).hide();
    }
});

function setActiveColor(button){
	$('.btnList').not(button).removeClass(pageName+'active');
    $(button).toggleClass(pageName+'active');
}

function showGarch1(pace) {
	$( ".garch1" ).hide()
	$( ".garch2" ).hide()
	$( ".garch2" ).css({'margin-top': '0', 'margin-bottom': '0'})
	$( ".garch3").hide()
	$( ".garch3" ).css({'margin-top': '0', 'margin-bottom': '0'})

	$( ".garch1" ).fadeIn(pace)
	$( ".garch1" ).css({'margin-top': '5', 'margin-bottom': '0'})
	$( ".description" ).fadeIn(pace)
	$( ".description p" ).text(text1)
	currentMethod = "garch1"	
}

function showGarch2(pace) {
	$( ".garch1" ).hide()
	$( ".garch1" ).css({'margin-top': '0', 'margin-bottom': '0'})
	$( ".garch2" ).hide()
	$( ".garch3").hide()
	$( ".garch3" ).css({'margin-top': '0', 'margin-bottom': '0'})

	$( ".garch2" ).fadeIn(pace)
	$( ".garch2" ).css({'margin-top': '5', 'margin-bottom': '0'})
	$( ".description" ).fadeIn(pace)
	$( ".description p" ).text(text2)
	currentMethod = "garch2"
}

function showGarch3(pace) {
	$( ".garch1" ).hide()
	$( ".garch1" ).css({'margin-top': '0', 'margin-bottom': '0'})
	$( ".garch2" ).hide()
	$( ".garch2" ).css({'margin-top': '0', 'margin-bottom': '0'})

	$( ".garch3").hide()
	$( ".garch3" ).css({'margin-top': '5', 'margin-bottom': '0'})

	$( ".garch3" ).fadeIn(pace)
	$( ".description" ).fadeIn(pace)
	$( ".description p" ).text(text3)
	currentMethod = "garch3"
}


