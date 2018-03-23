const express = require('express');
const request = require('request');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

const creatorQuery = `
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>
PREFIX schema: <http://schema.org/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT ?creatorName ?birthYear ?deathYear ?werkTitle ?werkYear ?werkImg ?age  WHERE {
  ?werk dc:creator ?creator .
  ?creator foaf:name ?creatorName .
  ?creator schema:birthDate ?birthDate .
  ?creator schema:deathDate ?deathDate .  
  ?werk dc:title ?werkTitle .
  ?werk sem:hasBeginTimeStamp ?werkDate .
  ?werk foaf:depiction ?werkImg .
  FILTER REGEX(?werkDate, "^[12][0-9]{3}$") .
  BIND (year(xsd:gYear(?werkDate)) AS ?werkYear) .
  FILTER REGEX(?birthDate, "^[12][0-9]{3}-[0-9]{2}-[0-9]{2}$") .
  BIND (year(xsd:dateTime(?birthDate)) AS ?birthYear) .
  FILTER REGEX(?deathDate, "^[12][0-9]{3}-[0-9]{2}-[0-9]{2}$") .
  BIND (year(xsd:dateTime(?deathDate)) AS ?deathYear) .
  BIND ((?werkYear - ?birthYear) AS ?age) .
  FILTER (strlen(?werkTitle) < 50)
}
ORDER BY ?birthYear
LIMIT 1500					`;

function makeQueryURL(query) {
	const encodedquery = encodeURIComponent(query);
	return `https://api.data.adamlink.nl/datasets/AdamNet/all/services/hva2018/sparql?default-graph-uri=&query=${encodedquery}&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`;
}

const creatorData = {};
let result;

request(makeQueryURL(creatorQuery), function (error, response, data) {
	if (!error && response.statusCode == 200) {
		data = JSON.parse(data);
		if (data.results.bindings.length > 0) {
			result = data.results.bindings.reduce((acc, el) => ({
				...acc,
				[el.creatorName.value]: Array.isArray(acc[el.creatorName.value]) ? [...acc[el.creatorName.value], el] : [el],
			}), {});

			const resultArray = Object.keys(result).map(key => result[key]);

			resultArray.forEach((creator) => {
				if (creator.length > 8) {
					let nameWithoutAlias = creator[0].creatorName.value.split(',');
					const creatorLink = nameWithoutAlias[0];
					nameWithoutAlias = nameWithoutAlias[0].replace(/\s{2,}/g, ' ');

					const firstName = function () {
						for (let i = 0; i < nameWithoutAlias.length; i++) {
							let codeLine = nameWithoutAlias;
							return codeLine.substr(0, codeLine.indexOf(' '));
						}
					};
					
					creatorData[creatorLink] = {
						firstName: `${firstName()}`,
						birthYear: creator[0].birthYear.value,
						nameWithoutAlias: nameWithoutAlias,
						workImage: creator[0].werkImg.value
					};
				}
			});
		}
	}
});

function getCreatorInfo(id) {
	const artData = result[Object.keys(result).find(key => key.includes(id))];

	const nameWithoutAlias = artData[0].creatorName.value.split(',');

	const creatorInfo = {
		creatorName: nameWithoutAlias[0],
		birthYear: artData[0].birthYear.value,
		deathYear: artData[0].deathYear.value
	};

	return creatorInfo;
}

function filterByName(id){
	const creatorWork = [];

	const artData = result[Object.keys(result).find(key => key.includes(id))];

	const workDuringLifetime = artData.filter(checkLifetime);

	function checkLifetime(work) {
		return work.werkYear.value >= artData[0].birthYear.value && work.werkYear.value <= artData[0].deathYear.value;
	}

	const sortedByYear = workDuringLifetime.sort(function (a, b) {
		return Number(a.werkYear.value) - Number(b.werkYear.value);
	});

	sortedByYear.forEach((work) => {
		if (work.werkTitle.value.length < 80) {
			const werkTitleCleaned = work.werkTitle.value.split('(');
			const obj = {
				'workYear': work.werkYear.value,
				'workTitle': werkTitleCleaned[0],
				'workImage': work.werkImg.value
			};
			creatorWork.push(obj);
		}
	});

	return creatorWork;
}

app.get('/', function (req, res) {
	res.render('index', { creators: creatorData });
});
app.get('/:id', function (req, res) {
	const filteredData = filterByName(req.params.id);
	const infoOfCreator = getCreatorInfo(req.params.id);
	res.render('person', { creatorWork: filteredData, creatorInfo: infoOfCreator });
});

const server = app.listen(6969, function () {
	console.log('server is running on port 6969');
});
