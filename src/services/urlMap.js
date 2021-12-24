import request from '../utils/request';
import DBLink from '../utils/influx';
export function query() {
  return request('/api/users');
}

export async function getTableData(datas){
  // const dbL = new dbLink(host = data.ip, port = 8086, database = 'bfs');
  if(!datas&&!datas.ip) return 
  const { ip ,tbName } = datas; 
  console.log(ip,tbName,'getTableDatasgetTableDatas---')
  const dbL = new DBLink(ip);

  const sql = `SELECT * FROM "${tbName}" limit 3 `;

  let re = await dbL.queryRaw('bfs',sql);
  console.log(dbL,sql,'dbLdbLdbLdbL',re)

  if(re&&!re.results[0].series){
  }
}

