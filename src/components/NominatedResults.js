import { React } from 'react';

//Components
import UnOrderedDisplay from './common/UnOrderedDisplay'

const DisplayOfResults = ({ data, onClick }) => {
    const props = { title: ' Your Nominationed Movies', buttonText: "Remove" }

    return (
        <UnOrderedDisplay 
            title={ props.title } 
            buttonText={ props.buttonText } 
            data={data} onClick={onClick}
            outerClassName='nomination-list'
        />
    );

};

export default DisplayOfResults;