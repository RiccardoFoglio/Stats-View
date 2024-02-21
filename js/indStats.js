import {getAverage, checkLongest, getQuarter, getTime} from '../js/auxiliaries.js'


export default function buildIndStats(game){
    $(document).ready(function(){

        buildOffense(game);
        buildDefense(game);
        buildST(game);

})}


function buildOffense(game){
    buildPassing(game)
    buildRushing(game)
    buildReceiving(game)
    buildAllPurp(game)
}

function buildDefense(game) {
    const teams = [
        { stats: game.gamePlayerStatsHomeTeam, body: $('#DefenseTableH tbody')},
        { stats: game.gamePlayerStatsVisitingTeam, body: $('#DefenseTableV tbody')}
    ];

    $('#HomeDefense_button').html(game.HomeTeam.Name);
    $('#AwayDefense_button').html(game.VisitingTeam.Name);

    $('#HomeDefense h5').html(`${game.HomeTeam.Name} - Individual Defense Stats`);
    $('#AwayDefense h5').html(`${game.VisitingTeam.Name} - Individual Defense Stats`);

    teams.forEach(team => {

        team.stats.forEach(player => {

             if (player.TotalTackle !== 0 ||
                player.TotalSack !== 0 ||
                player.FumbleForced !== 0 ||
                player.FumbleRecoveredNumber !== 0 ||
                player.TackleForLossNumber !== 0 ||
                player.InterceptNumber !== 0 ||
                player.BrokenUpNumber !== 0 ||
                player.BlockedKickNumber !== 0 ||
                player.QBHurryNumber !== 0 
                )  {
                team.body.append($('<tr>').append(
                    $('<td>').html(player.number).addClass("text-center"),
                    $('<th>').html(`${player.Surname} ${player.Name}.`).addClass("text-center"),
                    $('<td>').html(player.TackleSolo).addClass("text-center hide-on-x-small-down"),
                    $('<td>').html(player.TackleAssist).addClass("text-center hide-on-x-small-down"),
                    $('<td>').html(player.TotalTackle).addClass("text-center"),
                    $('<td>').html(`${player.TackleForLossNumber}/${player.TackleForLossYds}`).addClass("text-center hide-on-x-small-down"),
                    $('<td>').html(`${player.TackleForLossNumber}/${player.TackleForLossYds}`).addClass("text-center hide-on-medium"),
                    $('<td>').html(`${player.TotalSack}/${player.GainedSackYds}`).addClass("text-center hide-on-x-small-down"),
                    $('<td>').html(player.TotalSack).addClass("text-center hide-on-medium"),
                    $('<td>').html(player.FumbleForced).addClass("text-center hide-on-x-small-down"),
                    $('<td>').html(`${player.FumbleRecoveredNumber}-${player.FumbleReturnedYds}`).addClass("text-center hide-on-x-small-down"),
                    $('<td>').html(`${player.FumbleRecoveredNumber}-${player.FumbleReturnedYds}`).addClass("text-center hide-on-medium"),
                    $('<td>').html(player.InterceptNumber).addClass("text-center hide-on-x-small-down"),
                    $('<td>').html(player.InterceptNumber).addClass("text-center hide-on-medium"),
                    $('<td>').html(player.BrokenUpNumber).addClass("text-center hide-on-x-small-down"),
                    $('<td>').html(player.BlockedKickNumber).addClass("text-center hide-on-x-small-down"),
                    $('<td>').html(player.QBHurryNumber).addClass("text-center hide-on-x-small-down"),
                ));

            }
        });
    });
}




























function buildST(game){
    buildPunting(game)
    buildAllRet(game)
    buildFG(game)
    buildKickoffs(game)
}


////////////////////////////////////////////////////////
/////////////////////////OFFENSE///////////////////////
///////////////////////////////////////////////////////

