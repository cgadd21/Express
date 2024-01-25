import connection from "../db/db.js";

export const getVolunteers = (req, res) => {
    connection.query('SELECT * FROM volunteer', (error, results) => {
        if (error) {
            console.error('Error fetching volunteer data:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(results);
        }
    });
};

export const getVolunteerById = (req, res) => {
    const volunteerId = req.params.id;

    connection.query('SELECT * FROM volunteer WHERE volunteerId=?', [volunteerId], (error, results) => {
        if (error) {
            console.error('Error fetching volunteer record by ID:', error);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 0) {
                res.status(404).send('Volunteer record not found');
            } else {
                res.send(results[0]);
            }
        }
    });
};

export const createVolunteer = (req, res) => {
    const { jobTitle, companyName, description, link } = req.body;
    connection.query('INSERT INTO volunteer (jobTitle, companyName, description, link) VALUES (?, ?, ?, ?)',
        [jobTitle, companyName, description, link], (error, results) => {
            if (error) {
                console.error('Error creating volunteer record:', error);
                res.status(500).send('Internal Server Error');
            } else {
                res.status(201).send('Volunteer record created successfully');
            }
        });
};

export const updateVolunteer = (req, res) => {
    const { jobTitle, companyName, description, link } = req.body;
    const volunteerId = req.params.id;

    connection.query('UPDATE volunteer SET jobTitle=?, companyName=?, description=?, link=? WHERE volunteerId=?',
        [jobTitle, companyName, description, link, volunteerId], (error, results) => {
            if (error) {
                console.error('Error updating volunteer record:', error);
                res.status(500).send('Internal Server Error');
            } else {
                res.status(200).send('Volunteer record updated successfully');
            }
        });
};

export const deleteVolunteer = (req, res) => {
    const volunteerId = req.params.id;

    connection.query('DELETE FROM volunteer WHERE volunteerId=?', [volunteerId], (error, results) => {
        if (error) {
            console.error('Error deleting volunteer record:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Volunteer record deleted successfully');
        }
    });
};