import React from 'react';

import ThreeScene from './middleground/ThreeScene';
import Floor from './middleground/Floor';
import Curtains from './foreground/Curtains';

const App = () => (
    <main id="App">
        <div id="foreground">
            <Curtains/>
        </div>

        <div id="middleground">
            <ThreeScene/>
            <Floor/>
        </div>
    </main>
);

export default App;