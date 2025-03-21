/**
 * @collection Theme
 * @version 1.0.21
 * @author Tray
 * @site https://www.tray.com.br
 */

!(function (e) {
    (e.fn.changeElementType = function (t) {
        var a = {};
        e.each(this[0].attributes, function (e, t) {
            a[t.nodeName] = t.nodeValue;
        }),
            this.replaceWith(function () {
                return e("<" + t + "/>", a).append(e(this).contents());
            });
    }),
        (Number.prototype.formatMoney = function (e = 2, t = ".", a = ",", o = !1) {
            let s = this.toFixed(e).split("."),
                r,
                n = s[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${a}`) + (s[1] ? t + s[1] : "");
            return o ? "R$ {{amount}}".replace(/{{\s*(\w+)\s*}}/, n) : n;
        }),
        (window.theme = {
            ...window.theme,
            settings: { lastScrollPosition: 0, storeId: 0, productVariantsQuantities: null, productThumbs: null, productGallery: null },
            recoveryStoreId: function () {
                this.settings.storeId = e("html").data("store");
            },
            resets: function () {
                let t = e(".logotray-message a");
                t.attr("rel", "noopener").attr("href", t.attr("href").replace("http", "https")),
                    e('[role="dialog"] .modal-title').removeAttr("id"),
                    e('.page-search #Vitrine input[type="image"]').after('<button type="submit" class="botao-commerce">BUSCAR</button>'),
                    e('.page-search #Vitrine input[type="image"]').remove(),
                    e(".advancedSearchFormBTimg").addClass("botao-commerce"),
                    e('.page-central_senha input[type="image"]').after('<button type="submit" class="botao-commerce">CONTINUAR</button>').remove(),
                    e(".caixa-cadastro #email_cadastro").attr("placeholder", "Seu e-mail"),
                    e('#imagem[src*="filtrar.gif"]').after('<button type="submit" class="botao-commerce">Filtrar</button>'),
                    e('#imagem[src*="filtrar.gif"]').remove(),
                    e('input[src*="gerarordem.png"]').after('<button type="submit" class="botao-commerce">Gerar ordem de devolu&ccedil;&atilde;o</button>'),
                    e('input[src*="gerarordem.png"]').remove();
            },
            initMasks: function () {
                let t = function (e) {
                    return 11 === e.replace(/\D/g, "").length ? "(00) 00000-0000" : "(00) 0000-00009";
                };
                e(".phone-mask").mask(t, {
                    onKeyPress: function (e, a, o, s) {
                        o.mask(t.apply({}, arguments), s);
                    },
                }),
                    e(".zip-code-mask").mask("00000-000");
            },
            initLazyload: function (e = ".lazyload") {
                new LazyLoad({ elements_selector: e });
            },
            getLoader: function (e = null) {
                return `
                <div class="loader show">
                    <div class="spinner">
                        <div class="double-bounce-one"></div>
                        <div class="double-bounce-two"></div>
                    </div>
                    ${e ? `<div class="message">${e}</div>` : ""}
                </div>`;
            },
            scrollToElement: function (t, a = 0) {
                t && "#" !== t && e("html,body").animate({ scrollTop: Math.round(e(t).offset().top) - a }, 600);
            },
            overlay: function () {
                e('[data-toggle="overlay-shadow"]').on("click", function () {
                    e(e(this).data("target")).addClass("show").attr("data-overlay-shadow-target", ""), e(".overlay-shadow").addClass("show"), e("body").addClass("overflowed");
                }),
                    e(".overlay-shadow").on("click", function () {
                        e("[data-overlay-shadow-target]").removeClass("show").removeAttr("data-overlay-shadow-target"), e(".overlay-shadow").removeClass("show"), e("body").removeClass("overflowed");
                    }),
                    e(".close-overlay").on("click", function () {
                        e(".overlay-shadow").trigger("click");
                    });
            },
            toggleModalTheme: function () {
                e("body").on("click", '[data-toggle="modal-theme"]', function () {
                    e(e(this).data("target")).addClass("show");
                }),
                    e(".modal-theme:not(.no-action) .modal-shadow, .modal-theme:not(.no-action) .close-icon").on("click", function () {
                        e(".modal-theme").removeClass("show");
                    });
            },
            generateBreadcrumb: function (t = "") {
                let a,
                    o = "",
                    s = document.title.split(" - ")[0];
                (a = "news-page" == t ? [{ text: "Home", link: "/" }, { text: "Not&iacute;cias", link: "/noticias" }, { text: s }] : [{ text: "Home", link: "/" }, { text: s }]),
                    e.each(a, function (e, t) {
                        this.link
                            ? (o += `
                        <li class="breadcrumb-item flex align-center" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                            <a itemprop="item" class="t-color" href="${t.link}">
                                <span itemprop="name">${t.text}</span>
                            </a>
                            <meta itemprop="position" content="${e + 1}" />
                        </li>
                    `)
                            : (o += `
                        <li class="breadcrumb-item flex align-center" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                            <span itemprop="name">${t.text}</span>
                            <meta itemprop="position" content="${e + 1}" />
                        </li>
                    `);
                    }),
                    e(".page-content > .container").prepend(`
                <ol class="breadcrumb flex f-wrap" itemscope itemtype="https://schema.org/BreadcrumbList">
                    ${o}
                </ol>
            `);
            },
            processRteElements: function () {
                e(`.col-panel .tablePage,
               .page-extra .page-content table,
               .page-extras .page-content table,
               .board_htm table,
               .rte table,
               .page-noticia table
            `).wrap('<div class="table-overflow"></div>'),
                    e(`.page-noticia iframe[src*="youtube.com/embed"],
               .page-noticia iframe[src*="player.vimeo"],
               .board_htm iframe[src*="youtube.com/embed"],
               .board_htm iframe[src*="player.vimeo"],
               .rte iframe[src*="youtube.com/embed"],
               .rte iframe[src*="player.vimeo"]
            `).wrap('<div class="rte-video-wrapper"></div>');
            },
            loadThemeVersion: function () {
                let t = Cookies.get("theme-version"),
                    a = e(".local-path").attr("data-path");
                if (t) {
                    e("html").attr("data-tray-theme-version", t);
                    return;
                }
                e.getJSON(a + `js/version.json?t=${Date.now()}`, function (t) {
                    Cookies.set("theme-version", t.version, { expires: 7 }), e("html").attr("data-tray-theme-version", t.version);
                });
            },
            setCorrectHeaderDesk: function () {
                let t = this,
                    a = e(".header"),
                    o = e(".header .nav"),
                    s = 2 * e(".header").outerHeight(),
                    r = e(window).scrollTop();
                r > 32 ? a.addClass("hide-top-bar") : a.removeClass("hide-top-bar"),
                    r > 152 ? a.addClass("fixed") : a.removeClass("fixed"),
                    r > t.settings.lastScrollPosition || r <= s ? o.removeClass("show-nav") : r > s && o.addClass("show-nav"),
                    (t.settings.lastScrollPosition = r);
            },
            setCorrectHeaderMobile: function () {
                let t = e(".header"),
                    a = e(".header-mobile"),
                    o = e(".header").outerHeight() + 20;
                e(window).scrollTop() - 20 > o ? (a.addClass("show"), t.addClass("not-visible")) : (a.removeClass("show"), t.removeClass("not-visible"));
            },
            scrollHeader: function () {
                let t = this;
                e(window).width() >= 768 ? this.setCorrectHeaderDesk() : this.setCorrectHeaderMobile(),
                    e(window).on("scroll", function () {
                        e(window).width() >= 768 ? t.setCorrectHeaderDesk() : t.setCorrectHeaderMobile();
                    });
            },
            fixSubcategoriesHeight: function () {
                let t = e(".header").height(),
                    a = e(window).height();
                e(".nav .list > .first-level.sub .second-level").css("max-height", a - t - 30);
            },
            mainMenu: function () {
                let t = this;
                this.fixSubcategoriesHeight(),
                    e(window).on("resize", function () {
                        t.fixSubcategoriesHeight();
                    });
            },
            mainMenuMobile: function () {
                e(".nav-mobile .first-level > .sub > a").on("click", function (t) {
                    let a = e(this).parent();
                    return a.toggleClass("show"), a.hasClass("show") ? a.children(".sub").slideDown() : a.children(".sub").slideUp(), t.preventDefault(), !1;
                });
            },
            bannerHome: function () {
                if (e(".banner-home").length) {
                    let t = e(".banner-home"),
                        a = e(".swiper-slide", t).length,
                        o = t.data("settings");
                    a > 0 &&
                        (new Swiper(".banner-home .swiper-container", {
                            preloadImages: !1,
                            loop: !0,
                            autoHeight: !0,
                            effect: "slide",
                            autoplay: { delay: o.timer, disableOnInteraction: !1 },
                            lazy: { loadPrevNext: !0 },
                            pagination: { el: ".banner-home .dots", bulletClass: "dot", bulletActiveClass: "dot-active", clickable: !o.isMobile },
                        }),
                        o.stopOnHover &&
                            (e(".banner-home .swiper-container").on("mouseenter", function () {
                                this.swiper.autoplay.stop();
                            }),
                            e(".banner-home .swiper-container").on("mouseleave", function () {
                                this.swiper.autoplay.start();
                            })));
                }
            },
            storeReviewsIndex: function () {
                e(".section-avaliacoes .dep_lista").length
                    ? (e(".dep_lista").changeElementType("div"),
                      e(".dep_item").changeElementType("div"),
                      e(".dep_item").addClass("swiper-slide"),
                      e(".section-avaliacoes .dep_lista").addClass("swiper-wrapper").wrap('<div class="swiper-container"></div>'),
                      e(".section-avaliacoes .swiper-container").append(`
                    <div class="prev">
                        <i class="icon icon-arrow-left"></i>
                    </div>
                    <div class="next">
                        <i class="icon icon-arrow-right"></i>
                    </div>
                    <div class="dots"></div>
                `),
                      new Swiper(".section-avaliacoes .swiper-container", {
                          slidesPerView: 3,
                          lazy: { loadPrevNext: !0 },
                          navigation: { nextEl: ".section-avaliacoes .next", prevEl: ".section-avaliacoes .prev" },
                          loop: !1,
                          breakpoints: { 0: { slidesPerView: 1 }, 600: { slidesPerView: 2 }, 1e3: { slidesPerView: 3 } },
                          pagination: { el: ".section-avaliacoes .dots", type: "bullets", bulletClass: "dot", bulletActiveClass: "dot-active", clickable: !1 },
                          on: {
                              init: function () {
                                  e(".section-avaliacoes").addClass("show");
                              },
                          },
                      }),
                      e(".section-avaliacoes .dep_dados").wrap('<a href="/depoimentos-de-clientes" title="Ver depoimento"></a>'),
                      e(".dep_lista li:hidden").remove())
                    : e(".section-avaliacoes").remove();
            },
            loadNews: function () {
                if (e(".section-news").length) {
                    let t = e("html").data("files");
                    e.ajax({
                        url: `/loja/busca_noticias.php?loja=${this.settings.storeId}&${t}`,
                        method: "get",
                        success: function (t) {
                            let a, o;
                            if (!e(t).find(".noticias").length) {
                                e(".section-news").remove();
                                return;
                            }
                            (a = e(".section-news .news-content .swiper-wrapper")),
                                (o = e(e(t).find(".noticias"))).find("li:nth-child(n+4)").remove(),
                                o.find("li").wrapInner('<div class="swiper-slide"><div class="box-noticia"></div></div>'),
                                o.find(".swiper-slide").unwrap(),
                                (o = o.contents()).each(function (t, a) {
                                    e(a).find("img").closest("div").remove();
                                }),
                                a.append(o),
                                new Swiper(".section-news .news-content", {
                                    lazy: { loadPrevNext: !0 },
                                    pagination: { el: ".news-content .dots", bulletClass: "dot", bulletActiveClass: "dot-active", clickable: !1 },
                                    breakpoints: { 0: { slidesPerView: 1 }, 550: { slidesPerView: 2 }, 768: { slidesPerView: 3, allowTouchMove: !1 } },
                                });
                        },
                    });
                }
            },
            slideCatalog: function () {
                e(".slide-catalog").length &&
                    new Swiper(".slide-catalog", { slidesPerView: 1, preloadImages: !1, lazy: { loadPrevNext: !0 }, pagination: { el: ".slide-catalog .dots", bulletClass: "dot", bulletActiveClass: "dot-active", clickable: !0 } });
            },
            sortMobile: function () {
                let t = e(),
                    a = e("#select_ordem").val();
                e("#select_ordem option").each(function () {
                    t = t.add(`<li ${a === e(this).val() ? 'class="active"' : ""} data-option="${e(this).val()}">
                        ${e(this).text()}
                    </li>
                `);
                }),
                    e(".catalog-header .sort-mobile .sort-panel .sort-options").append(t),
                    e(".catalog-header .sort-mobile .sort-panel .sort-options").on("click", "li", function () {
                        let t = e(this).data("option");
                        e("#select_ordem").val(t).trigger("change");
                    });
            },
            initProductGallery: function () {
                let t = e(".product-gallery").hasClass("zoom-true"),
                    a = {
                        slidesPerView: 1,
                        lazy: { loadPrevNext: !0 },
                        on: {
                            init: function () {
                                if (!t) return;
                                1 === this.slides.length && (this.unsetGrabCursor(), (this.allowTouchMove = !1));
                                let a = e(".product-wrapper .product-gallery").find('.image[data-index="1"] .zoom');
                                a.find("img:first").next().length || a.zoom({ touch: !1, url: a.find("img").attr("src") });
                            },
                            slideChange: function () {
                                if (!t) return;
                                let a = this.activeIndex + 1,
                                    o = e(".product-wrapper .product-gallery").find(`.image[data-index="${a}"] .zoom`);
                                o.find("img:first").next().length || o.zoom({ touch: !1, url: o.find("img").attr("src") });
                            },
                        },
                    };
                e(".product-wrapper .product-gallery .product-thumbs .swiper-slide").length &&
                    ((this.settings.productThumbs = new Swiper(".product-wrapper .product-gallery .product-thumbs .thumbs-list", {
                        slidesPerView: 4,
                        updateOnWindowResize: !0,
                        centerInsufficientSlides: !0,
                        watchSlidesProgress: !0,
                        watchSlidesVisibility: !0,
                        navigation: { nextEl: ".product-wrapper .product-gallery .product-thumbs .controls .next", prevEl: ".product-wrapper .product-gallery .product-thumbs .controls .prev" },
                        pagination: { el: ".product-wrapper .product-gallery .product-thumbs .thumbs-list .dots", bulletClass: "dot", bulletActiveClass: "dot-active", clickable: !0 },
                        lazy: { loadPrevNext: !0 },
                        breakpoints: { 0: { slidesPerView: 3 }, 575: { slidesPerView: 4 }, 768: { slidesPerView: 2 }, 1e3: { slidesPerView: 3 }, 1201: { slidesPerView: 5 } },
                        on: {
                            init: function () {
                                e(".product-wrapper .product-gallery .product-thumbs").addClass("show");
                            },
                        },
                    })),
                    (a.thumbs = { autoScrollOffset: 3, multipleActiveThumbs: !1, swiper: this.settings.productThumbs })),
                    (this.settings.productGallery = new Swiper(".product-wrapper .product-gallery .product-images", a));
            },
            recreateProductGallery: function (t) {
                let a = e(".product-wrapper .product-form .product-name").text(),
                    o = "",
                    s = "";
                e.each(t, function (e, t) {
                    let r = e + 1;
                    (s += `
                    <div class="image swiper-slide ${1 === r ? "active" : ""}" data-index="${r}">
                        <div class="zoom">
                            <img class="swiper-lazy" data-src="${t.https}" alt="${a}">
                        </div>
                    </div>
                `),
                        (o += `<li class="swiper-slide ${1 === r ? "active" : ""}" data-index="${r}">
                        <div class="thumb">
                            <img src="${t.thumbs[90].https}" alt="${a}">
                        </div>
                    </li>
                `);
                }),
                    theme.settings.productThumbs && theme.settings.productThumbs.destroy(),
                    theme.settings.productGallery && theme.settings.productGallery.destroy(),
                    e(".product-wrapper .product-gallery .product-images .image").remove(),
                    e(".product-wrapper .product-gallery .product-thumbs .swiper-slide").remove(),
                    e(".product-wrapper .product-gallery .product-images .swiper-wrapper").html(s),
                    t.length > 1
                        ? (e(".product-wrapper .product-gallery .product-thumbs").addClass("show"), e(".product-wrapper .product-gallery .product-thumbs .thumbs-list .swiper-wrapper").html(o))
                        : e(".product-wrapper .product-gallery .product-thumbs").removeClass("show"),
                    theme.initProductGallery();
            },
            toggleProductVideo: function () {
                let t = this;
                e(".product-wrapper .product-box .product-video").on("click", function () {
                    e(".modal-video").find("iframe").attr("data-src", e(this).data("url")), e(".modal-video").addClass("show"), t.initLazyload(".iframe-lazy");
                }),
                    e(".modal-video, .modal-video .close-icon").on("click", function (t) {
                        e(t.target).hasClass("modal-info") ||
                            setTimeout(function () {
                                e(".modal-video .video iframe").removeAttr("src").removeClass("loaded").removeAttr("data-was-processed data-ll-status");
                            }, 300);
                    });
            },
            goToProductReviews: function () {
                let t = this;
                e(".product-wrapper .product-box .product-form .product-rating .total").on("click", function () {
                    let a, o;
                    768 > e(window).width() ? ((a = ".product-tabs .tabs-content .tab-link-mobile.comments-link-tab"), (o = 60)) : ((a = ".product-tabs .tabs-nav .tab-link.comments-link-tab"), (o = 120)),
                        e(a).trigger("click"),
                        t.scrollToElement(a, o);
                }),
                    setTimeout(() => {
                        e("#form-comments .submit-review").on("click", function (t) {
                            e("#form-comments .stars .starn.star-on").length ||
                                (e("#div_erro .blocoAlerta").text("Avalia\xe7\xe3o do produto obrigat\xf3ria, d\xea sua avalia\xe7\xe3o por favor").show(),
                                setTimeout(() => {
                                    e("#div_erro .blocoAlerta").hide();
                                }, 5e3));
                        });
                    }, 3e3);
            },
            getShippingRates: function () {
                let t = this;
                var a = 1;
                e(".shipping-form").on("submit", function (o) {
                    o.preventDefault();
                    let s = e("#form_comprar").find('input[type="hidden"][name="variacao"]'),
                        r = e("#shippingSimulatorButton").attr("data-url"),
                        n = e("input", this).val().split("-");
                    if ((jQuery("#quant:visible").is(":visible") && (a = jQuery("#quant:visible").val()), s.length && "" === s.val())) {
                        e(".product-shipping .result").addClass("loaded").html('<div class="error-message">Por favor, selecione as varia&ccedil;&otilde;es antes de calcular o frete.</div>');
                        return;
                    }
                    return (
                        (s = s.val() || 0),
                        (r = r.replace("cep1=%s", `cep1=${n[0]}`).replace("cep2=%s", `cep2=${n[1]}`).replace("acao=%s", `acao=${s}`).replace("dade=%s", `dade=${a}`)),
                        e(".product-shipping .result").removeClass("loaded").addClass("loading").html(t.getLoader("Carregando fretes...")),
                        e.ajax({
                            url: `https://viacep.com.br/ws/${n[0] + n[1]}/json/`,
                            method: "get",
                            dataType: "json",
                            success: function (t) {
                                if (t.erro) {
                                    e(".product-shipping .result").removeClass("loading").addClass("loaded").html('<div class="error-message">Cep inv&aacute;lido. Verifique e tente novamente.</div>');
                                    return;
                                }
                                e.ajax({
                                    url: r,
                                    method: "get",
                                    success: function (t) {
                                        if (t.includes("N&atilde;o foi poss&iacute;vel estimar o valor do frete")) {
                                            e(".product-shipping .result")
                                                .removeClass("loading")
                                                .addClass("loaded")
                                                .html('<div class="error-message">N&atilde;o foi poss&iacute;vel obter os pre&ccedil;os e prazos de entrega. Tente novamente mais tarte.</div>');
                                            return;
                                        }
                                        let a = e(t.replace(/Prazo de entrega: /gi, ""));
                                        a
                                            .find("p .color")
                                            .html()
                                            .replace(/\s\s\\\s/g, "")
                                            .replace(/ \\/g, ","),
                                            a.find("table:first-child, p").remove(),
                                            a.find("table, table th, table td").removeAttr("align class width border cellpadding cellspacing height colspan"),
                                            a.find("table").addClass("shipping-rates-table"),
                                            "Forma de Envio:" == a.find("table th:first-child").text() && a.find("table th:first-child").html("Frete").attr("colspan", "2"),
                                            "Valor:" == a.find("table th:nth-child(2)").text() && a.find("table th:nth-child(2)").html("Valor"),
                                            "Prazo de Entrega e Observa\xe7\xf5es:" == a.find("table th:last-child").text() && a.find("table th:last-child").html("Prazo"),
                                            (a = a.children()),
                                            e(".product-shipping .result").removeClass("loading").addClass("loaded").html("").append(a);
                                    },
                                    error: function (t, a, o) {
                                        console.error(`[Theme] Could not recover shipping rates. Error: ${o}`),
                                            "" !== t.responseText && console.error(`[Theme] Error Details: ${t.responseText}`),
                                            e(".product-shipping .result")
                                                .removeClass("loading")
                                                .addClass("loaded")
                                                .html('<div class="error-message">N&atilde;o foi poss&iacute;vel obter os pre&ccedil;os e prazos de entrega. Tente novamente mais tarde.</div>');
                                    },
                                });
                            },
                            error: function (t, a, o) {
                                console.error(`[Theme] Could not validate cep. Error: ${o}`),
                                    console.error(`[Theme] Error Details: ${t.responseJSON}`),
                                    e(".product-shipping .result")
                                        .removeClass("loading")
                                        .addClass("loaded")
                                        .html('<div class="error-message">N&atilde;o foi poss&iacute;vel obter os pre&ccedil;os e prazos de entrega. Tente novamente mais tarde.</div>');
                            },
                        }),
                        !1
                    );
                });
            },
            productBuyTogether: function () {
                let t = this;
                e(".compreJunto form .fotosCompreJunto").append('<div class="plus color to">=</div>'),
                    e(".compreJunto .produto img").each(function () {
                        let a = e(this).attr("src").replace("/90_", "/180_"),
                            o = e(this).parent().attr("href") || "",
                            s = e(this).attr("alt");
                        e(this).addClass("lazyload-buy-together").attr("src", "").attr("data-src", a),
                            t.initLazyload(".lazyload-buy-together"),
                            "" !== o ? (e(this).unwrap(), e(this).parents("span").after(`<a class="product-name" href="${o}">${s}</a>`)) : e(this).parents("span").after(`<span class="product-name">${s}</span>`);
                    });
            },
            loadProductPaymentOptionsTab: function () {
                let t = e("#form_comprar").data("id"),
                    a = e("#preco_atual").val(),
                    o = e(".product-tabs .tabs-content .payment-tab");
                o.attr("data-loaded-price") !== a &&
                    e.ajax({
                        url: `/mvc/store/product/payment_options?loja=${theme.settings.storeId}&IdProd=${t}&preco=${a}`,
                        method: "get",
                        success: function (t) {
                            let s = e(t);
                            (s = (s = s.find("#atualizaFormas").unwrap()).find("ul.Forma1").unwrap()).find("li").each(function () {
                                let t = e("img", this).remove();
                                e("a", this).prepend(t);
                            }),
                                s.find("table br").remove(),
                                s.find("table td:first-child").remove(),
                                s.find("table").removeAttr("id class width cellpadding cellspacing border style"),
                                s.find("table td, table th").removeAttr("class width style"),
                                s.find("li").removeAttr("id style"),
                                s.find("li a").removeAttr("id class name"),
                                s.find("li a img").removeAttr("border"),
                                s.removeClass().addClass("payment-options"),
                                s.find("li").addClass("option"),
                                s.find("li a").attr("href", "javascript:void(0)"),
                                s.find("table").wrap('<div class="option-details"></div>'),
                                s.find(".option-details").css("display", "none"),
                                o.attr("data-loaded-price", a),
                                o.html("").append(s);
                        },
                    });
            },
            productTabsAction: function () {
                let t = this;
                e('.tab-link-mobile[href*="AbaPersonalizada"]').each(function () {
                    let t = e(this).attr("href").split("#")[1];
                    (t = e(`#${t}`)), e(t).detach().insertAfter(this);
                }),
                    e(".product-tabs .tabs-content .tab[data-url]").each(function () {
                        let a = e(this),
                            o = a.data("url");
                        a.hasClass("payment-tab")
                            ? t.loadProductPaymentOptionsTab()
                            : e.ajax({
                                  url: o,
                                  method: "get",
                                  success: function (e) {
                                      a.html(e);
                                  },
                              });
                    }),
                    e(".product-tabs .tabs-content .tab.payment-tab").on("click", ".option a", function () {
                        let t = e(this).parent(),
                            a = e(this).next();
                        t.hasClass("show") ? (t.removeClass("show"), a.slideUp()) : (t.addClass("show"), a.slideDown());
                    }),
                    e(".product-tabs .tabs-nav .tab-link").on("click", function (t) {
                        let a = e(this).closest(".product-tabs");
                        if (!e(this).hasClass("active")) {
                            let o = e(this).attr("href").split("#")[1];
                            (o = e(`#${o}`)),
                                e(".tab-link", a).removeClass("active"),
                                e(this).addClass("active"),
                                e(".tabs-content .tab", a).fadeOut(),
                                setTimeout(function () {
                                    o.fadeIn();
                                }, 300);
                        }
                        return t.preventDefault(), t.stopPropagation(), !1;
                    }),
                    e(".product-tabs .tabs-content .tab-link-mobile").on("click", function (t) {
                        let a = e(this).attr("href").split("#")[1];
                        return (
                            (a = e(`#${a}`)),
                            e(this).hasClass("active")
                                ? (e(this).removeClass("active"), a.removeClass("active").slideUp())
                                : (e(".product-tabs .tabs-content .tab-link-mobile").removeClass("active"),
                                  e(".product-tabs .tabs-content .tab").removeClass("active").slideUp(),
                                  e(this).addClass("active"),
                                  a.addClass("active").slideDown()),
                            t.preventDefault(),
                            t.stopPropagation(),
                            !1
                        );
                    }),
                    t.productTabActionsOnResize(),
                    e(window).on("resize", function () {
                        t.productTabActionsOnResize();
                    });
            },
            productTabActionsOnResize: function () {
                if (e(".product-tabs .tabs-nav li").length) {
                    if (768 > e(window).width() && e(".product-tabs .tabs-nav .tab-link.active").length > 0)
                        e(".product-tabs .tabs-nav .tab-link").removeClass("active"), e(".product-tabs .tabs-content .tab-link-mobile").removeClass("active"), e(".product-tabs .tabs-content .tab").removeClass("active").slideUp();
                    else if (e(window).width() >= 768 && 0 == e(".product-tabs .tabs-nav .tab-link.active").length) {
                        let t = e(".product-tabs .tabs-nav .tab-link").first(),
                            a = t.attr("href").split("#")[1];
                        e(".product-tabs .tabs-content .tab-link-mobile").removeClass("active"), t.addClass("active"), e(`#${a}`).show();
                    }
                }
            },
            observerProductPriceChange: function () {
                if (e(".product-wrapper .product-form .product-price-tray").length) {
                    let t = e(".product-wrapper .product-form .product-price-tray").get(0);
                    new MutationObserver(function () {
                        theme.loadProductPaymentOptionsTab();
                    }).observe(t, { childList: !0, subtree: !0 });
                }
            },
            productReviews: function () {
                let t = e(`<div class="product-comments">${window.commentsBlock}</div>`);
                t.find(".hreview-comentarios + .tray-hide").remove(),
                    e.ajax({
                        url: "/mvc/store/greeting",
                        method: "get",
                        dataType: "json",
                        success: function (a) {
                            Array.isArray(a.data)
                                ? t.find("#comentario_cliente a.tray-hide").removeClass("tray-hide")
                                : (t.find("#comentario_cliente form.tray-hide").removeClass("tray-hide"),
                                  t.find("#form-comments #nome_coment").val(a.data.name),
                                  t.find("#form-comments #email_coment").val(a.data.email),
                                  t.find('#form-comments [name="ProductComment[customer_id]"]').val(a.data.id)),
                                e("#tray-comment-block").before(t),
                                e("#form-comments #bt-submit-comments").before('<button type="submit" class="submit-review">Enviar</button>').remove(),
                                e(".ranking .rating").each(function () {
                                    let t = Number(
                                        e(this)
                                            .attr("class")
                                            .replace(/[^0-9]/g, "")
                                    );
                                    for (i = 1; i <= 5; i++) i <= t ? e(this).append('<div class="icon active"></div>') : e(this).append('<div class="icon"></div>');
                                }),
                                e("#tray-comment-block").remove(),
                                theme.chooseProductRating(),
                                theme.sendProductReview();
                        },
                    });
            },
            chooseProductRating: function () {
                e("#form-comments .rateBlock .starn").on("click", function () {
                    let t = e(this).data("message"),
                        a = e(this).data("id");
                    e(this).parent().find("#rate").html(t), e(this).closest("form").find("#nota_comentario").val(a), e(this).parent().find(".starn").removeClass("star-on"), e(this).prevAll().addClass("star-on"), e(this).addClass("star-on");
                });
            },
            sendProductReview: function () {
                e("#form-comments").on("submit", function (t) {
                    let a = e(this);
                    e.ajax({
                        url: a.attr("action"),
                        method: "post",
                        dataType: "json",
                        data: a.serialize(),
                        success: function (t) {
                            a.closest(".product-comments").find(".blocoAlerta").hide(),
                                a.closest(".product-comments").find(".blocoSucesso").show(),
                                setTimeout(function () {
                                    a.closest(".product-comments").find(".blocoSucesso").hide(),
                                        e("#form-comments #mensagem_coment").val(""),
                                        a.find("#nota_comentario").val(""),
                                        a.find("#rate").html(""),
                                        a.find(".starn").removeClass("star-on");
                                }, 8e3);
                        },
                        error: function (e) {
                            a.closest(".product-comments").find(".blocoSucesso").hide(), a.closest(".product-comments").find(".blocoAlerta").html(e.responseText).show();
                        },
                    }),
                        t.preventDefault();
                });
            },
            productRelatedCarousel: function () {
                e(".section-product-related .product").on("mouseenter", function () {
                    e(".showcase").addClass("z-index");
                }),
                    e(".section-product-related product").on("mouseleave", function () {
                        e(".showcase").removeClass("z-index");
                    }),
                    new Swiper(".section-product-related .swiper-container", {
                        slidesPerView: 4,
                        preloadImages: !1,
                        loop: !1,
                        lazy: { loadPrevNext: !0 },
                        navigation: { nextEl: ".section-product-related .next", prevEl: ".section-product-related .prev" },
                        pagination: { el: ".section-product-related .dots", bulletClass: "dot", bulletActiveClass: "dot-active", clickable: !0 },
                        breakpoints: { 0: { slidesPerView: 2 }, 620: { slidesPerView: 3 }, 1200: { slidesPerView: 4 } },
                    });
            },
            organizeProductHistory: function () {
                let t = e(".products-history .container").get(0);
                if (t)
                    new MutationObserver(function (t, a) {
                        e.each(t, function () {
                            if ("childList" == this.type && "produtos" == e(this.target).prop("id"))
                                return (
                                    e('.products-history .container img[src*="sobconsulta"]').after('<div class="botao-commerce">Sob consulta</div>'),
                                    setTimeout(function () {
                                        e(".products-history .history-loader").removeClass("show");
                                    }, 200),
                                    !1
                                );
                        });
                    }).observe(t, { childList: !0, subtree: !0 }),
                        e(".products-history").on("click", "#linksPag a", function () {
                            e(".products-history #produtos").html(""), e(".products-history .history-loader").addClass("show");
                        });
            },
            loadProductVariantImage: function (t) {
                e.ajax({
                    url: `/web_api/variants/${t}`,
                    method: "get",
                    success: function (e) {
                        let t = e.Variant.VariantImage;
                        t.length && theme.recreateProductGallery(t);
                    },
                    error: function (e, t, a) {
                        console.log(`[Theme] An error occurred while retrieving product variant image. Details: ${a}`);
                    },
                });
            },
            detectProductVariantChanges: function () {
                let t = this;
                e(".product-variants").on("click", ".lista_cor_variacao li[data-id]", function () {
                    t.loadProductVariantImage(e(this).data("id"));
                }),
                    e(".product-variants").on("click", ".lista-radios-input", function () {
                        t.loadProductVariantImage(e(this).find("input").val());
                    }),
                    e(".product-variants").on("change", "select", function () {
                        t.loadProductVariantImage(e(this).val());
                    }),
                    e(".product-variants, .product-additional-fields").on("change", ".infoSelects", function () {
                        var t = e(this).find("option:selected");
                        if (t.val().length) {
                            var a = t.attr("rel");
                            a.length && theme.recreateProductGallery([{ https: a, thumbs: { 90: { https: a } } }]);
                        }
                    });
            },
            organizeStoreReviewsPage: function () {
                e(".page-content .container .btns-paginator").length && e(".page-content .container .btns-paginator").parent().addClass("store-review-paginator"),
                    e(".page-content .container").append('<div class="botao-commerce show-modal-store-review" data-toggle="modal-theme" data-target=".modal-store-reviews">Deixe seu depoimento</div>'),
                    e("#depoimento #aviso_depoimento").after('<button type="button" class="botao-commerce send-store-review">Enviar</button>'),
                    e(".page-content h2:first").appendTo(".modal-store-reviews .modal-info"),
                    e("#depoimento").appendTo(".modal-store-reviews .modal-info"),
                    e("#comentario_cliente").remove(),
                    e(".modal-store-reviews #depoimento a").remove(),
                    e(".page-depoimentos .page-content").addClass("show"),
                    e(".page-depoimentos").addClass("show-menu");
            },
            validateStoreReviewForm: function () {
                e(".modal-store-reviews #depoimento").validate({
                    rules: { nome_depoimento: { required: !0 }, email_depoimento: { required: !0, email: !0 }, msg_depoimento: { required: !0 }, input_captcha: { required: !0 } },
                    messages: {
                        nome_depoimento: { required: "Por favor, informe seu nome completo" },
                        email_depoimento: { required: "Por favor, informe seu e-mail", email: "Por favor, preencha com um e-mail v&aacute;lido" },
                        msg_depoimento: { required: "Por favor, escreva uma mensagem no seu depoimento" },
                        input_captcha: { required: "Por favor, preencha com o c&oacute;digo da imagem de verifica&ccedil;&atilde;o" },
                    },
                    errorElement: "span",
                    errorClass: "error-block",
                    errorPlacement: function (e, t) {
                        "radio" === t.prop("type") ? e.insertAfter(t.parent(".nota_dep")) : t.is("textarea") ? e.insertAfter(t.parent().find("h5")) : e.insertAfter(t);
                    },
                }),
                    e(".modal-store-reviews #depoimento .send-store-review").on("click", function () {
                        let t = e(".modal-store-reviews #depoimento"),
                            a = e(this);
                        t.valid() && (a.html("Enviando...").attr("disabled", !0), enviaDepoimentoLoja());
                    });
                let t = e("#aviso_depoimento").get(0);
                new MutationObserver(function (t, a) {
                    e(".depoimentos-modal #depoimento .send-store-review").html("Enviar").removeAttr("disabled");
                }).observe(t, { attributes: !0 });
            },
            organizeNewsPage: function () {
                window.location.href.includes("busca_noticias") || e("#listagemCategorias").parent().before("<h1>Not&iacute;cias</h1>"),
                    e(".noticias").find("li").wrapInner('<div class="box-noticia"></div>'),
                    e(".page-busca_noticias .box-noticia").each(function () {
                        let t = e(this).find("#noticia_imagem a").attr("href");
                        e(this).find("p").after(`<a href="${t}" class="button-show">Ver mais</a>`);
                    }),
                    e(".page-busca_noticias .page-content").addClass("show"),
                    e(".page-busca_noticias").addClass("show-menu");
            },
            organizeContactPage: function () {
                if (
                    (e(".page-contact .page-content > .container").prepend(`
                <h1>Fale conosco</h1>
                <p class="description">Precisa falar com a gente? Utilize uma das op&ccedil;&otilde;es abaixo para entrar em contato conosco.</p>
                <div class="cols">
                    <div class="box-form">
                    </div>
                    <div class="info-form"></div>
                </div>
            `),
                    e(e(".page-content .container3").eq(1)).appendTo(".info-form"),
                    e(e(".page-content .container3 .container2 .container2").eq(0)).appendTo(".box-form"),
                    e(".info-form h3:contains(Empresa)").length && e(".info-form h3:contains(Empresa)").parent().insertBefore(e(".info-form h3:contains(Endere)").parent()),
                    e(".info-form h3:contains(Endere)").parent().after(e(".map-iframe")),
                    e(".page-contact form img.image").after('<div class="flex justify-end"><span class="botao-commerce flex align-center justify-center">Enviar</span></div>').remove(),
                    e(".page-contact #telefone_contato").removeAttr("onkeypress maxlength").addClass("phone-mask"),
                    e(".page-contact .contato-telefones .block:nth-child(1)").length)
                ) {
                    let t = e(".page-contact .contato-telefones .block:nth-child(1)").text(),
                        a = t.replace(/\D/g, "");
                    e(".page-contact .contato-telefones .block:nth-child(1)").html(`<a href="tel:${a}" title="Ligue para n&oacute;s">${t}</a>`);
                }
                if (e(".page-contact .contato-telefones .block:nth-child(2)").length) {
                    let o = e(".page-contact .contato-telefones .block:nth-child(2)").text(),
                        s = o.replace(/\D/g, "");
                    e(".page-contact .contato-telefones .block:nth-child(2)").html(`<a target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?l=pt&phone=55${s}" title="Fale conosco no WhatsApp">${o}</a>`);
                }
                e(".page-contact .page-content").addClass("active");
            },
            gifts: function () {
                e('#form_presentes input[type="image"]').prev().html('<div class="botao-commerce">Continuar Comprando</div>'),
                    e('#form_presentes input[type="image"]').wrap('<div class="relative-button"></div>').after('<button class="botao-commerce">Avan&ccedil;ar</button>').remove();
            },
            organizeNewsletterPage: function () {
                e(".page-newsletter .formulario-newsletter").length
                    ? (e(".page-newsletter .formulario-newsletter .box-captcha input, .page-newsletter .formulario-newsletter .box-captcha-newsletter input").attr("placeholder", "Digite o c&oacute;digo ao lado").trigger("focus"),
                      e(".formulario-newsletter .newsletterBTimg").html("Enviar").removeClass().addClass("botao-commerce"))
                    : (e(".page-newsletter .page-content").addClass("success-message-newsletter"),
                      e(".page-newsletter .page-content.success-message-newsletter .board p:first-child a").addClass("botao-commerce").html("Voltar para p&aacute;gina inicial")),
                    setTimeout(function () {
                        e(".page-newsletter .page-content").addClass("show");
                    }, 200);
            },
            updateCartTotal: function () {
                e('[data-cart="amount"]').text(e(".cart-preview-item").length);
            },
            validGift: function () {
                let t = e(".product-gifts .brinde_produto").length;
                1 == t &&
                    e("#form_comprar").on("submit", function () {
                        let t = e("#form_comprar").find('input[type="hidden"][name="variacao"]'),
                            a = e("#span_erro_carrinho").text();
                        t.length && "" === t.val() && "" === a && e("#span_erro_carrinho").text("Selecione uma op\xe7\xe3o para varia\xe7\xe3o do produto");
                    });
            },
        }),
        e(function () {
            theme.resets(),
                theme.recoveryStoreId(),
                theme.scrollHeader(),
                setTimeout(function () {
                    theme.processRteElements(), theme.loadThemeVersion(), theme.initLazyload(), theme.mainMenu(), theme.mainMenuMobile(), theme.initMasks(), theme.toggleModalTheme(), theme.overlay();
                }, 20),
                e("html").hasClass("page-home")
                    ? (setTimeout(function () {
                          theme.bannerHome(), theme.loadNews();
                      }, 40),
                      theme.storeReviewsIndex())
                    : e("html").hasClass("page-newsletter")
                    ? theme.organizeNewsletterPage()
                    : e("html").hasClass("page-catalog") || e("html").hasClass("page-search")
                    ? (theme.slideCatalog(), theme.sortMobile())
                    : e("html").hasClass("page-product")
                    ? (theme.initProductGallery(),
                      theme.toggleProductVideo(),
                      theme.detectProductVariantChanges(),
                      theme.goToProductReviews(),
                      theme.getShippingRates(),
                      theme.productBuyTogether(),
                      theme.productTabsAction(),
                      theme.observerProductPriceChange(),
                      theme.productReviews(),
                      theme.productRelatedCarousel(),
                      theme.organizeProductHistory(),
                      theme.validGift())
                    : e("html").hasClass("page-busca_noticias")
                    ? (theme.organizeNewsPage(), theme.generateBreadcrumb("news-page-listing"))
                    : e("html").hasClass("page-noticia")
                    ? theme.generateBreadcrumb("news-page")
                    : e("html").hasClass("page-depoimentos")
                    ? (theme.organizeStoreReviewsPage(), theme.validateStoreReviewForm())
                    : e("html").hasClass("page-contact")
                    ? theme.organizeContactPage()
                    : e("html").hasClass("page-finalizar_presentes") && theme.gifts();
        });
})(jQuery);
