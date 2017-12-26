const compare = require( `${__dirname}/modules/compare` )
const colour = require( 'colour' )

// Assumptions
const marketreturn = 4
const horizon = 20
const principal = 100000
const dca = principal/horizon
const verbose = false
const crashintensity = 50


console.log( `Crash intensity: ${crashintensity}%, market return ${marketreturn}%\n` )

for (let crashyear = 1; crashyear < horizon+1; crashyear++) {
	let result = compare( marketreturn, horizon, crashyear, crashintensity, principal, verbose )
	console.log( `Recession year ${crashyear} | Chunk ${ result.chunkroirec < 0 ? String( result.chunkroirec ).red : String( result.chunkroirec ).green }%` )
}