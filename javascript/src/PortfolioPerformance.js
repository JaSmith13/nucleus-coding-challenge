const prices = [
    { effectiveDate: new Date(2021, 8, 1, 5, 0, 0), price: 35464.53 },
    { effectiveDate: new Date(2021, 8, 2, 5, 0, 0), price: 35658.76 },
    { effectiveDate: new Date(2021, 8, 3, 5, 0, 0), price: 36080.06 },
    { effectiveDate: new Date(2021, 8, 3, 13, 0, 0), price: 37111.11 },
    { effectiveDate: new Date(2021, 8, 6, 5, 0, 0), price: 38041.47 },
    { effectiveDate: new Date(2021, 8, 7, 5, 0, 0), price: 34029.61 },
];

const transactions = [
    { effectiveDate: new Date(2021, 8, 1, 9, 0, 0), value: 0.012 },
    { effectiveDate: new Date(2021, 8, 1, 15, 0, 0), value: -0.007 },
    { effectiveDate: new Date(2021, 8, 4, 9, 0, 0), value: 0.017 },
    { effectiveDate: new Date(2021, 8, 5, 9, 0, 0), value: -0.01 },
    { effectiveDate: new Date(2021, 8, 7, 9, 0, 0), value: 0.1 },
];

export function getDailyPortfolioValues() {

    const portfolioValues = []

    //start date for reporting period, time set to end of day
    const currentDate = new Date("September 1, 2021 23:59:59")

    //number of days to produce daily values for 
    const reportingPeriod = 7

    //reverse the prices array to account for multiple price changes in one day 
    const reversedPrices = prices.reverse()

    for(let i = 0; i < reportingPeriod; i++){

        //finds the price just before end of day on the current date
        const currentPriceIndex = reversedPrices.findIndex(price => price.effectiveDate < currentDate)
        const currentPrice = prices[currentPriceIndex].price 

        //finds the relevant point in the transactions array and calculates the current value up to that point
        let currentTransactionIndex = transactions.findIndex(transaction => currentDate < transaction.effectiveDate)

        //if condition is never met we use the whole array as the date must be passed the most recent entry in the array
        if(currentTransactionIndex < 0){
            currentTransactionIndex = transactions.length
        }

        //creates a subarray containing all transactions up to the current date and totals the current Bitcoin value 
        const bitcoinTotalValues = transactions.slice(0, currentTransactionIndex)  
        const currentBitcoinValue = bitcoinTotalValues.reduce((previousValue, currentValue) => previousValue + currentValue.value, 0)

        //uses the unary operator to remove trailing zeros in totals
        const dailyPortfolioValue = +((currentPrice * currentBitcoinValue).toFixed(5))
        
        const formattedDate = currentDate.toISOString().substring(0,10)


        portfolioValues.push({effectiveDate: formattedDate, value: dailyPortfolioValue})
        
        currentDate.setDate(currentDate.getDate() + 1)
    }

    return portfolioValues;
}