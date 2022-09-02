import { ICharacter, IGroup } from "../TeamBuilderTypes"

export type TActionEditGroup = 
    | { type: 'COPY_FROM_GROUPS_LIST', payload: IGroup }
    | { type: 'ADD_TO_EDIT_GROUP', payload: { n: number, character: ICharacter } }
    | { type: 'REMOVE_ONE_FROM_EDIT_GROUP', payload: { n: number } }
    | { type: 'GET_THE_LAST_SESSION', payload: IGroup }
    | { type: 'EXCHANGE_INSIDE_EDIT_GROUP', payload: { from: number, to: number } }
    | { type: 'CHANGE_NAME_OF_EDIT_GROUP', payload: { name: string } }
    | { type: 'RESET_EDIT_GROUP' }

export interface IEditGroupState {
    originGroup: IGroup | null
    editGroup: IGroup | null 
}

export const editGroupInitialState: IEditGroupState = {
    originGroup: null,
    editGroup: null
}

export const reducerEditGroup = (state: IEditGroupState, action: TActionEditGroup): IEditGroupState => {
    switch (action.type) {
        case 'COPY_FROM_GROUPS_LIST': 
            return {
                originGroup: action.payload,
                editGroup: action.payload
            }
        case 'ADD_TO_EDIT_GROUP': 
            if (!state.editGroup) return state
            if (state.editGroup.slots.length > 10 || action.payload.n > 10 || action.payload.n < 1) return {...state}
            if (state.editGroup.slots.some(slot => slot.character?.name === action.payload.character.name)) {
                return state
            }
            return {
                ...state,
                editGroup: { 
                    ...state.editGroup, 
                    slots: state.editGroup.slots.map((slot, i) => {
                    if (i === action.payload.n - 1) {
                        return {
                            n: i,
                            character: action.payload.character
                        }
                    }
                    return slot
                    })
                }
            }
        case 'REMOVE_ONE_FROM_EDIT_GROUP': 
            if (!state.editGroup) return state
            return {
                ...state,
                editGroup: {
                    ...state.editGroup,
                    slots: state.editGroup.slots.map((slot, i) => {
                        if (i === action.payload.n - 1) {
                            return {
                                n: i,
                                character: null
                            }
                        }
                        return slot
                    })
                }
            }
        case 'CHANGE_NAME_OF_EDIT_GROUP': 
            if (!state.editGroup) return state
            return {
                ...state,
                editGroup: {
                    ...state.editGroup,
                    name: action.payload.name
                }
            }
        case 'EXCHANGE_INSIDE_EDIT_GROUP':
            if (!state.editGroup) return state 
            const from = state.editGroup.slots[action.payload.from - 1]?.character
            const to = state.editGroup.slots[action.payload.to - 1]?.character
            const newSlots = state.editGroup.slots.map((slot, i) => {
                if (i === action.payload.from - 1) return { n: i, character: to }
                if (i === action.payload.to - 1) return { n: i, character: from }
                return slot
            })
            return {
                ...state,
                editGroup: {
                    ...state.editGroup,
                    slots: newSlots
                }
            }
        case 'RESET_EDIT_GROUP': 
            if (!state.editGroup) return state
            return {
                ...state,
                editGroup: {
                    name: state.editGroup.name,
                    slots: state.editGroup.slots.map((slot, i) => (
                        {
                            n: i,
                            character: null
                        }
                    ))
                }
            }
        default: 
            throw new Error()
    }
}