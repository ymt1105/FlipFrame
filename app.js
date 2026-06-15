import express from "express";

const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.static('public'));




