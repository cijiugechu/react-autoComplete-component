import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './AutoComplete';
import './index.css'

ReactDOM.render(
    <AutoComplete 
        suggestions={
            [
                'ss',
                'sa',
                'sd',
                'hello',
                'keya',
                'gog',
                'tokyo'
            ]
        }
        requestServer={
            'http://localhost:3001/cities'
        }
    />,
    document.getElementById('root')
)