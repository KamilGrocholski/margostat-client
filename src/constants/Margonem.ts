import {
    wIcon,
    mIcon,
    tIcon,
    hIcon,
    bdIcon,
    pIcon
} from "../components/MargonemProfsIcons"

export const MARGONEM_CONSTS = {
    PROFESSIONS: {
        'Wojownik': {
            name: 'Wojownik',
            short: 'nW',
            color: 'rgb(198, 155, 109)',
            // color: '#87581D', //gw2
            gradient: 'linear-gradient(to bottom, rgba(198, 155, 109, 0.5), rgba(198, 155, 109, 0.8))',
            icon: wIcon()
        },
        'Mag': {
            name: 'Mag',
            short: 'nM',
            color: 'rgb(63, 199, 235)',
            // color: '#DC423E', //gw2
            gradient: 'linear-gradient(to bottom, rgba(63, 199, 235, 0.5), rgba(63, 199, 235, 0.8))',
            icon: mIcon()
        },
        'Paladyn': {
            name: 'Paladyn',
            short: 'nP',
            color: 'rgb(244, 140, 186)',
            // color: '#186885', //gw2
            gradient: 'linear-gradient(to bottom, rgba(244, 140, 186, 0.5), rgba(244, 140, 186, 0.8))',
            icon: pIcon()
        },
        'Łowca': {
            name: 'Łowca',
            short: 'nH',
            color: 'rgb(170, 211, 114)',
            // color: '#67A833', //gw2
            gradient: 'linear-gradient(to bottom, rgba(170, 211, 114, 0.5), rgba(170, 211, 114, 0.8))',
            icon: hIcon()
        },
        'Tropiciel': {
            name: 'Tropiciel',
            short: 'nT',
            color: 'rgb(255, 124, 10)',
            // color: '#69278A', //gw2
            gradient: 'linear-gradient(to bottom, rgba(255, 124, 10, 0.5), rgba(255, 124, 10, 0.8))',
            icon: tIcon()
        },
        'Tancerz ostrzy': {
            name: 'Tancerz ostrzy',
            short: 'nBd',
            color: 'rgb(255, 244, 104)',
            // color: '#974550',//gw2
            gradient: 'linear-gradient(to bottom, rgba(255, 244, 104, 0.5), rgba(255, 244, 104, 0.8))',
            icon: bdIcon()
        }
    } as const,

    WORLDS: [
        'Aether',
        'Aldous',
        'Berufs',
        'Brutal',
        'Classic',
        'Fobos',
        'Gefion',
        'Hutena',
        'Jaruna',
        'Katahha',
        'Lelwani',
        'Majuna',
        'Nomada',
        'Perkun',
        'Tarhuna',
        'Telawel',
        'Tempest',
        'Zemyna',
        'Zorza',
    ] as const,
}