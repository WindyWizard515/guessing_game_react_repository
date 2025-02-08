import axios from "axios"

export const makeGuess = (playerName, guess) => {
    return axios({
        method: "POST",
        url: `${process.env.NODE_ENV === 'development' ? "http:///localhost:3331" : ""}/guess`,
        data: {
            player: playerName,
            guess: guess,
        }
    })
}