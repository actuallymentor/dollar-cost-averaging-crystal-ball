const compound = require( `${__dirname}/modules/compounders` )

// Assumptions
const marketreturn = 4
const horizon = 20
const crashyear = 5
const crashintensity = 50
const principal = 100000
const dca = principal/horizon
const verbose = true

// Chunk
let chunk = { 
	norec: compound( principal, 0, horizon, marketreturn, { year: -1 } , verbose ),
	rec: compound( principal, 0, horizon, marketreturn, { year: crashyear, down: crashintensity } , verbose )
 }

// Dollar cost averaged
let averaged = { 
	norec: compound( 0, dca, horizon, marketreturn, { year: -1 } ,verbose ),
	rec: compound( 0, dca, horizon, marketreturn, { year: crashyear, down: crashintensity }, verbose )
 }

let norecroi = Math.floor( ( 100 * ( chunk.norec.result - averaged.norec.result ) ) / chunk.norec.result )
let recroi = Math.floor( ( 100 * ( chunk.norec.result - averaged.norec.result ) ) / chunk.norec.result )

console.log( `Without a recession chunk investing is ${norecroi}% more profitable.` )
console.log( `With a recession chunk investing is ${Math.floor(recroi}% more profitable.` )