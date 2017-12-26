const colors = require( 'colors' )
const report = require( `${__dirname}/modules/report` )

const assumptions = { 
	horizon: 20,
	principal: 100,
	roi: 4,
	recession: { 
		year: 5,
		size: 50 // In percentage decrease
	}
}

assumptions.recession.size = 50
report( assumptions )
assumptions.recession.size = 80
report( assumptions )