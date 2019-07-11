<template>
  <div class="ueditor">
    <vue-ueditor-wrap v-model="content" @beforeInit="addCustomDialog" :config="myConfig">
    </vue-ueditor-wrap>
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";

export default {
  name: "Ueditor",
  components: { VueUeditorWrap },
  data() {
    return {
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        // serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
        // serverUrl: 'http://localhost:8090/ueditor/ueditorConfig',
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: "/ueditor/dist/utf8-jsp/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 工具栏是否可以浮动
        autoFloatEnabled: false,
        // 初始容器高度
        initialFrameHeight: 340,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 关闭自动保存
        enableAutoSave: true
      },
      content: ""
    };
  },
  methods: {
    addCustomDialog(editorId) {
      var formulaContent = "",
        formulaExp;
      var UE = window.UE;
      UE.registerUI("formula", function(editor, uiname) {
        //var formulaContent ='',formulaExp;
        // 创建dialog
        var kfDialog = new UE.ui.Dialog({
          // 指定弹出层路径
          iframeUrl:
            // editor.options.UEDITOR_HOME_URL +
            "ui.html",
          // 编辑器实例
          editor: editor,
          // dialog 名称
          name: uiname,
          // dialog 标题
          title: "插入公式 - Formula",

          // dialog 外围 css
          cssRules: "width:900px; height: 450px;",

          //如果给出了buttons就代表dialog有确定和取消
          buttons: [
            {
              className: "edui-okbutton",
              label: "插入公式",
              onclick: function() {
                kfDialog.close(true);
                //alert(editor.getContent());
                // editor.execCommand('inserthtml',formulaContent)
                var s = document.createElement("span");
                katex.render(formulaExp, s);
                //editor.execCommand('inserthtml','<div style="display:inline-block;margin-left:10px;margin-right:10px;">'+s.innerHTML+'</div>');
                //katex.render('<a>ccc</a>'+formulaExp+'<span>aaa</span>',document.body);

                //editor.execCommand('inserthtml',formulaExp);
                var latexImg =
                  "<img src='http://latex.codecogs.com/gif.latex?" +
                  formulaExp +
                  "'/>";
                editor.execCommand("inserthtml", latexImg);
              }
            }
            /* {
             className:'edui-cancelbutton',
             label:'取消',
             onclick:function () {
                 kfDialog.close(false);
             }
         }*/
          ]
        });

        editor.ready(function() {
          UE.utils.cssRule(
            "kfformula",
            "img.kfformula{vertical-align: middle;}",
            editor.document
          );
        });

        var iconUrl =
          editor.options.UEDITOR_HOME_URL + "kityformula-plugin/kf-icon.png";
        var tmpLink = document.createElement("a");
        tmpLink.href = iconUrl;
        tmpLink.href = tmpLink.href;
        iconUrl = tmpLink.href;

        var kfBtn = new UE.ui.Button({
          name: "插入" + uiname,
          title: "插入公式-" + uiname,
          //需要添加的额外样式，指定icon图标
          cssRules: 'background: url("' + iconUrl + '") !important',
          onclick: function() {
            //渲染dialog
            kfDialog.render();
            kfDialog.open();
          }
        });

        //当点到编辑内容上时，按钮要做的状态反射
        editor.addListener("selectionchange", function() {
          var state = editor.queryCommandState(uiname);
          if (state == -1) {
            kfBtn.setDisabled(true);
            kfBtn.setChecked(false);
          } else {
            kfBtn.setDisabled(false);
            kfBtn.setChecked(state);
          }
        });
        window.onsuccessFormula = function(val, exp) {
          formulaContent = val;
          formulaExp = exp;
        };
        return kfBtn;
      });
      // window.UE.registerUI(
      //   "test-dialog",
      //   function(editor, uiName) {
      //     // 创建 dialog
      //     var dialog = new window.UE.ui.Dialog({
      //       // 指定弹出层中页面的路径，这里只能支持页面，路径参考常见问题 2
      //       iframeUrl: "/customizeDialogPage.html",
      //       // 需要指定当前的编辑器实例
      //       editor: editor,
      //       // 指定 dialog 的名字
      //       name: uiName,
      //       // dialog 的标题
      //       title: "这是一个自定义的 Dialog 浮层",
      //       // 指定 dialog 的外围样式
      //       cssRules: "width:600px;height:300px;",
      //       // 如果给出了 buttons 就代表 dialog 有确定和取消
      //       buttons: [
      //         {
      //           className: "edui-okbutton",
      //           label: "确定",
      //           onclick: function() {
      //             dialog.close(true);
      //           }
      //         },
      //         {
      //           className: "edui-cancelbutton",
      //           label: "取消",
      //           onclick: function() {
      //             dialog.close(false);
      //           }
      //         }
      //       ]
      //     });

      //     // 参考上面的自定义按钮
      //     var btn = new window.UE.ui.Button({
      //       name: "dialog-button",
      //       title: "鼠标悬停时的提示文字",
      //       cssRules: `background-image: url('/test-dialog.png') !important;background-size: cover;`,
      //       onclick: function() {
      //         // 渲染dialog
      //         dialog.render();
      //         dialog.open();
      //       }
      //     });

      //     return btn;
      //   },
      //   0 /* 指定添加到工具栏上的那个位置，默认时追加到最后 */,
      //   editorId /* 指定这个UI是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
      // );
    }
  }
};
</script>

<style scoped>
</style>