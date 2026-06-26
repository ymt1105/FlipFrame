import express from "express";
import * as control from "./resources/wfmcontroller.js"
const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.static('public'));

router
    .route('/order')
    .get(control.fetchAllOrders())
    .delete(control.deleteAllOrders())
    .post(control.newOrder())

router
    .route('/order/:id')
    .delete(control.deleteSingle())
    .patch(control.patchOrder())


router
    .route('/JWT')
    .get(control.JWT())



