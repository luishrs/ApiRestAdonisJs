import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import registerValidator from 'App/validations/registerValidator'
import User from 'App/Models/User'

export default class RegistersController {
    public async store( { request, response,}:HttpContextContract){
    const {email} = request.all()
    
    try{
      await  request.validate(registerValidator)
    } catch ({messages: {errors}}){
      return response.status(400).json({erro: errors[0].message})
    }

    const body = request.body()
    const verifyUser= await User.findBy('email', email)

    if(verifyUser){
    return response.status(401).json({message: 'Email already registered'})
    }

    const user = await User.create(body)

    return response.status(201).json(user)
  }
}
