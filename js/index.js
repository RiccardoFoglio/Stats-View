import buildBoxScore from "../js/boxscore.js";
import buildRoster from "../js/roster.js";
import buildTeamStats from "../js/teamStats.js";
import buildIndStats from "../js/indStats.js";
import buildDriveChart from "../js/driveChart.js";
import buildPlays from "../js/plays.js";
import {toggleCollapseByWidth, sortTable} from "../js/auxiliaries.js";


const filegame = "SEA @ GIT - 1705278755.game";
//const filegame = "GIT @ RED - 1708103843.game";

fetch("../data/" + filegame)
  .then(response => response.json())
  .then(data => {
    // Do something with the JSON data

    buildBoxScore(data);
    buildTeamStats(data);
    buildIndStats(data);
    buildDriveChart(data);
    buildPlays(data);
    buildRoster(data);
  })
  .catch(error => console.error('Error fetching JSON:', error));


// SORTING TABLES BY HEADER CLICK

document.addEventListener('DOMContentLoaded', function() {
    const sortableTables = document.querySelectorAll('.sortable-table');
    sortableTables.forEach(table => {
        table.addEventListener('click', sortTable);
    });
});


// FIX THE RESPONSIVENESS

toggleCollapseByWidth([
    "ScoringSummary-table",
    "allDrivesTable",
    "HomeDrivesTable",
    "AwayDrivesTable"
  ], 'collapse-on-medium', 768)

  
// NAVBAR

$(".navbar .nav-item, .nav-select").click(function() {
    var navbar = $(this).closest(".navbar");
    var targetId = $(this).data("target") || $(this).val();
    var targetSection = $("#" + targetId);

    // Remove active class from all nav-items within the same navbar
    navbar.find(".nav-item").removeClass("active");
    navbar.find(".nav-select").val("");
    $(this).addClass("active");

    // Activate only the div linked to the clicked navbar
    targetSection.addClass("active").siblings().removeClass("active");

    // For mobile, hide the menu after clicking on an item
    if ($(window).width() <= 768) {
        navbar.removeClass("active");
    }
});

