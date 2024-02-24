import {getFormattedDate, getFormattedTime, getDuration, getQuarter} from '../js/auxiliaries.js'

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
    
    //Scoring Summary
    buildScoringSummary(game);

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

    row.append(`<td class="emphasize">${final}</td>`);

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

function buildScoringSummary(game){
  
    const header = $("#scoring-summary-table-head");
    const table = $("#scoring-summary-table-body");
    const footer = $("#scoring-summary-table-foot");
  
  
  // HEADER --> 3 blank, home code | away code
    let row = $('<tr>')
        .append($('<th>'))
        .append($('<th>'))
        .append($('<th>'))
        .append($('<th>').text(game.HomeTeam.Code))
        .append($('<th>').text(game.VisitingTeam.Code));
  
    header.append(row)

  // BODY--> 6td: qtr-time | 1qtr | time | Event (PAT) - plays - yards - TOP | score home | score away

    for (let i = 0; i < game.PlayByPlay.length; i++) {
        if (game.PlayByPlay[i].Event.startsWith("Score:")) {
            if (!game.PlayByPlay[i - 1].Event.includes("PAT Try")) {
                
                let $tr = $("<tr>"); 
                
                let scoreevent = game.PlayByPlay[i - 1].Event;
                
                let time = scoreevent.indexOf(" (Time:")
                let timeOnly = scoreevent.substring(scoreevent.indexOf(" (Time:")+7,scoreevent.indexOf(" (Time:")+13);
                
                $tr.append($('<td>').addClass('hide-on-large emphasize hide-label').text(`${getQuarter(game.PlayByPlay[i - 1].Period)} ${timeOnly}`))
                $tr.append($('<td>').addClass('hide-on-medium-down text-center').text(getQuarter(game.PlayByPlay[i - 1].Period)))
                $tr.append($('<td>').addClass('hide-on-medium-down text-center').text(timeOnly))

                scoreevent = scoreevent.replace(time, "");
                scoreevent = scoreevent.replace(", GOOD", "")
                    .replace("field goal attempt from", "field goal from")
                    .replace("pass complete to", "pass to")
                    .replace("rush for", "runs")
                    .replace("yards", "yd").replace("yard", "yd")
                    
                let scoreAction = scoreevent.slice(0, scoreevent.indexOf('yd')+2)

                //let holdedindex = scoreevent.indexOf(" (holded by");
                //let longsnappedindex = scoreevent.indexOf(" (long snapped by");
                //if (holdedindex !== -1 || longsnappedindex !== -1) {
                //    let minindex = -1;
                //    if (holdedindex === -1) {
                //        minindex = longsnappedindex;
                //    } else if (longsnappedindex === -1) {
                //        minindex = holdedindex;
                //    } else {
                //        minindex = Math.min(holdedindex, longsnappedindex);
                //    }
                //    let cancelholdedsnapped = scoreevent.substring(minindex, scoreevent.length - minindex);
                //    scoreevent = scoreevent.replace(cancelholdedsnapped, "");
                //}
                //let possibleposchg = scoreevent.indexOf(" (POSSESSION CHANGE");
                //if (possibleposchg !== -1) {
                //    let cancelposchg = scoreevent.substring(possibleposchg, scoreevent.length - possibleposchg);
                //    scoreevent = scoreevent.replace(cancelposchg, "");
                //}

                let score;

                let indexarrayofpattry = -1;
                for (let j = i + 2; j < game.PlayByPlay.length; j++) {
                    if (game.PlayByPlay[j].Event.includes("PAT Try")) {         // found PAT after score
                        indexarrayofpattry = j;
                        break;
                    }
                    if (game.PlayByPlay[j].Event.includes("drive start at")) {  // no PAT after score
                        break;
                    }
                }
                let scorePAT = '';
                let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
                let uppercase = /\b[A-Z]+\b/g;

                if (indexarrayofpattry !== -1) {
                    if (indexarrayofpattry + 1 < game.PlayByPlay.length) {
                        if (game.PlayByPlay[indexarrayofpattry + 1].Event.startsWith("Score: ")) { // PAT Scored

                            scorePAT = game.PlayByPlay[indexarrayofpattry].Event;

                            //let holdedindex2 = scorePAT.indexOf(" (holded by");
                            //let longsnappedindex2 = scorePAT.indexOf(" (long snapped by");
                            //if (holdedindex2 !== -1 || longsnappedindex2 !== -1) {
                            //    let minindex2 = -1;
                            //    if (holdedindex2 === -1) {
                            //        minindex2 = longsnappedindex2;
                            //    } else if (longsnappedindex2 === -1) {
                            //        minindex2 = holdedindex2;
                            //    } else {
                            //        minindex2 = Math.min(holdedindex2, longsnappedindex2);
                            //    }
                            //    let cancelholdedsnapped2 = scoreevent.substring(minindex2, scoreevent.length - minindex2);
                            //    
                            //    scorePAT = scorePAT.replace(cancelholdedsnapped2, "");
                            //}

                            scorePAT = scorePAT.replace('.', '');
                            scorePAT = scorePAT.replace(' (Passer), ', ', ');

                            if (scorePAT.indexOf('(received by') !== -1 ){
                                scorePAT = scorePAT.substring(0, scorePAT.indexOf('(received by'))
                            }

                            score = game.PlayByPlay[indexarrayofpattry + 1].Event.match(/\d+/g);

                        } else { // PAT not Scored
                            
                            scorePAT = game.PlayByPlay[indexarrayofpattry].Event;

                            //let holdedindex3 = scorePAT.indexOf(" (holded by");
                            //let longsnappedindex3 = scorePAT.indexOf(" (long snapped by");
                            //if (holdedindex3 !== -1 || longsnappedindex3 !== -1) {
                            //    let minindex3 = -1;
                            //    if (holdedindex3 === -1) {
                            //        minindex3 = longsnappedindex3;
                            //    } else if (longsnappedindex3 === -1) {
                            //        minindex3 = holdedindex3;
                            //    } else {
                            //        minindex3 = Math.min(holdedindex3, longsnappedindex3);
                            //    }
                            //    let cancelholdedsnapped3 = scorePAT.substring(minindex3, scorePAT.length - minindex3);
                            //    scorePAT = scorePAT.replace(cancelholdedsnapped3, "");
                            //}

                            scorePAT = scorePAT.replace(' (Passer)', '');
                            scorePAT = scorePAT.replace(`(${game.HomeTeam.Code})`, '');
                            scorePAT = scorePAT.replace(`(${game.VisitingTeam.Code})`, '');
                            scorePAT = scorePAT.replace(specialChars, '');
                            let scorePAT_list = scorePAT.split(' ');
                            let actionPAT = scorePAT_list.slice(0, 5).join(' ');
                            if (scorePAT_list.length > 5 && scorePAT_list[5] === scorePAT_list[5].toLowerCase()) {
                                actionPAT = scorePAT_list.slice(0, 6).join(' ');
                            }
                            let scorePAT_Uppercase = scorePAT.match(uppercase)?.slice(1).join(' ') || '';
                            scorePAT = actionPAT + ' ' + scorePAT_Uppercase;

                            score = game.PlayByPlay[i].Event.match(/\d+/g);

                        }
                    } else {
                        score = game.PlayByPlay[i].Event.match(/\d+/g);
                    }
                } else {
                    score = game.PlayByPlay[i].Event.match(/\d+/g);
                }

                let drive = game.PlayByPlay[i + 1].Event;
                drive = drive.replace('yards', 'yds')

                $tr.append($('<td>').text(scoreAction + " (" + scorePAT  + ') - ' + drive));
                $tr.append($('<td>').addClass('text-normal-on-large text-center text-bold').attr('data-label', game.HomeTeam.Code).text(score[1]));
                $tr.append($('<td>').addClass('text-normal-on-large text-center text-bold').attr('data-label', game.VisitingTeam.Code).text(score[0]));

                table.append($tr)
            }
        }
    }

  // FOOTER
    row = $('<tr>')
        .append($('<td>').addClass('hide-on-medium-down'))
        .append($('<td>').addClass('hide-on-medium-down'))
        .append($('<td>').addClass('hide-on-medium-down'))
        .append($('<td>').addClass('text-normal-on-large text-center text-bold').attr('data-label',`${game.HomeTeam.Name}` ).text(game.gameTeamStatsHomeTeam.ScoreTotal))
        .append($('<td>').addClass('text-normal-on-large text-center text-bold').attr('data-label',`${game.VisitingTeam.Name}` ).text(game.gameTeamStatsVisitingTeam.ScoreTotal));

    footer.append(row)
}