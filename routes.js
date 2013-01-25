
exports.student = function(req, res) {
	res.render('student', { title : 'Student - Synapsis Promotions' } );
};

exports.company = function(req, res) {
  res.render('company', { title : "Company - Synapsis Promotions"});
};

exports.landingPage = function(req, res) {
	if (req.cookies['userType']) {
		var title = req.cookies['userType'];
		res.render(req.cookies['userType'], { title: title });
	} else {
		res.render('landing-page', { title : 'Welcome to Synapsis Promotions!' } );
	}
};

