import {getFormattedDate, getFormattedTime, getDuration} from '../js/auxiliaries.js'

export default function buildBoxScore(game){
  
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

    // check algorithm from DEVELOPER !!!!!!!!!!!!!!!!

    // Refs
    const officials = [
        {label: 'Referee:' , value: game.Referee},
        {label: 'Umpire:' , value: game.Umpire },
        {label: 'Linesman:' , value: game.Linesman },
        {label: 'LineJudge:' , value: game.LineJudge },
        {label: 'BackJudge:' , value: game.BackJudge },
        {label: 'FieldJudge:' , value: game.FieldJudge },
        {label: 'SideJudge:' , value: game.SideJudge },
        {label: 'CenterJudge:' , value: game.CenterJudge },
        {label: 'DownJudge:' , value: game.DownJudge },
        {label: 'Scorer:' , value: game.Scorer },
        {label: 'TimeKeeper:' , value: game.TimeKeeper }
    ];

    // Chunk the officials array into groups of three
    const chunks = chunkArray(officials, 3);

    // Iterate over each chunk and create table rows
    chunks.forEach(chunk => {
        const rowEntry = $('<tr></tr>');

        chunk.forEach(official => {
            const bold = $('<b></b>').text(official.label);
            const span = $('<span></span>').text(` ${official.value}`);
            rowEntry.append($('<td></td>').append(bold, span));
        });

        $('#refs-table-foot').append(rowEntry);
    });


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

// Function to chunk the officials array into groups of three
    function chunkArray(array, size) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    }