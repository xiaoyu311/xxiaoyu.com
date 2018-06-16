$(document).ready(function () {
  var resumeEditorContent = `
  # xiaoyu 个人简历

  ## Skill 
  - 熟悉html、css、javascripy。
  - 熟悉vue、react 技术站。 
  - 有过react-native开发经验（负责android）。
  - 了解微信小程序，有自己小程序项目。
  - 属性express，可独立完成网站开发。
  - 了解mongodb数据库，以及mongoose，node.js。


  ## Hobby
  - 英雄联盟（简直是真爱！😝😝工作后忙了，基本没时间玩了)。


  ## Blog

  - **GitHub: https://github.com/xiaoyu311**
  
  - **博客: http://songhao888.cn/**
  > 如果你喜欢这个效果，Fork [我的项目](https://github.com/xiaoyu311)，打造你自己的简历！`;
  var current = '';
  var count = 0;
  var showResumeContent = function () {
    var len = resumeEditorContent.length;
    return new Promise((resolve, reject) => {
      var showContent = function () {
        var currentLen = current.length;
        if (currentLen < len) {
          current += resumeEditorContent[count];
          count++;
           document.getElementById('mark_dowm').innerHTML = marked(current);
          setTimeout(showContent, 40);
        }
      }
      showContent();
    });
  }
  showResumeContent(0);

});