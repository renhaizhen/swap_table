import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './getStyles';
import { Bezier} from 'bezier-js';
class CrossTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    // componentWillMount(){
      
    // }
    componentDidMount () {
      const script = document.createElement("script")
      script.type = 'text/javascript';
      script.src = "./../src//routes//bezier//cell.js"
      script.async = true
      document.body.appendChild(script);
      window.Bezier = Bezier;
    }
    
 
    _genRegionBz(){
      return (<div>
              <canvas id="canvas" width="605" height="400">Canvas not supported</canvas>
<div id='controls'>
    Stroke color: <select id='strokeStyleSelect'>
    <option value='red'>red</option>
    <option value='green'>green</option>
    <option value='blue'>blue</option>
    <option value='orange'>orange</option>
    <option value='cornflowerblue'>cornflowerblue</option>
    <option value='goldenrod'>goldenrod</option>
    <option value='navy' selected>navy</option>
    <option value='purple'>purple</option>
</select>
    Guidewires: <input id='guidewireCheckbox' type='checkbox' checked/>
    <input id='eraseAllButton' type='button' value='Erase all'/>
</div>
<div id='instructions' class='floatingControls'>
    <p>拖动贝塞尔曲线的锚点和控制点以改变曲线的形状!</p>

    <p>当你完成曲线形状的编辑后，点击曲线外的一点，以完成此图像</p>

    <input id='instructionsOkayButton' type='button' value='好的' autofocus/>
    <input id='instructionsNoMoreButton' type='button'
           value='不再提示'/>
           
</div>
      </div>)
    }
    render() {
        return (
            <div style={styles.main}>
              hello
            </div>
        )
    }
}

const mapStateToProps = (pps) => {
    const { cross_table } = pps;
    return { ...cross_table };
};

export default connect(mapStateToProps)(CrossTable);

