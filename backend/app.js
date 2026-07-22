import express from "express";
import * as control from "./resources/wfmcontroller.js"
import cors from 'cors';

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

router
    .route('/order')
    .get(control.fetchAllOrders)
    .delete(control.deleteAllOrders)
    .post(control.newOrder)
router
    .route('/order/bump')
    .get(control.bump)
router
    .route('/order/item/:slug')
    .get(control.retreiveOrdersOnItem)

router
    .route('/order/item/:slug/top')
    .get(control.retreiveTopOrdersItemRank)

router
    router 
    .route('/order/riven')
    .get(control.getAllContracts)
    
router 
    .route('/order/riven/:slug')
    .get(control.returnRivenOrders)

router
    .route('/order/:orderid')
    .delete(control.deleteSingle)
    .patch(control.patchOrder)
    
router
    .route('/item/:name')
    .get(control.itemSearch)

router
    .route('/lookup')
    .get(control.returnLookUpSheet)
    .post(control.lookupID)
router
    .route('/riven/lookup')
    .get(control.returnRivenLookUpSheet)

router
    .route('/JWT')
    .get(control.JWT)


app.use(router);

const API_URL = process.env.VITE_API_URL
const PORT = API_URL.slice(-4)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})