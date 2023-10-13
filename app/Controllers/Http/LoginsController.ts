import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import loginValidator from 'App/validations/loginValidator'

export default class LoginsController {

  public async store ({auth, request, response}:HttpContextContract){
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
      return response.badRequest({ message: 'incorrect login or password' })
    }
}  
}
  

