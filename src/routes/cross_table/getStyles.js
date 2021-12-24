
const center = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
const bWidth = 18;
const borderRadius = 5;
const padding = 12;

export default {
    main: {
      width: `calc(100% - ${padding * 12}px)`,
      height: '100%',
      display:'flex',
      flexDirection:'column',
      alignItems:'center'
    },
    searchBox:{
      width: '100%',
      ...center,
      alignItems:'flex-end',
      justifyContent:'flex-end',
      marginTop:`${bWidth}px`
    },
    search:{
      width:`${bWidth * 22}px`,
      height:`${bWidth * 2}px`
    },
    outLineBox:{
      width:'100%',
      marginTop:`${bWidth * .5}px`
    },
    cardTitle:{
      width:'100%',
      border: 'none',
      background: '#e9ebf2',
      lineHeight: '50px',
      fontSize:'24px',
    },
    outLineContent:{
      width:'100%',
      ...center
    },
    outLineInner:{
      width:'49%',
      paddingLeft:padding,
      paddingRight:'12px'
    },
    splitLine:{
      width:'1px',
      height:'114px',
      background:'#ebedf0',
      margin:'auto'
    },
    innerRow:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:`${bWidth * .5}px`
    },
    lastInnerRow:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
    },
    innerName:{
      color:'#7b8293',
      width:'60%',
      overflow: 'hidden',
      textOverflow:'ellipsis',
      whiteSpace: 'nowrap',
      fontSize:'14px'
    },
    innerValue:{
      color:'#7b8293',
      fontSize:'14px'
    },
    headTitle:{
      fontSize:18
    },
    panel:{
      width:'100%',
      marginTop:`${bWidth}px`,
      borderRadius
    },
    panelTit:{
      color:'#9aa1b1',
      fontSize:`${bWidth}px`,
      borderBottom:'none'
    },
    curpanelMenu:{
      borderBottom:'2px solid #1f2533',
      color:'#1f2533'
    },
    panelContainer:{
      display:'flex',
      width:'100%',
      justifyContent:'space-between',
      // flexDirection: 'row',
      paddingLeft: padding,
      paddingRight: padding,
    },
    panelContent:{
      width:'100%',
      display:'flex',
      justifyContent:'space-between',
      flexWrap:'wrap',
      paddingBottom:'12px',
      marginTop:'12px',
      marginBottom:'12px',
      borderRadius
    },
    pannnelLeftInner:{
      display:'flex',
      justifyContent:'flex-start',
      flexDirection:'column',
      alignItems:'flex-start',
      width:'46%'
    },
    pannnelRightInner:{
      width:'46%',
      paddingLeft: padding,
      paddingRight: padding,
    },
    panelListRow:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:'12px'
    },
    panelListLeftInner:{
      width:'100%',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      // padding:`0 ${padding * 3}px 0 ${padding * 2}px`,
      marginBottom:`${padding}px`
    },
    panelListImg:{
      width: '14px',
      height: '14px',
      marginRight: '10px',
    },
    panelRinnerValue:{
      color:'rgb(77, 184, 114)',
      fontSize:'15px'
    },
    panelLinnerValue:{
      color:'red',
      fontSize:'12px'
    },
    panelRinnerA:{
      color:'#2d60e0',
      fontSize:'14px',
      textDecoration:'none',
      cursor:'pointer'
    },
    pinkArm:{
      width:'8%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    panelArm:{
      color: `rgb(77, 184, 114)`,
      backgroundColor: `rgba(77, 184, 114, 0.15)`,
      borderRadius:'28px',
      width:'28px',
      height:'28px',
      ...center,
      marginTop:'6px'
    },
    panelinnerName:{
      ...center,
      justifyContent:'space-between',
      boxSizing: 'border-box',
      width:'70%',
      overflow: 'hidden',
      textOverflow:'ellipsis',
      whiteSpace: 'nowrap',
    },
    panelListBox:{
      padding:'0 20px',
      boxSizing: 'border-box',
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      alignItems:'center',
      borderRadius,
    },
    panelBottom:{
      width:'100%',
      display:'flex',
      alignItems:'center',
      justifyContent:'flex-end',
      margin: padding,
      flexDirection:'row',
    },
    panelBalance:{
      color: `rgb(77, 184, 114)`,
      backgroundColor: `rgba(77, 184, 114, 0.15)`,
      padding: '8px 16px',
      boxSizing: 'border-box',
      lineHeight: '14px',
      fontSize:'12px',
      fontWeight:500,
      borderRadius:3
    },
    panelConfirm:{
      background: `rgba(45,96,224,.1)`,
      color: '#2d60e0',
      fontSize:'14px',
      padding: '8px 16px',
      lineHeight: '14px',
      marginLeft:'18px',
      marginRight:'12px',
      borderRadius:3
    },
    panelTitle:{
      width:'100%',
      padding:`${padding}px ${padding * 2}px ${padding}px ${padding}px`,
      background:'#f5f6fa',
      marginBottom: 12,
    },
    panelTitDetails:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      fontSize:'12px'
    },
    devlice:{
      display:'inline-block',
      margin:'0 10px',
      color:'rgba(0,0,0,.65)'
    },
    blurCoin:{
      fontSize:'12px',
      color:'rgb(123, 130, 147)',
    },
    staWrap:{
      ...center,
      padding:'0 20px',
      boxSizing: 'border-box',
    },
    spaining:{
      width:'100%',
      ...center,
      height:'200px'
    },
    chartsBox:{
      ...center,
      justifyContent:'space-between',
      marginTop:`${padding * 2}px`
    },
    influx:{
      textIndent:`${padding * 3}px`,
      fontSize:`${padding * 1.2}px`
    },
    chartsDeli:{
      marginLeft:`${padding * 5}px`
    },
    tags:{
      display:'inline-block',
    }
}
