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
    await Product.find({}, (err, products) => {
        err
            ? res.status(500).json({ status: 'error', data: err.message })
            : res.status(200).json({ status: 'success', data: products });
    });
};

export const getProductById = async (req: Request, res: Response) => {
    await Product.findOne({ _id: req.params.id }).exec((err: { message: string }, product: IProduct) => {
        err
            ? res.status(500).json({ status: 'error', data: err.message })
            : res.status(200).json({ status: 'success', data: product });
    });
};

export const createProducts = async (req: Request, res: Response) => {
    await new Product(req.body).save((err, products) => {
        err
            ? res.status(500).json({ status: 'error', data: err.stack })
            : res.status(200).json({ status: 'success', data: products });
    });
};

export const deleteProducts = async (req: Request, res: Response) => {
    await Product.findByIdAndRemove(req.params.id).exec((err: { message: string }) => {
        err
            ? res.status(500).json({ status: 'error', data: err.message })
            : res.status(200).json({ status: 'success', data: req.params.id });
    });
};

export const searchProducts = async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { keywords } = req.params;
    console.log(keywords);
    await Product.find({ title: { $regex: keywords.substring(1), $options: 'i' } }).exec(
        (err: { message: string }, products: IProduct[]) => {
            err
                ? res.status(500).json({ status: 'error', data: err.message })
                : res.status(200).json({ status: 'success', data: products });
        },
    );
};
