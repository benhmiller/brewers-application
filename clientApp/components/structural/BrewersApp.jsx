import React, { useEffect, useState } from 'react';
import { Row, Container, Col, Dropdown } from 'react-bootstrap';
import Team from './Team';

export default function BrewersApp() {
    const [teams, setTeams] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/teams')
            .then(res => res.json())
            .then(json => {
                setTeams(json);
            });
    }, []);

    // Update Filtered Teams
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
        // If neither league nor division are selected
        else {
            updatedFilteredTeams = JSON.parse(JSON.stcringify(teams));
        }

        // Set the filtered teams state
        setFilteredTeams(updatedFilteredTeams);
    }, [teams, selectedLeague, selectedDivision]);

    // Reset selected division when selected league changes
    useEffect(() => {
        setSelectedDivision('');
    }, [selectedLeague]);

    return (
        <Container fluid>
            <Row>
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
                <Col sm={12} md={6}>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="divisionDropdown" disabled={!selectedLeague}>
                            Select Division
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedDivision('')}>
                                All Divisions
                            </Dropdown.Item>
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
            {Object.keys(filteredTeams).map(league => (
                <div key={league}>
                    <h2>{league}</h2>
                    {Object.keys(filteredTeams[league]).map(division => (
                        <div key={division}>
                            <h3>{division}</h3>
                            <Row>
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
