# Not another Shoppies

Project is deployed [here](https://koe-nocturne.github.io/not-another-shoppies/).


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

This project is built in React 17 so enzyme is not compatiable. I created one snapshot test and I did write two other tests that are commented out. I found out the incompatibility after building the project. 

## Coding sample
```
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
            <div> {createBar()} </div>
        </Fragment>
    );

};

export default Pagination;
```
The reason why I have selected this code is because I don't usually work with pagination in the frontend and always wanted to tinker with it. This was a fun experiment.


## Features built in

### `Pagination`

This page supports pagination of the results. If the results are greater then 10.

### `Auto Search`

After you start typing and stop for 1.5 seconds the API will fire.

### `Saved Results`

Results are saved when you leave or refresh the page.


## Improvements to be made / Wishlist

### `Tests`

I would add more tests to get more coverage on the app.

### `Redux`

To avoid prop drilling and for fun I thought about adding Redux.

### `Fix Styling`

Some of the styling is not consistant and would like to update the scss.
