import express from "express";
import * as control from "./resources/wfmcontroller.js"
import cors from 'cors';

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//order bump
router.route('/orders/bump')
    .post(control.bump);

//order endpoints
router.route('/orders')
    .get(control.fetchAllOrders)
    .post(control.newOrder)
    .delete(control.deleteAllCurrentUserOrders);

router.route('/orders/:orderid')
    .patch(control.patchOrder)
    .delete(control.deleteSingle);

//item hierarchies
router.route('/items/lookup')
    .get(control.returnLookUpSheet)
    .post(control.lookupID);

router.route('/items/:slug')
    .get(control.itemSearch);

router.route('/items/:slug/orders')
    .get(control.retreiveOrdersOnItem);

router.route('/items/:slug/orders/top')
    .get(control.retreiveTopOrdersItemRank);

//riven endpoints
router.route('/rivens')
    .get(control.getAllContracts);

router.route('/rivens/lookup')
    .get(control.returnRivenLookUpSheet);

router.route('/rivens/weapons/:slug')
    .get(control.returnRivenOrders);

app.use('/api', router);
app.use(router);

const API_URL = process.env.VITE_API_URL
const PORT = API_URL.slice(-4)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})