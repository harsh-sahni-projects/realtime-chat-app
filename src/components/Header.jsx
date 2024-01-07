const Header = (props) => {
  const children = props.children;
  const classes = "border-0 py-4 " + (props.className ? props.className : '');
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Header;