function buildPassing(game) {
    const teams = [
        { stats: game.gamePlayerStatsHomeTeam, body: $('#passingStatsHome-table tbody'), footer: $('#passingStatsHome-table tfoot') },
        { stats: game.gamePlayerStatsVisitingTeam, body: $('#passingStatsAway-table tbody'), footer: $('#passingStatsAway-table tfoot') }
    ];

    $('#passingStatsHome-table caption').html(`${game.HomeTeam.Code} - Passing`)
    $('#passingStatsAway-table caption').html(`${game.VisitingTeam.Code} - Passing`)

    teams.forEach(team => {
        const footerObject = {
            PassCompleted: 0,
            PassAttempted: 0,
            PassYds: 0,
            PassTD: 0,
            PassInterceptedByOpponents: 0,
            LongestPass: 0,
            SackReceived: 0,
        };

        team.stats.forEach(player => {
            if (player.PassAttempted !== 0) {
                team.body.append($('<tr>').append(
                    $('<th>').html(`${player.Surname} ${player.Name}.`),
                    $('<td>').html(player.PassCompleted).addClass('text-center'),
                    $('<td>').html(player.PassAttempted).addClass('text-center'),
                    $('<td>').html(player.PassYds).addClass('text-center'),
                    $('<td>').html(player.PassTD).addClass('text-center'),
                    $('<td>').html(player.PassInterceptedByOpponents).addClass('text-center'),
                    $('<td>').html(player.LongestPass).addClass('text-center'),
                    $('<td>').html(player.SackReceived).addClass('text-center'),
                ));

                footerObject.PassCompleted += player.PassCompleted;
                footerObject.PassAttempted += player.PassAttempted;
                footerObject.PassYds += player.PassYds;
                footerObject.PassTD += player.PassTD;
                footerObject.PassInterceptedByOpponents += player.PassInterceptedByOpponents;
                footerObject.LongestPass = Math.max(footerObject.LongestPass, player.LongestPass);
                footerObject.SackReceived += player.SackReceived;
            }
        });

        team.footer.append($('<tr>').append(
            $('<th>').html('TOTALS'),
            $('<td>').html(footerObject.PassCompleted).addClass('text-center'),
            $('<td>').html(footerObject.PassAttempted).addClass('text-center'),
            $('<td>').html(footerObject.PassYds).addClass('text-center'),
            $('<td>').html(footerObject.PassTD).addClass('text-center'),
            $('<td>').html(footerObject.PassInterceptedByOpponents).addClass('text-center'),
            $('<td>').html(footerObject.LongestPass).addClass('text-center'),
            $('<td>').html(footerObject.SackReceived).addClass('text-center'),
        ));
    });
}

function buildRushing(game) {
    const teams = [
        { stats: game.gamePlayerStatsHomeTeam, body: $('#rushingStatsHome-table tbody'), footer: $('#rushingStatsHome-table tfoot') },
        { stats: game.gamePlayerStatsVisitingTeam, body: $('#rushingStatsAway-table tbody'), footer: $('#rushingStatsAway-table tfoot') }
    ];

    $('#rushingStatsHome-table caption').html(`${game.HomeTeam.Code} - Rushing`)
    $('#rushingStatsAway-table caption').html(`${game.VisitingTeam.Code} - Rushing`)

    teams.forEach(team => {
        const footerObject = {
            RushNumber: 0,
            GainedRushYds: 0,
            LossRushYds: 0,
            RushYds: 0,
            RushTD: 0,
            LongestRush: 0,
            RushAVG: 0,
        };

        team.stats.forEach(player => {
            if (player.RushNumber !== 0) {
                team.body.append($('<tr>').append(
                    $('<th>').html(`${player.Surname} ${player.Name}.`),
                    $('<td>').html(player.RushNumber).addClass('text-center'),
                    $('<td>').html(player.GainedRushYds).addClass('text-center'),
                    $('<td>').html(player.LossRushYds).addClass('text-center'),
                    $('<td>').html(player.RushYds).addClass('text-center'),
                    $('<td>').html(player.RushTD).addClass('text-center'),
                    $('<td>').html(player.LongestRush).addClass('text-center'),
                    $('<td>').html(getAverage(player.RushYds, player.RushNumber)).addClass('text-center'),
                ));

                footerObject.RushNumber += player.RushNumber;
                footerObject.GainedRushYds += player.GainedRushYds;
                footerObject.LossRushYds += player.LossRushYds;
                footerObject.RushYds += player.RushYds;
                footerObject.RushTD += player.RushTD;
                footerObject.LongestRush = Math.max(footerObject.LongestRush, player.LongestRush);
                footerObject.RushAVG = getAverage(footerObject.RushYds, footerObject.RushNumber);
            }
        });

        team.footer.append($('<tr>').append(
            $('<th>').html('TOTALS'),
            $('<td>').html(footerObject.RushNumber).addClass('text-center'),
            $('<td>').html(footerObject.GainedRushYds).addClass('text-center'),
            $('<td>').html(footerObject.LossRushYds).addClass('text-center'),
            $('<td>').html(footerObject.RushYds).addClass('text-center'),
            $('<td>').html(footerObject.RushTD).addClass('text-center'),
            $('<td>').html(footerObject.LongestRush).addClass('text-center'),
            $('<td>').html(footerObject.RushAVG).addClass('text-center'),
        ));
    });
}

