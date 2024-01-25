import connection from "../db/db.js";

export const getExperiences = (req, res) => {
    connection.query('SELECT * FROM experience', (error, results) => {
        if (error) {
            console.error('Error fetching experiences data:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(results);
        }
    });
};

export const getExperienceById = (req, res) => {
    const experienceId = req.params.id;

    connection.query('SELECT * FROM experience WHERE experienceId=?', [experienceId], (error, results) => {
        if (error) {
            console.error('Error fetching experience record by ID:', error);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 0) {
                res.status(404).send('Experience record not found');
            } else {
                res.send(results[0]);
            }
        }
    });
};

export const createExperience = (req, res) => {
    const { jobTitle, companyName, employmentType, startDate, endDate, description, link } = req.body;
    connection.query('INSERT INTO experience (jobTitle, companyName, employmentType, startDate, endDate, description, link) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [jobTitle, companyName, employmentType, startDate, endDate, description, link], (error, results) => {
            if (error) {
                console.error('Error creating experience record:', error);
                res.status(500).send('Internal Server Error');
            } else {
                res.status(201).send('Experience record created successfully');
            }
        });
};

export const updateExperience = (req, res) => {
    const { jobTitle, companyName, employmentType, startDate, endDate, description, link } = req.body;
    const experienceId = req.params.id;

    connection.query('UPDATE experience SET jobTitle=?, companyName=?, employmentType=?, startDate=?, endDate=?, description=?, link=? WHERE experienceId=?',
        [jobTitle, companyName, employmentType, startDate, endDate, description, link, experienceId], (error, results) => {
            if (error) {
                console.error('Error updating experience record:', error);
                res.status(500).send('Internal Server Error');
            } else {
                res.status(200).send('Experience record updated successfully');
            }
        });
};

export const deleteExperience = (req, res) => {
    const experienceId = req.params.id;

    connection.query('DELETE FROM experience WHERE experienceId=?', [experienceId], (error, results) => {
        if (error) {
            console.error('Error deleting experience record:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Experience record deleted successfully');
        }
    });
};