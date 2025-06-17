// Neon version
import { Pool, QueryResult } from 'pg';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	},
});

// Query
export const query = async (sql: string, data: string[] = []): Promise<QueryResult> => {
	const client = await pool.connect();
	try{
		return await client.query(sql, data);
	}catch(e){
		console.log(e);
		throw e;
	}finally{
		client.release();
	}
}
