import Telephone from "App/Models/Telephone"

export default async function registerTelephone (number, client_id) {  
  const telephoneExists = await Telephone.findBy('client_id', client_id)
  if (!telephoneExists) {   
  const newTelephone = await Telephone.create({
    client_id,
    number,   
  })
  return newTelephone
  }
const uptdateTelephone =  telephoneExists.merge({
    client_id,
    number,   
  })
  await uptdateTelephone.save()
  return uptdateTelephone
  
}