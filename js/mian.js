window.onload = function () {

   

    // 域名
    let API = "http://china-air.t1.mget.cn";
    // 上传接口
    const uploadUrl = "http://china-air.t1.mget.cn/upload.php";
    // 表单提交接口
    const fromUrl = "http://china-air.t1.mget.cn/web.php";


    // 初始化
    let show_img = false;
    function showAn() {

        // 展开按钮
        let onOan = document.getElementById("onOan");
        let oan_img = document.getElementById("oan_img");
        let oshow_img = document.getElementById("show_img");
        let ospread_box = document.querySelector(".spread_box")


        show_img = !show_img;
        if (show_img) {
           oshow_img.src = "./image/box2_all.png";
           oan_img.src = "./image/top.png";
           onOan.innerHTML = "收起";
           ospread_box.style.marginTop = "-1rem"
           ospread_box.style.background = "none";

        } else {
            oshow_img.src = "./image/box2_show.png";
            oan_img.src = "./image/dow.png";
            onOan.innerHTML = "展开";
            ospread_box.style.height = "1.2rem"
            ospread_box.style.marginTop = "-1.2rem"
            ospread_box.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF";
            
        }
    }

    onOan.addEventListener('click', showAn);


    let otablist = document.querySelectorAll(".tab");
    let onTab = document.getElementById("onTab");
    let otext_main1 = document.getElementById("text_main1");
    let otext_main2 = document.getElementById("text_main2");


    // 提示弹框
    function tips(title) {
        let otips = document.getElementById("tips");
        let time = null;
        otips.style.display = "block";
        otips.innerHTML = title;
        clearTimeout(time)
        time = setTimeout(function () {
            otips.style.display = "none";
            clearTimeout(time)
        }, 3200)
    }

    // 登记个人信息报名
    let per_nfor = {};

    //获取个人信息 
    function getperInfor() {

        let card = document.getElementById("form_card1");
        let name = document.getElementById("form_name1");
        let mobile = document.getElementById("form_mobile1");
        let img1 = document.getElementById("form_img1");
        let img2 = document.getElementById("form_img2");

        per_nfor.ca_crad = card.value;
        per_nfor.name = name.value;
        per_nfor.mobile = mobile.value;
        per_nfor.work_card = img1.src;
        per_nfor.gold_card = img2.src;
        per_nfor.type = 1;

    }

    // 登记国航凤凰知音会员卡报名
    let club_card = {};
    function getClubCard() {

        let name = document.getElementById("form_name2");
        let form_identity2 = document.getElementById("form_identity2");
        let img1 = document.getElementById("form2_img1");
        let img2 = document.getElementById("form2_img2");

        club_card.name = name.value;
        club_card.id_crad = form_identity2.value;
        club_card.work_card = img1.src;
        club_card.gold_card = img2.src;
        club_card.type = 2;

    }


    // 选项卡切换
    for (let i = 0; i < otablist.length; i++) {
        otablist[i].addEventListener('click', function () {
            if (i == 0) {
            
                onTab.classList.add("tab_right");
                onTab.classList.remove("tab_left");
                otext_main1.style.display = "block";
                otext_main2.style.display = "none";

                getperInfor();

            }
            if (i == 1) {
       
                onTab.classList.add("tab_left")
                onTab.classList.remove("tab_right");
                otext_main2.style.display = "block";
                otext_main1.style.display = "none";

                getClubCard();
            }
        })
    }


    // 个人信息验证
    function fromAlidation1(per_nfor) {
        if (per_nfor.ca_crad.trim() == "") {
            tips("请输入国航会员卡号");
            return false;
        }

        if (per_nfor.name.trim() == "") {
            tips("请输入姓名");
            return false;
        }

        if (per_nfor.mobile.trim() == "") {
            tips("请填写手机号");
            return;
        } else if (!(/^1[3|4|5|7|8|9][0-9]{9}$/.test(per_nfor.mobile))) {
            tips("请填写正确的手机号");
            return false;
        }

        if (per_nfor.work_card == "") {
            tips("请添加广汽集团员工卡照片");
            return false;
        }

        if (per_nfor.gold_card == "") {
            tips("请添加国内或其他各航司金卡");
            return false;
        }

        return true;
    }



    // 提交个人信息表单
    let onSubmit1 = document.getElementById("onSubmit1");
    onSubmit1.addEventListener('click', function () {

        let time = null;
        let loading = document.getElementById("loading_M");
       
       
        // 获取信息
        getperInfor();

        // 验证
        if(!fromAlidation1(per_nfor)){
            return false
        }
        loading.style.display = "block";

        $.ajax({
            url: fromUrl,
            async: false,
            type: 'post',
            data: per_nfor,
            success: function (res) {
                // tips(res)
                clearTimeout(time)
                time = setTimeout(() => {
                    loading.style.display = "none";
                    window.location.href = "../succeed.html";
                    clearTimeout(time)
                }, 1800);
            }
        }) 

    })


    // 会员卡验证
    function fromAlidation2(club_card) {

        if (club_card.name.trim() === "") {
            tips("请输入真实姓名");
            return false;
        }
        if (club_card.id_crad.trim() === "") {
            tips("请输入身份证号码");
            return false;
        }else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(club_card.id_crad.trim()))){
            tips("请输入正确的身份证号码");
            return false
        }

        if (club_card.work_card === "") {
            tips("请添加广汽集团员工卡照片");
            return false;
        }

        if (club_card.gold_card === "") {
            tips("请添加国内或其他各航司金卡");
            return false;
        }

        return true;
    }


    // 提交会员卡
    let onSubmit2 = document.getElementById("onSubmit2");
    onSubmit2.addEventListener('click', function () {

        let loading = document.getElementById("loading_M");
        let time = null;

        getClubCard();
        

        if(!fromAlidation2(club_card)){
            return
        }
        loading.style.display = "block";


        $.ajax({
            url: fromUrl,
            async: false,
            type: 'post',
            data: club_card,
            success: function (res) {
                // tips(res)
                clearTimeout(time)
                time = setTimeout(() => {
                    loading.style.display = "none";
                    window.location.href = "../succeed.html";
                    clearTimeout(time)
                }, 1800);
            }
        })
    })

    //广汽集团员工卡照片上传
    $("#avatar1").on("click", function () {
        upload("#avatar1",uploadUrl,'#form_img1','imgContainer1')
    })


    // 南航金卡
   
    $("#avatar2").on("change", function () {
        upload("#avatar2",uploadUrl,'.form2 #form_img2','imgContainer2')
    })


    // 登记 _ 广汽集团员工卡照片上传
    $("#form_upload1").on("change", function () {
        upload("#form_upload1",uploadUrl,'#form2_img1','form2_content1')
    })



    // 登记 _ 广汽集团员工卡照片上传
    $("#form_upload2").on("change", function () {
        upload("#form_upload2",uploadUrl,'#form2_img2','font2_container2')
    })


    // 登记 _ 广汽集团员工卡照片上传
    // $("#form_upload2").on("change", function () {

    //     var file = this.files[0];
    //     var data = new FormData();
    //     data.append("mypic", file);

    //     $.ajax({
    //         type: "post",
    //         url: uploadUrl,
    //         data: data,
    //         contentType: false,
    //         processData: false,
    //         success: function (res) {
    //             $('#form2_img2').attr("src", API + "/" + res)
    //             let imgContainer = document.getElementById('font2_container2');
    //             imgContainer.style.display = "block"
    //         },
    //     });
    // })



    // 封装上传
    /**
     * 按钮 ID  dom
     * 上传地址 uploadUrl 
     * 图片 class 和 id dom
     * 图片地址 api 
     * showimg dom 
     */ 
    function upload(bottonID,uploadUrl,imgID,showImg){
        
        $(bottonID).on("change", function () {

            let file = this.files[0];
            let data = new FormData();
            data.append("mypic", file);
            
            let loading = document.getElementById("loading_M");
            loading.style.display = "block";
    
            $.ajax({
                type: "post",
                url: uploadUrl,
                data: data,
                contentType: false,
                processData: false,
                success: function (res) {
                    $(imgID).attr("src", API + "/" + res)
                    let imgContainer = document.getElementById(showImg);
                    imgContainer.style.display = "block"
                    loading.style.display = "none";

                },
            });
        })
    }

}