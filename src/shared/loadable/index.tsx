// src/shared/loadable/index.tsx
import React from "react";
import {Loading} from "react-vant";

const style: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
};
const Loadable = (
    Component: React.LazyExoticComponent<
        (props: any) => React.ReactElement | null
    >
) => {
    /* eslint-disable react/display-name */
    return function (props: any) {
        return (
            <React.Suspense fallback={<Loading style={style} type="ball"/>}>
                <Component {...props} />
            </React.Suspense>
        );
    };
}

Loadable.displayName = 'MyComponent';

export default Loadable