import React from 'react'

export const getRoutes = () => {
    return [
        {
            path: '/',
            exact: true,
            component: () => (<div>Hello World</div>)
        },
        {
            path: '/muiepsd',
            component: () => (<div>Muie PSD</div>)
        }
    ];
};