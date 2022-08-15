import axios from './axios'

import { IWorldStatistics, TFetchedWorldStatistics } from '../types/statistics'
import { IOneWorldFiltered } from '../types/statisticsFilteredProfsByLvl'

export const getGlobalStatistics = async () => {
    const response = axios
        .get<IWorldStatistics>('/statistics/getGlobalHistory')
        .then(res => {
            // console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
    return response
}

export const getTheMostRecentData = async () => {
    const response = axios
        .get<TFetchedWorldStatistics>('/statistics/getTheMostRecentData')
        .then(res => {
            // console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
    return response
}

export const getOneWorldByDate = async ({ world, date } : { world: string, date: string }) => {
    const response = axios
        .get<IWorldStatistics>(`/statistics/worlds/${world}?date=${date}`)
        .then(res => {
            // console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
    return response
}

export const getOneWorldFilteredProfsByLvl = async ({ world, min, max, date } : { date: string, world: string, min: number, max: number }) => {
    const response = axios
        .get<IOneWorldFiltered>(`/statistics/worlds/profs/${world}?min=${min}&max=${max}&date=${date}`)
        .then(res => {
            // console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
    return response
}