import { React, Fragment } from 'react';

//Bootstrap
import Button from 'react-bootstrap/Button';

//Font Awesome Import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Pagination = ({ pagination }) => {

    const [pageCount, total, handleClick] = pagination;
    const totalPages = Math.ceil(total / 10);

    //general setup for pagination bar
    const paginationSetup = [
        { icon: 'angle-left', text: '-', onClick: handleClick, isShowing: pageCount === 1},
        { icon: '', text: `${pageCount}`  },
        { icon: '', text: '/' },
        { icon: '', text: `${totalPages}` },
        { icon: 'angle-right', text: '+', onClick: handleClick, isShowing: pageCount === totalPages }
    ];


    //This will map through the pagination array and give us the pagination bar
    const createBar = () => {
        return paginationSetup.map((obj,ind) => {
            return obj.icon ?
                (<Button size='sm' 
                    variant="outline-secondary" 
                    className={ obj.isShowing ? 'hidden' : ''} 
                    onClick={() => obj.onClick(obj.text)}
                    type='button'
                    key={`pagination-button${obj.icon}`}>
                    <FontAwesomeIcon icon={obj.icon}/>
                </Button>) :
                (<span className='paginationNumbers' key={`pagination-span-${obj.text}-${ind}`}>{obj.text}</span>);
        });
    };

    return (
        <Fragment>
            {createBar()}
        </Fragment>
    );

};

export default Pagination;