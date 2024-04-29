import React, { useEffect, useState } from 'react';
import { Row, Container, Col, Dropdown } from 'react-bootstrap';
import Team from './Team';

// Functional component named BrewersApp
export default function BrewersApp() {
    // State variables using useState hook
    const [teams, setTeams] = useState([]); // Holds all teams data
    const [filteredTeams, setFilteredTeams] = useState([]); // Holds filtered teams data
    const [selectedLeague, setSelectedLeague] = useState(''); // Holds selected league
    const [selectedDivision, setSelectedDivision] = useState(''); // Holds selected division

    // useEffect hook to fetch teams data when component mounts
    useEffect(() => {
        fetch('http://localhost:3000/api/teams')
            .then(res => res.json())
            .then(json => {
                setTeams(json);
            });
    }, []);

    // useEffect hook to update filtered teams based on selected league and division
    useEffect(() => {
        let updatedFilteredTeams = {};

        // If both league and division are selected
        if (selectedLeague && selectedDivision && teams[selectedLeague] && teams[selectedLeague][selectedDivision]) {
            updatedFilteredTeams[selectedLeague] = {};
            updatedFilteredTeams[selectedLeague][selectedDivision] =
                teams[selectedLeague][selectedDivision];
        }
        // If only league is selected
        else if (selectedLeague && teams[selectedLeague]) {
            updatedFilteredTeams[selectedLeague] = teams[selectedLeague];
        }
        // If neither league nor division are selected, show all teams
        else {
            updatedFilteredTeams = JSON.parse(JSON.stringify(teams));
        }

        // Set the filtered teams state
        setFilteredTeams(updatedFilteredTeams);
    }, [teams, selectedLeague, selectedDivision]);

    // useEffect hook to reset selected division when selected league changes
    useEffect(() => {
        setSelectedDivision('');
    }, [selectedLeague]);

    // JSX rendering the UI components
    return (
        <Container fluid>
            <Row>
                {/* Dropdown for selecting league */}
                <Col sm={12} md={6}>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="leagueDropdown">
                            Select League
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedLeague('')}>
                                All Leagues
                            </Dropdown.Item>
                            {Object.keys(teams).map(league => (
                                <Dropdown.Item
                                    key={league}
                                    onClick={() => setSelectedLeague(league)}
                                >
                                    {league}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                {/* Dropdown for selecting division */}
                <Col sm={12} md={6}>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="divisionDropdown" disabled={!selectedLeague}>
                            Select Division
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedDivision('')}>
                                All Divisions
                            </Dropdown.Item>
                            {/* Display division options based on selected league */}
                            {selectedLeague && teams[selectedLeague] && Object.keys(teams[selectedLeague]).map(division => (
                                <Dropdown.Item
                                    key={division}
                                    onClick={() => setSelectedDivision(division)}
                                >
                                    {division}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            {/* Display filtered teams */}
            {Object.keys(filteredTeams).map(league => (
                <div key={league}>
                    <h2>{league}</h2>
                    {/* Display teams by division */}
                    {Object.keys(filteredTeams[league]).map(division => (
                        <div key={division}>
                            <h3>{division}</h3>
                            <Row>
                                {/* Display individual team cards */}
                                {filteredTeams[league][division].map(team => (
                                    <Col key={team.id}>
                                        <Team {...team} />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))}
                </div>
            ))}
        </Container>
    );
}
