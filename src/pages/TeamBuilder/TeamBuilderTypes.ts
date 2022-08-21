export interface ICharacter {
    name: string
    prof: string
    lvl: number
}

export type TCharactersList = ICharacter[]

export interface IGroupCharacter extends ICharacter {

}

export interface IGroup {
    name: string
    slots: {
        n: number,
        character: ICharacter | null
    }[]
}

export type TGroupsList = IGroup[]