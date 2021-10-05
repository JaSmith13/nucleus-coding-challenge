import { getDailyPortfolioValues } from "../src/PortfolioPerformance";

test("output is correct", () => {
    expect(getDailyPortfolioValues()).toEqual([
        { effectiveDate: "2021-09-01", value: 177.32265 },
        { effectiveDate: "2021-09-02", value: 178.2938 },
        { effectiveDate: "2021-09-03", value: 185.55555 },
        { effectiveDate: "2021-09-04", value: 816.44442 },
        { effectiveDate: "2021-09-05", value: 445.33332 },
        { effectiveDate: "2021-09-06", value: 456.49764 },
        { effectiveDate: "2021-09-07", value: 3811.31632 },
    ]);
});
