import Game from '../containers/Game'
import DoLogout from '../containers/DoLogout'

export const getRoutes = () => {
    return [
        {
            path: '/',
            component: Game
        },
        {
            path: '/logout',
            component: DoLogout
        }
    ];
};