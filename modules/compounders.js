const calculate = ( principal, yearlyadd, duration, interest, recession = { year: -1, down: 0 }, debug = false ) => { 

	// Validations
	if ( recession.year > duration ) console.log( `WARN: You specified a recession beyond your investment horizon` )
	if ( interest > 7 ) console.log( `WARN: You specified an unusually high return of ${interest}` )


	// Create a holder for the calculations and make interest a decimal roi number
	let portfolio = principal
	let roi = 1 + ( interest / 100 )
	let crash = 1 - ( recession.down / 100 )


	// Do the compound calculation
	for (let year = 0; year < duration; year++) {
		portfolio += yearlyadd
		year == recession.year ? portfolio *= crash : portfolio *= roi
	}

	//  Round the portfolio off to the closest integer
	portfolio = Math.floor( portfolio )

	// Make a debug object and log it if debug is true
	let debuggery = { 
		principal: principal,
		yearlyadd: yearlyadd,
		duration: duration,
		interest: interest,
		roi: roi,
		outcome: portfolio
	}
	if ( debug ) console.log(  debuggery )

	// Return the the stats
	return { result: portfolio, debug: debuggery }

}

 module.exports = calculate