import connection from "../db/db.js";

export const getProjects = (req, res) => {
    connection.query('SELECT * FROM project', (error, results) => {
        if (error) {
            console.error('Error fetching projects data:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(results);
        }
    });
};

export const getProjectById = (req, res) => {
    const projectId = req.params.id;

    connection.query('SELECT * FROM project WHERE projectId=?', [projectId], (error, results) => {
        if (error) {
            console.error('Error fetching project record by ID:', error);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 0) {
                res.status(404).send('Project record not found');
            } else {
                res.send(results[0]);
            }
        }
    });
};

export const createProject = (req, res) => {
    const { projectName, projectLink, projectDescription } = req.body;
    connection.query('INSERT INTO project (projectName, projectLink, projectDescription) VALUES (?, ?, ?)', [projectName, projectLink, projectDescription], (error, results) => {
        if (error) {
            console.error('Error creating project record:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).send('Project record created successfully');
        }
    });
};

export const updateProject = (req, res) => {
    const { projectName, projectLink, projectDescription } = req.body;
    const projectId = req.params.id;

    connection.query('UPDATE project SET projectName=?, projectLink=?, projectDescription=? WHERE projectId=?', [projectName, projectLink, projectDescription, projectId], (error, results) => {
        if (error) {
            console.error('Error updating project record:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Project record updated successfully');
        }
    });
};

export const deleteProject = (req, res) => {
    const projectId = req.params.id;

    connection.query('DELETE FROM project WHERE projectId=?', [projectId], (error, results) => {
        if (error) {
            console.error('Error deleting project record:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Project record deleted successfully');
        }
    });
};