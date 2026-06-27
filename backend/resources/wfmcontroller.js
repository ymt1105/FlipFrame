import * as task from './wfmtasks.js'
import { matchLookup } from './matchLookup.js';
//express friendly functions

export async function fetchAllOrders (req, res) {
    try {
        const data = await task.getAllOrders();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export async function deleteAllOrders (req, res) {
    try {
        const data = await task.deleteAllOrders();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}
export async function deleteSingle (req, res) {
    try {
        const data = await task.deleteSingleOrder();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export async function newOrder (req, res) {
    try {
        const { itemId, type, platinum, quantity} = req.body;
        const payload = await task.createPayload(itemId, type, platinum, quantity);
        const data = await task.addOrder(payload);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export async function patchOrder (req, res) {
    try {
        const id = req.params.id;
        const { platinum, quantity, visible} = req.body;
        const payload = await task.createEditPayload(platinum, quantity, visible);
        const data = await task.editOrder(payload, id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}


export async function JWT (req, res) {
    try {
        const data = await task.getJWT();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

export async function lookupID (req, res){
    try {
        const { idArray } = req.body;
        const data = await matchLookup(idArray)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}