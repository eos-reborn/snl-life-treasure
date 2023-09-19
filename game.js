// let tog = 1
const players_len = 4
const players = ["p1", "p2", "p3", "p4"]
const players_colors = ["Yellow", "Green", "Purple", "Red"]  // p1 is red, p2 is yellow etc
const players_correction = [-3, 55, 110, 165]  // corresponds to "players"; is "top" in css?
let players_counter = 0

let rollingSound = new Audio('rpg-dice-rolling-95182.mp3')
let winSound = new Audio('winharpsichord-39642.mp3')

let p1sum = 0
let p2sum = 0
let p3sum = 0
let p4sum = 0

const snakes_n_ladders = {
    // Ladders
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
    // snakes
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

function play(player, psum, correction, num) {
    // num is roll; p1sum is p1's location
    let sum
    if (psum == 'p1sum') {
        p1sum = p1sum + num
        
        if (p1sum > 100) {
            p1sum = 100 - (p1sum - 100)
        }

        if (p1sum in snakes_n_ladders) {
            document.getElementById("cause").innerText = square_to_text[p1sum]
            p1sum = snakes_n_ladders[p1sum]
            document.getElementById("effect").innerText = square_to_text[p1sum]
        } else {
            document.getElementById("cause").innerText = ""
            document.getElementById("effect").innerText = ""
        }

        sum = p1sum
    }

    if (psum == 'p2sum') {

        p2sum = p2sum + num

        if (p2sum > 100) {
            p2sum = 100 - (p2sum - 100)
        }
        
        if (p2sum in snakes_n_ladders) {
            document.getElementById("cause").innerText = square_to_text[p2sum]
            p2sum = snakes_n_ladders[p2sum]
            document.getElementById("effect").innerText = square_to_text[p2sum]
        }else {
            document.getElementById("cause").innerText = ""
            document.getElementById("effect").innerText = ""
        }

        sum = p2sum
    }

    if (psum == 'p3sum') {

        p3sum = p3sum + num

        if (p3sum > 100) {
            p3sum = 100 - (p3sum - 100)
        }
        
        if (p3sum in snakes_n_ladders) {
            document.getElementById("cause").innerText = square_to_text[p3sum]
            p3sum = snakes_n_ladders[p3sum]
            document.getElementById("effect").innerText = square_to_text[p3sum]
        }else {
            document.getElementById("cause").innerText = ""
            document.getElementById("effect").innerText = ""
        }

        sum = p3sum
    }

    if (psum == 'p4sum') {

        p4sum = p4sum + num

        if (p4sum > 100) {
            p4sum = 100 - (p4sum - 100)
        }
        
        if (p4sum in snakes_n_ladders) {
            document.getElementById("cause").innerText = square_to_text[p4sum]
            p4sum = snakes_n_ladders[p4sum]
            document.getElementById("effect").innerText = square_to_text[p4sum]
        }else {
            document.getElementById("cause").innerText = ""
            document.getElementById("effect").innerText = ""
        }

        sum = p4sum
    }

    document.getElementById(`${player}`).style.transition = `linear all .85s`


    if (sum < 10) {
        document.getElementById(`${player}`).style.left = `${(sum - 1) * 62}px`
        document.getElementById(`${player}`).style.top = `${-0 * 62 - correction}px`
    }

    else if (sum == 100) {
        winSound.play()
        if (player == 'p1') {
            alert("Red Won !!")
        }
        else if (player == 'p2') {
            alert("Yellow Won !!")
        }

        else if (player == 'p3') {
            alert("Green Won !!")
        }

        else if (player == 'p4') {
            alert("Purple Won !!")
        }
        location.reload()
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


document.getElementById("diceBtn").addEventListener("click", function () {
    rollingSound.play()
    roll = Math.floor(Math.random() * (6 - 1 + 1) + 1)
    document.getElementById("dice").innerText = roll


    // if (tog % 2 != 0) {
    //     document.getElementById('turn-display').innerText = "Yellow's Turn : "
    //     play('p1', 'p1sum', 0, roll)

    // }

    // else if (tog % 2 == 0) {
    //     document.getElementById('turn-display').innerText = "Red's Turn : "

    //     play('p2', 'p2sum', 55, roll)

    // }

    // tog = tog + 1


    // <Attempt to create more players>
    document.getElementById('turn-display').innerText = players_colors[players_counter] + "'s Turn : "
    // play('p1', 'p1sum', 0, roll)
    play(players[players_counter], players[players_counter] + 'sum', players_correction[players_counter], roll)

    updatePlayerCounter()
})