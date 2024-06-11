import React, {ReactNode, useEffect, useState} from 'react';
import {useLocation, useRoutes} from "react-router";

interface IProps {
    isActive: boolean;
    path: string;
    children: ReactNode;
}
export const Side = ({children, path, isActive}: IProps) => {
    const location = useLocation();
    const [isVisible, setVisibility] = useState((location.pathname === path) && isActive);

    useEffect(() => {
        setVisibility(location.pathname === path && isActive)
    }, [isActive, location]);

    return <div>
        {isVisible && children}
    </div>
}