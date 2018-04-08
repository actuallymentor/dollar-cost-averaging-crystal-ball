const compound = require( `${__dirname}/compound` )

const norm = number => { 
	if ( number < 0 && number > -10 ) return String( `-0${Math.abs( number )}` )
	if ( number > 0 && number < 10 ) return String( `0${number}` )
	return number
}

const colorise = ( current, otherone, othertwo, otherthree ) => { 
	// If if is the highest
	if( current > otherone && current > othertwo && current > otherthree ) { 
		return String( current ).green
	// If it is the lowest
	} else if ( current < otherone && current < othertwo && current < otherthree ) { 
		return String( current ).red
	// If it is the middle
	} else { 
		return String( current ).yellow
	}
}

const report = assumptions => { 
	console.log( `\n# Assumptions\nPrincipal €${ assumptions.principal }, horizon ${ assumptions.horizon } years, ROI ${ assumptions.roi }%, recession of ${assumptions.recession.size}%\n` )
	console.log( `Recession year: year in which the crash happens.\nLSI/DCA/RAMP/HYBRID numbers are the final value of the portfolio\nLSI = Lump sum in year one\nDCA = dollar cost averaged on a yearly basis\nRAMP = DCA until a crash and then invest the remaining available money\nHYBRID = LSI 50% and invest the other 50% at the next crash\n| Recession year | LSI | DCA | RAMP | HYBRID |` )
	console.log( `| ------- | --- | --- | ---- |` )
	for (let recyear = 1; recyear < assumptions.horizon+1; recyear++) {
		assumptions.recession.year = recyear
		let result = compound.compare( assumptions )

		// Normalisations for display purposes
		let recessionyear = recyear < 10 ? ( "0" + String( recyear ) ) : recyear
		let colorchunk  = colorise( result.roi.chunk, result.roi.dca, result.roi.ramp, result.roi.hybrid )
		let colordca    = colorise( result.roi.dca, result.roi.chunk, result.roi.ramp, result.roi.hybrid )
		let colorramp   = colorise( result.roi.ramp, result.roi.dca, result.roi.chunk, result.roi.hybrid )
		let colorhybrid = colorise( result.roi.hybrid, result.roi.ramp, result.roi.dca, result.roi.chunk )
		console.log( `| Year ${ recessionyear } | ${ colorchunk } | ${ colordca } | ${ colorramp } | ${ colorhybrid } |` )
	}
 }

module.exports = report