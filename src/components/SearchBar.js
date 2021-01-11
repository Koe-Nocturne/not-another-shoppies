import { React } from 'react';

// Bootstrap imports
import { Form, Row, Col, InputGroup } from 'react-bootstrap'

//Font Awesome Import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = ({ searchTerm, handleChange }) => {

    return (
        <Form id='search-movies' className='cards'>
            <Form.Group controlId='movie-search'>
                <Row>
                    <Col className='text-left'>
                        <Form.Label>Movie title</Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup id='search-bar'>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon='search'/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type='text' value={searchTerm} onChange={handleChange}/>
                        </InputGroup>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    );

};

export default SearchBar;