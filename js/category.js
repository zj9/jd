/*
 * @Author: zhengwei
 * @Date:   2016-07-06 15:00:34
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-07-06 23:29:32
 */

'use strict';
window.onload = function() {
    swipeLeft();
    swipeRight();
}

function swipeLeft() {
    //1.需要实现上下垂直滑动
    //2.需要实现连续滑动	
    //3.需要设置最大允许滑动的距离和最大允许滑动的距离
    //4.如果滑动超过最大的定位值和最小的定位值则让他吸附回去
    //获取左侧分类菜单
    var categoryLeft = document.querySelector('.category-left');
    //获取分类菜单里面的ul
    var swipeUl = categoryLeft.querySelector('ul');
    var lis = swipeUl.querySelectorAll('li');
    //1.添加滑动事件
    var startY = 0; //滑动开始的位置
    var endY = 0; //滑动结束的位置
    var moveY = 0; //滑动中的位置
    var distanceY = 0;
    var currentY = 0; //当前的定位位置 贯穿全局的index
    var maxPosition = 0;
    var minPosition = -(swipeUl.offsetHeight - categoryLeft.offsetHeight);
    var maxSwipe = maxPosition + 150; //最大的移动距离等于最大的定位距离+缓冲区距离
    var minSwipe = minPosition - 150;
    swipeUl.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    swipeUl.addEventListener('touchmove', function(e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        //如果每次都是滑动的距离的话每次都是从起点开始滑
        //就每次就只能移动这么多
        //我们理论上应该是从他上次滑动完成最后那个位置
        //作为我们下一次的起始滑动初始位置
        if ((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe) {
            swipeUl.style.transition = "none";
            swipeUl.style.transform = "translateY(" + (currentY + distanceY) + "px)";
        }
        isMove = true;
    });
    var isMove = false;
    swipeUl.addEventListener('touchend', function(e) {
        currentY += distanceY;
        if (currentY > maxPosition && isMove) {
            currentY = maxPosition;
            swipeUl.style.transform = "translateY(" + currentY + "px)";
            swipeUl.style.transition = "all 0.2s";
        } else if (currentY < minPosition && isMove) {
            currentY = minPosition;
            swipeUl.style.transform = "translateY(" + currentY + "px)";
            swipeUl.style.transition = "all 0.2s";
        }
    });
    swipeUl.addEventListener('click', function(e) {
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
            lis[i].index = i;
        }
        e.target.parentNode.className = "now";
        var index = e.target.parentNode.index;
        var distanceY = -index * 50;
        currentY = distanceY;
        if (currentY < minPosition) {
            currentY = minPosition;
        }
        swipeUl.style.transform = "translateY(" + currentY + "px)";
        swipeUl.style.transition = "all 0.2s";
    });

    swipeUl.addEventListener('touchstart', function(e) {

    });
    swipeUl.addEventListener('touchend', function(e) {
        if (isMove == false) {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = "";
                lis[i].index = i;
            }
            e.target.parentNode.className = "now";
            var index = e.target.parentNode.index;
            var distanceY = -index * 50;
            currentY = distanceY;
            if (currentY < minPosition) {
                currentY = minPosition;
            }
            swipeUl.style.transform = "translateY(" + currentY + "px)";
            swipeUl.style.transition = "all 0.2s";
        }
        isMove = false;
    });
}

