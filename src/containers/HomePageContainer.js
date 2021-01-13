import { React, useState, useEffect, useRef } from 'react';

//Components imports
import SearchBar from '../components/SearchBar';
import DisplayOfResults from '../components/DisplayOfResults';
import NominatedResults from '../components/NominatedResults';
// import ThankYouBar from '../components/ThankYouBar'
import NominationBar from '../components/NominationBar';

// Bootstrap imports
import { Container, Row, Col } from 'react-bootstrap';

//API calls
import { searchRequest } from './../services/searchRequest';


const HomePageContainer = () => {

    //Checks if we have nominations saved and get the ids as well
    const savedNominations = window.localStorage.getItem('savedNoms') ?
        JSON.parse(window.localStorage.getItem('savedNoms')) : [];

    const savedId = window.localStorage.getItem('savedIds') ?
        JSON.parse(window.localStorage.getItem('savedIds')) :
        [];

    //To control the scrolling up to top when user selects 5 movies
    const thankYouBar = useRef(null);

    //intital local storage setup
    const [localStorage, setLocalStorage ] = useState( {
        searchResults: [],
        nominatedMovies: savedNominations,
        searchTerm: '',
        setId: new Set([...savedId]),
        isTyping: false,
        pageNumber: 1,
        totalResults: 0,
        isChangingPage: false
    });

    //wait period before API call is made
    const WAIT_PERIOD = 1500;


    /********** Handle Change Functions and Updating State ************/
    //add nominated movies to local storage and state
    const addNomMovies = (data) => {
        setLocalStorage(oldStorage => ({
            ...oldStorage,
            nominatedMovies : [
                ...oldStorage.nominatedMovies,
                {
                    Title: data.Title,
                    Year: data.Year,
                    imdbID: data.imdbID
                }
            ],
            setId: new Set([...oldStorage.setId.add(data.imdbID)])

        }))
    };

    //remove nominated movies from local storage and state
    const removeNomMovies = (data) => {
        setLocalStorage(oldStorage => ({
            ...oldStorage,
            nominatedMovies : [
                ...oldStorage.nominatedMovies.filter(nomMovie => nomMovie.imdbID !== data.imdbID)
            ],
            setId: new Set([...oldStorage.setId].filter(fid => fid !== data.imdbID))
        }));
    };

    //callback for setting isTyping to false
    const updateIsTyping = () => {
        setLocalStorage(oldStorage => ({
            ...oldStorage,
            isTyping: false
        }))
    }

    //handles how we are digesting pagination
    const changePage = (type) => {
        setLocalStorage(oldStorage => ({
            ...oldStorage,
            pageNumber: type === '+' ? oldStorage.pageNumber + 1 : oldStorage.pageNumber - 1,
            isChangingPage: true
        }))
    }

    //handles updating the search term
    const updateSearchTerm = (e) => {
        let term = e.target.value;

        setLocalStorage(oldStorage => ({
            ...oldStorage,
            searchTerm: term,
            isTyping: true,


        }));

    };

    /********** Use Effects ************/
    //Set local Storage
    useEffect(() => {
        if(localStorage.nominatedMovies.length) {
            window.localStorage.setItem('savedNoms', JSON.stringify(localStorage.nominatedMovies));
            window.localStorage.setItem('savedIds', JSON.stringify([...localStorage.setId]));
        }
    }, [localStorage.nominatedMovies, localStorage.setId]);



    //The delay timer in API request
    useEffect(() => {
        const delayAPIRequest = setTimeout(updateIsTyping, WAIT_PERIOD);
        return () => clearTimeout(delayAPIRequest);
    }, [localStorage.searchTerm]);


    //API request when we have text and isTyping is false
    useEffect(() => {
        if (localStorage.searchTerm && !localStorage.isTyping) {
            searchRequest(localStorage.searchTerm).then(response => {
                setLocalStorage(oldStorage => {
                    let totalResults = response.Search ? response.totalResults : 0;
                    return ({
                        ...oldStorage,
                        searchResults: response.Search ? response.Search : [],
                        totalResults,
                        pageNumber: 1,
                        isChangingPage: false
                    });
                });
            });
        }
    }, [localStorage.isTyping, localStorage.searchTerm]);

    //API pagination request when we are changing pages
    useEffect(() => {
        if (localStorage.searchTerm && localStorage.isChangingPage) {
            searchRequest(localStorage.searchTerm, localStorage.pageNumber).then(response => {
                setLocalStorage(oldStorage => {
                    let totalResults = response.Search ? response.totalResults : 0;
                    return ({
                        ...oldStorage,
                        searchResults: response.Search ? response.Search : [],
                        totalResults,
                        isChangingPage: false
                    });
                });
            });
        }
    }, [localStorage.isChangingPage]);  


    //Scroll effect when user has selected 5 movie nominations
    useEffect(() => {
        if (localStorage.setId.size >= 5) {
            thankYouBar.current.scrollIntoView();
        }
    }, [localStorage.setId]);
    

    return (
        <div>
            <Container fluid>
                <Row className='top-bar' ref={thankYouBar}>
                    <Col sm={2} className='header-logo'>
                        <header className='text-left'>
                            <h1>Shoppies</h1>
                        </header>
                    </Col>
                    <Col className='nomination-bar'>
                        <NominationBar size={localStorage.setId.size } />
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col sm={2} className='nomination-results'>
                        <NominatedResults data={ localStorage.nominatedMovies } onClick={removeNomMovies}/>
                    </Col>
                    <Col sm={10}>
                        <SearchBar searchTerm={ localStorage.searchTerm } handleChange={updateSearchTerm}/>
                        <DisplayOfResults 
                            data={ localStorage } 
                            searchTerm={ localStorage.searchTerm } 
                            onClick={addNomMovies}
                            pagination={[localStorage.pageNumber,localStorage.totalResults, changePage]} 
                            />
                    </Col>
                </Row>
            </Container>
        </div>
    );

};

export default HomePageContainer;