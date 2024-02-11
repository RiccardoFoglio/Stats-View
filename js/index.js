filegame = "SEA @ GIT - 1705278755.game";

fetch("../data/" + filegame)
  .then(response => response.json())
  .then(data => {
    // Do something with the JSON data
    
    buildBoxScore(data);
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

// BOX SCORE

function buildBoxScore(game){
  $(document).ready(function(){

    //box-score graphic
    $("#awayLogo").attr("src", '../logos/'+ game.VisitingTeam.Code +'.png');
    $("#awayLogo").attr("alt", game.VisitingTeam.Name);
    $("#homeLogo").attr("src", '../logos/'+ game.HomeTeam.Code +'.png');
    $("#homeLogo").attr("alt", game.HomeTeam.Name);

    $("#homeScore").html(game.gameTeamStatsHomeTeam.ScoreTotal);
    $("#awayScore").html(game.gameTeamStatsVisitingTeam.ScoreTotal);

    const isHomeTeamWinner = game.gameTeamStatsHomeTeam.ScoreTotal > game.gameTeamStatsVisitingTeam.ScoreTotal;
    $("#homeScore").addClass(isHomeTeamWinner ? "winner" : "loser");
    $("#awayScore").addClass(isHomeTeamWinner ? "loser" : "winner");
    
    //box-score-graphic-caption TITLE
    $("#gameTitle").html(`${game.HomeTeam.Name} (${game.RecordHomeTeam}) -VS- ${game.VisitingTeam.Name} (${game.RecordVisitingTeam})`).addClass("main-heading text-center text-uppercase");

    //box-score-graphic-caption TABLE

    //TODO header: blank, quarters and FINAL
    $("#score-qrt-table-head tr")



    //TODO row: name, scores, FINAL
    $("#home-score-qrt-tr")

    $("#away-score-qrt-tr")

    //TODO  General info list

    //TODO  Scoring Summary

    //TODO  Refs


  })}


// ROSTER
function buildRoster(game){
  //console.log(game.HomeTeam.Name);
  
$(document).ready(function() {
    $("#Home-Roster").html(game.HomeTeam.Name);
    $("#Away-Roster").html(game.VisitingTeam.Name);

    let homeRosterTable = $("#Home-Roster-table-body");
    let awayRosterTable = $("#Away-Roster-table-body");

    buildTeamRoster(game.HomeTeam.Players, homeRosterTable);
    buildTeamRoster(game.VisitingTeam.Players, awayRosterTable);
    })}


function buildTeamRoster(players, rosterTable){
  players.sort((a, b) => a.number - b.number);
  players.forEach(player => {
    let row = $("<tr>");
    $("<td>").addClass("text-center").text(player.number).appendTo(row);
    $("<td>").text(player.Name + " " + player.Surname).appendTo(row);
    rosterTable.append(row);
  });
}