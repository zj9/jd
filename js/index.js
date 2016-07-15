/*
 * @Author: zhengwei
 * @Date:   2016-06-22 16:15:42
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-07-06 11:39:55
 */

'use strict';
window.onload = function() {
    //调用轮播图JS
    slide();
    //调用搜索框JS特效
    search();
    //调用倒计时JS
    downTime();

};

function downTime() {
    //1.总共有5个小时的倒计时
    //2.每隔一秒要减一秒 小时得换成算成秒
    //3.设置定时器每秒总时间--
    //4.设置到倒计时标签上
    var time = 5 * 60 * 60; //5个小时的总秒数
    var seckillTime = document.querySelectorAll('.seckill-time')[0];
    var spans = seckillTime.querySelectorAll('span');
    var timer = setInterval(function() {
        time--; //每秒总时间--
        //设置到倒计时标签上
        //1.设置时  分十位和个位
        //2.设置分  分十位和个位
        //3.设置秒  分十位和个位 
        var h = time / 3600; //求小时 比如 7200 / 3600 == 2 小时
        var m = time % 3600 / 60; //求分钟7300 % 3600 ==  100秒  / 60 == 1分 
        var s = time % 60; //求秒100 % 60  == 40
        //设置到倒计时标签
        spans[0].innerHTML = Math.floor(h / 10); //求十位  23 /10  == 2
        spans[1].innerHTML = Math.floor(h % 10); //求个位 23 % 10 == 3
        spans[3].innerHTML = Math.floor(m / 10); //求十位  23 /10  == 2
        spans[4].innerHTML = Math.floor(m % 10); //求个位 23 % 10 == 3
        spans[6].innerHTML = Math.floor(s / 10); //求十位  23 /10  == 2
        spans[7].innerHTML = Math.floor(s % 10); //求个位 23 % 10 == 3
    }, 1000);
}
//轮播图JS
function slide() {
    //1.轮播图要自动播
    //2.轮播可以无缝轮播
    //3.小圆点要跟着轮播图切换
    //4.轮播图要滑动 从左往右滑 切换到上一张 从右往左滑要切换到下一张
    //1.定义一个定时器然后每隔几秒 切换一张图片
    //那怎么切换图片 设置ul的translateX() 1*10 2*10 3*30
    var slideUl = document.querySelector('#slide').querySelectorAll('ul')[0];
    var index = 1; //定义一个索引值
    var timer = setInterval(function() {
        //让ul移动 得知道要移动多少
        index++;
        //设置ul的translateX的值
        //获取ul
        //谨记 transform 一定别错了 translateX   单位一定要记得
        setTranslateX(-index * slideWidth);
        //加过渡
        addTransition();
    }, 1000);
    //为什么要添加过渡完成事件因为第8张播到第一张
    // 还在播的过程中突然就跳到了第一张
    // 我们应该等他第8张播到第一张播完才让index偷偷回到第一张的index
    // 过渡完了之后有一个事件可以触发transitionend
    //谁过渡的是不是ul过渡
    //给ul添加过渡完成事件
    //使用CSS3里面的一些高级事件 要使用h5的高级JS添加事件方式
    var points = document.querySelectorAll('#slide ul')[1]; //获取小圆点所在的ul
    var lis = points.querySelectorAll('li'); //获取ul里面的所有li
    slideUl.addEventListener('transitionend', function() {
        // console.log('过渡完成了' + index);
        // 等过渡完成才偷偷回到第一张
        if (index >= 9) {
            console.log(index);
            index = 1;
            //设置ul的translateX的值
            //获取ul
            //谨记 transform 一定别错了 translateX   单位一定要记得
            setTranslateX(-index * slideWidth);
            //删除过渡
            removeTransition();
        } else if (index <= 0) {
            index = 8;
            setTranslateX(-index * slideWidth);
            //删除过渡
            removeTransition();
        }
        //1.实现下面的小圆点跟着走
        //1.得获取所有小圆点元素
        //2.得给所有小圆点都清空类名
        //3.给当前这个图片对应的小圆点添加类名
        //4.在等图片切换完成才切换小点
        //所有我们的设置小圆点代码应该放到过渡完成之后
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
        }
        // lis[8].className = "now";
        lis[index - 1].className = "now";
    });
    //1.实现轮播图左右滑动
    //1.首先得知道他往哪个方向滑动
    //2.如果是从右往左滑切换到下一张 index++
    //3.index++加完或者减都要设置一下定位 也得过渡
    // 1.我们们要给ul或者div添加滑动事件
    var startX = 0; //开始的位置
    var endX = 0; //结束的位置
    var distanceX = 0; //移动的距离
    var moveX = 0; //移动中的位置
    var moveDistanceX; //滑动中的时候的移动距离
    slideUl.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        //我们在滑动的过程中定时器也还在走
        //所以们滑动的时候可能就滑到2张图
        //我们做法是在滑动的时候要清除定时器不让她在继续自动播
        clearInterval(timer);
    });
    // -1000px 1000px +100  == -1100px
    //1.我们滑动中的时候要看得到上一张或者下一张的一点点
    //1.添加滑动中的事件
    //2.得获取他滑动中的位置
    //3.设置滑动中距离+之前的移动的位置
    //4.设置到Ul身上 
    slideUl.addEventListener('touchmove', function(e) {
        moveX = e.touches[0].clientX;
        moveDistanceX = moveX - startX; //滑动中的滑动距离
        // console.log(moveDistanceX);
        var x = moveDistanceX + -index * slideWidth;
        //设置到ul身上
        setTranslateX(x);
        //因为我们在滑动中的时候已经是很慢几十像素 或者1-200
        removeTransition();
    })
    slideUl.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        distanceX = endX - startX;
        // 这时候我们在滑动的时候如果不超过一张图片的1/3就不让他滑动
        // 让他吸附回去(弹回去)
        if (Math.abs(distanceX) > (slideWidth * 1 / 3)) {
            //判断滑动的距离是正的还是负的 负的就是从右往左正的是从左往右
            if (distanceX < 0) {
                //右往左滑切换到下一张 index++
                index++;
                //到处都要设置这个移动的值
                setTranslateX(-index * slideWidth);
                //加过渡
                addTransition();
            } else {
                //左往右滑切换到上一张 index--
                index--;
                setTranslateX(-index * slideWidth);
                //加过渡
                addTransition();
            }
        }
        //我们如果不超过1/3要让他吸附回去 index 既不加也不减
        index = index;
        setTranslateX(-index * slideWidth);
        //加过渡
        addTransition();
        //建议大家在重新设置定时器在清除一下确保没有问题
        clearInterval(timer);
        //滑动完成之后要重新开始让他自动播设置回去
        timer = setInterval(function() {
            //让ul移动 得知道要移动多少
            index++;
            //设置ul的translateX的值
            //获取ul
            //谨记 transform 一定别错了 translateX   单位一定要记得
            setTranslateX(-index * slideWidth);
            //加过渡
            addTransition();
        }, 1000);
    });

    //获取一张轮播图的宽度
    var slideWidth = document.querySelector('#slide').offsetWidth;
    //封装设置移动位置的函数
    function setTranslateX(x) {
        //因为我们封装函数要考虑的东西多所以我们为了兼容性
        //我们使用px
        slideUl.style.transform = "translateX(" + x + "px)";
    }
    //封装添加过渡的函数
    function addTransition() {
        slideUl.style.transition = "all 0.2s";
    }
    //封装删除过渡函数
    function removeTransition() {
        slideUl.style.transition = "none";
    }
    //1.要知道他是往左滑还是往右滑 往左滑要切换到下一张
    //往右滑要切换到上一张
    // var startX = 0;
    // var endX = 0;
    // slideUl.addEventListener('touchstart', function(e) {
    //     //滑动开始 
    //     startX = e.touches[0].clientX;

    // });
    // slideUl.addEventListener('touchmove', function(e) {
    //     //滑动开始 
    // });
    // slideUl.addEventListener('touchend', function(e) {
    //     //滑动开始 
    //     // console.log(e.changedTouches[0].clientX);
    //     console.log(e.changedTouches[0].clientX - startX);
    //     // 正值是从左往右滑 负值是从右往左滑
    //     // 左往右滑 是上一张
    //     // 右往左滑 是下一张
    // });
}
// function slide() {
//     // 轮播图得自动播
//     // 首先得获取轮播图这个元素
//     // 然后设置一个定时器每一秒播到下一张
//     // 那怎么让定时器每秒播一张呢我们需要每秒切换一张图片
//     // 我们使用CSS3的移动让他每一秒让ul往左移动一张图片的距离
//     // 然后我们每次移动的距离就是当前这种图片距离最左边的位置
//     // 然后每一张图移动的距离的当前图片的下标乘以一张图的宽度
//     // 图片的下标是从1开始的
//     var slideBox = document.querySelector('#slide'); //获取轮播图的父元素大盒子
//     var slideUl = slideBox.querySelectorAll('ul')[0];
//     var width = slideBox.offsetWidth;
//     var index = 1;
//     var points = slideBox.querySelectorAll('ul')[1].querySelectorAll('li');
//     var timer = setInterval(function() {
//         index++;

