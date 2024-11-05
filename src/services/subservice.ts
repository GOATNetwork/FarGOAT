import { Observable } from 'rxjs';

export interface ChartData {
    timestamp: number;
    tvl: number;
    dau: number;
    trx: number;
}

export interface TableData {
    id: number;
    name: string;
    value: number;
    status: string;
}

export class DataService {
    private baseUrl = 'https://fargoat.eni6ma.co/api/chart';

    async fetchChartData(): Promise<ChartData> {
        const response = await fetch(`${this.baseUrl}/api/chart`);
        const data = await response.json();
        return {
            timestamp: data.timestamp,
            tvl: data.values[0],
            dau: data.values[1],
            trx: data.values[2]
        };
    }

    async fetchTableData(): Promise<TableData[]> {
        const response = await fetch(`${this.baseUrl}/api/table`);
        return await response.json();
    }
}

export const dataService = new DataService();