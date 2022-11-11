const templateStr = '<div class=\'aa\' :bind=\'name\'><span>测试</span></div>';

const parseStrToAst = function (str) {
  const startTagReg = /<\w+/;
  const ast = {};
  const index = 0;
  const parent = ast;
  const len = str.length;
  while (index < len) {
    const token = str.match(startTagReg);
    const tagName = token.splice;
  }
};
