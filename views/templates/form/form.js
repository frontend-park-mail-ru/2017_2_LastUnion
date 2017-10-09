module.exports = {
  rend : function(params) {
    var template = require('./form.ejs');
    let html = template(params);
    const elem = document.createElement('div');
    elem.innerHTML = html;
    const inputs = elem.getElementsByTagName("input");
    for(let i=0; i < inputs.length; i++)
    {
      let id = inputs[i].getAttribute("id");
      inputs[i].addEventListener('focus', event => {
        document.getElementById(id + '_err').hidden = 'true';
      });
    }
    return elem;
  },

  err : function(id, msg) {
    const span = document.getElementById(id + '_err');
    console.log(span);
    span.innerHTML = msg;
    span.hidden = false;
  },

  ok : function(id) {
    document.getElementById(id + '_err').hidden = 'true';
  }
}
