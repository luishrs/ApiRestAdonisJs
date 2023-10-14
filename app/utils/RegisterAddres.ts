import Address from "App/Models/Address"

export default async function registerAddress (address, client_id) {
  const { street, number, neighborhood, city, state, country } = address
  const addressExists = await Address.findBy('client_id', client_id)
  if (!addressExists) {   
   const newAddress = await Address.create({
    client_id,
    country,
    state,
    city,
    neighborhood,
    street,
    number,
   })
   return newAddress
  }
 const uptdateAddress =  addressExists.merge({
    client_id,
    country,
    state,
    city,
    neighborhood,
    street,
    number,
  })
  await uptdateAddress.save()
  return uptdateAddress
  
}