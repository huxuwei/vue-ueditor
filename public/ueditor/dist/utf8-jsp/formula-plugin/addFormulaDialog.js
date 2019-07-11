var formulaContent ='',formulaExp;
var Ue = window.UE
UE.registerUI('formula', function(editor, uiname){

    //var formulaContent ='',formulaExp;
    // 创建dialog
    var kfDialog = new UE.ui.Dialog({

        // 指定弹出层路径
        iframeUrl: editor.options.UEDITOR_HOME_URL + '/formula-plugin/components/myscript-math-web/demo/index.html',
        // 编辑器实例
        editor: editor,
        // dialog 名称
        name: uiname,
        // dialog 标题
        title: '插入公式 - Formula',

        // dialog 外围 css
        cssRules: 'width:900px; height: 450px;',

        //如果给出了buttons就代表dialog有确定和取消
        buttons:[
            {
                className:'edui-okbutton',
                label:'插入公式',
                onclick:function () {
                    kfDialog.close(true);
                    //alert(editor.getContent());
                   // editor.execCommand('inserthtml',formulaContent)
                   var s = document.createElement('span'); 
                   katex.render(formulaExp,s);
                   //editor.execCommand('inserthtml','<div style="display:inline-block;margin-left:10px;margin-right:10px;">'+s.innerHTML+'</div>');
                   //katex.render('<a>ccc</a>'+formulaExp+'<span>aaa</span>',document.body);

                  //editor.execCommand('inserthtml',formulaExp);
                  var latexImg = "<img src='http://latex.codecogs.com/gif.latex?"+formulaExp+"'/>";
                  editor.execCommand('inserthtml',latexImg);
                }
            },
           /* {
                className:'edui-cancelbutton',
                label:'取消',
                onclick:function () {
                    kfDialog.close(false);
                }
            }*/
        ]});

    editor.ready(function(){
        UE.utils.cssRule('kfformula', 'img.kfformula{vertical-align: middle;}', editor.document);
    });

    var iconUrl = editor.options.UEDITOR_HOME_URL + 'kityformula-plugin/kf-icon.png';
    var tmpLink = document.createElement('a');
    tmpLink.href = iconUrl;
    tmpLink.href = tmpLink.href;
    iconUrl = tmpLink.href;

    var kfBtn = new UE.ui.Button({
        name:'插入' + uiname,
        title:'插入公式-' + uiname,
        //需要添加的额外样式，指定icon图标
        cssRules :'background: url("' + iconUrl + '") !important',
        onclick:function () {
            //渲染dialog
            kfDialog.render();
            kfDialog.open();
        }
    });

    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function () {
        var state = editor.queryCommandState(uiname);
        if (state == -1) {
            kfBtn.setDisabled(true);
            kfBtn.setChecked(false);
        } else {
            kfBtn.setDisabled(false);
            kfBtn.setChecked(state);
        }
    });
    window.onsuccessFormula = function(val,exp){
        formulaContent = val;
        formulaExp = exp;
    };
    return kfBtn;


});