//         //切记transform别写错了 别写错 tranform  transfrom写错了但是也不生效
//         //切记translateX也别写错了 然后注意单位一定要加
//         slideUl.style.transform = 'translateX(' + -index * width + 'px)';
//         // 然后我们每一次切换图片的时候都让他过渡过去这样好看一些
//         slideUl.style.transition = "all 0.2s";
//         // 但是这样写又有个问题到最后一张跳回到第一张的时候是不应该让他过渡的
//         // 应该等他过渡完了让他悄悄的跑到第一张
//         //那这时候我们怎么知道什么时候过渡完成了呢
//         //有一个过渡完成的事件 之前做动画是不是也有一个动画完成事件
//         //所以我们添加一个过渡完成事件在那里判断index的值是不是最后一张如果是的话
//         //把他切到第一张并且这时候不要过渡
//         //那我们给谁添加的过渡所以我们给谁添加他的过渡完成事件
//     }, 1000);
//     //给ul添加过渡完成事件
//     slideUl.addEventListener('transitionend', function() {
//         console.log("过渡完了" + index);
//         //在过渡完成之后我们判断index是不是最后一张
//         if (index >= 8) {
//             index = 0;
//             slideUl.style.transition = "none";
//             slideUl.style.transform = 'translateX(' + -index * width + 'px)';
//         } else if (index <= 0) {
//             index = 8;
//             slideUl.style.transition = "none";
//             slideUl.style.transform = 'translateX(' + -index * width + 'px)';
//         }
//         for(var i = 0 ; i < points.length;i++){
//             points[i].className = "";
//         }
//         points[index - 1].className = "now";
//     });
//     //第二步  做滑动
//     //得知道手往哪个方向滑动
//     //然后在去实现左滑的时候切换到下一张
//     //右滑的时候切换到上一张
//     //那么我们怎么知道他的左滑还是右滑呢
//     //我们要注册滑动事件
//     //判断他开始滑动到滑动结束的距离
//     //如果的负值代表左滑正值代表右滑
//     //添加滑动事件
//     var startX = 0;
//     var endX = 0;

