const compare = require( `${__dirname}/modules/compare` )

// Assumptions
const marketreturn = 4
const horizon = 20
const principal = 100000
const dca = principal/horizon
const verbose = false

compare( marketreturn, horizon, 1, 50, principal, verbose )
compare( marketreturn, horizon, 5, 50, principal, verbose )
compare( marketreturn, horizon, 10, 50, principal, verbose )
compare( marketreturn, horizon, 15, 50, principal, verbose )
compare( marketreturn, horizon, 20, 50, principal, verbose )