function buildReceiving(game) {
    const teams = [
        { stats: game.gamePlayerStatsHomeTeam, body: $('#receivingStatsHome-table tbody'), footer: $('#receivingStatsHome-table tfoot') },
        { stats: game.gamePlayerStatsVisitingTeam, body: $('#receivingStatsAway-table tbody'), footer: $('#receivingStatsAway-table tfoot') }
    ];

    $('#receivingStatsHome-table caption').html(`${game.HomeTeam.Code} - Receiving`)
    $('#receivingStatsAway-table caption').html(`${game.VisitingTeam.Code} - Receiving`)

    teams.forEach(team => {
        const footerObject = {
            ReceiveNumber: 0,
            ReceiveYds: 0,
            LongestReceive: 0,
            ReceiveTD: 0,
        };

        team.stats.forEach(player => {
            if (player.ReceiveNumber !== 0) {
                team.body.append($('<tr>').append(
                    $('<th>').html(`${player.Surname} ${player.Name}.`),
                    $('<td>').html(player.ReceiveNumber).addClass('text-center'),
                    $('<td>').html(player.ReceiveYds).addClass('text-center'),
                    $('<td>').html(player.LongestReceive).addClass('text-center'),
                    $('<td>').html(player.ReceiveTD).addClass('text-center'),
                ));

                footerObject.ReceiveNumber += player.ReceiveNumber;
                footerObject.ReceiveYds += player.ReceiveYds;
                footerObject.ReceiveTD += player.ReceiveTD;
                footerObject.LongestReceive = Math.max(footerObject.LongestReceive, player.LongestReceive);
            }
        });

        team.footer.append($('<tr>').append(
            $('<th>').html('TOTALS'),
            $('<td>').html(footerObject.ReceiveNumber).addClass('text-center'),
            $('<td>').html(footerObject.ReceiveYds).addClass('text-center'),
            $('<td>').html(footerObject.ReceiveTD).addClass('text-center'),
            $('<td>').html(footerObject.LongestReceive).addClass('text-center'),
        ));
    });
}

