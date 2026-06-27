import express from "express";
import * as control from "./resources/wfmcontroller.js"
import cors from 'cors';

const app = express();
app.use(cors());
const router = express.Router();
app.use(express.json());
app.use(express.static('public'));

router
    .route('/order')
    .get(control.fetchAllOrders)
    .delete(control.deleteAllOrders)
    .post(control.newOrder)

router
    .route('/order/:id')
    .delete(control.deleteSingle)
    .patch(control.patchOrder)


router
    .route('/JWT')
    .get(control.JWT)


app.use(router);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})



