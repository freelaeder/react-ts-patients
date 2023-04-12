import React from 'react';
import Button from 'react-vant/es/button';
import {hooks} from "react-vant";

function App() {
    const {width, height} = hooks.useWindowSize();

    console.log(width); // 窗口宽度
    console.log(height); // 窗口高度
    return (
        <>
            <Button  type='primary'>Primary</Button>a
            <h1 className={'active'} style={{color:'--cp-primary'}}>freelaeder</h1>
        </>
    );
}

export default App;
