import { UserModel } from '../models/UserModel'
import { dbInit } from '../utils/Database'

(async () => {
  await dbInit()

  await UserModel.create({
    username: 'Ajustor',
    email: 'alexandre.gambier@icloud.com',
    password: '36dac62361836ef02c09ecfab3cc86ce9525d9871c6764a4390b1960a406eeabc0a30f5a6e36afa6740eff95bf107d4e1d3e5b0805641e03e9fa4b46c481ea16',
  })

  process.exit(0)
})()