interface symbolMap {
	[key: string]: {
		symbol: string,
		name: string,
		code: string,
		name_plural: string
	}
}
const CurrencySymbolMap: symbolMap =  {
	"USD" : {
	  "symbol" : "$",
	  "name" : "US Dollar",
	  "code" : "USD",
	  "name_plural" : "US dollars"
	},
	"EUR" : {
	  "symbol" : "€",
	  "name" : "Euro",
	  "code" : "EUR",
	  "name_plural" : "euros"
	},
	"GBP" : {
	  "symbol" : "£",
	  "name" : "British Pound Sterling",
	  "code" : "GBP",
	  "name_plural" : "British pounds sterling"
	}
  }

  export default CurrencySymbolMap