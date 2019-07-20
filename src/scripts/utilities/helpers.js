const removeDotFromClassname = (classname) => {
  if(!classname) return null;
  let cl = classname;
  while(cl.charAt(0) === '.') cl = cl.substr(1);
  return cl;
}

export {
  removeDotFromClassname
}