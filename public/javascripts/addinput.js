$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $("#inputMarkowitz"); //Fields wrapper
    var add_button      = $("#addButton"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<li><span><input type="text" name="mytext[]" placeholder=":ticker"/></span><a href="#" class="remove_field">X</a></li>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('li').remove(); x--;
    })
});