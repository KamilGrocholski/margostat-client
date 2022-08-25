import { MARGONEM_CONSTS } from "../../../constants/Margonem"

export interface IState {
    minLvl: number
    maxLvl: number
    name: string | null
    profs: {
        'Wojownik': boolean
        'Mag': boolean
        'Paladyn': boolean
        'Łowca': boolean
        'Tropiciel': boolean
        'Tancerz ostrzy': boolean
    }
}

export type TAction = 
    | { type: 'changeMin', payload: number }
    | { type: 'changeMax', payload: number }
    | { type: 'changeLvl', payload: number }
    | { type: 'changeName', payload: string }
    | { type: 'selectProf', payload: keyof typeof MARGONEM_CONSTS.PROFESSIONS }
    | { type: 'selectAllProfs' }

export const filterInitialState = {
    minLvl: 1,
    maxLvl: 500,
    name: null,
    profs: {
        'Wojownik': true,
        'Mag': true,
        'Paladyn': true,
        'Łowca': true,
        'Tropiciel': true,
        'Tancerz ostrzy': true,
    }
}

export const filterReducer = (state: IState, action: TAction): IState => {
    switch (action.type) {
        case 'changeMin': 
            return {
                ...state,
                minLvl: action.payload
            }
        case 'changeMax': 
            return {
                ...state,
                maxLvl: action.payload
            }
        case 'changeName':
            return {
                ...state,
                name: action.payload
            }
        case 'selectProf':
            return {
                ...state,
                profs: {
                    ...state.profs,
                    [action.payload]: !state.profs[action.payload]
                }
            }
        case 'selectAllProfs': 
            return {
                ...state,
                profs: {
                    'Wojownik': true,
                    'Mag': true,
                    'Paladyn': true,
                    'Łowca': true,
                    'Tropiciel': true,
                    'Tancerz ostrzy': true,
                }
            }
        default: 
            throw new Error()
    }
}
