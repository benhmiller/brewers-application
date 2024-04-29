const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

// Define your API key
const apiKey = '0ca80ddc-63f6-476e-b548-e5fb0934fc4b';

function groupTeams(teams) {
  const groupedTeams = {};

  // Iterate through each team
  teams.forEach(team => {
    // Check if the league exists in groupedTeams, if not, create it
    if (!groupedTeams[team.leage]) {
      groupedTeams[team.leage] = {};
    }

    // Check if the division exists in the league, if not, create it
    if (!groupedTeams[team.leage][team.division]) {
      groupedTeams[team.leage][team.division] = [];
    }

    // Push the team to the corresponding division
    groupedTeams[team.leage][team.division].push(team);
  });

  return groupedTeams;
}

// Define your route handler
app.get('/api/teams', async (req, res) => {
  try {
    // Make a GET request to the external API with API key as a header
    const response = await axios.get('http://brew-roster-svc.us-e2.cloudhub.io/api/teams', {
      headers: {
        'api-key': apiKey
      }
    });
    
    // Manipulate the data to group teams by league and division
    const groupedTeams = groupTeams(response.data);
    //console.log(groupedTeams);
    
    // Send the formatted data back to the client
    res.json(groupedTeams);
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from external API' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
