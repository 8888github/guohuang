window.onload  = function(){

    const upload = document.getElementById('upload');
const imgContainer = document.getElementById('imgContainer');
const img = document.getElementById('img');
const icon = document.getElementById('icon');

let imgUrl = '';
// 图片上传成功后创建 URL
upload.onchange = function (value) {
    const fileList = value.target.files;
    if (fileList.length) {
        imgContainer.style.display = 'block';
        icon.style.display = 'none';
        imgUrl = window.URL.createObjectURL(fileList[0]);
        img.src = imgUrl;

        console.log("imgUrl",imgUrl);
    }
}


/* 查看 & 删除 */
const showImg = document.getElementById('showImg');
const delImg = document.getElementById('delImg');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeIcon = document.getElementById('closeIcon');

// 点击预览图片
showImg.onclick = function () {
    modal.style.width = '100%';
    modal.style.height = '100%';
    modalImg.src = imgUrl;
}

// 关闭 modal 框
closeIcon.onclick = function () {
    modal.style.width = '0';
    modal.style.height = '0';
    modalImg.src = '';
}

// 删除上传的图片
delImg.onclick = function () {
    upload.value = '';
    imgUrl = '';
    icon.style.display = 'block';
    imgContainer.style.display = 'none';
}

}