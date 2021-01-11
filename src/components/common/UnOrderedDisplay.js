import { React } from 'react';

// Bootstrap imports
import { Form, Button } from 'react-bootstrap'

//Components
import Pagination from './../Pagination';

const UnOrderedDisplay = ( props ) => {
    const { title, buttonText, data, onClick, imdbID = undefined, pagination = undefined} = props;

    //renders out the li based off the data we get back
    const expandListItem = () => {
    let li = data.length ? 
        data.map((obj,ind) => { 
            //We will disabled the Nominate button if we have 5 Nominations or if we have the movie nominated already
            let isDisabled = (imdbID && ( imdbID.size >= 5 || imdbID.has(obj.imdbID)) ) ? 'disabled' : '';
            //returns the li item
            return (
                <li className='text-left' key={`li-${buttonText}-${ind}`}>
                    <span>
                    {obj.Title}  ({obj.Year})   
                    <Button 
                        variant="outline-secondary" 
                        type='button' 
                        onClick={() => onClick(obj)} 
                        className={isDisabled}>

                        { buttonText }
                    </Button>
                    </span>
                </li> );
        }) : null;
    return li;

    };

    return (
        <Form className='cards'>
            <h5 className='text-left' id={buttonText.toLowerCase()} key={`header-${buttonText.toLowerCase()}`}>
                { title }
            </h5>
            <ul>
                {expandListItem()}
            </ul> 
            {   (pagination && pagination[1] > 10) &&
                <Pagination pagination={pagination}/>
            }
        </Form>
    );

};

export default UnOrderedDisplay;