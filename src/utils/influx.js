

const Influx = require('influxdb-nodejs');
const internal = require('influxdb-nodejs/lib/internal');
const HTTP = require('influxdb-nodejs/lib//http');
const _ = require('lodash');

function getFieldType(type) {
  if (typeof type === 'object') type = type.type;
  return {
    STRING: 's',
    JSONB: 's',
    JSON: 's',
    INTEGER: 'i',
    FLOAT: 'f',
    BOOLEAN: 'b'
  }[type] || 's';
}

function getFieldSchema(fields) {
  const res = {};
  _.forEach(fields, (line) => {
    const { name, column } = line;
    const type = getFieldType(column);
    if (!type) console.log(column, 'getFieldSchema column...');
    res[name] = type;
  });
  return res;
}

function getTagSchema(tags) {
  const res = {};
  _.forEach(tags, (line) => {
    const { name, column } = line;
    res[name] = _.get(column, 'validate.options') || '*';
  });
  return res;
}

class Model {
  constructor(client, options) {
    this.client = client;
    this.options = options;
  }
  query(x) {
    return this.client.query(x);
  }
  async batchInsert(ds, o = {}) {
    const { client } = this;
    const { batchN = 10, unit = 'u' } = o;
    const { columns, table_name } = this.options;
    const tagKeys = {};
    const filedKeys = {};
    let timeKey = null;
    for (const name in columns) {
      let col = columns[name];
      if (Array.isArray(col) || typeof col === 'string') col = { type: col };
      if (col.index) {
        tagKeys[name] = true;
      } else if (isTime(col)) {
        timeKey = name;
      } else {
        filedKeys[name] = true;
      }
    }
    for (const i in ds) {
      const d = ds[i];
      const tag = {};
      const field = {};
      for (const k in d) {
        if (k in tagKeys) tag[k] = d[k];
        if (k in filedKeys) field[k] = d[k];
      }
      let q = client.write(table_name).tag(tag).field(field);
      let t = d[timeKey];
      if (typeof (t) === 'object') t = t.getTime() * 1000;
      if (timeKey) q = q.time(t, unit);
      q = q.queue();
      if (client.writeQueueLength > batchN) await client.syncWrite();
    }
  }
}

function isTime(type) {
  type = typeof type === 'object' ? type.type : type;
  return ['DATE', 'TIME'].includes(type);
}


module.exports = class DBLink {
  constructor(options) {
    this.options = options;
    this.init();
  }
  init() {
    this.tables = {};
    this.linkDb();
  }
  linkDb() {
    const {  port = 8086, database = 'bfs' } = this.options;
    const host = this.options;
    console.log(this.options,'......op',port,database)
    this.client = new Influx(`http://${host}:${port}/${database}`);
    this.client_raw = new HTTP([{ protocol: 'http', host, port }], 'round-robin options.servers');
    console.log(this,'opop')
  }
  loadModelConfigs(schemaMap) {
    const { client } = this;
    _.forEach(schemaMap, (sch) => {
      const { name: table_name, columns } = sch;
      delete columns.unique_id;// /
      const columnList = _.map(columns, (column, name) => ({ name, column }));
      const tagList = _.filter(columnList, col => col.column.index);
      const tagSchema = getTagSchema(tagList);
      const fieldList = _.filter(columnList, col => !col.column.index && !isTime(col.column.type));
      const fieldSchema = getFieldSchema(fieldList);
      client.schema(table_name, fieldSchema, tagSchema, {
        stripUnknown: true,
      });
      this.tables[table_name] = new Model(client, { table_name, columns });
    });
  }
  print(msg) {
    console.log(`DBLink.batchInsert: ${msg}`);
  }
  query(x) {
    return this.client.query(x);
  }
  async queryRaw(database_name, sql) {
    console.log(database_name,sql,'queryRaw')
    const queryData = {
      db: database_name,
      q: sql
    };
    console.log(queryData,'.....queryRaw--res1')
    console.log(this.client_raw,'.....queryRaw--res2')
    const res = await this.client_raw.get('/query', queryData);
    return res.body;
  }
  getInfluxData(res) {
    const line = _.get(res, 'results.0.series.0');
    if (line) {
      const { columns, values } = line;
      const result = [];
      for (const l of values) {
        const _l = {};
        for (const i in l) {
          const k = columns[i];
          let v = l[i];
          if (k === 'time') {
            v = new Date(v);
          }
          _l[k] = v;
        }
        result.push(_l);
      }
      return result;
    }
  }
  async batchUpsert(table_name, ds, o) {
    const model = this.tables[table_name];
    if (!model) return this.print(`table_name(${table_name})不存在...`);
    await model.batchInsert(ds, o);
  }
};

