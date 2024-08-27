<template>
    <view class='home'>
        <page-frame title="首页" :isRefresherEnabled="false" :isShowNodata="false" :safeAreaInsetBut="false"
            :isLeft="false" background="#F0F3F5">
            <template #bg>
                <view class="home-bg"></view>
            </template>
            <template #titlem>
                <view class="titlem">
                    <view>首页</view>
                    <image src="../../static/img/icon-xiaoxi.png" style="width: 48rpx;height: 48rpx;"
                        @click="jump('/subpackageA/myMessage/myMessage')" />
                </view>
            </template>
            <view class="home-main">
                <view class="home-main-up">
                    <view class="total-profit">
                        <image src="../../static/img/bg-zsy.png" />
                        <view class="total-profit-content">
                            <view>设备总数</view>
                            <view class="under-line" @click="jump('/subpackageA/myEquipment/myEquipment')">{{
                                digitalData.product }}
                            </view>
                        </view>
                    </view>
                    <view class="total-profit-installations">
                        <view class="list">
                            <view>{{ digitalData.inLineProduct }}</view>
                            <view>设备在线数</view>
                        </view>
                        <view class="list">
                            <view>{{ digitalData.outLineProduct }}</view>
                            <view>设备离线数</view>
                        </view>
                        <view class="list">
                            <view class="under-line" @click="jumpTab('/pages/aftermarket/aftermarket')">{{
                                digitalData.aftersalesCount }}</view>
                            <view>售后总数</view>
                        </view>
                        <view class="list">
                            <view class="under-line" @click="jumpTab('/pages/users/users')">{{
                                digitalData.agencyUserCount }}</view>
                            <view>股东成员</view>
                        </view>
                    </view>
                    <view class="total-profit-notice">
                        <view class="total-profit-notice-left">
                            <image src="../../static/img/icon-gonggao.png" style="width: 32rpx;height: 32rpx;" />

                        </view>
                        <view class="total-profit-notice-middle">
                            <tn-notice-bar :data="noticeData" bg-color="RGBA(83, 194, 250, 0)" color="#fff"
                                direction="vertical" />
                        </view>
                        <view class="total-profit-notice-right" @click="jump('/subpackageA/bulletin/bulletin')">更多
                        </view>
                    </view>
                </view>
                <view class="home-main-down">
                    <view class="home-main-down-list">
                        <view class="title">用户</view>
                        <view class="content">
                            <view>
                                <view class="under-line" @click="jumpTab('/pages/users/users')">{{
                                    digitalData.customerCount }}
                                </view>
                                <view>用户人数</view>
                            </view>
                            <view @click="jump('/subpackageA/myEquipment/myEquipment?overDue=0')">
                                <view class="under-line">{{ digitalData.arrearageCount }}</view>
                                <view>欠费人数</view>
                            </view>
                        </view>
                    </view>

                    <!-- <view class="home-main-down-list">
                        <view class="title">渠道</view>
                        <view class="content">
                            <view>
                                <view class="under-line" @click="jumpTab('/pages/users/users')">{{
                                    digitalData.areaAgencyCount }}
                                </view>
                                <view>合伙人数量</view>
                            </view>
                           
                        </view>
                    </view> -->
                    <view class="home-main-down-list">
                        <view class="title">渠道</view>
                        <view class="content">
                            <view>
                                <view>{{ digitalData.areaAgencyCount }}</view>
                                <view>县级渠道</view>
                            </view>
                            <view>
                                <view>{{ digitalData.cityAgencyCount }}</view>
                                <view>市级渠道</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </page-frame>
    </view>
</template>
<script setup name='home'>
import { count } from '../../request/api/index.js'
import { ref, reactive } from 'vue'
import { onShow } from '@dcloudio/uni-app'
onShow(() => {
    getCount()
})

const noticeData = ref([])
const getDigitalData = reactive({})
const digitalData = ref({})
const getCount = function (params) {
    count().then(res => {
        digitalData.value = res.data;
        noticeData.value = res.data.noticeList
            .map(item => item.name)
    })
}


