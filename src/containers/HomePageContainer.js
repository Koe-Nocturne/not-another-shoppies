import { React, useState, useEffect, useRef } from 'react';

//Components imported
import SearchBar from '../components/SearchBar';
import DisplayOfResults from '../components/DisplayOfResults';
import NominatedResults from '../components/NominatedResults';
import ThankYouBar from '../components/ThankYouBar'

// Bootstrap imports
import { Container, Row, Col } from 'react-bootstrap';

//API calls
import { searchRequest } from './../services/searchRequest';

// import mockData from '../assets/mock/mockDataArray.json';

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

    //
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
        <div className="my-5">
            <Container>
                <Row>
                    <Col>
                        <header className='text-left'>
                            <h1>The Shoppies</h1>
                        </header>
                    </Col>
                </Row>
            </Container>
            {/* Thank you bar */}
            { localStorage.setId.size === 5 &&
                <Container>
                    <Row>
                        <Col ref={thankYouBar}>
                            <ThankYouBar />
                        </Col>
                    </Row>
                </Container>
            }

            {/* Search Bar */}
            <Container>
                <SearchBar searchTerm={ localStorage.searchTerm } handleChange={updateSearchTerm}/>
            </Container>
            {/* Lower row with two panels */}
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <DisplayOfResults 
                            data={ localStorage } 
                            searchTerm={ localStorage.searchTerm } 
                            onClick={addNomMovies}
                            pagination={[localStorage.pageNumber,localStorage.totalResults, changePage]} 
                            />
                    </Col>
                    <Col xs={12} md={6}>
                        <NominatedResults data={ localStorage.nominatedMovies } onClick={removeNomMovies}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );

};

export default HomePageContainer;