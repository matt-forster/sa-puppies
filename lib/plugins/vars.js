export default {
  name: 'vars',
  type: 'namespace',
  placement: 'before',
  dep: [],

  simple: function (req, res, next) {
    this.vars = {};
    return next();
  }
};
