// 3阶贝塞尔曲线展开式
/**
 * @desc 三阶贝塞尔
 * @param {number} t 当前百分比
 * @param {Array} p1 起点坐标
 * @param {Array} p2 终点坐标
 * @param {Array} cp1 控制点1
 * @param {Array} cp2 控制点2
* */
function threeBsr(t, a1, a2, a3, a4) {
    return a1 * (1 - t) * (1 - t) * (1 - t) + 3 * a2 * t * (1 - t) * (1 - t) + 3 * a3 * t * t * (1 - t) + a4 * t * t * t;
}
function number2Fixed(number) {
    return parseFloat(number).toFixed(2)
}
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
function getBezierY(x, st, et, p1, cp1, cp2, p2) {
    /**
   * @desc 二分法获取贝塞尔y值 t 值
   * @param {number} t 初始百分比t值 1 st 0 et 1
   * @param {number} x 输入x值
   * @param {Array} p1 起点坐标
   * @param {Array} p2 终点坐标
   * @param {Array} cp1 控制点1
   * @param {Array} cp2 控制点2
   * @param {number} st 起始点
   * @param {number} et 结束点
   * 
   */
    var t = (st + et) / 2;
    const aim_ponit = threeBezier(t, p1, cp1, cp2, p2);
    const aim_x = number2Fixed(aim_ponit[0]);//计算所得x
    // console.log(Math.abs(aim_x-x))
    if (Math.abs(aim_x - x) <= 0.005) {//x在误差范围内
        return { t, point: aim_ponit }
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


module.exports = {
    threeBezier,
    getBezierY,
    threeBsr
}