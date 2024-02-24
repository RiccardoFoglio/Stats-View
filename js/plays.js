export default function buildPlays(game){
    $(document).ready(function(){

        if (game.Overtimes == 0){
            $('#playsNavbar a:last, #overtime_option').css('display', 'None');
        }

        const qtr = ['', 'firstQtr', 'secondQtr', 'thirdQtr', 'fourthQtr', 'overtime']

        game.PlayByPlay.forEach(play => {

            const body = $(`#${qtr[play.Period]}Plays tbody`);

            if (play.VisualizeOnlyEvent) {
                eventRow(play, body);
            } else {
                eventDDRow(play, body);
            }
        })
})}


function eventRow(play, body){
    body.append($('<tr>').append(
        $('<td>', {
            text: play.Event,
            colspan: 2
        })
    ))
}

function eventDDRow(play, body){

    const down = ['', '1st', '2nd', '3rd', '4th']

    body.append($('<tr>').append(
        $('<td>').html(`${down[play.Down]} & ${play.ToGo == "GOAL" ? "G" : play.ToGo} at ${play.BallLocationTeam}${play.BallLocationYds}`),
        $('<td>').html(play.Event)

    ))

}
