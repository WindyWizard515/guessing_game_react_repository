import axios from "axios"

export const startRoundWithRandomQuestion = () => {
    return axios({
        method: "POST",
        url: `${process.env.NODE_ENV === 'development' ? "http:///localhost:3331" : ""}/round/start/randomquestion`,
        validateStatus: () => {
            return true
        }
    })
}