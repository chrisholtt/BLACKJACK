export const levels = [
    {
        level: 1,
        exp: 0,
    },
    {
        level: 2,
        exp: 100,
    },
    {
        level: 3,
        exp: 200,
    },
    {
        level: 4,
        exp: 300,
    },
    {
        level: 5,
        exp: 400,
    },
    {
        level: 6,
        exp: 500,
    },
    {
        level: 7,
        exp: 600,
    },
    {
        level: 8,
        exp: 700,
    },
    {
        level: 9,
        exp: 800,
    },
    {
        level: 10,
        exp: 900,
    },
]

export const getLevel = (usersExp) => {
    let lvl;
    for (let i = 0; i < levels.length; i++) {
        if (usersExp >= levels[i].exp) {
            lvl = levels[i].level
        }
    }
    return lvl
}

export const getLevelPercentage = (usersLvl, usersExp) => {
    const expForCurrentLvl = levels[usersLvl - 1].exp
    const expForNextLevel = levels[usersLvl].exp
    const expInLevelRange = usersExp - expForCurrentLvl
    const percentage = (expInLevelRange / (expForNextLevel - expForCurrentLvl)) * 100
    return percentage
}