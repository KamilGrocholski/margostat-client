import { ICharacter, IGroup } from "../TeamBuilderTypes"

export type TActionSelectedGroup = 
    | { type: 'ADD_TO_SELECTED_GROUP', payload: { n: number, character: ICharacter } }
    | { type: 'REMOVE_ONE_FROM_SELECTED_GROUP', payload: { n: number } }   
    | { type: 'CHANGE_NAME_OF_SELECTED_GROUP', payload: { name: string } }
    | { type: 'EDIT_GROUP_FROM_GROUPS_LIST', payload: IGroup }
    | { type: 'RESET_SELECTED_GROUP' }
    | { type: 'GET_THE_LAST_SESSION', payload: IGroup }
    | { type: 'EXCHANGE_INSIDE_SELECTED_GROUP', payload: { from: number, to: number } }

export const selectedGroupInitialState = {
    name: 'Nazwa grupy',
    slots: [
        {
            n: 1,
            character: null
        },
        {
            n: 2,
            character: null
        },
        {
            n: 3,
            character: null
        },
        {
            n: 4,
            character: null
        },
        {
            n: 5,
            character: null
        },
        {
            n: 6,
            character: null
        },
        {
            n: 7,
            character: null
        },
        {
            n: 8,
            character: null
        },
        {
            n: 9,
            character: null
        },
        {
            n: 10,
            character: null
        },
    ]
}

export const reducerSelectedGroup = (state: IGroup, action: TActionSelectedGroup): IGroup => {
    switch (action.type) {
        case 'ADD_TO_SELECTED_GROUP':
            if (state.slots.length > 10 || action.payload.n > 10 || action.payload.n < 1) return {...state}
            if (state.slots.some(slot => slot.character?.name === action.payload.character.name)) {
                console.log('Postać o takiej nazwie jest już w tej grupie.')
                return {...state}
            }
            console.log(state)
            console.log(action.payload)
            return {
                ...state,
                slots: state.slots.map((slot, i) => {
                    if (i === action.payload.n - 1) {
                        return {
                            n: i,
                            character: action.payload.character
                        }
                    }
                    return slot
                })
            }
        case 'REMOVE_ONE_FROM_SELECTED_GROUP':
            return {
                ...state,
                slots: state.slots.map((slot, i) => {
                    if (i === action.payload.n - 1) {
                        return {
                            n: i,
                            character: null
                        }
                    }
                    return slot
                })
            }
        case 'CHANGE_NAME_OF_SELECTED_GROUP':
            return {
                ...state,
                name: action.payload.name
            }
        case 'EDIT_GROUP_FROM_GROUPS_LIST': 
            return {
                ...state,
                name: action.payload.name,
                slots: action.payload.slots
            }
        case 'RESET_SELECTED_GROUP':
            return {
                ...state,
                slots: state.slots.map((slot, i) => {
                    return {
                        n: i,
                        character: null
                    }
                })
            }
        case 'GET_THE_LAST_SESSION':
            return {
                name: action.payload.name,
                slots: action.payload.slots
            }
        case 'EXCHANGE_INSIDE_SELECTED_GROUP': 
            const from = state.slots[action.payload.from - 1]?.character
            const to = state.slots[action.payload.to - 1]?.character
            const newSlots = state.slots.map((slot, i) => {
                if (i === action.payload.from - 1) return { n: i, character: to }
                if (i === action.payload.to - 1) return { n: i, character: from }
                return slot
            })
            return {
                ...state,
                slots: newSlots
            }
        default: 
            throw new Error()
    }
}