export default function buildRoster(game){
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