export default function buildTeamStats(game){
  $(document).ready(function(){
    // add team codes to header
    $("#teamTotalsComplete-table-head #homeCode").html(game.HomeTeam.Code);
    $("#teamTotalsComplete-table-head #awayCode").html(game.VisitingTeam.Code);
    
    const HStats = game.gameTeamStatsHomeTeam;
    const AStats = game.gameTeamStatsVisitingTeam;

    // make: header row and data row
    const table = $('#teamTotalsComplete-table-body');
    headerRow('FIRST DOWNS', table)
    dataRow('Total', HStats.TotalFirstDowns, AStats.TotalFirstDowns, table);
    dataRow('Rushing', HStats.RushFirstDowns, AStats.RushFirstDowns, table);
    dataRow('Passing', HStats.PassFirstDowns, AStats.PassFirstDowns, table);
    dataRow('Penalty', HStats.PenaltyFirstDowns, AStats.PenaltyFirstDowns, table);

    headerRow('RUSHING', table)
    dataRow('Total (NET)', HStats.RushYds, AStats.RushYds, table);
    dataRow('Attempts', HStats.RushNumber, AStats.RushNumber, table);
    dataRow('Avg. per Rush', HStats.AvgRush.toFixed(1), AStats.AvgRush.toFixed(1), table);
    dataRow('Rushing TDs', HStats.RushTD, AStats.RushTD, table);
    dataRow('Yds. Gained', HStats.GainedRushYds, AStats.GainedRushYds, table);
    dataRow('Yds. Lost', HStats.LossRushYds, AStats.LossRushYds, table);

    headerRow('PASSING', table)
    dataRow('Total (NET)', HStats.PassYds, AStats.PassYds, table);
    dataRow('Comp - Att - Int', `${HStats.PassCompleted} / ${HStats.PassAttempted} / ${HStats.PassIntercepted}`, `${AStats.PassCompleted} / ${AStats.PassAttempted} / ${AStats.PassIntercepted}`, table);
    dataRow('Avg / Att', HStats.AvgPassAttempted.toFixed(1), AStats.AvgPassAttempted.toFixed(1), table);
    dataRow('Avg / Comp', HStats.AvgPassCompleted.toFixed(1), AStats.AvgPassCompleted.toFixed(1), table);
    dataRow('TDs', HStats.PassTD, AStats.PassTD, table);

    headerRow('TOTAL OFFENSE', table)
    dataRow('Yards', HStats.PlaysYds, AStats.PlaysYds, table);
    dataRow('Plays', HStats.PlaysNumber, AStats.PlaysNumber, table);
    dataRow('Avg / Play', HStats.AvgPlay.toFixed(1), AStats.AvgPlay.toFixed(1), table);
    dataRow('Fumbles - Lost', `${HStats.TotalFumble}-${HStats.TotalFumbleLoss}`, `${AStats.TotalFumble}-${AStats.TotalFumbleLoss}`, table);
    dataRow('Penalties - Yds', `${HStats.PenaltiesNumber}-${HStats.PenaltiesYds}`, `${AStats.PenaltiesNumber}-${AStats.PenaltiesYds}`, table);

    headerRow('PUNTING', table)
    dataRow('Punts - Yds', `${HStats.PuntNumber}-${HStats.PuntYds}`, `${AStats.PuntNumber}-${AStats.PuntYds}`, table);
    dataRow('Avg / Punt', HStats.AvgPunt.toFixed(1), AStats.AvgPunt.toFixed(1), table);
    dataRow('Net Avg / Punt', HStats.NetYdsPunt.toFixed(1), AStats.NetYdsPunt.toFixed(1), table);
    dataRow('Inside 20', HStats.PuntInsideRedZone, AStats.PuntInsideRedZone, table);
    dataRow('50+ Yds', HStats.PuntMoreThan50, AStats.PuntMoreThan50, table);
    dataRow('Touchbacks', HStats.PuntTouchbackNumber, AStats.PuntTouchbackNumber, table);
    dataRow('Fair Catch', HStats.PuntFairCatchedByOpponents, AStats.PuntFairCatchedByOpponents, table);

    headerRow('KICKOFFS', table)
    dataRow('Total - Yds', `${HStats.KickNumber}-${HStats.KickYds}`, `${AStats.KickNumber}-${AStats.KickYds}`, table);
    dataRow('Avg / Kickoff', HStats.AvgKick.toFixed(1), AStats.AvgKick.toFixed(1), table);
    dataRow('Net Avg / Kickoff', HStats.NetYdsKick.toFixed(1), AStats.NetYdsKick.toFixed(1), table);
    dataRow('Touchbacks', HStats.KickTouchbackNumber, AStats.KickTouchbackNumber, table);
    
    headerRow('RETURNS', table)
    dataRow('Punt: Total - Yds - TDs', `${HStats.PuntRetNumber}-${HStats.PuntRetYds}-${HStats.PuntRetTD}`, `${AStats.PuntRetNumber}-${AStats.PuntRetYds}-${AStats.PuntRetTD}`, table);
    dataRow('Punt: Avg / Return', HStats.AvgPuntRet.toFixed(1), AStats.AvgPuntRet.toFixed(1), table);
    dataRow('Kickoff: Total - Yds - TDs', `${HStats.KickRetNumber}-${HStats.KickRetYds}-${HStats.KickRetTD}`, `${AStats.KickRetNumber}-${AStats.KickRetYds}-${AStats.KickRetTD}`, table);
    dataRow('Kickoff: Avg / Return', HStats.AvgKickRet.toFixed(1), AStats.AvgKickRet.toFixed(1), table);
    dataRow('INT: Total - Yds - TDs', `${HStats.IntRetNumber}-${HStats.IntRetYds}-${HStats.IntRetTD}`, `${AStats.IntRetNumber}-${AStats.IntRetYds}-${AStats.IntRetTD}`, table);
    dataRow('Fumble: Total - Yds - TDs', `${HStats.FumbRecoverNumber}-${HStats.FumbRetYds}-${HStats.FumbRetTD}`, `${AStats.FumbRecoverNumber}-${AStats.FumbRetYds}-${AStats.FumbRetTD}`, table);




    headerRow('POSSESSION', table)
    dataRow('Total Time', getTime(HStats.Possession.$numberLong), getTime(AStats.Possession.$numberLong), table);    
    dataRow('1st Quarter', getTime(HStats.PeriodPossession[0].$numberLong), getTime(AStats.PeriodPossession[0].$numberLong), table);
    dataRow('2nd Quarter', getTime(HStats.PeriodPossession[1].$numberLong), getTime(AStats.PeriodPossession[1].$numberLong), table);
    dataRow('3rd Quarter', getTime(HStats.PeriodPossession[2].$numberLong), getTime(AStats.PeriodPossession[2].$numberLong), table);
    dataRow('4th Quarter', getTime(HStats.PeriodPossession[3].$numberLong), getTime(AStats.PeriodPossession[3].$numberLong), table);



    
    headerRow('RED ZONE', table)
    dataRow('Rush TDs', HStats.RedZoneRushTD, AStats.RedZoneRushTD, table);
    dataRow('Pass TDs', HStats.RedZonePassTD, AStats.RedZonePassTD, table);
    dataRow('FG Scored', `${HStats.RedZoneFGScores} of ${HStats.RedZoneFGNumber}`, `${AStats.RedZoneFGScores} of ${AStats.RedZoneFGNumber}`, table);
    dataRow('Turnovers: Fumble - Int - Downs', `${HStats.RedZoneLostBallForFumbles}-${HStats.RedZoneLostBallForInterceptions}-${HStats.RedZoneLostBallForDowns}`, `${AStats.RedZoneLostBallForFumbles}-${AStats.RedZoneLostBallForInterceptions}-${AStats.RedZoneLostBallForDowns}`, table);

    headerRow('MISCELLANEOUS', table)
    dataRow('Misc. Yds', HStats.MiscellaneousYards, AStats.MiscellaneousYards, table);
    dataRow('3rd Down Conv.', `${HStats.ThirdDownFirstDownGainedNumber} of ${HStats.ThirdDownNumber}`, `${AStats.ThirdDownFirstDownGainedNumber} of ${AStats.ThirdDownNumber}`, table);
    dataRow('4th Down Conv.', `${HStats.FourthDownFirstDownGainedNumber} of ${HStats.FourthDownNumber}`, `${AStats.FourthDownFirstDownGainedNumber} of ${AStats.FourthDownNumber}`, table);
    dataRow('RedZone: Scores - Chances', `${HStats.InsideRedZoneScores} of ${HStats.InsideRedZoneNumber}`, `${AStats.InsideRedZoneScores} of ${AStats.InsideRedZoneNumber}`, table);
    dataRow('Sacks: Total - Yds', `${HStats.SackMade} of ${HStats.SackYds}`, `${AStats.SackMade} of ${AStats.SackYds}`, table);
    dataRow('PAT: Total - Made', `${HStats.PATNumber} of ${HStats.PATScores}`, `${AStats.PATNumber} of ${AStats.PATScores}`, table);
    dataRow('Field Goals: Total - Made', `${HStats.FGNumber} of ${HStats.FGScores}`, `${AStats.FGNumber} of ${AStats.FGScores}`, table);

})}


function headerRow(content, container) {
  $('<tr>').append(
    $('<th>', {
      text: content,
      class: 'header-group',
      colspan: 3
    })
  ).appendTo(container);
}

function dataRow(label, dataHome, dataAway, container){
  const row = $('<tr>');
  row.append(
    $('<th>', {
      text: label,
    }),
    $('<td>', {
      text: dataHome,
      class: "text-center"
    }),
    $('<td>', {
      text: dataAway,
      class: "text-center"
    }),
  ).appendTo(container)
}

function getTime(timeRaw) {
  // Convert milliseconds to seconds
  //console.log(timeRaw);
  //console.log(timeRaw/(1000*10000) / 60);
}