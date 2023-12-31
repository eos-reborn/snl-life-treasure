// let tog = 1
let players_len = 30
let players = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18", "p19", "p20", "p21", "p22", "p23", "p24", "p25", "p26", "p27", "p28", "p29", "p30"];
let players_colors = ["Eggplant", "Emerald", "Plum", "Xanadu", "Goldenrod", "Dandelion", "Peach", "Gold", "Cotton", "Cherry", "Chestnut", "Blush", "Ash", "Sunset", "Tumbleweed", "Orchid", "Honeydew", "Coral", "Lion",  "Carrot", "Pearl", "Ruby", "Green Tea", "Lavender", "Lemon", "Ginger", "Famous", "Bone", "Amethyst", "Cardinal"]  // p1 is Cardinal, p2 is Eggplant etc
let players_correction = [-3, 55, 110, 165, 222, 278, 335, 390, 445, 501, 557, 615, 670, 725, 782, 838, 895, 950, 1005, 1062, 1117, 1175, 1230, 1286, 1341, 1398, 1453, 1510, 1565, 1621]  // corresponds to "players"; is "top" in css?
const diceContainer = document.querySelector(".dice-container");
const NUMBER_OF_DICE = 1;
let players_counter = 0

// Sound effects
let rollingSound = new Audio('rpg-dice-rolling-95182.mp3')
let winSound = new Audio('goodresult.mp3')
let ladderSound = new Audio('yayladder.mp3')
let snakeSound = new Audio('cobrahiss.mp3')
snakeSound.volume = 0.6

let player_sums = {
    'p1sum': 0,
    'p2sum': 0,
    'p3sum': 0,
    'p4sum': 0,
    'p5sum': 0,
    'p6sum': 0,
    'p7sum': 0,
    'p8sum': 0,
    'p9sum': 0,
    'p10sum': 0,
    'p11sum': 0,
    'p12sum': 0,
    'p13sum': 0,
    'p14sum': 0,
    'p15sum': 0,
    'p16sum': 0,
    'p17sum': 0,
    'p18sum': 0,
    'p19sum': 0,
    'p20sum': 0,
    'p21sum': 0,
    'p22sum': 0,
    'p23sum': 0,
    'p24sum': 0,
    'p25sum': 0,
    'p26sum': 0,
    'p27sum': 0,
    'p28sum': 0,
    'p29sum': 0,
    'p30sum': 0
}

const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    33: 69,
    37: 45,
    44: 63,
    51: 67,
    70: 90,
    72: 91,
    80: 99,
}
const snakes = {
    17: 7,
    32: 13,
    35: 24, 
    54: 34,
    62: 19,
    64: 60,
    77: 56,
    87: 36,
    93: 73,
    95: 75,
    98: 79
}

const square_to_text = {
    // causes
    1: "Not acting out of anger:",
    4: "No phone while eating:",
    9: "Refuse alcohol for stress relief:",
    17: "Indulge in unhealthy food:",
    21: "Present in a conversation:",
    28: "Dissolved past hurt compassionately:",
    32: "Posting on social media for recognition:",
    33: "Enjoy nature:",
    35: "Pleasing society to fit in:",
    37: "Working out consistently:",
    44: "Practice spontaneous living:",
    51: "Choose togetherness over personal indulgence:",
    54: "Drinking alcohol to ease stress:",
    62: "Isolating yourself from others:",
    64: "Comparing your lifestyle to others:",
    70: "Connecting to Universal Intelligence:",
    72: "Unfazed by failures:",
    77: "Dabbling between projects:",
    80: "Include others' well-being in decision making:",
    87: "Succumbing to the pleasure-seeking nature of the mind:",
    93: "Rely on AI for every assignment:",
    95: "Obsessed with one's physical appearance:",
    98: "Resistance to challenges and changes:",

    // effects
    7: "Ill health & low self-esteem",
    13: "Worried & Disturbed",
    14: "Cultivate a present mind",
    19: "Loneliness & Depression",
    24: "Loss of authenticity",
    31: "Healthy body & clear mind",
    34: "Loss of self-love",
    36: "Boredom",
    38: "Harmonious relationship",
    42: "Sense of togetherness",
    45: "Physical & mental fitness",
    56: "Uncertainty",
    60: "Perpetually dissatisfied with one's life",
    63: "Feel at ease with life circumstances",
    67: "Joyful & connected life",
    69: "Overall well-being",
    73: "Loss of intelligence & creativity", // Average Outcomes
    75: "Never ending worry",
    79: "Limited growth",
    84: "Free & connected being",
    90: "An effortless life unfolds",
    91: "Resilient Mind",
    99: "Conscious Leadership",
}

const updatePlayerCounter = () => {
    players_counter += 1
    if (players_counter+1 > players_len) {
        players_counter -= players_len
    }
}

function randomizeDice(diceContainer, numberOfDice) {
    // for starting up the game, randomizing the dice
    diceContainer.innerHTML = "";

    let lastDiceRoll;

    for (let i = 0; i < numberOfDice; i++) {
        const random = Math.floor((Math.random() * 6) + 1);
        const dice = createDice(random);

        diceContainer.appendChild(dice);
        lastDiceRoll = random;
    }

    return lastDiceRoll;
}

