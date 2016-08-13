## Main Features

* Loads page application webpages
* OpenGraph metadata

## Install

```sh
npm install metascrape
```

## Useage

```javascript

const metascrape = require('metascrape');

metascrape.fetch('http://github.com', 1000).then((response) => {
	console.log(response);
});
```
You will end up with an object like this:

```javascript
{
	url: 'https://github.com/',
    normal: {
    	viewport: 'width=device-width',
    	'browser-stats-url': 'https://api.github.com/_private/browser/stats',
     	'browser-errors-url': 'https://api.github.com/_private/browser/errors',
     	'pjax-timeout': '1000',
	    'request-id': '7C8DAE2F:13EBF:2F8CDB7:57AEE3BD',
	    'msapplication-TileImage': '/windows-tile.png',
	    'msapplication-TileColor': '#ffffff',
	    'selected-link': undefined,
	    'google-site-verification': 'ZzhVyEFwb7w3e0-uOTltm8Jsck2F5StVihD0exw2fsA',
	    'google-analytics': 'UA-3769691-2',
	    'octolytics-host': 'collector.githubapp.com',
	    'octolytics-app-id': 'github',
	    'octolytics-dimension-request_id': '7C8DAE2F:13EBF:2F8CDB7:57AEE3BD',
	     dimension1: 'Logged Out',
	     hostname: 'github.com',
	    'user-login': '',
	    'expected-hostname': 'github.com',
	    'js-proxy-site-detection-payload': 'YmIzYTk4MGRhNDZkNzg0ZTI1N2EwYTRhYzgwYmVkYWQ3ZTYxYzRlMDMwZDVmZGEzMTcxZjZmNmU2MDdmZjI2Znx7InJlbW90ZV9hZGRyZXNzIjoiMTI0LjE0MS4xNzQuNDciLCJyZXF1ZXN0X2lkIjoiN0M4REFFMkY6MTNFQkY6MkY4Q0RCNzo1N0FFRTNCRCIsInRpbWVzdGFtcCI6MTQ3MTA3OTM1OH0=',
	    'html-safe-nonce': 'b1034a3fb2bb136aed029ffb0a08f88ca689e32d',
	    'form-nonce': 'a099e06d61f0ed05b2bc0f893e4673d0f5f3279d',
     	title: 'How people build software · GitHub'
    },
    openGraph: {
    	url: 'https://github.com',
    	site_name: 'GitHub',
    	title: 'Build software better, together',
    	description: 'GitHub is where people build software. More than 15 million people use GitHub to discover, fork, and contribute to over 38 million projects.',
    	image: 'https://assets-cdn.github.com/images/modules/open_graph/github-octocat.png',
    	'image:type': 'image/png',
    	'image:width': '1200',
    	'image:height': '620'
    },
    icons: {
        stylesheet: 'https://assets-cdn.github.com/assets/site-c31d97cdffdd1a140b356a16a2e2b37db7c98fa23ce2127f79a61bc338af1083.css',
        preload: 'https://assets-cdn.github.com/assets/github-5a05539a2ab04f10abd2879546db58882d74e2789b0164a23ac4bfdb431a461f.js',
        search: 'https://github.com//opensearch.xml',
        'fluid-icon': 'https://github.com/fluidicon.png',
        'apple-touch-icon': 'https://github.com//apple-touch-icon-180x180.png',
        assets: 'https://assets-cdn.github.com/',
        'mask-icon': 'https://assets-cdn.github.com/pinned-octocat.svg',
        icon: 'https://assets-cdn.github.com/favicon.ico',
        canonical: 'https://github.com/'
    }
}
```
