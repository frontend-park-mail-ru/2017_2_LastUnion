// module.exports =  render;
//
// function render(app) {
//     console.log('2');
//     //var ejs = app['render'];
//     //var template = ejs.compile('/test',"<%= title %>", {title : 'TEST'});
// //     //console.log(template);
// //   }
// module.exports = {
//   rend : function(){
//     console.log('2');
//     var template = require('ejs!./header.ejs');
//     let data = {
//       loggedin: true
//     };
//     template(data);
//     console.log(template);
//   }
// }
module.exports = {
  rend : function(){
    console.log('2');
    var template = require('./header.ejs');
    let object = {
      loggedin : false
    }
    let result = template(object);
    console.log(result);
    return result;
  }
}
