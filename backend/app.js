import express from "express";
import * as task from "./resources/wfmtasks.js"
const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.static('public'));

router
    .route('/order')
    .post()