function createDice(num) {
    const dotPositionMatrix = {
		1: [
			[50, 50]
		],
		2: [
			[20, 20],
			[80, 80]
		],
		3: [
			[20, 20],
			[50, 50],
			[80, 80]
		],
		4: [
			[20, 20],
			[20, 80],
			[80, 20],
			[80, 80]
		],
		5: [
			[20, 20],
			[20, 80],
			[50, 50],
			[80, 20],
			[80, 80]
		],
		6: [
			[20, 20],
			[20, 80],
			[50, 20],
			[50, 80],
			[80, 20],
			[80, 80]
		]
	};
    
    const dice = document.createElement("div");
    dice.classList.add("dice");
    for (const dotPosition of dotPositionMatrix[num]) {
        const dot = document.createElement("div")
        dot.classList.add("dice-dot")
        dot.style.setProperty("--top", dotPosition[0] + "%");
        dot.style.setProperty("--left", dotPosition[1] + "%");
        dice.appendChild(dot);
    }
    return dice; // completed dice with requested num of dots
}

function moveChess(player, sum, correction) {
    /**
     * Update the position of a chess
     */
    if (sum < 10) {
        document.getElementById(`${player}`).style.left = `${(sum - 1) * 62}px`
        document.getElementById(`${player}`).style.top = `${-0 * 62 - correction}px`
    }

    else if (sum == 100) {
        winSound.play()

        setTimeout(() => {
            // put in setTimeout otherwise winSound won't play
            player_num = player.substring(1);  // remove 1st char, eg: 'p301' will get '301'
            if (player_num == '1') {
                alert("Cardinal Won!!")
            } else {
                alert(`${players_colors[player_num - 2]}` + " Won!!")
            }
            location.reload();
        }, 150);
    }

    else {  // box 11-99

        numarr = Array.from(String(sum))
        n1 = eval(numarr.shift())  // eg sum = 50: n1 = 5, n2 = 0
        n2 = eval(numarr.pop())
        
        // console.log(n1, n2)

        if (n1 % 2 != 0) {

            if (n2 == 0) {
                document.getElementById(`${player}`).style.left = `${(9) * 62}px`
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 62 - correction}px`
            }
            else {
                document.getElementById(`${player}`).style.left = `${(9 - (n2 - 1)) * 62}px`
                document.getElementById(`${player}`).style.top = `${-n1 * 62 - correction}px`

            }

        }
        else if (n1 % 2 == 0) {
            if (n2 == 0) {

                document.getElementById(`${player}`).style.left = `${(0) * 62}px`
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 62 - correction}px`
            }
            else {

                document.getElementById(`${player}`).style.left = `${(n2 - 1) * 62}px`
                document.getElementById(`${player}`).style.top = `${-n1 * 62 - correction}px`
            }

        }
    }
}

function play(player, psum, correction, num) {
    /**
     * play('p1', 'p1sum', 0, roll)
     */
    // num is roll; p1sum is p1's location
    let new_sum = player_sums[psum] + num
    document.getElementById(`${player}`).style.transition = `linear all .85s`

    if (new_sum > 100) { 
        new_sum = 100 - (new_sum - 100)
    }

    moveChess(player, new_sum, correction)
    setTimeout(() => {
        // pause for 1 sec: waiting the first move to complete
        let ladder_or_snake = NaN;
        if (new_sum in ladders) {
            document.getElementById("cause").innerText = square_to_text[new_sum]
            document.getElementById("effect").innerText = square_to_text[ladders[new_sum]]
            new_sum = ladders[new_sum]
            ladder_or_snake = "ladder"
        } else if (new_sum in snakes) {
            document.getElementById("cause").innerText = square_to_text[new_sum]
            document.getElementById("effect").innerText = square_to_text[snakes[new_sum]]
            new_sum = snakes[new_sum]
            ladder_or_snake = "snake"
        } else {
            document.getElementById("cause").innerText = ""
            document.getElementById("effect").innerText = ""
        }
    
        // update player_sums object with the new_sum
        player_sums[psum] = new_sum
    
        if (ladder_or_snake === "ladder") {
            ladderSound.play();
        } else if (ladder_or_snake === "snake") {
            snakeSound.play();
        }

        moveChess(player, new_sum, correction)
    }, 1000);
}

// Execute at game start up
randomizeDice(diceContainer, NUMBER_OF_DICE); 
players_len = Number(prompt("Number of players (min 1, max 30)", 10));
players = players.slice(0, players_len)
if (players_len > 30) {
    players_len = 30
}
if (players_len <= 1) {
    players_colors = []
} else {
    players_colors = players_colors.slice(0, players_len-1)
}
players_colors.push("Cardinal")
players_correction = players_correction.slice(0, players_len)
//Loop to make the correct pieces/players to be visible
for (let player of players) {
    document.getElementById(player).style.display = "block";
}


document.getElementById("diceBtn").addEventListener("click", function () {
    let lastDiceRoll = NaN;
    const intervalHandler = setInterval(() => {
        // setting to a handler so can cancel this scheduled 50ms task
        lastDiceRoll = randomizeDice(diceContainer, NUMBER_OF_DICE); 
    }, 50);
    rollingSound.play();
    
    setTimeout(() => {
        clearInterval(intervalHandler);

        // <Attempt to create more players>
        document.getElementById('turn-display').innerText = players_colors[players_counter] + "'s Turn : ";
        // play('p1', 'p1sum', 0, roll)
        play(players[players_counter], players[players_counter] + 'sum', players_correction[players_counter], lastDiceRoll);

    updatePlayerCounter();
    }, 650); // stop the interval task after 1 sec
})