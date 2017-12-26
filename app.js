const colors = require( 'colors' )
const report = require( `${__dirname}/modules/report` )

// Question: with X to invest, when does DCA beat Chunk assuming a recession in year Y of Z magnitude
// Sub question: how much does DCA return in case of a recession
// Sub question: how much does chunk return in case of a recession

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