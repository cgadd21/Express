import connection from "../db/db.js";

export const getSkills = (req, res) => {
    connection.query('SELECT * FROM skill', (error, results) => {
        if (error) {
            console.error('Error fetching skills data:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(results);
        }
    });
};

export const getSkillById = (req, res) => {
    const skillId = req.params.id;

    connection.query('SELECT * FROM skill WHERE skillId=?', [skillId], (error, results) => {
        if (error) {
            console.error('Error fetching skill record by ID:', error);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 0) {
                res.status(404).send('Skill record not found');
            } else {
                res.send(results[0]);
            }
        }
    });
};

export const createSkill = (req, res) => {
    const { category, skillName } = req.body;
    connection.query('INSERT INTO skill (category, skillName) VALUES (?, ?)', [category, skillName], (error, results) => {
        if (error) {
            console.error('Error creating skill record:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).send('Skill record created successfully');
        }
    });
};

export const updateSkill = (req, res) => {
    const { category, skillName } = req.body;
    const skillId = req.params.id;

    connection.query('UPDATE skill SET category=?, skillName=? WHERE skillId=?', [category, skillName, skillId], (error, results) => {
        if (error) {
            console.error('Error updating skill record:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Skill record updated successfully');
        }
    });
};

export const deleteSkill = (req, res) => {
    const skillId = req.params.id;

    connection.query('DELETE FROM skill WHERE skillId=?', [skillId], (error, results) => {
        if (error) {
            console.error('Error deleting skill record:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Skill record deleted successfully');
        }
    });
};