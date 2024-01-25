import express from "express";
import bodyParser from "body-parser";
import educationRoutes from "./routes/educationRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/education", educationRoutes);
app.use("/experience", experienceRoutes);
app.use("/project", projectRoutes);
app.use("/skill", skillRoutes);
app.use("/volunteer", volunteerRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});