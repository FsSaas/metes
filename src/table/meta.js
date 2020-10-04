import format from 'string-template';

// const keys = ['uri', 'add', 'update', 'delete', 'columns', 'fields'];

export default (meta, props) => {
  let newMeta = {};
  for (let it of Object.entries(meta)) {
    let [key, value] = it;
    newMeta[key] = format(value, props);
  }
  return newMeta;
}
