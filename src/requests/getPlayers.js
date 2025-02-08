import axios from "axios"

export const getPlayers = () => {
    return axios({
        method: "GET",
        url: `${process.env.NODE_ENV === 'development' ? "http:///localhost:3331" : ""}/players`,
    })
}