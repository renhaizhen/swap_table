import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './getStyles';
require('./index.css')
class bezierTool extends Component {
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
      script.src = "./../src//routes//bezierTool//utils.js"
      script.async = true
      document.body.appendChild(script);
    }
    _genBZCanvas(){
      return (<div>
        <div class="content">
	<canvas id="canvas" style={styles.canvas} width="600" height="600" class="bezier">你的浏览器不支持canvas</canvas>
	<pre id="code">code</pre>
	<div class="nav">
		<span>strokeStyle:</span><input type="color" id="strokeStyle" value="#1572b5" />
	</div>
	<div class="nav">
		<span>lineWidth:</span><input type="number" id="lineWidth" value="2"  min="0" max="10"/>
	</div>
	{/* <div class="nav">
		<button id="exchange">exchange</button>
		<button id="upload" onclick="document.getElementById('file').click()">upload</button>
		<input id="file" type='file'/>
		<button id="bezierCurveTo">bezierCurveTo</button>
	</div>
	<div id="preview">
		<img id="imghead" src=''/>
	</div> */}
</div>
      </div>)
    }
    render() {
        return (
            <div style={styles.main}>
              {this._genBZCanvas()}
            </div>
        )
    }
}

const mapStateToProps = (pps) => {
    const { cross_table } = pps;
    return { ...cross_table };
};

export default connect(mapStateToProps)(bezierTool);

