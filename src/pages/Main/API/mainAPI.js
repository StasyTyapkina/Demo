import axios from "axios"

export const mainAPI = {
	getRandomActivity() {
		return axios.get(`https://www.boredapi.com/api/activity/`)
	},
}
