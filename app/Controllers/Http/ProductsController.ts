import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import ProductValidator from 'App/validations/producValidator'

export default class ProductsController {
  public async store ({ request, response }: HttpContextContract) {
const body = request.body()

  try {
      await request.validate(ProductValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }

  try {
    const product = await Product.create(body)
    return response.status(201).json(product)
  }    catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async index ({ response }: HttpContextContract) {
    try {
      const products = await Product.all()
      return response.status(200).json(products)
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async show ({ params, response }: HttpContextContract) {
    try {
      const product = await Product.findOrFail(params.id)
      return response.status(200).json(product)
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const body = request.body()

    try {
      await request.validate(ProductValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }

    try {
      const product = await Product.findOrFail(params.id)
      product.merge(body)
      await product.save()
      return response.status(200).json(product)
    } catch (error) {
      return response.status(400).json({message: "Product not found" })
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    try {
      const product = await Product.findOrFail(params.id)
      await product.delete()
      return response.status(200).json({message: 'Product deleted'})
    } catch (error) {
      return response.status(400).json({message: "Product not found"})
    }
  }
}
