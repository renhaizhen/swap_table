
import { getTableData } from '../services/urlMap';
export default {

    namespace: 'cross_table',
  
    state: {
        tableDatas:{},
        isData:true
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
      cleanTableData(state, { payload }) {
        return { ...state, tableDatas:{}};
      },
      updateTableData(state, payload) {
        return { ...state, tableDatas:{...payload} };
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },
      *getTableDatas({ payload }, { call, put ,select }) {  // eslint-disable-line
        yield put({ type: 'cleanTableData', payload:{} });
        const data = yield call(getTableData,payload);
        console.log(data,'datdadattda---')
        return
        if(!data ) return ;
        const handD = data.data.data;
        yield put({ type: 'updateTableData' ,payload:handD});
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  