import { MARGONEM_CONSTS } from "../constants/Margonem";

export interface IProf {
    name: keyof typeof MARGONEM_CONSTS.PROFESSIONS
    q: number
    p: number
}

export type TSortedProfs = IProf[]

export interface IOneWorldFiltered {
    world: string
    nCharacters: number
    maxLvl: number
    sortedProfs: TSortedProfs
    nCharactersInRange: number
}