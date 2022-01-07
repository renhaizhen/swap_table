
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
    canvas:{
      margin: '0 10px 10px 0',
      backgroundColor: '#fff',
      borderRadius:'10px',
      border: '1px solid #ddd',
      float: 'left',
    },
    code:{
      minWidth: '500px',
      maxWidth: '560px',
      display: 'block',
      width: 'auto',
      height: '210px',
      fontSize: '20px',
      padding: '20px',
      margin: 0,
      color: '#333',
      borderRadius: '10px',
      border: '1px solid #ddd',
      overflow: 'auto'
    },
    nav:{
      display: 'block',
      marginTop: '10px'
    }
}
