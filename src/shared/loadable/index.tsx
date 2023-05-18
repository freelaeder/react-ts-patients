// src/shared/loadable/index.tsx
import React from "react";
import {Loading} from "react-vant";


const loadable = (
    Component: React.LazyExoticComponent<
        (props: any) => React.ReactElement | null
    >
) => {
    /* eslint-disable react/display-name */
    return function (props: any) {
        return (
            <React.Suspense fallback={<Loading type="ball"/>}>
                <Component {...props} />
            </React.Suspense>
        );
    };
}


export default loadable