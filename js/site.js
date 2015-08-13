$(document).on('touchstart click', '#myBtn', function(event){
    event.stopPropagation();
    event.preventDefault();
    if(event.handled !== true) {

        window.location.reload();

        event.handled = true;
    } else {
        return false;
    }
});

$(document).ready(function(){
    console.log("ready");
    var x = document.getElementsByClassName("content");
    for (var i = 0; i < x.length; i++){
        //console.log(x[i].id);
        console.log($("#" + x[i].id).offset().left);
    }
});

$(document).on('touchstart click', '.scroll', function(event){
    event.stopPropagation();
    event.preventDefault();
    if(event.handled !== true) {


        var screenWidth = $(document).width();
        var timesForward = $(this).attr("scrollTo");

        $('.scrolls').animate({
            scrollLeft: (screenWidth * timesForward) - 10
        }, 500);

        var classes = $(this).attr("class");

        if (classes.indexOf("footer-item") > -1){
            $(".footer-item").removeClass("selected");
            $(this).addClass("selected");
        }

        event.handled = true;
    } else {
        return false;
    }
});

$(document).on('touchstart click', '#decision', function(event){
    event.stopPropagation();
    event.preventDefault();
    if(event.handled !== true) {

        removeOnes();

        event.handled = true;
    } else {
        return false;
    }
});

$(document).on('touchstart click', '#newU', function(event){
    event.stopPropagation();
    event.preventDefault();
    if(event.handled !== true) {

        assignOption();

        event.handled = true;
    } else {
        return false;
    }
});

$(document).on('touchstart click', '#clearStorage', function(event){
    event.stopPropagation();
    event.preventDefault();
    if(event.handled !== true) {

        localStorage.clear();
        sessionStorage.clear();

        event.handled = true;
    } else {
        return false;
    }
});

document.ontouchstart = function(e){ e.preventDefault(); };




function addControl(){
    document.getElementById("COMPLETED").value = quiz.right;
}
