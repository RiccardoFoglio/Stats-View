import {getTime} from '../js/auxiliaries.js'

export default function buildDriveChart(game){
  $(document).ready(function(){

    // add names to the buttons
    $("#homeDrive_button").html(game.HomeTeam.Name);
    $("#awayDrive_button").html(game.VisitingTeam.Name);

    // add header to the tables
    const tableHeader = '<tr>' +
                        '<th></th>' +
                        '<th class="text-center" colspan="4">Drive Started</th>' +
                        '<th class="text-center" colspan="3">Drive Ended</th>' +
                        '<th class="text-center" colspan="2">Consumed</th>' +
                        '</tr>' +
                        '<tr>' +
                        '<th class="text-center">Team</th>' +
                        '<th class="text-center">Qtr</th>' +
                        '<th class="text-center">Spot</th>' +
                        '<th class="text-center">Time</th>' +
                        '<th class="text-center">Obtained</th>' +
                        '<th class="text-center">Spot</th>' +
                        '<th class="text-center">Time</th>' +
                        '<th class="text-center">How Lost</th>' +
                        '<th class="text-center">Pl-Yds</th>' +
                        '<th class="text-center">TOP</th>' +
                        '</tr>';
                  
    $("#allDrivesTable thead").append(tableHeader);
    $("#HomeDrives thead").append(tableHeader);
    $("#AwayDrives thead").append(tableHeader);

    const allDrives = $("#allDrivesTable tbody");
    const homeDrives = $("#HomeDrives tbody");
    const awayDrives = $("#AwayDrives tbody");



    // insert drive in tables
    game.DriveChart.forEach(drive => {
      driveRow(drive, allDrives, game);
      drive.PossessionTeam === game.HomeTeam.Code ? driveRow(drive, homeDrives, game) : driveRow(drive, awayDrives, game);
    })



})}

function driveRow(drive, table, game){

  const quarterConv = ['1st', '2nd', '3rd', '4th', 'OT']
  const qtrLength = game.gameOptions.PeriodMinutes;
  const row = '<tr>' +
        '<td class="hide-on-large emphasize" data-label="GIT - S28">' + quarterConv[drive.Period - 1] + '/' + getTime(drive.StartDrive.$numberLong) + '</td>' +
        '<td class="text-center hide-on-medium-down" data-label="Team">' + drive.PossessionTeam + '</td>' +
        '<td class="text-center hide-on-medium-down" data-label="Started: Qtr">' + quarterConv[drive.Period - 1] + '</td>' +
        '<td class="text-center hide-on-medium-down" data-label="Started: Spot">' + drive.StartDriveBallLocationTeam + drive.StartDriveBallLocationYds + '</td>' +
        '<td class="text-center hide-on-medium-down" data-label="Started: Time">' + getTime(drive.StartDrive.$numberLong) + '</td>' +
        '<td class="text-center" data-label="Started: How">' + drive.StartMotivation + '</td>' +
        '<td class="text-center" data-label="Ended: Spot">' + drive.EndDriveBallLocationTeam + drive.EndDriveBallLocationYds + '</td>' +
        '<td class="text-center" data-label="Ended: Time">' + getTime(drive.EndDrive.$numberLong) + '</td>' +
        '<td class="text-center" data-label="Ended: How">' + drive.EndMotivation + '</td>' +
        '<td class="text-center" data-label="Plays - Yds.">' + drive.DriveNumber + '-' + drive.YardsDrive + '</td>' +
        '<td class="text-center" data-label="TOP">' + getTOP(drive.StartDrive.$numberLong, drive.EndDrive.$numberLong, qtrLength) + '</td>' +
        '</tr>';

    // Append the row to the table using jQuery
    table.append(row);



}

function getTOP(start, end, length) {
  const length_ticks = length * 60 * 10000000;
  const timediff = start - end;

  if (timediff < 0){
    return getTime(length_ticks + timediff);
  } else {
    return getTime(timediff);
  }
}

