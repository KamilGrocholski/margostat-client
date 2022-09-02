import { IGroup, TGroupsList } from "../TeamBuilderTypes";

export interface IGroupsListState {
    groupsList?: TGroupsList
}

export type TActionGroupsList = 
    | { type: 'ADD_TO_GROUPS_LIST', payload: IGroup } 
    | { type: 'REMOVE_GROUP_FROM_GROUPS_LIST', payload: { name: string } }
    | { type: 'GET_THE_LAST_SESSION', payload: TGroupsList }
    | { type: 'EDIT_GROUP_FROM_GROUPS_LIST', payload: { newGroup: IGroup, originName: IGroup['name'] } }

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
        case 'EDIT_GROUP_FROM_GROUPS_LIST':            
            if (!state.groupsList) return {
                ...state,
                groupsList: [
                    action.payload.newGroup
                ]
            }
            const foundGroupIndex = state.groupsList?.findIndex(group => group.name === action.payload.originName)
            if (foundGroupIndex < 0) {
                return {
                    ...state,
                    groupsList: [
                        action.payload.newGroup,
                        ...state.groupsList
                    ]
                }
            }
            return {
                ...state,
                groupsList: state.groupsList?.map(group => {
                    if (group.name === action.payload.originName) return action.payload.newGroup
                    return group
                })
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