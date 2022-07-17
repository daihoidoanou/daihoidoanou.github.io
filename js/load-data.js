(async () => {
    await axios
        .get("https://dai-hoi-xi.herokuapp.com/post/all-post")
        .then((res) => {
            console.log(res.data)
            htmls = res.data?.posts
                .map((item) => {
                    return `
                        <div class="main-right__item">
                            <div class="main-right__item-avt">
                                <img src=${item?.avt} alt="" width="100px" />
                            </div>
                            <div class="main-right__item-body">
                                <div class="main-right__item-text">
                                    ${item?.content}<span>, ${m}</span> phút trước đã nói </span>
                                </div>
                                <div class="main-right__item-name">
                                    ${item?.name}
                                </div>
                            </div>
                        </div>
                        `;
                })
                .join("");

            $(".main-right").innerHTML = htmls;
            $(".main-heading").querySelector("span").innerHTML =
                res.data?.total;
        })
        .catch((err) => console.log(err.response?.data));
})();


$(".main-submit").onclick = () =>

    (window.location.href = "./send-wishes.html");
