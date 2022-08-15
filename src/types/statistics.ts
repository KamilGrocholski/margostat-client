export interface IProfsByLvl {
    lvl: number
    profs: {
        'Wojownik': number
        'Mag': number
        'Paladyn': number
        'Łowca': number
        'Tropiciel': number
        'Tancerz ostrzy': number
    }
}
export interface IWorldStatistics {
    name: string
    nCharacters: number
    profsByLvl: IProfsByLvl[]
    maxLvl: number
    nW: number
    nM: number
    nP: number
    nH: number
    nT: number
    nBd: number
    creationTime: string,
    creationTimesArray: string[]
}

export type TFetchedWorldStatistics = IWorldStatistics[] 