import { React } from 'react';

// Bootstrap imports
import { Form, Button } from 'react-bootstrap'

//Component import
import Pagination from './../Pagination';

const UnOrderedDisplay = ( props ) => {
    const { title, buttonText, data, onClick, outerClassName = '', imdbID = undefined, pagination = undefined} = props;

    //renders out the li based off the data we get back
    const expandListItem = () => {
    let li = data.length ? 
        data.map((obj,ind) => { 
            //We will disabled the Nominate button if we have 5 Nominations or if we have the movie nominated already
            let isDisabled = (imdbID && ( imdbID.size >= 5 || imdbID.has(obj.imdbID)) ) ? 'disabled' : '';
            //returns the li item
            return (
                <li className='text-left' key={`li-${buttonText}-${ind}`}>
                    <div className='li-cards'>
                        <span className='li-title'>
                        {obj.Title}   
                        </span>
                        <span className='li-year'>
                        ({obj.Year}) 
                        </span>
                        <Button 
                            variant={ isDisabled === 'disabled' ? 'outline-secondary' : 'success' }
                            type='button' 
                            onClick={() => onClick(obj)} 
                            className={`${isDisabled}`}>

                        {    buttonText }
                        </Button>
                    </div>

                </li> );
        }) : null;
    return li;

    };

    return (
        <Form className={`unordered-list ${outerClassName}`}>
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