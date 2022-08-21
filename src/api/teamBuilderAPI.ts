import { IGetClan } from '../types/teamBuilder'
import axios from './axios'

export const getClan = async (link: string) => {
    const linkEncoded = encodeURIComponent(link)
    const response = axios
        .get<IGetClan>(`/team-builder/clan/${linkEncoded}`)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
    return response
}