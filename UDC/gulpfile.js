'use strict';

/*
 * =================================================
 * =================================================
 * =================================================
 * setup dependencies
 * =================================================
 * =================================================
 * =================================================
 */
var gulp = require('gulp'),
	
	/*
	 * Lazy load plug-ins defined as devDependencies in package.json
	 * After loading plug-ins can be used following way:
	 * 
	 * plug-in name : gulp-copy -> plugins.copy()
	 * plug-in name : gulp-concat-css -> plugins.concatCss()
	 */
	plugins = require('gulp-load-plugins')({
		scope:['devDependencies']
	});

/*
 * =================================================
 * =================================================
 * =================================================
 * jshint
 * =================================================
 * =================================================
 * =================================================
 */
gulp.task('jshint', function () {
	
	var config = {
		    'strict': true,
		    'curly':true,
		    'devel':true,
		    'eqeqeq': true,
		    'indent':2,
		  	'trailing': true,
		  	'undef':true,
		    'maxdepth': 2,
		    'maxcomplexity': 6,
		    'globalstrict': true,
		    'validthis': true,
		    'browser': true,
			'globals':{
		    	'require': true,
		    	'define': true,
		    	'document': true,
		    	'module': true,
		    	'__dirname': true
		  	}
	  	};
	
	return gulp.src(['gulpfile.js','app/scripts/**/*.js'])
	  .pipe(plugins.jshint(config))
	  .pipe(plugins.jshint.reporter('jshint-stylish'))
	  .pipe(plugins.jshint.reporter('fail'));
});

/*
 * =================================================
 * =================================================
 * =================================================
 * clean
 * =================================================
 * =================================================
 * =================================================
 */
gulp.task('clean', function () {
    return gulp.src(['dist','coverage'], {read: false})
        .pipe(plugins.clean());
});

/*
 * =================================================
 * =================================================
 * =================================================
 * test
 * =================================================
 * =================================================
 * =================================================
 */
gulp.task('test', function(done) {
	var Server = require('karma').Server;
	new Server({
		configFile : __dirname + '/karma.conf.js',
		singleRun : true
	}, done).start();
});