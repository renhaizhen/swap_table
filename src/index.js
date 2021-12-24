import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';
import cross_table from './../src/models/cross_table';
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(cross_table);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
