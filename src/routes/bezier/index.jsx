import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './getStyles';
class bezier extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  // componentWillMount(){
  // }
  // 3阶贝塞尔曲线原公式
  threebsr(t, a1, a2, a3, a4) {
    return a1 * (1 - t) * (1 - t) * (1 - t) + 3 * a2 * t * (1 - t) * (1 - t) + 3 * a3 * t * t * (1 - t) + a4 * t * t * t;
  }

  componentDidMount() {
    var canvas = this.canvas;
    var code = this.code;
    // console.log(canvas,code);
    (function () {
      var clickPoint = null, sourcePoint, isQuadratic = true,
        ctx = canvas.getContext("2d"),
        point = { p1: { x: 0, y: 600 }, p2: { x: 600, y: 0 }, cp1: { x: 100, y: 100 } }, cp2 = { x: 400, y: 400 },
        round = {
          curve: { width: 2, color: "#1572b5" },
          cpline: { width: 0.5, color: "#cf4520" },
          point: {
            radius: 10,
            width: 1,
            color: "#009696",
            fill: "rgba(0,170,187,0.6)",
            cursor: "pointer"
          }
        };
      init();
      // 3阶贝塞尔曲线展开式
      /**
       * @desc 三阶贝塞尔
       * @param {number} t 当前百分比
       * @param {Array} p1 起点坐标
       * @param {Array} p2 终点坐标
       * @param {Array} cp1 控制点1
       * @param {Array} cp2 控制点2
       */
      function threeBezier(t, p1, cp1, cp2, p2) {
        const [x1, y1] = p1;
        const [x2, y2] = p2;
        const [cx1, cy1] = cp1;
        const [cx2, cy2] = cp2;
        let x =
          x1 * (1 - t) * (1 - t) * (1 - t) +
          3 * cx1 * t * (1 - t) * (1 - t) +
          3 * cx2 * t * t * (1 - t) +
          x2 * t * t * t;
        let y =
          y1 * (1 - t) * (1 - t) * (1 - t) +
          3 * cy1 * t * (1 - t) * (1 - t) +
          3 * cy2 * t * t * (1 - t) +
          y2 * t * t * t;
        return [x, y];
      }
      function getBezierT(p1, cp1, cp2, p2, p) {
        var [xp, yp] = p; //准备代入求t的点
        var t = 0;
        for (var i = 0; i < 1000; i++) {
          var point = threeBezier(t, p1, cp1, cp2, p2); //根据二次贝塞尔曲线公式求point
          var distance = Math.sqrt(Math.pow(xp - point[0], 2) + Math.pow(yp - point[1], 2));
          if (distance < 0.01) {
            // 判断point和p点的距离是否在误差范围之内
            return parseFloat(t); //返回误差范围内的t
          }
          t += 0.001;
        }
        return false;
      }
      function getBezierY(x, st, et, p1, cp1, cp2, p2) {
        /**
       * @desc 二分法获取贝塞尔y值 t 值
       * @param {number} t 初始百分比t值 1 st 0 et 1
       * @param {number} x 输入x值
       * @param {Array} p1 起点坐标
       * @param {Array} p2 终点坐标
       * @param {Array} cp1 控制点1
       * @param {Array} cp2 控制点2
       */
        var t = (st + et) / 2;
        const aim_ponit = threeBezier(t, p1, cp1, cp2, p2);
        const aim_x = number2Fixed(aim_ponit[0]);//计算所得x
        // console.log('aim_ponit',aim_x,x,st,et,t)
        // console.log(Math.abs(aim_x-x))
        if (Math.abs(aim_x - x) <= 0.01) {//x在误差范围内
          return { t, pinit: aim_ponit }
        } else if (aim_x > x) {//计算的aim_x>x
          const s_t = t / 2;
          const e_t = t;
          // console.log(s_t,e_t,aim_x,x,'小于')
          return getBezierY(x, s_t, e_t, p1, cp1, cp2, p2);
        } else if (aim_x < x) {//计算的aim_x<x
          const e_t = et;
          const s_t = t;
          // console.log(s_t,e_t,aim_x,x,'大于')
          return getBezierY(x, s_t, e_t, p1, cp1, cp2, p2);
        }
      }
      function init() {
        point = { p1: { x: point.p1.x, y: point.p1.y }, p2: { x: point.p2.x, y: point.p2.y }, cp1: { x: point.cp1.x, y: point.cp1.y } };
        if (isQuadratic) {
          point.cp2 = cp2;
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        canvas.onmousedown = mouseDownFun;
        canvas.onmousemove = mouseMoveFun;
        canvas.onmouseup = canvas.onmouseout = mouseUpFun;
        drawCanvas()
      }
      //绘制
      function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // drawUploadImg()
        ctx.beginPath();
        ctx.lineWidth = round.cpline.width;
        ctx.strokeStyle = round.cpline.color;
        ctx.beginPath();
        ctx.moveTo(point.p1.x, point.p1.y);
        ctx.lineTo(point.cp1.x, point.cp1.y);
        if (isQuadratic) {
          ctx.moveTo(point.p2.x, point.p2.y);
          ctx.lineTo(point.cp2.x, point.cp2.y)
        } else {
          ctx.lineTo(point.p2.x, point.p2.y)
        }
        ctx.stroke();
        ctx.lineWidth = round.curve.width;
        ctx.strokeStyle = round.curve.color;
        ctx.beginPath();
        ctx.moveTo(point.p1.x, point.p1.y);
        if (isQuadratic) {
          ctx.bezierCurveTo(point.cp1.x, point.cp1.y, point.cp2.x, point.cp2.y, point.p2.x, point.p2.y)
        } else {
          ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p2.x, point.p2.y)
        }
        ctx.stroke();
        for (var v in point) {
          ctx.lineWidth = round.point.width;
          ctx.strokeStyle = round.point.color;
          ctx.fillStyle = round.point.fill;
          ctx.beginPath();
          ctx.arc(point[v].x, point[v].y, round.point.radius, 0, 2 * Math.PI, true);
          ctx.fill();
          ctx.stroke()
        }
        appendText()
      }
      function number2Fixed(number) {
        return parseFloat(number).toFixed(2)
      }
      //插入对应文字到提示框
      function appendText() {
        var codeHTML = "";
        const width = 600;
        const height = 600;
        const cp1x = number2Fixed(point.cp1.x / width);
        const cp1y = number2Fixed((height - point.cp1.y) / height);
        const cp2x = number2Fixed(point.cp2.x / width);
        const cp2y = number2Fixed((height - point.cp2.y) / height);
        // console.log(point.cp1.x,point.cp1.y,point.cp2.x,point.cp2.y)
        if (point.cp2) {
          // codeHTML="ctx.bezierCurveTo("+cp1x+", "+cp1y+", "+cp2x+", "+cp2y+", "+point.p2.x+", "+point.p2.y+");\n"
          codeHTML = "cubic-bezier(" + cp1x + ", " + cp1y + ", " + cp2x + ", " + cp2y + ")\n"
        }
        // const moveTo ='ctx.moveTo('+point.p1.x+", "+point.p1.y+");\n";
        const p1 = [0, 0];
        const p2 = [1, 1];
        const cp1 = [cp1x, cp1y];
        const cp2 = [cp2x, cp2x];
        // const cp1 = [0,1];
        // const cp2 = [1,0];
        //x,y 分100份 最小单位0.01 起始0 结束1(100)
        const t = 0.68115234375;
        const aim_ponit = threeBezier(t, p1, cp1, cp2, p2);
        const fun_t = number2Fixed(getBezierT(p1, cp1, cp2, p2, aim_ponit));
        const qqq = getBezierY(0.65625, 0, 1, p1, cp1, cp2, p2);
        console.log('aim_ponit:',aim_ponit,t,fun_t,'计算:',qqq)
        // console.log('getBezierY:',qqq)
        // code.innerHTML= moveTo + codeHTML ;
        // const point_info= `x:${aim_ponit[0]} y:${aim_ponit[1]} \n` ;
        code.innerHTML = codeHTML;
      }
      function mouseDownFun(e) {
        e = getPoint(e);
        var dx, dy;
        for (var v in point) {
          dx = point[v].x - e.x;
          dy = point[v].y - e.y;
          //判断点击区域是否在可见圆内
          if (Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(round.point.radius, 2)) {
            clickPoint = v;
            sourcePoint = e;
            canvas.style.cursor = "move";
            return
          }
        }
      }
      function mouseMoveFun(e) {
        if (clickPoint) {
          e = getPoint(e);
          point[clickPoint].x += e.x - sourcePoint.x;
          point[clickPoint].y += e.y - sourcePoint.y;
          sourcePoint = e;
          drawCanvas()
        } else {
          e = getPoint(e);
          var dx, dy;
          for (var v in point) {
            dx = point[v].x - e.x;
            dy = point[v].y - e.y;
            if (Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(round.point.radius, 2)) {
              canvas.style.cursor = "pointer";
              return
            } else {
              canvas.style.cursor = "default";
            }
          }
        }
      }
      function mouseUpFun(e) {
        clickPoint = null;
        canvas.style.cursor = "default";
        drawCanvas()
      }
      function getPoint(e) {
        e = (e ? e : window.event);
        return { x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop }
      }
    })()
  }
  _genBZCanvas() {
    return (<div>
      <div class="content">
        <canvas id="canvas" ref={r => (this.canvas = r)} style={styles.canvas} width="600" height="600" class="bezier">你的浏览器不支持canvas</canvas>
        <pre id="code" style={styles.code} ref={r => (this.code = r)} >code</pre>
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

export default connect(mapStateToProps)(bezier);

