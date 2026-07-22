import * as task from './wfmtasks.js';
import { matchLookup } from './matchLookup.js';
import * as riven from './riventasks.js';
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
        const orderid = req.params.orderid;

        const data = await task.deleteSingleOrder(orderid);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export async function newOrder (req, res) {
    try {
        const payload = await task.createPayload(req.body);
        const data = await task.addOrder(payload);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export async function patchOrder (req, res) {
    try {
        const orderid  = req.params.orderid;
        const { platinum, quantity} = req.body;

        const updates = {};
        if (platinum !== undefined) updates.platinum = platinum;
        if (quantity !== undefined) updates.quantity = quantity;


        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No valid fields provided for update" });
        }
        const payload = await task.createEditPayload(platinum, quantity);
        const data = await task.editOrder(payload, orderid);
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

export async function itemSearch (req, res){
    try {
        const slugorname = req.params.name;
        const data = await task.getItem(slugorname);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

export async function bump (req, res){
    try{
        const data = await task.bumpOrders();
        res.json(data);
    } catch(error) {
        res.status(500).json({ error: error.message});
    }
}

export async function retreiveOrdersOnItem (req, res){
    try{
        const slug = req.params.slug;
        const data = await task.getItem(slug)
        res.json(data);
    } catch(error){
        res.status(500).json({ error: error.message});
    }
}

export async function retreiveTopOrdersItemRank (req, res){
    try{
        const slug = req.params.slug;
        const { rank } = req.query
    
        const data = await task.getTopOrdersOnRank(slug, rank);
        res.json(data);
    } catch(error){
        res.status(500).json({ error: error.message});
    }
}

export async function returnLookUpSheet (req, res){
    try{
        const data = await task.getLookUpSheet();
        res.json(data);
    } catch(err){
        res.status(500).json({ err: error.message});
    }
}

export async function returnRivenLookUpSheet (req, res){
    try{
        const data = await riven.getRivenLookUpSheet();
        res.json(data);
    } catch(err){
        res.status(500).json({ err: error.message});
    }
}

export async function returnRivenOrders (req, res){
    try{
        const slug = req.params.slug;
        const data = await riven.getItemContractOrders(slug);
        res.json(data);
    } catch(err){
        res.status(500).json({ err: error.message});
    }
}

export async function lookupWeaponID (req, res){
    try {
        const { idArray } = req.body;
        const data = await matchLookup(idArray)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

export async function getAllContracts(req, res){
    try {
        const data = await riven.getAllContracts();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