function buildAllPurp(game) {
    const teams = [
        { stats: game.gamePlayerStatsHomeTeam, body: $('#allPurposeStatsHome-table tbody'), footer: $('#allPurposeStatsHome-table tfoot') },
        { stats: game.gamePlayerStatsVisitingTeam, body: $('#allPurposeStatsAway-table tbody'), footer: $('#allPurposeStatsAway-table tfoot') }
    ];

    $('#allPurposeStatsHome-table caption').html(`${game.HomeTeam.Code} - All Purpose`)
    $('#allPurposeStatsAway-table caption').html(`${game.VisitingTeam.Code} - All Purpose`)

    teams.forEach(team => {
        const footerObject = {
            RushYds: 0,
            ReceiveYds: 0,
            KickReturnYds: 0,
            PuntReturnYds: 0,
            InterceptYds: 0,
            Total: 0,
        };

        team.stats.forEach(player => {

            if (player.RushYds !== 0 ||
                player.ReceiveYds !== 0 ||
                player.KickReturnYds !== 0 ||
                player.PuntReturnYds !== 0 ||
                player.InterceptYds !== 0
                ) {
                team.body.append($('<tr>').append(
                    $('<th>').html(`${player.Surname} ${player.Name}.`),
                    $('<td>').html(player.RushYds).addClass('text-center'),
                    $('<td>').html(player.ReceiveYds).addClass('text-center'),
                    $('<td>').html(player.KickReturnYds).addClass('text-center'),
                    $('<td>').html(player.PuntReturnYds).addClass('text-center'),
                    $('<td>').html(player.InterceptYds).addClass('text-center'),
                    $('<td>').html(player.RushYds + player.ReceiveYds + player.KickReturnYds + player.PuntReturnYds + player.InterceptYds).addClass('text-center'),
                ));

                footerObject.RushYds += player.RushYds;
                footerObject.ReceiveYds += player.ReceiveYds;
                footerObject.KickReturnYds += player.KickReturnYds;
                footerObject.PuntReturnYds += player.PuntReturnYds;
                footerObject.InterceptYds += player.InterceptYds;
            }
        });
        footerObject.Total += (footerObject.RushYds+footerObject.ReceiveYds+footerObject.KickReturnYds+footerObject.PuntReturnYds+footerObject.InterceptYds);

        team.footer.append($('<tr>').append(
            $('<th>').html('TOTALS'),
            $('<td>').html(footerObject.RushYds).addClass('text-center'),
            $('<td>').html(footerObject.ReceiveYds).addClass('text-center'),
            $('<td>').html(footerObject.KickReturnYds).addClass('text-center'),
            $('<td>').html(footerObject.PuntReturnYds).addClass('text-center'),
            $('<td>').html(footerObject.InterceptYds).addClass('text-center'),
            $('<td>').html(footerObject.Total).addClass('text-center'),
        ));
    });
}

////////////////////////////////////////////////////////
/////////////////////SPECIAL TEAMS//////////////////////
///////////////////////////////////////////////////////

function buildPunting(game) {
    const teams = [
        { stats: game.gamePlayerStatsHomeTeam, body: $('#puntingStatsHome-table tbody'), footer: $('#puntingStatsHome-table tfoot') },
        { stats: game.gamePlayerStatsVisitingTeam, body: $('#puntingStatsAway-table tbody'), footer: $('#puntingStatsAway-table tfoot') }
    ];

    $('#puntingStatsHome-table caption').html(`${game.HomeTeam.Code} - Punting`)
    $('#puntingStatsAway-table caption').html(`${game.VisitingTeam.Code} - Punting`)

    teams.forEach(team => {
        const footerObject = {
            PuntNumber: 0,
            PuntYds: 0,
            LongestPunt: 0,
            PuntInsideRedZone: 0,
            PuntTouchback: 0,
            PuntMoreThan50: 0,
        };

        team.stats.forEach(player => {
            if (player.PuntNumber !== 0) {
                team.body.append($('<tr>').append(
                    $('<th>').html(`${player.Surname} ${player.Name}.`),
                    $('<td>').html(player.PuntNumber).addClass('text-center'),
                    $('<td>').html(player.PuntYds).addClass('text-center'),
                    $('<td>').html(getAverage(player.PuntYds, player.PuntNumber)).addClass('text-center'),
                    $('<td>').html(player.LongestPunt).addClass('text-center'),
                    $('<td>').html(player.PuntInsideRedZone).addClass('text-center'),
                    $('<td>').html(player.PuntTouchback).addClass('text-center'),
                    $('<td>').html(player.PuntMoreThan50).addClass('text-center')
                ));

                footerObject.PuntNumber += player.PuntNumber;
                footerObject.PuntYds += player.PuntYds;
                footerObject.LongestPunt = Math.max(footerObject.LongestPunt, player.LongestPunt);;
                footerObject.PuntInsideRedZone += player.PuntInsideRedZone;
                footerObject.PuntTouchback += player.PuntTouchback;
                footerObject.PuntMoreThan50 += player.PuntMoreThan50;
            }
        });

        team.footer.append($('<tr>').append(
            $('<th>').html('TOTALS'),
            $('<td>').html(footerObject.PuntNumber).addClass('text-center'),
            $('<td>').html(footerObject.PuntYds).addClass('text-center'),
            $('<td>').html(getAverage(footerObject.PuntYds, footerObject.PuntNumber)).addClass('text-center'),
            $('<td>').html(footerObject.LongestPunt).addClass('text-center'),
            $('<td>').html(footerObject.PuntInsideRedZone).addClass('text-center'),
            $('<td>').html(footerObject.PuntTouchback).addClass('text-center'),
            $('<td>').html(footerObject.PuntMoreThan50).addClass('text-center')
        ));
    });
}

