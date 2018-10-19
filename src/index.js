var CARD_ELEM = document.getElementById("card");
var DECK_ELEM = document.getElementById("deck");
var WORKOUT_ELEM = document.getElementById("workout");

var RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var SUITS = ["S", "H", "D", "C"];
var IMAGES = {
  "S": "<img src='spade.png'/>",
  "H": "<img src='heart.png'/>",
  "D": "<img src='diamond.png'/>",
  "C": "<img src='clover.png'/>"
}
function IsLow(idx) {
  return idx < 6 ? 1 : 0;
}

var WORKOUTS = {
  S: ["tricep dips", "pushups"],
  H: ["russian twists (*2)", "split toe touches"],
  D: ["lunges", "side lunges"],
  C: ["jumprope (*2)", "one lap around the school"]
};

function Shuffle(array) {
  var currentIndex = array.length;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    var temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function GetDeck() {
  var deck = [];
  for (var rank_idx = 0; rank_idx < RANKS.length; ++rank_idx) {
    for (var suit_idx = 0; suit_idx < SUITS.length; ++suit_idx) {
      deck.push({ rank: rank_idx, suit: suit_idx });
    }
  }
  return deck;
}

function WorkoutHtml(card) {
  return WORKOUTS[SUITS[card.suit]][IsLow(card.rank)];
}

function CardHtml(card) {
  var rank_elem = RANKS[card.rank];
  var suit_elem = IMAGES[SUITS[card.suit]];
  return "<strong>" + rank_elem + " " + suit_elem + "</strong>";
}

var deck = Shuffle(GetDeck());
var position = 0;

function UpdateDeckElem() {
  var cards_left = deck.length - position;
  DECK_ELEM.innerHTML = "<span>Cards Left: " + cards_left + "</span>";
}

UpdateDeckElem();

document.getElementById("draw").addEventListener("click", function() {
  if (position >= deck.length) {
    return;
  }
  var card = deck[position++];
  CARD_ELEM.innerHTML = CardHtml(card);
  UpdateDeckElem();
  WORKOUT_ELEM.innerHTML = WorkoutHtml(card);
});

document.getElementById("reset").addEventListener("click", function() {
  position = 0;
  Shuffle(deck);
  UpdateDeckElem();
  CARD_ELEM.innerHTML = "<div id='start'><img src='heart.png'/><img src='spade.png'/><img src='diamond.png'/><img src='clover.png'/></div>";
  WORKOUT_ELEM.innerHTML = "click here";
});

