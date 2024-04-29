import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Team(props) {
    return (
        <Card aria-label={`Team details for the ${props.name}`} style={{ width: '100%', marginBottom: '20px', marginRight: '20px', height: '360px'}}>
            <div style={{ height: '150px', marginBottom: '15px' }}>
                <Card.Img variant="top" src={props.logo} className="img-fluid" alt={props.name} style={{ height: '100%', objectFit: 'scale-down' }} />
            </div>
            <Card.Body>
                <Card.Title style={{ fontSize: '1.2rem' }}>{props.name}</Card.Title>
                <Card.Text style={{ fontSize: '0.8rem' }}>{props.location}</Card.Text>
            </Card.Body>
        </Card>
    );
}
