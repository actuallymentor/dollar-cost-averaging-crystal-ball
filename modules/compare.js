const compound = require( `${__dirname}/compounders` )

module.exports = ( marketreturn, horizon, crashyear, crashintensity, principal, verbose ) => { 

	// Dollar cost averaged yearly amount based on principal and horizon
	const dca = principal/horizon

	// Chunk
	let chunk = { 
		// principal, yearlyadd, duration, interest, recession, debug
		norec: compound( principal, 0, horizon, marketreturn, { year: -1 } , verbose ),
		rec: compound( principal, 0, horizon, marketreturn, { year: crashyear, down: crashintensity }, verbose )
	 }

	// Dollar cost averaged
	let averaged = { 
		// principal, yearlyadd, duration, interest, recession, debug
		norec: compound( 0, dca, horizon, marketreturn, { year: -1 },verbose ),
		rec: compound( 0, dca, horizon, marketreturn, { year: crashyear, down: crashintensity }, verbose )
	 }

	// How much more profitable is chunk investing in *no* recession
	let norecroi = Math.floor( ( 100 * ( chunk.norec - averaged.norec ) ) / chunk.norec )
	// How much more profitable is chunk investing *with* recession
	let recroi = Math.floor( ( 100 * ( chunk.rec - averaged.rec ) ) / chunk.rec )

	if ( verbose ) { 
		console.log( '\n----------' )
		console.log( `${crashintensity}% crash in year ${crashyear} of ${horizon}` )
		console.log( `Recession: chunk investing is ${recroi}% more profitable than DCA.` )
		console.log( `No recess: chunk investing is ${norecroi}% more profitable than DCA.` )
		console.log( '-----------\n' )
	 }

	 console.log( 'avg', averaged )
	 console.log( 'chk', chunk )
	
	return { 
		chunkroirec: recroi,
		chunkroinorec: norecroi,
		portfolio: { 
			dca: averaged.rec,
			chunk: chunk.rec
		 }
	 }

}