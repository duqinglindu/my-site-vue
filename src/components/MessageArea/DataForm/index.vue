<template>
    <div class="dataForm-container" ref="formContainer">
        <div class="form-item">
            <div class="input-area">
                <input type="text" placeholder="用户昵称" maxlength="10" 
                    :disabled="isSubmit"
                    v-model.trim="formData.nickName">
                <span class="tip">{{formData.nickName.length}}/10</span>
            </div>
            <div class="error">{{error.nickName}}</div>
        </div>
        <div class="form-item">
            <div class="text-area">
                <textarea placeholder="请输入内容" 
                    v-model.trim="formData.content"
                    maxlength="300"
                    :disabled="isSubmit"
                    >
                </textarea>
                <span class="tip">{{formData.content.length}}/300</span>
            </div>
            <div class="error">{{error.content}}</div>
        </div>
        <div class="form-item">
            <div class="btn-area">
                <button 
                    :disabled="isSubmit"
                    @click="handleSubmit">{{isSubmit? "提交中" : "提交"}}</button>
            </div>
        </div>
    </div>
</template>

<script>
/* 
    点及提交后抛出一个事件，并且将填的数据传递给父组价
*/
export default {
    data() {
        return {
            formData: {
                nickName: "", //昵称
                content: "", //评论内容
            },
            error: { //错误消息
                nickName: "",
                content: "",
            },
            isSubmit: false, //表单是否正在提交中
        }
    },
    methods: {
        handleSubmit() {
            // 表单验证
            if(!this.formData.nickName) {
                this.error.nickName = "请填写昵称";
            }
            if(!this.formData.content) {
                this.error.content = "请填写内容";
            }
            if(this.error.nickName || this.error.content) {
                return;
            }
            this.isSubmit = true;
            this.$emit("submit", this.formData, ()=> {
                // 父组件处理完后事件后，还要做一些事情
                this.$showMessage({
                    container: this.$refs.formContainer,
                    content: "评论成功",
                    type: "success",
                    duration: 1000,
                    callBack: ()=> {
                        this.isSubmit = false;
                        this.formData.nickName = "";
                        this.formData.content = "";
                    }
                })
            });
        },
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
    .dataForm-container{
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 1em;
    }
    .form-item{
        padding-bottom: 10px;
    }
    .input-area, .text-area{
        position: relative;
    }
    .input-area{
        width: 50%;
        box-sizing: border-box;
        input{
            line-height: 40px;
            height: 40px;
        }
    }
    .tip{
        position: absolute;
        bottom: 5px;
        right: 5px;
        font-size: 12px;
        color: #b4b8bc;
        text-align: center;
    }
    input,
    textarea{
        width: 100%;
        box-sizing: border-box;
        border: 1px dashed @gray;
        color: @words;
        font-size: 14px;
        border-radius: 4px;
        padding: 0 50px 0 15px;
        &:focus {
            border-color: @primary;
        }
    }
    .error{
        padding-top: 5px;
        padding-left: 15px;
        color: @danger;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
    }
    textarea{
        padding-top: 8px;
        padding-right: 0;
        padding-bottom: 16px;
        height: 120px;
        resize: none;
    }
    button{
        cursor: pointer;
        width: 100px;
        height: 34px;
        color: #fff;
        border-radius: 4px;
        background: @primary;
        &:hover {
            background: darken(@primary, 10%);
        }
        &:disabled {
            background: lighten(@primary, 20%);
            cursor: not-allowed;
        }
    }
</style>