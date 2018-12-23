import marked from "marked";

export default value => {
  return marked(value);
};
