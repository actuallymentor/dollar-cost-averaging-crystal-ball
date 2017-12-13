const compound = require( `${__dirname}/modules/compounders` )

// Assumptions
const marketreturn = 4
const horizon = 20
const crashyear = 5
const crashintensity = 50
const principal = 100000
const dca = principal/horizon
const verbose = true

// Example compound
let chunk = compound( principal, 0, horizon, marketreturn, { year: -1 } , verbose )

// Recession
let chunkrecession = compound( principal, 0, horizon, marketreturn, { year: crashyear, down: crashintensity } , verbose )

//
// To the DCA!
//

// No recession
let averaged = compound( 0, dca, horizon, marketreturn, { year: -1 } ,verbose )

// Recession
let averagedrecession = compound( 0, dca, horizon, marketreturn, { year: crashyear, down: crashintensity }, verbose )

console.log( `Without a recession chunk investing is ${Math.floor( ((chunk.result-averaged.result)*100)/chunk.result )}% more profitable.` )
console.log( `With a recession chunk investing is ${Math.floor( ((chunkrecession.result-averagedrecession.result)*100)/chunkrecession.result )}% more profitable.` )