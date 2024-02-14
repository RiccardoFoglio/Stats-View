import buildBoxScore from "../js/boxscore.js";
import buildRoster from "../js/roster.js";
import buildTeamStats from "../js/teamStats.js";


const filegame = "SEA @ GIT - 1705278755.game";

fetch("../data/" + filegame)
  .then(response => response.json())
  .then(data => {
    // Do something with the JSON data
    
    buildBoxScore(data);
    buildTeamStats(data);

    buildRoster(data);

  })
  .catch(error => console.error('Error fetching JSON:', error));


// NAVBAR
$(document).ready(function() {
    $(".navbar .nav-item").click(function() {
        var targetId = $(this).data("target");

        $(".content").removeClass("active");
        $("#" + targetId).addClass("active");

        $(".nav-item").removeClass("active");
        $(this).addClass("active");

        // For mobile, hide the menu after clicking on an item
        if ($(window).width() <= 600) {
            $(".navbar").removeClass("active");
        }
    });

    // Toggle navbar menu for mobile
    $(".navbar-toggle").click(function() {
        $(".navbar").toggleClass("active");
    });

    // Close menu when clicking outside on mobile
    $(document).click(function(e) {
        if (!$(e.target).closest(".navbar-toggle").length && !$(e.target).closest(".navbar").length) {
            $(".navbar").removeClass("active");
        }
    });

    // Close menu on window resize
    $(window).resize(function() {
        if ($(window).width() > 600) {
            $(".navbar").removeClass("active");
        }
    });
});
