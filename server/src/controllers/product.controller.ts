/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-unused-expressions */
import { Request, Response } from 'express';
import { Product } from '../models/product';

interface IProduct {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        await Product.find({}, (err, products) => {
            err
                ? res.status(500).json({ status: 'error', data: err.message })
                : res.status(200).json({ status: 'success', data: products });
        });
    } catch (error) {
        res.send(error);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (product) {
            res.status(200).json({ status: 'success', data: product });
        } else {
            res.status(500).send('Product not found');
        }
    } catch (error) {
        res.send(error);
    }
};

export const createProducts = async (req: Request, res: Response) => {
    try {
        await new Product(req.body).save((err, products) => {
            err
                ? res.status(500).json({ status: 'error', data: err.stack })
                : res.status(200).json({ status: 'success', data: products });
        });
    } catch (error) {
        res.send(error);
    }
};

export const deleteProducts = async (req: Request, res: Response) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.send('Product deleted');
    } catch (error) {
        res.send(error);
    }
};

export const searchProducts = async (req: Request, res: Response) => {
    try {
        const { keywords } = req.params;
        const products = await Product.find({ title: { $regex: keywords.substring(1), $options: 'i' } });
        if (products) {
            res.status(200).json({ status: 'success', data: products });
        } else {
            res.status(500).json({ status: 'error', data: 'products not found' });
        }
    } catch (error) {
        res.send(error);
    }
};
