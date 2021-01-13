import { React, Fragment } from 'react';

// Bootstrap imports
import { ProgressBar, Row, Col } from 'react-bootstrap'


const NominationBar = ({ size }) => {

    return (
        <Row className='nomination-row'>
            <Col>
                {   size >= 5 &&
                        <Fragment>
                            <p>You have nominated 5 Movies!</p>
                        </Fragment>
                } 
                {   size < 5 &&
                        <Fragment>
                            <p>You have nominated {size} out of 5 movies</p>
                        </Fragment>
                }
            </Col>
            <Col className='progress-bar-col'>
                <ProgressBar now={size * 20} label={`${size} out of 5`} variant={size === 5 ? 'sucess' : 'info'} srOnly/>
            </Col>
        </Row>
    );

};

export default NominationBar;