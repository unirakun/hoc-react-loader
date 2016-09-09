export default (style, opacity) => ({
  backgroundColor: `rgba(120, 120, 120, ${opacity})`,
  borderRadius: '20px',
  width: '20px',
  height: '20px',
  margin: '2px',
  display: 'inline-block',
  transition: 'background-color 800ms',
  ...style,
})
