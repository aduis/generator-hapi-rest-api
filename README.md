# generator-hapi-rest-api [![Build Status](https://secure.travis-ci.org/aduis/generator-hapi-rest-api.png?branch=master)](https://travis-ci.org/aduis/generator-hapi-rest-api)

> [Yeoman](http://yeoman.io) generator

# Hapi REST API generator

This generator generates a simple REST api using hapijs framework. Just follow the generator instructions and create your own api.

## Getting started (sample address api):

	npm install -g generator-hapi-rest-api
	
	mkdir address_rest_api
	cd address_rest_api
	
	yo hapi-rest-api
	
	? Would is the name of your resource? (address) 
	? What are the fields of the resource? (street:string,street_number:number,postcode:number,city:string,is_deleted:bool) 
	? On what port do you want this api to listen? (8500) 
	? What is the name of your project? (address_rest_api) 
	? What is the name of the db collection? (addresses) 
	? What is the url of your db instance? (localhost:27017) 
	? What is the git url of this project? (git@github.com:<github_user>/<project_name>) 
	
	node index
	
	go to http://localhost:8500/documentation
	
## License

MIT
