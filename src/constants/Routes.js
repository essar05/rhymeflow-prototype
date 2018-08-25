import React from 'react'
import Game from '../containers/Game'

export const getRoutes = () => {
    return [
        {
            path: '/',
            component: Game
        }
    ];
};