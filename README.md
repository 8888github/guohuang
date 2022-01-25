导读
1a = 7.5px
1rem = 75px

因此，对于视觉稿上的元素的尺寸换算，只需要原始px值除以rem基准px值即可。例如240px * 120px的元素，最后转换为3.2rem * 1.6rem。

240/75 = 3.2rem;
120/75 = 3.2rem;


字体不使用rem的方法
字体的大小不推荐用rem作为单位。所以对于字体的设置，仍旧使用px作为单位，并配合用data-dpr属性来区分不同dpr下的的大小。


单位换算 10px/100  = ... rem

6 px = 0.06rem

8 px = 0.08rem

10 px = 0.1rem

12 px = 0.12rem

14 px = 0.14rem

16 px = 0.16rem

18 px = 0.18rem

24 px = 0.24rem

26 px = 0.26rem

28 px = 0.28rem

54 px = 0.54rem

56 px = 0.56rem

104 px = 1.04rem



