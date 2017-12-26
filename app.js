const colors = require( 'colors' )
const compound = require ( `${__dirname}/modules/compound` )

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

console.log( `Recession year | DCA vs Chunk |` )
for (let recyear = 1; recyear < assumptions.horizon+1; recyear++) {
	assumptions.recession.year = recyear
	let result = compound.compare( assumptions )

	// Normalisations for display purposes
	let recessionyear = recyear < 10 ? ( "0" + String( recyear ) ) : recyear
	let dcacolor 	  = result.chunkwins ? String( result.dcamargin + '%' ).red : String( result.dcamargin + '%' ).green
	let chunkcolor	  = result.chunkwins ? String( result.chunkmargin + '%' ).green : String( result.chunkmargin + '%' ).red
	let winner 		  = result.chunkwins ? 'CNK' : 'DCA'
	
	console.log( `${ recessionyear } | ${ dcacolor } vs ${ chunkcolor }` )
}