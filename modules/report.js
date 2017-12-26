const compound = require( `${__dirname}/compound` )

const norm = number => { 
	if ( number < 0 && number > -10 ) return String( `-0${Math.abs( number )}` )
	if ( number > 0 && number < 10 ) return String( `0${number}` )
	return number
}

const report = assumptions => { 
	console.log( `\n# Assumptions\nPrincipal €${ assumptions.principal }, horizon ${ assumptions.horizon } years, ROI ${ assumptions.roi }%, recession of ${assumptions.recession.size}%\n` )
	console.log( `# Legend\nRecession year | DCA vs Chunk | Winner | Outcome\n` )
	for (let recyear = 1; recyear < assumptions.horizon+1; recyear++) {
		assumptions.recession.year = recyear
		let result = compound.compare( assumptions )

		// Normalisations for display purposes
		let recessionyear = recyear < 10 ? ( "0" + String( recyear ) ) : recyear
		let dcacolor 	  = result.chunkwins ? String( norm( result.margin.dca ) + '%' ).red : String( norm( result.margin.dca ) + '%' ).green
		let chunkcolor	  = result.chunkwins ? String( norm( result.margin.chunk ) + '%' ).green : String( norm( result.margin.chunk ) + '%' ).red
		let winner 		  = result.chunkwins ? 'CNK'.yellow : 'DCA'.blue
		let winningroi 	  = result.chunkwins ? result.roi.chunk : result.roi.dca
		
		console.log( `Year ${ recessionyear } | ${ dcacolor } vs ${ chunkcolor } | ${ winner } | ${ winningroi }` )
	}
	console.log( '\n' )
 }

module.exports = report