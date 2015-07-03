
/*$.ajax({
 type: "GET",
 dataType: "jsonp",
 url: "https://api.instagram.com/v1/users/215951651/?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b",
 success: function(data) {
 $('.name').text(data.data.username);
 $('.tagline').text(data.data.bio);
 }
 });

 $.ajax({
 type: "GET",
 dataType: "jsonp",
 cache: false,
 url: "https://api.instagram.com/v1/users/215951651/media/recent/?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b",
 success: function(data) {
 for (var i = 0; i < 2; i++) {
 $(".latest").append("<li><a target='_blank' href='" + data.data[i].link +"'><img   src='" + data.data[i].images.low_resolution.url +"'></img></a></li>");
 }
 }
 });*/

if (localStorage.getItem("listMade")){
    console.log("List already made");
}else {
    sessionStorage.clear();
    localStorage.clear();
}

$.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/users/215951651/followed-by?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b",
    success: function(data) {
        //console.log(data);
        if (localStorage.getItem("listMade")){
            console.log("List already made");
        }else {
            for (var i = 0; i < data.data.length; i++) {
                $(".following").append("<li>" + data.data[i].id + "</li>");
                sessionStorage.setItem(data.data[i].id, 1 + (sessionStorage.getItem(data.data[i].id) * 1));
            }
        }
    }
});

$.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/users/215951651/follows?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b",
    success: function(data) {
        if (localStorage.getItem("listMade")){
            console.log("List already made");
        }else {
            //console.log(data);
            for (var i = 0; i < data.data.length; i++) {
                $(".follows").append("<li>" + data.data[i].id + "</li>");
                sessionStorage.setItem(data.data[i].id, 1 + (sessionStorage.getItem(data.data[i].id) * 1));

                if (sessionStorage.getItem(data.data[i].id) == 2) {
                    $(".f4f").append("<li>" + data.data[i].id + "</li>");
                    localStorage.setItem(data.data[i].id, 1 + (localStorage.getItem(data.data[i].id) * 1));
                }
            }

            possibles();
        }
    }
});

function possibles(){
    console.log(localStorage.length);

    if (localStorage.getItem("listMade")){
        console.log("List already made");
    }else {
        var dataId = "0";
        sessionStorage.clear();
        console.log(localStorage.length);

        for (var i = 0; i < localStorage.length; i++) {

            console.log(i + "------------------------------");


            $.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: "https://api.instagram.com/v1/users/" + localStorage.key(i) + "/follows?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b",
                success: function (data) {
                    try {
                        console.log("Success --------------------------");
                    } catch (e) {
                        console.log("ERROR: " + e);
                    }

                    try {
                        for (var a = 0; a < data.data.length; a++) {
                            //console.log(data.data[a].username);
                            sessionStorage.setItem(data.data[a].id, 1 + (sessionStorage.getItem(data.data[a].id) * 1));
                        }
                    } catch (e) {

                    }
                }
            });
        }
    }
}

function removeOnes(){
    if (localStorage.getItem("listMade")){
        console.log("List already made");
    }else{
        for (var rep = 0; rep < 3; rep++){
            for (var a = 0; a < sessionStorage.length; a++){
                console.log(a);
                var onStorageItem;
                onStorageItem = sessionStorage.key(a);

                if (sessionStorage.getItem(onStorageItem) == 1){
                    sessionStorage.removeItem(onStorageItem);
                }
            }
        }

        showPossibles();
    }
}

function showPossibles(){
    localStorage.clear();
    localStorage.setItem("listMade", 1);

    for (var a = 0; a < sessionStorage.length; a++){
        var onStorageItem;
        onStorageItem = sessionStorage.key(a);

        $("#poss").appendChild("<li>"+ onStorageItem +"</li>");
        localStorage.setItem(onStorageItem, 1);
    }
}

function assignOption(){
    sessionStorage.clear();
    var MaxRnd = localStorage.length;

    var Rnd = Math.floor((Math.random() * MaxRnd) + 1);

    var id = localStorage.key(Rnd);
    console.log(id);


    $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/users/"+ id + "/media/recent/?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b",
        success: function(data) {
            $("#new").attr("src", data.data[0].images.low_resolution.url)
        }
    })
}