function buildAllRet(game) {
    const teams = [
        { stats: game.gamePlayerStatsHomeTeam, body: $('#allReturnsStatsHome-table tbody'), footer: $('#allReturnsStatsHome-table tfoot') },
        { stats: game.gamePlayerStatsVisitingTeam, body: $('#allReturnsStatsAway-table tbody'), footer: $('#allReturnsStatsAway-table tfoot') }
    ];

    $('#allReturnsStatsHome-table caption').html(`${game.HomeTeam.Code} - All Returns`)
    $('#allReturnsStatsAway-table caption').html(`${game.VisitingTeam.Code} - All Returns`)

    teams.forEach(team => {
        const footerObject = {
            PuntReturnNumber: 0,
            PuntReturnYds: 0,
            LongestPuntReturn: 0,
            KickReturnNumber: 0,
            KickReturnYds: 0,
            LongestKickReturn: 0,
            InterceptNumber: 0,
            InterceptYds: 0,
            LongestIntercept: 0,
        };

        team.stats.forEach(player => {
            if (player.PuntReturnNumber !== 0 ||
                player.KickReturnNumber !== 0 ||
                player.InterceptNumber !== 0
                ) {
                team.body.append($('<tr>').append(
                    $('<th>').html(`${player.Surname} ${player.Name}.`),
                    $('<td>').html(player.PuntReturnNumber).addClass('text-center'),
                    $('<td>').html(player.PuntReturnYds).addClass('text-center'),
                    $('<td>').html(checkLongest(player.LongestPuntReturn, game)).addClass('text-center'),
                    $('<td>').html(player.KickReturnNumber).addClass('text-center'),
                    $('<td>').html(player.KickReturnYds).addClass('text-center'),
                    $('<td>').html(checkLongest(player.LongestKickReturn, game)).addClass('text-center'),
                    $('<td>').html(player.InterceptNumber).addClass('text-center'),
                    $('<td>').html(player.InterceptYds).addClass('text-center'),
                    $('<td>').html(checkLongest(player.LongestIntercept, game)).addClass('text-center'),
                   
                ));
                
                footerObject.PuntReturnNumber += player.PuntReturnNumber;
                footerObject.PuntReturnYds += player.PuntReturnYds;
                footerObject.LongestPuntReturn = Math.max(footerObject.LongestPuntReturn, player.LongestPuntReturn);
                footerObject.KickReturnNumber += player.KickReturnNumber;
                footerObject.KickReturnYds += player.KickReturnYds;
                footerObject.LongestKickReturn = Math.max(footerObject.LongestKickReturn, player.LongestKickReturn);
                footerObject.InterceptNumber += player.InterceptNumber;
                footerObject.InterceptYds += player.InterceptYds;
                footerObject.LongestIntercept = Math.max(footerObject.LongestIntercept, player.LongestIntercept);
                
            }
        });

        team.footer.append($('<tr>').append(
            $('<th>').html('TOTALS'),
            $('<td>').html(footerObject.PuntReturnNumber).addClass('text-center'),
            $('<td>').html(footerObject.PuntReturnYds).addClass('text-center'),
            $('<td>').html(footerObject.LongestPuntReturn).addClass('text-center'),
            $('<td>').html(footerObject.KickReturnNumber).addClass('text-center'),
            $('<td>').html(footerObject.KickReturnYds).addClass('text-center'),
            $('<td>').html(footerObject.LongestKickReturn).addClass('text-center'),
            $('<td>').html(footerObject.InterceptNumber).addClass('text-center'),
            $('<td>').html(footerObject.InterceptYds).addClass('text-center'),
            $('<td>').html(footerObject.LongestIntercept).addClass('text-center'),
        ));
    });
}

