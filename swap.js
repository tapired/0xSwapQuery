const { default: axios } = require('axios')
const qs = require('qs')
const params = {
  buyToken: 'WMATIC', // token out
  sellToken: 'USDC', // token in
  sellAmount: '20000000000' // 20K care the decimals
}
const URL = 'https://polygon.api.0x.org/swap/v1/quote?' // get the URL from 0xswap for the appropriate chain

// Get Default Quote
// "to", "allowanceTargt", "sellToken", "buyToken" and "data" fields are important for us take them and feed to the contract 
const getDefaultQuote = async () => {
  let response
  try {
    response = await axios.get(`${URL}${qs.stringify(params)}`)
  } catch (err) {
    console.error(err)
  }
  console.log("Default Quote")
  console.log("%O",response.data)
  console.log("%O",response.data.sources)
}

// //Get Quote from a specific DEX
// const getUniSwapV3Quote = async (inputToken, outputToken, value) => {
//   const exchangeList = 'Uniswap_V3'
//   const params = {
//     buyToken: 'DAI',
//     sellToken: 'ETH',
//     sellAmount: 0.05 * Math.pow(10, 18).toString(), // Always denominated in wei
//     includedSources: exchangeList,
//   }
//   let response
//   try {
//     response = await axios.get(
//       `${URL}${qs.stringify(params)}`,
//     )
//   } catch (err) {
//     console.error(err)
//   }
//   console.log("Uniswap Quote",)
//   console.log("%O",response.data)
//   console.log("%O",response.data.sources)
// }

getDefaultQuote()
// getUniSwapV3Quote()
