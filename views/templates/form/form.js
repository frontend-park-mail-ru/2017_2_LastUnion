module.exports = {
	rend : function(params) {
		var template = require('./form.ejs');
		let html = template(params);
		const elem = document.createElement('div');
		elem.innerHTML = html;
		const inputs = elem.getElementsByTagName('input');
		for(let i=0; i < inputs.length; i++)
		{
			let id = inputs[i].getAttribute('id');
			inputs[i].addEventListener('focus', event => {
				document.getElementById(id + '_err').hidden = 'true';
			});
		}
		return elem;
	},

	err : function(form, input, msg) {
		const span = document.getElementById(form + '_' + input + '_err');
		span.innerHTML = msg;
		span.hidden = false;
		document.getElementById(form + '_loader').hidden = 'true';
		document.getElementById(form + '_btn').style.display = 'inline-block';
	},

	ok : function(id) {
		document.getElementById(id + '_err').hidden = 'true';
	},

	submit : function(form) {
		document.getElementById(form + '_btn').style.display = 'none'
		document.getElementById(form + '_loader').hidden = false;
		document.getElementById(form + '_Global_err').innerHTML = "";
	}
};
