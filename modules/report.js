const compound = require( `${__dirname}/compound` )

const norm = number => { 
	if ( number < 0 && number > -10 ) return String( `-0${Math.abs( number )}` )
	if ( number > 0 && number < 10 ) return String( `0${number}` )
	return number
}

const colorise = ( current, otherone, othertwo ) => { 
	// If if is the highest
	if( current > otherone && current > othertwo ) { 
		return String( current ).green
	// If it is the lowest
	} else if ( current < otherone && current < othertwo ) { 
		return String( current ).red
	// If it is the middle
	} else { 
		return String( current ).yellow
	}
}

const report = assumptions => { 
	console.log( `\n# Assumptions\nPrincipal €${ assumptions.principal }, horizon ${ assumptions.horizon } years, ROI ${ assumptions.roi }%, recession of ${assumptions.recession.size}%\n` )
	console.log( `# Legend\nYear 00 | CNK | DCA | RAMP\n` )
	for (let recyear = 1; recyear < assumptions.horizon+1; recyear++) {
		assumptions.recession.year = recyear
		let result = compound.compare( assumptions )

		// Normalisations for display purposes
		let recessionyear = recyear < 10 ? ( "0" + String( recyear ) ) : recyear
		// let dcacolor 	  = result.chunkwins ? String( norm( result.margin.dca ) + '%' ).red : String( norm( result.margin.dca ) + '%' ).green
		// let chunkcolor	  = result.chunkwins ? String( norm( result.margin.chunk ) + '%' ).green : String( norm( result.margin.chunk ) + '%' ).red
		// let winner 		  = result.chunkwins ? 'CNK'.yellow : 'DCA'.blue
		// let winningroi 	  = result.chunkwins ? result.roi.chunk : result.roi.dca
		
		// console.log( `Year ${ recessionyear } | ${ dcacolor } vs ${ chunkcolor } | ${ winner } | ${ winningroi } | ${ result.roi.ramp }` )
		let colorchunk = colorise( result.roi.chunk, result.roi.dca, result.roi.ramp )
		let colordca   = colorise( result.roi.dca, result.roi.chunk, result.roi.ramp )
		let colorramp  = colorise( result.roi.ramp, result.roi.dca, result.roi.chunk )
		console.log( `Year ${ recessionyear } | ${ colorchunk } | ${ colordca } | ${ colorramp }` )
	}
	console.log( '\n' )
 }

module.exports = report