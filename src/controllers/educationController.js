import connection from "../db/db.js";

export const getEducations = (req, res) => {
    connection.query('SELECT * FROM education', (error, results) => {
        if (error) {
            console.error('Error fetching education data:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(results);
        }
    });
};

export const getEducationById = (req, res) => {
    const educationId = req.params.id;
    connection.query('SELECT * FROM education WHERE educationId=?', [educationId], (error, results) => {
        if (error) {
            console.error('Error fetching education record by ID:', error);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 0) {
                res.status(404).send('Education record not found');
            } else {
                res.send(results[0]);
            }
        }
    });
};

export const createEducation = (req, res) => {
    const { institutionName, degree, graduationYear } = req.body;
    connection.query('INSERT INTO education (institutionName, degree, graduationYear) VALUES (?, ?, ?)', [institutionName, degree, graduationYear], (error, results) => {
        if (error) {
            console.error('Error creating education record:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).send('Education record created successfully');
        }
    });
}

export const updateEducation = (req, res) => {
    const { institutionName, degree, graduationYear } = req.body;
    const educationId = req.params.id;
    connection.query('UPDATE education SET institutionName=?, degree=?, graduationYear=? WHERE educationId=?', [institutionName, degree, graduationYear, educationId], (error, results) => {
        if (error) {
            console.error('Error updating education record:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Education record updated successfully');
        }
    });
};

export const deleteEducation = (req, res) => {
    const educationId = req.params.id;

    connection.query('DELETE FROM education WHERE educationId=?', [educationId], (error, results) => {
        if (error) {
            console.error('Error deleting education record:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Education record deleted successfully');
        }
    });
};