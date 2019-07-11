
var baseUrl= ((typeof location !== 'undefined') && location.href.match(/[^?#]*\//)[0]) ||((typeof process !== 'undefined')  && process.cwd()+'/' );
    var UEDITOR_HOME_URL = window.UEDITOR_HOME_URL = baseUrl + 'ueditor/dist/utf8-jsp/';

	window.UEDITOR_CONFIG = Object.assign(window.UEDITOR_CONFIG || {}, {
		serverUrl : baseUrl+'../controller.jsp',
		UEDITOR_HOME_URL: UEDITOR_HOME_URL,
        //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
        toolbars: [[
            'source','fullscreen', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'insertimage', 'insertframe', 'template',  '|',
            'horizontal', 'spechars', 'snapscreen', 'wordimage', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
            'preview', 'searchreplace', 'help', 'drafts','|','formular'
        ]],

        autoFloatEnabled : false, //不要浮动
        zIndex: 0,// 弹框的值为100，不能太高, 去除浮动后需要设置为0

	});

	
	