let util = require('../../utils/util.js');
let location = util.location;

new Page({
  data: {
    msg: {},
  },
  location: location,
  onLoad: function(option) {
    'use strict';
    console.log(option);
    this.setData({
      msg: {
        type: option.type,
        title: option.title,
        info: option.info,
        mainButton: option.mainButton,
        mainUrl: option.mainUrl,
        subButton: option.subButton,
        subUrl: option.subUrl,
      },
    });
  },
});
