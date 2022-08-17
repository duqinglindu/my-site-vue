<template>
<!-- 侧栏中联系方式的组件 该组件不通用只是在侧边栏组件中使用 -->
    <ul class="contact-container">
        <li>
            <a href="" target="_blank">
                <div class="icon">
                    <Icon type="github" />
                </div>
                <!-- <span>Du-Edu</span> -->
                <span>{{data? data.githubName: ""}}</span>
            </a>
        </li>
        <li>
            <!-- 点击发送邮件 -->
            <a href="mailto:2083883586@qq.com">
                <div class="icon">
                    <Icon type="mail" />
                </div>
                <span>2083883588@qq.com</span>
            </a>
        </li>
        <li>
            <!-- 点击qq弹出聊天框 -->
            <a href="">
                <div class="icon">
                    <Icon type="qq" />
                </div>
                <span>2083883588</span>
            </a>
            <div class="pop">
                <!-- 弹出层 -->
                <img :src="data.qqQrCode" alt="">
            </div>
        </li>
        <li>
            <a>
                <div class="icon">
                    <Icon type="weChat" />
                </div>
                <span>du is powerful.</span>
            </a>
            <div class="pop">
                <!-- 弹出层 -->
                <img :src="data.weixinQrCode" alt="">
            </div>
        </li>
    </ul>
</template> 

<script>
import Icon from "@/components/Icon";
import {mapState} from "vuex";

export default {
    components: {
        Icon,
    },
    computed: mapState("setting", ['data']),
    
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
    .contact-container{
        padding: 20px;
        color: @gray;
        li{
            @itemHeight: 30px;
            height: @itemHeight;
            line-height:  @itemHeight;
            margin: 14px 0;
            position: relative;
            &:hover{
                .pop{
                    transform: scaleY(1);
                }
            }
            a{
                display: flex;
                align-items: center;
                cursor: pointer;
                font-size: 14px;
                .icon{
                    font-size: 26px;
                    width: 36px;
                }
            }
            .pop{
                position: absolute;
                left: 0;
                bottom: @itemHeight + 5px;
                padding: 10px 15px;
                background: #fff;
                border-radius: 5px;
                transform: scaleY(0);
                transform-origin: center bottom;
                transition: .3s;
                img{
                    width: 150px;
                    height: 150px;
                }
                &::after{
                    content: "";
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%) rotate(45deg);
                    width: 8px;
                    height: 8px;
                    bottom: -4px;
                    background: #fff;
                }
            }
        }   
    }   
</style>