 const app = (() => {
                const avtLS =
                    JSON.parse(localStorage.getItem("avtLS")) ||
                    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

                return {
                    isLoading: false,
                    handleEvent() {
                        const _this = this;
                        const inputs = $$(".main-right__form-input");
                        const mainLeftWrap = $(".main-left__wrap");
                        const loading = $(".main-left__wrap .loading");

                        mainLeftWrap.querySelector("img").src = avtLS;

                        inputs.forEach((input) => {
                            input.oninput = function (e) {
                                const span =
                                    this.parentElement.querySelector(
                                        ".count-char__now"
                                    );
                                const max = parseInt(
                                    this.parentElement.querySelector(
                                        ".count-char__max"
                                    ).innerHTML
                                );

                                const lengthInp = input.value.length;

                                if (lengthInp <= max) {
                                    span.innerHTML = lengthInp;
                                } else {
                                    this.blur();
                                }
                            };
                        });

                        mainLeftWrap.onclick = function () {
                            if (!_this.isLoading) {
                                this.parentElement
                                    .querySelector(".main-left__inp")
                                    .click();
                            }
                        };

                        // loading
                        startLoading = () => {
                            _this.isLoading = true;
                            loading.classList.add("active");
                        };

                        endLoading = () => {
                            _this.isLoading = false;
                            loading.classList.remove("active");
                        };

                        $(".main-left__inp").onchange = (e) => {
                            startLoading();
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onloadend = async () => {
                                    await axios
                                        .post(
                                            "https://dai-hoi-xi.herokuapp.com/post/upload-avt",
                                            {
                                                data: reader.result,
                                            }
                                        )
                                        .then((res) => {
                                            localStorage.setItem(
                                                "avtLS",
                                                JSON.stringify(res.data)
                                            );
                                            mainLeftWrap.querySelector(
                                                "img"
                                            ).src = res.data;
                                        })
                                        .catch((err) => {
                                            console.log(err.response?.data);
                                        })
                                        .finally(() => {
                                            setTimeout(endLoading, 2000);
                                        });
                                };
                            }
                        };

                        $(".main-right__form-submit-btn").onclick = async (
                            e
                        ) => {
                            e.preventDefault();
                            const avt = mainLeftWrap.querySelector("img").src;
                            const name = inputs[0].value;
                            const content = inputs[1].value;
                            if (avt && name && content) {
                                const data = {
                                    avt,
                                    name,
                                    content,
                                };

                                await axios
                                    .post(
                                        "https://dai-hoi-xi.herokuapp.com/post/new-post",
                                        data
                                    )
                                    .then((res) => {
                                        inputs[0].value = null;
                                        inputs[1].value = null;
                                        window.location.href = "./index.html";
                                    })
                                    .catch((err) =>
                                        console.log(err.response?.data)
                                    );
                            }
                        };
                    },
                    start() {
                        this.handleEvent();
                    },
                };
            })().start();