function buildFG(game) {
    const teams = [
        { stats: game.gameTeamStatsHomeTeam, body: $('#fieldGoalStatsHome-table tbody')},
        { stats: game.gameTeamStatsVisitingTeam, body: $('#fieldGoalStatsAway-table tbody')}
    ];

    $('#fieldGoalStatsHome-table caption').html(`${game.HomeTeam.Code} - Field Goals`)
    $('#fieldGoalStatsAway-table caption').html(`${game.VisitingTeam.Code} - Field Goals`)

    teams.forEach(team => {
        
        team.stats.listOfFieldGoals.forEach(fieldgoal => {
            
            team.body.append($('<tr>').append(
                $('<th>').html(fieldgoal.SurnameName),
                $('<td>').html(getQuarter(fieldgoal.Period)).addClass('text-center'),
                $('<td>').html(getTime(fieldgoal.Time.$numberLong)).addClass('text-center'),
                $('<td>').html(`${fieldgoal.Distance} yds`).addClass('text-center'),
                $('<td>').html(fieldgoal.Result).addClass('text-center'),
            ));
        });
    });
}

function buildKickoffs(game) {
    const teams = [
        { stats: game.gamePlayerStatsHomeTeam, body: $('#kickoffStatsHome-table tbody'), footer: $('#kickoffStatsHome-table tfoot') },
        { stats: game.gamePlayerStatsVisitingTeam, body: $('#kickoffStatsAway-table tbody'), footer: $('#kickoffStatsAway-table tfoot') }
    ];

    $('#kickoffStatsHome-table caption').html(`${game.HomeTeam.Code} - Kickoffs`)
    $('#kickoffStatsAway-table caption').html(`${game.VisitingTeam.Code} - Kickoffs`)

    teams.forEach(team => {
        const footerObject = {
            KickNumber: 0,
            KickYds: 0,
            KickTouchback: 0,
            KickOutOfBounds: 0,
        };

        team.stats.forEach(player => {
            if (player.KickNumber !== 0) {
                team.body.append($('<tr>').append(
                    $('<th>').html(`${player.Surname} ${player.Name}.`),
                    $('<td>').html(player.KickNumber).addClass('text-center'),
                    $('<td>').html(player.KickYds).addClass('text-center'),
                    $('<td>').html(player.KickTouchback).addClass('text-center'),
                    $('<td>').html(player.KickOutOfBounds).addClass('text-center'),
                    $('<td>').html(getAverage(player.KickYds, player.KickNumber)).addClass('text-center'),
                ));

                footerObject.KickNumber += player.KickNumber;
                footerObject.KickYds += player.KickYds;
                footerObject.KickTouchback += player.KickTouchback;
                footerObject.KickOutOfBounds += player.KickOutOfBounds;
            }
        });

        team.footer.append($('<tr>').append(
            $('<th>').html('TOTALS'),
            $('<td>').html(footerObject.KickNumber).addClass('text-center'),
            $('<td>').html(footerObject.KickYds).addClass('text-center'),
            $('<td>').html(footerObject.KickTouchback).addClass('text-center'),
            $('<td>').html(footerObject.KickOutOfBounds).addClass('text-center'),
            $('<td>').html(getAverage(footerObject.KickYds, footerObject.KickNumber)).addClass('text-center'),
        ));
    });
}