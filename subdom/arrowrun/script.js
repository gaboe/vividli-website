$(document).ready(function MainLoop() {

    var numOfArrows = 0;
    var score = 0;
    $("#skull").css("position: relative");
    $(document).on('keydown', function (e) {

        var skull = $("#skull")
            , left = 37
            , up = 38
            , right = 39
            , down = 40;
        skull.stop();
        var position = skull.position();

        if (e.keyCode == left) {
            if ((position.left - 50) > 5) {
                skull.animate({
                    "left": "-=50"
                }, "fast");
            }
        }
        if (e.keyCode == up) {
            if ((position.top + 50) < $(window).height()) {
                skull.animate({
                    "top": "-=50"
                }, "fast");
            }

        }
        if (e.keyCode == right) {
            if ((position.left + 50) < $(window).width()) {
                skull.animate({
                    "left": "+=50"
                }, "fast");
            }

        }
        if (e.keyCode == down) {
            if (position.top - 50 > 0) {
                skull.animate({
                    "top": "+=50"
                }, "fast");
            }
        }

    });

    window.setInterval(function () {
        var randBool = Math.random() < .5;
        var name = "arrow" + numOfArrows;
        numOfArrows++;
        $("div").append('<img id=' + name + ' src="arrow.jpg" height = 20/>');
        name = "#" + name;
        //nastavene aby to padalo len dole
        if (randBool) {
            var screenPos = Math.floor((Math.random() * ($(window).width())-70) + 1);
            $(name).css("position", "absolute");
            $(name).css("top", -151);
            $(name).css("left", screenPos);
            $(name).rotate(90);
            $(name).addClass("horizontal");

        } else {
            var screenPos = Math.floor((Math.random() * ($(window).height())-70) + 1);
            $(name).css("position", "absolute");
            $(name).css("top", screenPos);
            $(name).css("left", -151);
            $(name).addClass("vertical");
        }
    }, 200);

    window.setInterval(function () {
        $("img[id^='arrow']").each(function (index) {

            try {
                var name = "#arrow" + index;
                var position = $(name).offset();
                var skull = $("#skull")
                var skullPos = skull.offset();

                var contHeight = 40;
                var contWidth = 20;
                if (((skullPos.top - contHeight) < (position.top + contHeight) && (skullPos.top + contHeight) > (position.top + contHeight) &&
                    ((((skullPos.left + contWidth) > (position.left - contWidth)) && (skullPos.left - contWidth) < (position.left - contWidth)) || 
                    ((skullPos.left - contWidth) < (position.left + contWidth) && ((skullPos.left + contWidth) > (position.left + contWidth)))))){
                    //  || (((((skullPos.left - contWidth)>(position.left + contWidth)) && (skullPos.left+contWidth)>(position.left+contWidth))) &&
                    //   (((skullPos.top-contHeight)<=(position.top+contHeight))||((skullPos.top+contHeight)<= (position.top+contHeight))))) {
                    alert("Nahral si score:" + score + " bodov");
                    location.reload();
                }
                else {                //TODO //neviem prečo nefunguje keď dám this 
                    if ($(name).hasClass("horizontal")) {
                        if ((position.top + 110) > $(window).height()) {
                            $(name).remove();
                            return false;
                        } else {
                            $(name).animate({
                                "top": "+=50"
                            }, "fast");

                        }
                    } else {
                        if ((position.left + 110) > $(window).width()) {
                            $(name).remove();
                        } else {
                            $(name).animate({
                                "left": "+=50"
                            }, "fast");
                        }
                    }
                }
                score++;
            } catch (error) {

            }


        });
    }, 10);


});