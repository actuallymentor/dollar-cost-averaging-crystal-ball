const colors = require( 'colors' )
const report = require( `${__dirname}/modules/report` )

const assumptions = { 
	horizon: 20,
	principal: 100,
	roi: 4,
	recession: { 
		size: 50 // In percentage decrease
	}
}

report( assumptions )
// assumptions.recession.size = 90
// report( assumptions )