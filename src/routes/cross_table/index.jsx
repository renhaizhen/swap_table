import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './getStyles';
import { Spin ,Table} from 'antd';


class CrossTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    dispatch = (type, payload) => this.props.dispatch({ type: `cross_table/${type}`, payload })
    _genNodata() {
        return (<div style={styles.spaining}>
            <Spin />
        </div>)
    }
    componentWillMount(){
      const connDb = {ip:'47.57.72.27',tbName:'coin_swap_history'}
      this.dispatch('getTableDatas', connDb);
    }
    _genRenderTable(){
      console.log(this.props)
      const dataSource = [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ];
      
      const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ];
      return (<Table dataSource={dataSource} columns={columns} />)
    }
    render() {
        const isData = !this.props.tableDatas
        return (
            <div style={styles.main}>
                {isData ? this._genNodata() : this._genRenderTable()}
            </div>
        )
    }
}

const mapStateToProps = (pps) => {
    const { cross_table } = pps;
    return { ...cross_table };
};

export default connect(mapStateToProps)(CrossTable);

