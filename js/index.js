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
    $("#gameTitle")
      .html(`${game.HomeTeam.Name} (${game.RecordHomeTeam}) -VS- ${game.VisitingTeam.Name} (${game.RecordVisitingTeam})`)
      .addClass("main-heading text-center text-uppercase");


    //header: blank, quarters and FINAL
    const headerLabels = [
      { short: '1', long: '1st' },
      { short: '2', long: '2nd' },
      { short: '3', long: '3rd' },
      { short: '4', long: '4th' },
    ];
    
    if (game.Overtimes !== 0) { // checking for OT
      for (let i = 1; i <= game.Overtimes; i++) {
        headerLabels.push({ short: 'OT' + i, long: 'OT' + i });
    }}
    
    headerLabels.push({ short: 'F', long: 'Final' }); // push final result at the end
    const tableHead = $("#score-qrt-table-head tr");
    tableHead.append('<th scope="col"></th>'); // first one is blank for the name of the team

    headerLabels.forEach(label => {
      const th = $('<th scope="col"></th>');
      const shortSpan = $('<span class="hide-on-medium">' + label.short + '</span>');
      const longSpan = $('<span class="hide-on-small-down">' + label.long + '</span>');
      th.append(shortSpan, longSpan);
      tableHead.append(th);
    });
    
    // row: name, scores, FINAL
    const tableBody = $('#score-qrt-table-body');   
    tableBody.append(
      createTableRow(game.HomeTeam.Name, game.gameTeamStatsHomeTeam.ScorePeriods, game.gameTeamStatsHomeTeam.ScoreTotal, isHomeTeamWinner),
      createTableRow(game.VisitingTeam.Name, game.gameTeamStatsVisitingTeam.ScorePeriods,game.gameTeamStatsVisitingTeam.ScoreTotal, !isHomeTeamWinner)
    );
      
    //General info list

    const infoList = [
      {label: 'Date:', value: getFormattedDate(game.Date.$date)},
      {label: 'Site:', value: game.Place},
      {label: 'Stadium:', value: game.Stadium},
      {label: 'Attendance:', value: game.Attendance},
      {label: 'Kickoff Time:', value: getFormattedTime(game.StartTime.$date)},
      {label: 'End of Game:', value: getFormattedTime(game.EndTime.$date)},
      {label: 'Duration:', value: getDuration(game.StartTime.$date, game.EndTime.$date)},
      {label: 'Temperature:', value: game.Temperature},
      {label: 'Wind:', value: game.Wind},
      {label: 'Weather:', value: game.Weather}
    ]

    infoList.forEach((item) => {
      $('#general-info').append(`<dt>${item.label}</dt>`);
      $('#general-info').append(`<dd>${item.value}</dd>`);
    })
    

    //TODO  Scoring Summary

    //TODO  Refs


  })}



function createTableRow(team, scores, final, isWinner){
    const row = $("<tr></tr>");
    const th = $("<th></th>");
    
    if (isWinner) {
      th.append('<span class="boxscore-winner"></span>');
    }

    th.append(`<span>${team}</span>`);
    row.append(th);

    scores.forEach(score => {
      row.append(`<td>${score}</td>`);
    });

    row.append(`<td>${final}</td>`);

    return row;
}

function getFormattedDate(dateString){
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

function getFormattedTime(dateString){
  const date = new Date(dateString);
  return `${date.getHours()}:${date.getMinutes()}`
}

function getDuration(startString, endString){
  const startDate = new Date(startString);
  const endDate = new Date(endString);
  const durationInSeconds = (endDate - startDate) / 1000;
  const minutes = Math.floor((durationInSeconds % (60 * 60)) / 60);
  const hours = Math.floor((durationInSeconds % (24 * 60 * 60)) / (60 * 60));
  return `${hours.toString().padStart(1, '0')}:${minutes.toString().padStart(2, '0')}`;
}






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