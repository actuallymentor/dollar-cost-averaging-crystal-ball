module.exports = ( principal, yearlyadd, duration, interest, recession, debug = false ) => { 

	// Validations
	if ( recession.year > duration ) console.log( `WARN: You specified a recession beyond your investment horizon` )
	if ( interest > 7 ) console.log( `WARN: You specified an unusually high return of ${interest}` )


	// Create a holder for the calculations and make interest a decimal roi number
	let portfolio = principal
	let roi = 1 + ( interest / 100 )
	let crash = 1 - ( recession.down / 100 )

	// Do the compound calculation

	for (let year = 1; year < duration+1; year++) {

		if ( yearlyadd ) portfolio += yearlyadd

		year == recession.year ? ( portfolio *= crash ) : ( portfolio *= roi )

		if ( year == duration && principal ) console.log( 'last', principal ? 'chunk' : 'dca', recession.year == -1 ? 'recession' : 'safe', portfolio )
	}
	// console.log( 'after', portfolio )

	//  Round the portfolio off to the closest integer
	portfolio = Math.floor( portfolio )

	if ( debug && recession.year != -1 ) console.log( `CRASH | ${ yearlyadd ? 'DCA' : 'CHUNK' }` )
	if ( debug && recession.year == -1 ) console.log( `SAFE |  ${ yearlyadd ? 'DCA' : 'CHUNK' }` )

	// Return the the stats
	return portfolio

}