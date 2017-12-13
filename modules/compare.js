const compound = require( `${__dirname}/compounders` )

module.exports = ( marketreturn, horizon, crashyear, crashintensity, principal, verbose ) => { 

	// Dollar cost averaged yearly amount based on principal and horizon
	const dca = principal/horizon

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
	let recroi = Math.floor( ( 100 * ( chunk.rec.result - averaged.rec.result ) ) / chunk.rec.result )

	console.log( '\n----------' )
	console.log( `${crashintensity}% crash in year ${crashyear} of ${horizon}` )
	console.log( `Recession: chunk investing is ${norecroi}% more profitable.` )
	console.log( `No recess: chunk investing is ${recroi}% more profitable.` )
	console.log( '-----------\n' )

}

// Assumptions
const marketreturn = 4
const horizon = 20
const crashyear = 5
const crashintensity = 50
const principal = 100000
const dca = principal/horizon
const verbose = true