import { TCharactersList } from '../TeamBuilderTypes'

export type TActionCharactersList = 
    | { type: 'ADD_CLAN_CHARACTERS', payload: TCharactersList }
    | { type: 'ADD_OWN_CHARACTERS', payload: TCharactersList }
    | { type: 'REMOVE_ONE_CHAR', payload: string }
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
                        ...newChars,
                        ...state.charactersList
                    ]
                }
            } else {
                return {
                    ...state
                }
            }
        case 'ADD_OWN_CHARACTERS': //to samo, co ADD_CLAN_CHARACTERS, ale tak zrbione, żeby w przyszłości zmieniać
            const newOwnChars = action.payload.map(char => {
                return char
            })
            if (state.charactersList) {
                return {
                    ...state,
                    charactersList: [
                        ...newOwnChars,
                        ...state.charactersList
                    ]
                }
            } else {
                return {
                    ...state
                }
            }
        case 'REMOVE_ONE_CHAR': 
            const updatedChars = state.charactersList?.filter(char => (
                char.name !== action.payload
            ))
            return {
                ...state,
                charactersList: updatedChars
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