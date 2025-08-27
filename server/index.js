import express from 'express';
import cors from 'cors';
import startServer from './db.js'; 
import { login, register } from './controllers/UserController.js';
import { createApplication, deleteApplication, getApplicationById, getApplications } from './controllers/applicationController.js';
import { checkAuth } from './utils/checkAuth.js';


const app = express();

app.use(cors({origin: ['http://localhost:5173','https://zenbit-tech.vercel.app'], 
credentials: true}))
app.use(express.json());

app.post("/auth/register", register);
app.post("/auth/login", login);

app.post("/applications", checkAuth, createApplication);         
app.get("/applications", checkAuth, getApplications);           
app.get("/applications/:id", checkAuth, getApplicationById);      
app.delete("/applications/:id", checkAuth, deleteApplication);


startServer(app);