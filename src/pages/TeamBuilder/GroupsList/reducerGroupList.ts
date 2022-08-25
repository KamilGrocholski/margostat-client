import { IGroup, TGroupsList } from "../TeamBuilderTypes";

export interface IGroupsListState {
    groupsList?: TGroupsList
}

export type TActionGroupsList = 
    | { type: 'ADD_TO_GROUPS_LIST', payload: IGroup } 
    | { type: 'REMOVE_GROUP_FROM_GROUPS_LIST', payload: { name: string } }
    | { type: 'GET_THE_LAST_SESSION', payload: TGroupsList }

export const groupsListInitialState = {
    groupsList: undefined
}

export const reducerGroupList = (state: IGroupsListState, action: TActionGroupsList): IGroupsListState => {
    switch (action.type) {
        case 'ADD_TO_GROUPS_LIST':
            if (!state.groupsList) return {
                ...state,
                groupsList: [
                    action.payload
                ]
            }
            if (state.groupsList.some(grp => grp.name === action.payload.name)) {
                return {...state}
            }
            return {
                ...state,
                groupsList: [
                    action.payload,
                    ...state.groupsList
                ]
            }
        case 'REMOVE_GROUP_FROM_GROUPS_LIST':
            if (state.groupsList?.some(group => group.name === action.payload.name)) {
                return {
                    ...state,
                    groupsList: state.groupsList.filter(group => group.name !== action.payload.name)
                }
            }
            return {
                ...state
            }
        case 'GET_THE_LAST_SESSION':
            return {
                ...state,
                groupsList: action.payload
            }
        default: 
            throw new Error()
    }
}