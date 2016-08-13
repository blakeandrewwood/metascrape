'use strict';
const phantom = require('phantom');
const cheerio = require('cheerio');

/**
 * Useful regex
 *
 */
const patterns = {
  url: /((http(s)?):\/\/)?(www)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi,
  filePath: /^(\/(\/)?\w+)+.*$/
}

const regex = {
  url: new RegExp(patterns.url),
  filePath: new RegExp(patterns.filePath)
}

/**
 * Metascrape
 *
 */
const Metascrape = {

  /**
   * Fetch
   * @param {string} url - website to scrape metadata from.
   * @param {number} timeout - amount of time to wait for website to load.
   *
   */
  fetch(url, timeout) {
    let instance, sitepage, loadedUrl;

    // Create phantom instance
    return phantom.create(['--ignore-ssl-errors=yes', '--load-images=no'])
    .then(inst => {
      instance = inst;
      return instance.createPage();
    })

    // Open webpage
    .then(page => {
      sitepage = page;
      return sitepage.open(url);
    })

    // Get redirected or 'real' url
    .then(status => {
      return sitepage.property('url')
    })

    // Evaluate webpage
    .then(_url => {
      loadedUrl = _url;
      return new Promise((resolve) => {

        // Timeout to load javascript content
        let sleep = (timeout) ? timeout : 0;
        setTimeout(function() {
          var evaluate = sitepage.evaluate(function() {
            var html = document.getElementsByTagName('head')[0].innerHTML;
            return html;
          });
          resolve(evaluate);
        }, sleep);

      });
    })

    // Extract metadata
    .then(rawHtml => {
      sitepage.close();
      instance.exit();
      return Metascrape.extract(loadedUrl, rawHtml);
    })

    // Cleanup & exit
    .catch(error => {
      instance.exit();
      return error;
    });
  },

  /**
   * Extract
   * @param {string} url - webpage that was loaded.
   * @param {string} rawHtml - raw html for webpage to process.
   *
   */
  extract(url, rawHtml) {

    // Response object
    let data = {
      url: url,
      normal :{
      },
      openGraph: {},
      icons: {}
    };

    // Load webpage in cheerio to scrape content
    let $ = cheerio.load(rawHtml);

    // Meta
    $('meta').each((index, element) => {
      if(element.attribs.hasOwnProperty('itemprop')) {
        data.normal[element.attribs.itemprop] = Metascrape.makeFullUrlLink(url, element.attribs.content);
      }
      if(element.attribs.hasOwnProperty('property') &&
        element.attribs.property.indexOf('og:') > -1) {
        let name = element.attribs.property.match(/og:(.*)/).pop();
        data.openGraph[name] = element.attribs.content;
      }
      if(element.attribs.hasOwnProperty('name')) {
        data.normal[element.attribs.name] = element.attribs.content;
      }
    });

    // Title
    if($('title')) {
      data.normal.title = $('title').text();
    }

    // Icons
    $('link').each((index, element) => {
      if(element.attribs.hasOwnProperty('rel') &&
        element.attribs.hasOwnProperty('href')) {
        data.icons[element.attribs.rel] = Metascrape.makeFullUrlLink(url, element.attribs.href);
      }
    });
    return data;
  },

  /**
   * MakeFullUrlLink
   * @param {string} url - webpage that was loaded.
   * @param {string} string - file path.
   *
   */
  makeFullUrlLink(url, string) {
    if(string.indexOf(' ') === -1 && string.match(regex.filePath)) {
      return url + string;
    } else {
      return string;
    }
  },

  /**
   * ValidateUrl
   * @param {string} url - webpage that was loaded.
   *
   */
  validateUrl(url) {
    return url.match(regex.url);
  }

};

module.exports = Metascrape;