const dca = assumptions => { 
	// Decimalise and create portfolio holder
	let portfolio 	= 0
	let crash 		= 1 - ( assumptions.recession.size / 100 )
	let grow 		= 1 + ( assumptions.roi / 100 )
	let yearlyadd 	= assumptions.principal / assumptions.horizon

	// Loop over the years and crash or grow
	for (let thisyear = 1; thisyear < assumptions.horizon + 1 ; thisyear++) {
		portfolio += yearlyadd
		thisyear == assumptions.recession.year ? ( portfolio *= crash ) : ( portfolio *= grow )
	}
	// Resolve with the outcome
	return portfolio
}

const chunk = assumptions => { 
	// Decimalise and create portfolio holder
	let portfolio 	= assumptions.principal
	let crash 		= 1 - ( assumptions.recession.size / 100 )
	let grow 		= 1 + ( assumptions.roi / 100 )

	// In a compound interest calculation without additions the year of the crash doesn't matter, so we can apply it straight away
	portfolio *= crash

	// Loop over the years and crash or grow
	// We start at year 2 because year 1 was the year of the crash, see above
	for (let thisyear = 2; thisyear < assumptions.horizon + 1; thisyear++) portfolio *= grow

	// Resolve with the outcome
	return portfolio
}

const compare = assumptions => { 
	let chunkroi = chunk( assumptions )
	let dcaroi   = dca( assumptions )
	let ramproi  = ramptourist( assumptions )

	return { 
		chunkwins: 		chunkroi > dcaroi ? true : false,
		margin: { 
			chunk: 	Math.floor( ( 100 * ( chunkroi - dcaroi ) ) / chunkroi ),
			dca: 	Math.floor( ( 100 * ( dcaroi - chunkroi ) ) / dcaroi )
		},
		roi: { 
			chunk: Math.floor( chunkroi ),
			dca:   Math.floor( dcaroi ),
			ramp:  Math.floor( ramproi )
		}
	}

}

const ramptourist = assumptions => { 
	// Decimalise and create portfolio holder
	let principal 	= assumptions.principal
	let portfolio 	= 0
	let crash 		= 1 - ( assumptions.recession.size / 100 )
	let grow 		= 1 + ( assumptions.roi / 100 )
	let yearlyadd 	= assumptions.principal / assumptions.horizon

	// Loop over the years and crash or grow
	for (let thisyear = 1; thisyear < assumptions.horizon + 1 ; thisyear++) {
		// If we have money left invest it
		if( principal > 0 ) { 
			portfolio += yearlyadd
			principal -= yearlyadd
		}
		// If there is a crash invest it all
		if ( thisyear == assumptions.recession.year ) { 
			portfolio *= crash
			portfolio += principal
			principal = 0
		// If no crash let it grow
		} else { 
		 	portfolio *= grow
		}
	}
	// Resolve with the outcome
	return portfolio
}

module.exports = { 
	dca: dca,
	chunk: chunk,
	ramptourist: ramptourist,
	compare: compare
}