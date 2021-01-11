import { React } from 'react';

//Components
import UnOrderedDisplay from './common/UnOrderedDisplay' 

const DisplayOfResults = ({ data, searchTerm, onClick, pagination }) => {

    const props = { title: `Results for "${searchTerm ? searchTerm : ''}"`, buttonText: "Nominate" };

    return (
        <UnOrderedDisplay 
            title={ props.title } 
            buttonText={ props.buttonText } 
            data={data.searchResults} 
            onClick={onClick}
            imdbID={data.setId}
            pagination={pagination}
        />
    );

};

export default DisplayOfResults;