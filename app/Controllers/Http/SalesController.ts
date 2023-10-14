import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Sale from 'App/Models/Sale'
import isStockSufficient from 'App/utils/stockManager'
import SaleValidator from 'App/validations/saleValidator'
import SaleShowValidator from 'App/validations/salesShowValidator'

export default class SalesController {

  public async store ( {request, response}: HttpContextContract) {
    const body = request.body()
    const {product_id, quantity} = body

    try {
      await request.validate(SaleValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }

    const stockTotal = await isStockSufficient(quantity, product_id)
    if (!stockTotal) {
      return response.status(400).json({message: 'Insufficient stock'})
    }
    const {stock} = await Product.find(product_id) as unknown as Product
    await Product.query().where('id', product_id).update({stock: stock - quantity})
    
    try {
      const sale = await Sale.create(body)
      return response.status(201).json(sale)
    } catch (error) {
      return response.status(400).json({message: 'Product or client not found'})
    }     
  }
  
  public async index ({response}: HttpContextContract) {
    try {
      const data = await Sale.query().preload('client').preload('product').orderBy('created_at', 'desc')    
      if (data.length === 0) {
        throw new Error('There are no registered sales')
      } 
      return data
    } catch (error) {
      return response.status(400).json({message: 'Sales not found'})
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { year, month } = request.qs(); 

     try {
      await request.validate(SaleShowValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }
  try {
    const data = await Sale.query()
      .whereRaw(`YEAR(created_at) = ? AND MONTH(created_at) = ?`,
 [year, month]).preload('client').preload('product');
    return data;
  } catch (error) {
    return response.status(400).json({ message: 'you need type sales/filter?year=?&month=?' });
  }
}
}
