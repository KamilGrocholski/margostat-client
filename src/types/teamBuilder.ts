import { ICharacter } from "../pages/TeamBuilder/TeamBuilderTypes"

export interface IGetClan {
    status: 'Success' | 'Error'
    msg: string
    clanCharacters?: ICharacter[]
}