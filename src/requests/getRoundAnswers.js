import axios from "axios"

export const getRoundAnswers = () => {
    return axios({
        method: "GET",
        url: `${process.env.NODE_ENV === 'development' ? "http:///localhost:3331" : ""}/round/current/answers`
    })
}