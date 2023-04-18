const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')

const token = 'token'
const chatId = 'chatId'

const bot = new TelegramBot(token, { polling: true })

const getCoinPrice = async coinId => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
  )
  return response.data[coinId].usd
}

const sendMessage = async () => {
  const velaPrice = await getCoinPrice('vela-token')
  const grailPrice = await getCoinPrice('camelot-token')
  const arbPrice = await getCoinPrice('arbitrum')
  const ethPrice = await getCoinPrice('ethereum')

  const ethPerVela = (velaPrice / ethPrice).toFixed(7)
  const arbPerGrail = (grailPrice / arbPrice).toFixed(1)

  const message = `
    ETH per VELA = 0.0015069 || ${ethPerVela} || 0.0017508
    ====================
    ARB per GRAIL = 1641.9 || ${arbPerGrail} || 1896.2
    ====================
    USDC per ARB = 1.4541 || ${arbPrice} || 1.6793
  `

  if (ethPerVela <= 0.0015169 || ethPerVela >= 0.0017408) {
    bot.sendMessage(
      chatId,
      `
    attention!!!
    attention!!!
    attention!!!

    ETH per VELA pool almost not earning

    attention!!!
    attention!!!
    attention!!!
    `
    )
  }
  if (arbPerGrail <= 1645.9 || arbPerGrail >= 1836.2) {
    bot.sendMessage(
      chatId,
      `
    attention!!!
    attention!!!
    attention!!!

    ARB per GRAIL pool almost not earning

    attention!!!
    attention!!!
    attention!!!
    `
    )
  }
  if (arbPrice <= 1.4741 || arbPrice >= 1.6593) {
    bot.sendMessage(
      chatId,
      `
    attention!!!
    attention!!!
    attention!!!

    USDC per ARB pool almost not earning

    attention!!!
    attention!!!
    attention!!!
    `
    )
  }

  bot.sendMessage(chatId, message)
}
sendMessage()
setInterval(sendMessage, 600000)
