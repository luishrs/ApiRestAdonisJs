import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import ProductValidator from 'App/validations/producValidator'

export default class ProductsController {
  public async store ({ request, response }: HttpContextContract) {
const body = request.body()
const { name} = body

  try {
      await request.validate(ProductValidator)
    } catch ({messages: {errors}}) {
      return response.status(400).json({erro: errors[0].message})
    }

    const productExists = await Product.findBy('name', name)
    if (productExists?.name === name) {
      return response.status(400).json({message: 'Product already exists'})
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
      const products = await Product.query().select(['id', 'name']).orderBy('name', 'asc')
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
      return response.status(400).json({message: 'Product not found'})
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
      return response.status(400).json({message: 'Product not found' })
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    try {
      const product = await Product.findOrFail(params.id)
      await product.delete()
      return response.status(200).json({
        message: 'Product deleted',
        product
    })
    } catch (error) {
      return response.status(400).json({message: 'Product not found'})
    }
  }
}
