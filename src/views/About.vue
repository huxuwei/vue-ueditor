<template>
  <div>
    <div class="container-fluid page-container">
        <div style="overflow: auto;">
            <div style="width:975px;"><textarea id="questionName1" name="explainContent[]"></textarea></div>
        </div>
    </div>
  </div>
</template>

<script>

import "../../public/ueditor/dist/utf8-jsp/ueditor.all.js"
import "../../public/ueditor/ue.js"
import "../../public/ueditor/dist/utf8-jsp/lang/zh-cn/zh-cn.js"
import "../../public/ueditor/dist/utf8-jsp/formula-plugin/addFormulaDialog.js"


export default {
  mounted() {
    this.$nextTick(()=>{
      setTimeout(() => {
        var ueQestionName =new UE.ui.Editor({initialFrameHeight:218});
        ueQestionName.render(document.getElementById('questionName1'));
      }, 1000);
    })
  }
}
</script>

<style>

</style>
