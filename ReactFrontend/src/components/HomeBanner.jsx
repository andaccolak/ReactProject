import React from 'react';
import '../css/homeBanner.css';

function HomeBanner() {
    return (
        <section className="banner-section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="banner-blocks">
                            {/* Main Banner */}
                            <div className="banner-ad large bg-info block-1">
                                <div className="row banner-content p-5">
                                    <div className="content-wrapper col-md-7">
                                        <div className="categories my-3">100% DOĞAL</div>
                                        <h3 className="display-4">ROWSOME ÜRÜNLERİ</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Dignissim massa diam elementum.
                                        </p>
                                        <a
                                            href="#"
                                            className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1 px-4 py-3 mt-3"
                                        >
                                            Shop Now
                                        </a>
                                    </div>
                                    <div className="img-wrapper col-md-5">
                                        <img
                                            src="https://www.keytedarik.com/images/product-thumb-1.png"
                                            className="img-fluid"
                                            alt="Smoothie"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Small Banner 1 */}
                            <div className="banner-ad block-2">
                                <div className="row banner-content p-5">
                                    <div className="content-wrapper col-md-7">
                                        <div className="categories sale mb-3 pb-3">20% İNDİRİMLİ</div>
                                        <h3 className="banner-title">KAHVELER</h3>

                                    </div>
                                </div>
                            </div>

                            {/* Small Banner 2 */}
                            <div className="banner-ad block-3">
                                <div className="row banner-content p-5">
                                    <div className="content-wrapper col-md-7">
                                        <div className="categories sale mb-3 pb-3">15% İNDİRİMLİ</div>
                                        <h3 className="item-title">ATIŞTIRMALIKLAR</h3>
                                        <a href="#" className="d-flex align-items-center nav-link">
                                            HEMEN KEŞFET                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* / Banner Blocks */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeBanner;