//     slideBox.addEventListener('touchstart', function(e) {
//         clearInterval(timer);
//         slideUl.style.transition = "none";
//         startX = e.touches[0].clientX;
//     })
//     slideBox.addEventListener('touchend', function(e) {
//         endX = e.changedTouches[0].clientX;
//         console.log(endX - startX);
//         //然后判断他的的滑动距离是正值还是负值
//         //正值的右滑负值是左滑
//         if (endX - startX > 0) {
//             //右滑 切换到上一张
//             index--;
//             slideUl.style.transform = 'translateX(' + -index * width + 'px)';
//             slideUl.style.transition = "all 0.2s";
//             //由于我们要切换到上一张图片所以这时候上一张是-1的时候上一张没有图片了
//             //这时候的话就出现问题所以我们用9张图片就不能实现左右滑动所以我们要使用10张图片
//             //在第一张是最后一张图片然后最后一张是第一张图片
//         } else if (endX - startX < 0) {
//             //左滑切换到下一张
//             index++;
//             slideUl.style.transform = 'translateX(' + -index * width + 'px)';
//             slideUl.style.transition = "all 0.2s";
//         }
//         // 确保定时器是清除的再添加定时器
//         clearInterval(timer);
//         timer = setInterval(function() {
//             index++;
//             //切记transform别写错了 别写错 tranform  transfrom写错了但是也不生效
//             //切记translateX也别写错了 然后注意单位一定要加
//             slideUl.style.transform = 'translateX(' + -index * width + 'px)';
//             // 然后我们每一次切换图片的时候都让他过渡过去这样好看一些
//             slideUl.style.transition = "all 0.2s";
//             // 但是这样写又有个问题到最后一张跳回到第一张的时候是不应该让他过渡的
//             // 应该等他过渡完了让他悄悄的跑到第一张
//             //那这时候我们怎么知道什么时候过渡完成了呢
//             //有一个过渡完成的事件 之前做动画是不是也有一个动画完成事件
//             //所以我们添加一个过渡完成事件在那里判断index的值是不是最后一张如果是的话
//             //把他切到第一张并且这时候不要过渡
//             //那我们给谁添加的过渡所以我们给谁添加他的过渡完成事件
//         }, 1000);
//     })
// }
// 搜索框JS
function search() {
    //1.我们在屏幕往下滚动的时候要让 顶部通栏的透明度渐变 加透明度
    //2.我们在屏幕往上滚动的时候要让顶部通栏的透明度渐变 减透明度
    //1.添加滚动事件 计算滚动的距离
    //获取顶部通栏这个元素
    var topbar = document.querySelector('.topbar');
    var slideHeight = document.querySelector('#slide').offsetHeight;

    window.onscroll = function() {
        //要设置顶部通栏的透明度 我们要拿到顶部通栏这个元素
        //给顶部通栏设置透明度
        //透明度怎么计算呢是滚动的距离除以轮播的高度就是透明度值
        //获取屏幕滚动的距离
        var scrollTop = document.body.scrollTop;
        var opcity = scrollTop / slideHeight;
        // console.log(opcity);
        //设置到topbar这个元素身上
        topbar.style.background = "rgba(201,21,25," + opcity + ")";
    }
}