const jump = function (url) {
    uni.navigateTo({
        url
    })
}
const jumpTab = function (url) {
    uni.switchTab({
        url
    })
}
</script>
<style lang='scss' scoped>
.home {
    .home-bg {
        height: 1128rpx;
        background: linear-gradient(180deg, #AFE1FA 0%, #1EB1FA 100%);
    }

    .under-line {
        text-decoration: underline;
        text-underline-offset: 10rpx;
    }

    .titlem {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #14181A;
        line-height: 38rpx;

        view:nth-child(1) {
            margin-right: 42rpx;
        }
    }

    .home-main {
        padding-top: 32rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: 100%;

        .home-main-up {
            height: 860rpx;
            display: flex;
            flex-direction: column;
            padding: 32rpx;
            box-sizing: border-box;
            align-items: center;

            .total-profit {
                width: 400rpx;
                height: 400rpx;
                position: relative;
                margin-bottom: 32rpx;

                .total-profit-content {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    >view:nth-child(1) {
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 500;
                        font-size: 32rpx;
                        color: #616466;
                        line-height: 38rpx;
                        margin-bottom: 26rpx;
                        margin-top: 176rpx;
                    }

                    >view:nth-child(2) {
                        display: flex;
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 500;
                        font-size: 36rpx;
                        line-height: 42rpx;

                        view {
                            font-size: 22rpx;
                        }
                    }
                }

                image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }

            .total-profit-installations {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2, 1fr);

                .list {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    margin-bottom: 40rpx;

                    view:nth-child(1) {
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 600;
                        font-size: 44rpx;
                        color: #FFFFFF;
                        line-height: 52rpx;
                        margin-bottom: 10rpx;
                    }

                    view:nth-child(2) {
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 400;
                        font-size: 32rpx;
                        color: rgba(255, 255, 255, 0.7);
                        line-height: 38rpx;
                    }

                    &:nth-child(2n-1) {
                        position: relative;

                        &::after {
                            display: block;
                            position: absolute;
                            top: 50%;
                            right: 0;
                            transform: translateY(-50%);
                            content: '';
                            width: 1rpx;
                            height: 66rpx;
                            background-color: #D9D9D9;
                            margin-top: 10rpx;
                        }
                    }
                }

                .list {}
            }

            .total-profit-notice {
                padding: 6rpx 24rpx;
                width: 100%;
                background: linear-gradient(180deg, #C8E9FA 0%, #F5F8FA 100%);
                border-radius: 8rpx;
                border: 2rpx solid #F5F5F5;
                box-sizing: border-box;
                display: flex;
                align-items: center;

                .total-profit-notice-left {
                    display: grid;
                    place-content: center
                }

                .total-profit-notice-middle {
                    flex: 1;
                }

                .total-profit-notice-right {
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #1DABF2;
                    line-height: 28rpx;
                }
            }
        }

        .home-main-down {
            flex: 1;
            background: #fff;
            border-radius: 24rpx;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24rpx;
            padding: 32rpx;
            box-sizing: border-box;


            .home-main-down-list {
                .title {
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 500;
                    font-size: 32rpx;
                    color: #2E3133;
                    line-height: 38rpx;
                    margin-bottom: 32rpx;
                }

                .content {
                    min-height: 250rpx;
                    padding: 32rpx;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 20rpx -8rpx rgba(0, 0, 0, 0.1);
                    border-radius: 8rpx;

                    // &>*:not(:last-child) {
                    //    margin-bottom: 32rpx;
                    // }

                    >view {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;

                        view:nth-child(1) {
                            margin-bottom: 16rpx;
                            font-family: PingFang SC, PingFang SC;
                            font-weight: 500;
                            font-size: 36rpx;
                            color: #14181A;
                            line-height: 42rpx;
                        }

                        view:nth-child(2) {
                            font-family: PingFang SC, PingFang SC;
                            font-weight: 400;
                            font-size: 28rpx;
                            color: #616466;
                            line-height: 33rpx;
                        }
                    }
                }
            }
        }
    }
}
</style>