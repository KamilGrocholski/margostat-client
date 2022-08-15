import axios from './axios'
import { IGlobalRanks, ISelectedWorldRanks } from '../types/ranks'

export const getGlobalRanks = async ({ date }: { date: string }) => {
    const response = axios
        .get<IGlobalRanks>(`/ranks/worlds/global?date=${date}`)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
    return response
}

export const getWorldRanks = async ({ world, date }: { world: string, date: string }) => {
    const response = axios
        .get<ISelectedWorldRanks>(`/ranks/worlds/${ world }?date=${ date }`)
        .then(res => {
            // console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
    return response
}

export const getDatesArray = async () => {
    const response = axios
        .get<{ datesArray: string[] }>('/ranks/datesArray')
        .then(res => {
            // console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
    return response
}