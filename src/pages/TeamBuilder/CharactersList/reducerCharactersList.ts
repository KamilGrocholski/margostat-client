import { TCharactersList } from '../TeamBuilderTypes'

export type TActionCharactersList = 
    | { type: 'ADD_CLAN_CHARACTERS', payload: TCharactersList }
    | { type: 'GET_THE_LAST_SESSION', payload: TCharactersList }

export interface ICLstate {
    charactersList?: TCharactersList
}

export const characterListInitialState = {
    charactersList: []
}

export const reducerCharacterList = (state: ICLstate, action: TActionCharactersList): ICLstate => {
    switch (action.type) {
        case 'ADD_CLAN_CHARACTERS': 
            const newChars = action.payload.map(char => {
                return char
            })
            if (state.charactersList) {
                return {
                    ...state,
                    charactersList: [
                        ...state.charactersList,
                        ...newChars
                    ]
                }
            } else {
                return {
                    ...state
                }
            }
        case 'GET_THE_LAST_SESSION':
            return {
                ...state,
                charactersList: action.payload
            }
        default: 
            throw new Error()
    }
}