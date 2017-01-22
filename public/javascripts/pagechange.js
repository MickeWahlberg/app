// TEEST
//Trigger a click on item with id: test1
//$("#test1").trigger("click");

var text1 = "The generalized autoregressive conditional heteroskedasticity (GARCH) process is an econometric term that describes an approach to estimate volatility in financial markets. The GARCH process is often preferred by financial modeling professionals because it provides a more real-world context than other forms when trying to predict the prices and rates of financial instruments."
var text2 = "TESTAR BYTA PAGE"
var text3 = "HEJ MAJA DU LUKTAR BAJS HAHAHAHAHAHAH :D <3 <3 <3 <3 <3 FINIS!"
var currentMethod = "";

$(document).ready(function() {
	$('.btnList').not("#test1").removeClass('active');
    $("#test1").toggleClass('active');
    showGarch1("slow")
    currentMethod = "garch1"
});

$( ".btnList" ).click(function(e) {
	$('.btnList').not(this).removeClass('active');
    $(this).toggleClass('active');
    e.preventDefault();

	if(this.id == 'test1') {
		showGarch1("slow")
	} else if (this.id == 'test2') {
		showGarch2("slow")
	} else{
		showGarch3("show")
	};
});

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


