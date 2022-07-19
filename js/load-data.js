 (async () => {
                await axios
                    .get("https://dai-hoi-xi.herokuapp.com/post/all-post")
                    .then((res) => {
                        const htmls = res.data?.posts
                            .map((item) => {
                                return `
                            <div class="main-right__item">
                                <div class="main-right__item-avt">
                                    <img src=${item?.avt} alt="" />
                                </div>
                                <div class="main-right__item-body">
                                    <div class="main-right__item-name">
                                        ${item?.content}
                                    </div>
                                    <div class="main-right__item-text">
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
