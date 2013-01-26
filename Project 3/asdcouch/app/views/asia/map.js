function (doc) {
	if (doc._id.substr(0,5) === "asia:"){
		emit(doc._id, {
			"region": doc.region,
			"make": doc.make,
			"model": doc.model,
			"parts": doc.parts,
			"year": doc.year,
			"date": doc.date,
			"comments": doc.comments
		});
	}				   
};