function swipeRight() {
    //1.需要实现上下垂直滑动
    //2.需要实现连续滑动	
    //3.需要设置最大允许滑动的距离和最大允许滑动的距离
    //4.如果滑动超过最大的定位值和最小的定位值则让他吸附回去
    //获取左侧分类菜单
    var categoryRight = document.querySelector('.category-right');
    //获取分类菜单里面的ul
    var swipeUl = categoryRight.querySelector('.category-right-content');
    //1.添加滑动事件
    // var startY = 0; //滑动开始的位置
    // var endY = 0; //滑动结束的位置
    // var moveY = 0; //滑动中的位置
    // var distanceY = 0;
    // var currentY = 0; //当前的定位位置 贯穿全局的index
    // var maxPosition = 0;
    // var minPosition = -(swipeUl.offsetHeight - categoryRight.offsetHeight);
    // var maxSwipe = maxPosition + 150; //最大的移动距离等于最大的定位距离+缓冲区距离
    // var minSwipe = minPosition - 150;
    // swipeUl.addEventListener('touchstart', function(e) {
    //     startY = e.touches[0].clientY;
    // });
    // swipeUl.addEventListener('touchmove', function(e) {
    //     moveY = e.touches[0].clientY;
    //     distanceY = moveY - startY;
    //     //如果每次都是滑动的距离的话每次都是从起点开始滑
    //     //就每次就只能移动这么多
    //     //我们理论上应该是从他上次滑动完成最后那个位置
    //     //作为我们下一次的起始滑动初始位置
    //     if ((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe) {
    //         swipeUl.style.transition = "none";
    //         swipeUl.style.transform = "translateY(" + (currentY + distanceY) + "px)";
    //     }
    //     isMove = true;
    // });
    // var isMove = false;
    // swipeUl.addEventListener('touchend', function(e) {
    //     currentY += distanceY;
    //     if (currentY > maxPosition && isMove) {
    //         currentY = maxPosition;
    //         swipeUl.style.transform = "translateY(" + currentY + "px)";
    //         swipeUl.style.transition = "all 0.2s";
    //     } else if (currentY < minPosition && isMove) {
    //         currentY = minPosition;
    //         swipeUl.style.transform = "translateY(" + currentY + "px)";
    //         swipeUl.style.transition = "all 0.2s";
    //     }
    // });
    // swipeUl.addEventListener('click', function(e) {
    //     for (var i = 0; i < lis.length; i++) {
    //         lis[i].className = "";
    //         lis[i].index = i;
    //     }
    //     e.target.parentNode.className = "now";
    //     var index = e.target.parentNode.index;
    //     var distanceY = -index * 50;
    //     currentY = distanceY;
    //     if (currentY < minPosition) {
    //         currentY = minPosition;
    //     }
    //     swipeUl.style.transform = "translateY(" + currentY + "px)";
    //     swipeUl.style.transition = "all 0.2s";
    // });
    // swipe(swipeUl, "X", 150);
    swipe(swipeUl, "Y", 150);
}

function swipe(dom, direction, buffer) {
    if (typeof dom == "object") {
        //1.需要实现上下垂直滑动
        //2.需要实现连续滑动	
        //3.需要设置最大允许滑动的距离和最大允许滑动的距离
        //4.如果滑动超过最大的定位值和最小的定位值则让他吸附回去
        //获取左侧分类菜单
        // var categoryRight = document.querySelector('.category-right');
        //获取分类菜单里面的ul
        // var dom = categoryRight.querySelector('.category-right-content');
        //1.添加滑动事件
        var start = 0; //滑动开始的位置
        var move = 0; //滑动中的位置
        var distanceY = 0;
        var current = 0; //当前的定位位置 贯穿全局的index
        var maxPosition = 0;
        var minPosition = 0;
        if (direction == "Y") {
            minPosition = -(dom.offsetHeight - dom.parentNode.offsetHeight);
        } else {
            minPosition = -(dom.offsetWidth - dom.parentNode.offsetWidth);
        }
        var maxSwipe = maxPosition + buffer; //最大的移动距离等于最大的定位距离+缓冲区距离
        var minSwipe = minPosition - buffer;
        dom.addEventListener('touchstart', function(e) {
            if (direction == "Y") {
                start = e.touches[0].clientY;
            } else {
                start = e.touches[0].clientX;
            }
        });
        dom.addEventListener('touchmove', function(e) {
            if (direction == "Y") {
                move = e.touches[0].clientY;
            } else {
                move = e.touches[0].clientX;
            }
            distanceY = move - start;
            //如果每次都是滑动的距离的话每次都是从起点开始滑
            //就每次就只能移动这么多
            //我们理论上应该是从他上次滑动完成最后那个位置
            //作为我们下一次的起始滑动初始位置
            if ((current + distanceY) < maxSwipe && (current + distanceY) > minSwipe) {
                removeTransition(dom);
                setTranslate(direction, (current + distanceY));
            }
            isMove = true;
        });
        var isMove = false;
        dom.addEventListener('touchend', function(e) {
            current += distanceY;
            if (current > maxPosition && isMove) {
                current = maxPosition;
            } else if (current < minPosition && isMove) {
                current = minPosition;
            }
            setTranslate(direction, current);
            addTransition(dom);
        });

        function setTranslate(direction, distance) {
            dom.style.transform = "translate" + direction + "(" + distance + "px)";
        }

        function addTransition(dom) {
            dom.style.transition = "all 0.2s";
        }

        function removeTransition(dom) {
            dom.style.transition = "none";
        }
    }
}
