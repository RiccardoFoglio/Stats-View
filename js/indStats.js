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

    $('#HomeDefense h5').html(`${game.HomeTeam.Name} - Individual Defense Stats`)
    $('#AwayDefense h5').html(`${game.VisitingTeam.Name} - Individual Defense Stats`)

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
                    $('<td>').html(player.number),
                    $('<th>').html(`${player.Surname} ${player.Name}`),
                    $('<td>').html(player.TackleSolo),
                    $('<td>').html(player.TackleAssist),
                    $('<td>').html(player.TotalTackle),
                    $('<td>').html(`${player.TackleForLossNumber}/${player.TackleForLossYds}`),
                    $('<td>').html(`${player.TotalSack}/${player.GainedSackYds}`),
                    $('<td>').html(player.FumbleForced),
                    $('<td>').html(`${player.FumbleRecoveredNumber}/${player.FumbleReturnedYds}`),
                    $('<td>').html(player.InterceptNumber),
                    $('<td>').html(player.BrokenUpNumber),
                    $('<td>').html(player.BlockedKickNumber),
                    $('<td>').html(player.QBHurryNumber),
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
    buildPAT(game)
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
                    $('<th>').html(`${player.Surname} ${player.Name}`),
                    $('<td>').html(player.PassCompleted),
                    $('<td>').html(player.PassAttempted),
                    $('<td>').html(player.PassYds),
                    $('<td>').html(player.PassTD),
                    $('<td>').html(player.PassInterceptedByOpponents),
                    $('<td>').html(player.LongestPass),
                    $('<td>').html(player.SackReceived),
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
            $('<td>').html(footerObject.PassCompleted),
            $('<td>').html(footerObject.PassAttempted),
            $('<td>').html(footerObject.PassYds),
            $('<td>').html(footerObject.PassTD),
            $('<td>').html(footerObject.PassInterceptedByOpponents),
            $('<td>').html(footerObject.LongestPass),
            $('<td>').html(footerObject.SackReceived),
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
                    $('<th>').html(`${player.Surname} ${player.Name}`),
                    $('<td>').html(player.RushNumber),
                    $('<td>').html(player.GainedRushYds),
                    $('<td>').html(player.LossRushYds),
                    $('<td>').html(player.RushYds),
                    $('<td>').html(player.RushTD),
                    $('<td>').html(player.LongestRush),
                    $('<td>').html(getAverage(player.RushYds, player.RushNumber)),
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
            $('<td>').html(footerObject.RushNumber),
            $('<td>').html(footerObject.GainedRushYds),
            $('<td>').html(footerObject.LossRushYds),
            $('<td>').html(footerObject.RushYds),
            $('<td>').html(footerObject.RushTD),
            $('<td>').html(footerObject.LongestRush),
            $('<td>').html(footerObject.RushAVG),
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
                    $('<th>').html(`${player.Surname} ${player.Name}`),
                    $('<td>').html(player.ReceiveNumber),
                    $('<td>').html(player.ReceiveYds),
                    $('<td>').html(player.LongestReceive),
                    $('<td>').html(player.ReceiveTD),
                ));

                footerObject.ReceiveNumber += player.ReceiveNumber;
                footerObject.ReceiveYds += player.ReceiveYds;
                footerObject.ReceiveTD += player.ReceiveTD;
                footerObject.LongestReceive = Math.max(footerObject.LongestReceive, player.LongestReceive);
            }
        });

        team.footer.append($('<tr>').append(
            $('<th>').html('TOTALS'),
            $('<td>').html(footerObject.ReceiveNumber),
            $('<td>').html(footerObject.ReceiveYds),
            $('<td>').html(footerObject.ReceiveTD),
            $('<td>').html(footerObject.LongestReceive),
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
                    $('<th>').html(`${player.Surname} ${player.Name}`),
                    $('<td>').html(player.RushYds),
                    $('<td>').html(player.ReceiveYds),
                    $('<td>').html(player.KickReturnYds),
                    $('<td>').html(player.PuntReturnYds),
                    $('<td>').html(player.InterceptYds),
                    $('<td>').html(player.RushYds + player.ReceiveYds + player.KickReturnYds + player.PuntReturnYds + player.InterceptYds),
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
            $('<td>').html(footerObject.RushYds),
            $('<td>').html(footerObject.ReceiveYds),
            $('<td>').html(footerObject.KickReturnYds),
            $('<td>').html(footerObject.PuntReturnYds),
            $('<td>').html(footerObject.InterceptYds),
            $('<td>').html(footerObject.Total),
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
                    $('<th>').html(`${player.Surname} ${player.Name}`),
                    $('<td>').html(player.PuntNumber),
                    $('<td>').html(player.PuntYds),
                    $('<td>').html(getAverage(player.PuntYds, player.PuntNumber)),
                    $('<td>').html(player.LongestPunt),
                    $('<td>').html(player.PuntInsideRedZone),
                    $('<td>').html(player.PuntTouchback),
                    $('<td>').html(player.PuntMoreThan50),
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
            $('<td>').html(footerObject.PuntNumber),
            $('<td>').html(footerObject.PuntYds),
            $('<td>').html(getAverage(footerObject.PuntYds, footerObject.PuntNumber)),
            $('<td>').html(footerObject.LongestPunt),
            $('<td>').html(footerObject.PuntInsideRedZone),
            $('<td>').html(footerObject.PuntTouchback),
            $('<td>').html(footerObject.PuntMoreThan50),
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
                    $('<th>').html(`${player.Surname} ${player.Name}`),
                    $('<td>').html(player.PuntReturnNumber),
                    $('<td>').html(player.PuntReturnYds),
                    $('<td>').html(checkLongest(player.LongestPuntReturn, game)),
                    $('<td>').html(player.KickReturnNumber),
                    $('<td>').html(player.KickReturnYds),
                    $('<td>').html(checkLongest(player.LongestKickReturn, game)),
                    $('<td>').html(player.InterceptNumber),
                    $('<td>').html(player.InterceptYds),
                    $('<td>').html(checkLongest(player.LongestIntercept, game)),
                   
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
            $('<td>').html(footerObject.PuntReturnNumber),
            $('<td>').html(footerObject.PuntReturnYds),
            $('<td>').html(footerObject.LongestPuntReturn),
            $('<td>').html(footerObject.KickReturnNumber),
            $('<td>').html(footerObject.KickReturnYds),
            $('<td>').html(footerObject.LongestKickReturn),
            $('<td>').html(footerObject.InterceptNumber),
            $('<td>').html(footerObject.InterceptYds),
            $('<td>').html(footerObject.LongestIntercept),
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
                $('<td>').html(getQuarter(fieldgoal.Period)),
                $('<td>').html(getTime(fieldgoal.Time.$numberLong)),
                $('<td>').html(`${fieldgoal.Distance} yds`),
                $('<td>').html(fieldgoal.Result),
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
                    $('<th>').html(`${player.Surname} ${player.Name}`),
                    $('<td>').html(player.KickNumber),
                    $('<td>').html(player.KickYds),
                    $('<td>').html(player.KickTouchback),
                    $('<td>').html(player.KickOutOfBounds),
                    $('<td>').html(getAverage(player.KickYds, player.KickNumber)),
                ));

                footerObject.KickNumber += player.KickNumber;
                footerObject.KickYds += player.KickYds;
                footerObject.KickTouchback += player.KickTouchback;
                footerObject.KickOutOfBounds += player.KickOutOfBounds;
            }
        });

        team.footer.append($('<tr>').append(
            $('<th>').html('TOTALS'),
            $('<td>').html(footerObject.KickNumber),
            $('<td>').html(footerObject.KickYds),
            $('<td>').html(footerObject.KickTouchback),
            $('<td>').html(footerObject.KickOutOfBounds),
            $('<td>').html(getAverage(footerObject.KickYds, footerObject.KickNumber)),
        ));
    });
}