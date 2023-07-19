import { store } from '../../app/store'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')

        
    }, [])

    return <Outlet />
}
export default Prefetch
