import axios from "axios"

export const addPlayer = (playerName) => {
    return axios({
        method: "POST",
        url: `${process.env.NODE_ENV === 'development' ? "http:///localhost:3331" : ""}/players`,
        data: {
            name: playerName
        }
    })
}