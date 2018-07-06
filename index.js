const open = require("open");
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const hostile = require('hostile')

var website = {
	sitekey: '6Ld2sf4SAAAAAKSgzs0Q13IZhY02Pyo31S2jgOB5',
	url: 'patrickhlauke.github.io',
	port: 3000
}

app.use(bodyParser.urlencoded({
	extended: false
}))

app.listen(website.port, () => console.log('Listening on port ' + website.port))
app.get('/', function (req, res) {
	res.send(`<!DOCTYPE HTML>
	<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<title>Captcha Harvester</title>
		</head>
		<body style="background-color: #303030;">
			<div class="g-recaptcha" data-callback="sendToken" data-sitekey="${website.sitekey}" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"></div>
			<script>
				function sendToken()
				{
					post('/', {'g-recaptcha-response': grecaptcha.getResponse()});
				}
				function post(path, params, method) {
					method = method || "post"; // Set method to post by default if not specified.
	
					// The rest of this code assumes you are not using a library.
					// It can be made less wordy if you use one.
					var form = document.createElement("form");
					form.setAttribute("method", method);
					form.setAttribute("action", path);
	
					for(var key in params) {
						if(params.hasOwnProperty(key)) {
							var hiddenField = document.createElement("input");
							hiddenField.setAttribute("type", "hidden");
							hiddenField.setAttribute("name", key);
							hiddenField.setAttribute("value", params[key]);
	
							form.appendChild(hiddenField);
						}
					}
	
					document.body.appendChild(form);
					form.submit();
				}
			</script>
			<script src='https://www.google.com/recaptcha/api.js'></script>
		</body>
	</html>`)
})
app.post('/', function (request, response) {
	console.log(request.body);
	response.redirect('/');
})

hostile.set('::1', 'captcha.' + website.url, function (err) {
	if (err) {
		console.error(err)
	} else {
		open('http://captcha.' + website.url + ':' + website.port);
	}
})