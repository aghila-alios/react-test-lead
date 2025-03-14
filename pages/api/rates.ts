import csvParser from "csv-parser";
import { format, subMonths } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

const BANK_OF_ENGLAND_URL = `https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp`;
const DATE_FORMAT = "dd/MMM/yyyy";
type dataType = {
    DATE: string,
    IUMABEDR: string
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const dateTo = format(new Date(), DATE_FORMAT);
        const dateFrom = format(subMonths(new Date(), 1), DATE_FORMAT);
        const endpointUrl = `${BANK_OF_ENGLAND_URL}?csv.x=yes&Datefrom=${dateFrom}&Dateto=${dateTo}&SeriesCodes=IUMABEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N`;
        const response = await fetch(endpointUrl)
        console.log(`${response.status}`)
        if (!response.ok) {
            throw new Error(`Failed to fetch data from BOE with error status - ${response.status}`)
        }
        const csvData = await response.text()
        const data: dataType[] = await parseCSVData(csvData)
        const rate = parseFloat(data[0].IUMABEDR)
        if (!!rate) {
            res.status(200).json({ success: true, data: rate.toFixed(2) });
        } else {
            throw new Error(`Failed to fetch data from BOE with error status - ${response.status}`)
        }

    } catch (err) {
        res.status(500).json({ success: false, error: (err as Error).message });
    }
};


export const parseCSVData = (csvData: string): Promise<dataType[]> => {
    return new Promise((resolve, reject) => {
        const results: dataType[] = [];
        const stream = Readable.from(csvData);

        stream
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}