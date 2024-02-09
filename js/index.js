let Game = null;
filegame = "SEA @ GIT - 1705278755.game";

fetch("../data/" + filegame)
  .then(response => response.json())
  .then(data => {
    // Do something with the JSON data
    console.log(data);
    Game = data
  })
  .catch(error => console.error('Error fetching JSON:', error));

  