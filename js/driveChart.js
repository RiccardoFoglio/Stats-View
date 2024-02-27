import {getTime} from '../js/auxiliaries.js'

export default function buildDriveChart(game){
  $(document).ready(function(){

    // add names to the buttons
    $("#homeDrive_button, #homeDrive_option").html(game.HomeTeam.Name);
    $("#awayDrive_button, #awayDrive_option").html(game.VisitingTeam.Name);

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

  

  const $row = $('<tr>')
    .append($('<td>').addClass('hide-on-large emphasize').attr('data-label', `${drive.PossessionTeam} - ${drive.StartDriveBallLocationTeam + drive.StartDriveBallLocationYds}`).text(quarterConv[drive.Period - 1] + '/' + getTime(drive.StartDrive.$numberLong)))
    .append($('<td>').addClass('text-center hide-on-medium-down').attr('data-label', 'Team').text(drive.PossessionTeam))
    .append($('<td>').addClass('text-center hide-on-medium-down').attr('data-label', 'Started: Qtr').text(quarterConv[drive.Period - 1]))
    .append($('<td>').addClass('text-center hide-on-medium-down').attr('data-label', 'Started: Spot').text(drive.StartDriveBallLocationTeam + drive.StartDriveBallLocationYds))
    .append($('<td>').addClass('text-center hide-on-medium-down').attr('data-label', 'Started: Time').text(getTime(drive.StartDrive.$numberLong)))
    .append($('<td>').addClass('text-center').attr('data-label', 'Started: How').text(drive.StartMotivation))
    .append($('<td>').addClass('text-center').attr('data-label', 'Ended: Spot').text(drive.EndDriveBallLocationTeam + drive.EndDriveBallLocationYds))
    .append($('<td>').addClass('text-center').attr('data-label', 'Ended: Time').text(getTime(drive.EndDrive.$numberLong)))
    .append($('<td>').addClass('text-center').attr('data-label', 'Ended: How').text(drive.EndMotivation))
    .append($('<td>').addClass('text-center').attr('data-label', 'Plays - Yds.').text(drive.DriveNumber + '-' + drive.YardsDrive))
    .append($('<td>').addClass('text-center').attr('data-label', 'TOP').text(getTOP(drive.StartDrive.$numberLong, drive.EndDrive.$numberLong, qtrLength)));

    // Append the row to the table using jQuery
    table.append($row);

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

