import { MARGONEM_CONSTS } from "./Margonem";

export const LINKS = {
    PAGES_DROPDOWN: [
        {
            to: '/statystyki',
            name: 'Statystyki',
            sections: [
                {
                    title: 'Światy',
                    items: MARGONEM_CONSTS.WORLDS.map((w, i) => (
                        { to: w, name: w}
                    ))
                }
            ]
        },
    ]
} as const