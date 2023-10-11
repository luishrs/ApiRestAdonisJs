import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import loginValidator from 'App/validations/loginValidator'
import registerValidator from 'App/validations/registerValidator'

export default class LoginsController {
  public async createUser( { request, response,}:HttpContextContract){
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
  public async login({auth, request, response}:HttpContextContract){
  const {email, password} = request.all()
    try{
      await  request.validate(loginValidator)
    } catch ({messages: {errors}}){
      return response.status(400).json({erro: errors[0].message})
    }
  try {
      const token = await auth.use('api').attempt(email, password)      
      return response.status(200).json(token)
    } catch (error) {
      return response.badRequest({ message: 'unregistered user' })
    }
}  
}
  

