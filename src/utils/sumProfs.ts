import { MARGONEM_CONSTS } from "../constants/Margonem"
import { IWorldStatistics } from "../types/statistics"

export interface ISumProfs {
    profsByLvl: IWorldStatistics['profsByLvl']
    prof: keyof typeof MARGONEM_CONSTS.PROFESSIONS | null
}

const sumProfs= ({ prof, profsByLvl }: ISumProfs) => {
    let labels: number[] = []
    let datasets_data: number[] = []
    labels = profsByLvl.map((element, i) => (
        element.lvl
    ))

    if (!prof) {
        datasets_data = profsByLvl.map((element, i) => {
            const values = Object.values(element.profs)
            const sum = values.reduce((acc, val) => (
                acc + val
            ))
            return sum
        })
    } else {
        datasets_data = profsByLvl.map((element, i) => {
            const sum = element.profs[prof]
            return sum
        })
    }

    return { labels, datasets_data }
}

export default sumProfs