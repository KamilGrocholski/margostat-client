export interface IRanksGlobal {
    name: string
    maxLvl: number
    nCharacters: {
        n: number 
        gainFromLast: number
        gainAvg: number
    }
    nProfs: {
        n: number
        prof: string
        gainFromLast: number
        gainAvg: number
    }[]
}


export interface IEveryRanks {
    global: IRanksGlobal
    worlds: IRanksGlobal[]
}

export interface ISelectedWorldRanks extends IEveryRanks {
    creationTime: string
    selectedWorld: IRanksGlobal
    nCharactersRank_n: number
    nCharactersRank_gainLast: number
    nCharactersRank_gainAvg: number
    maxLvlRank: number
}

export interface IGlobalRanks extends IEveryRanks {
    creationTime: string
}