export default function Home() {
  return (
    <main>
      <div className="nft-store">
        <div className="container-fluid">
          <div className="nft-store-content">
            <div className="nft-up-content">
              <div className="row">
                <div className="col-md-8">
                  <div className="fire-bubble-art d-flex justify-content-between  align-items-center">
                    <img
                      src="https://yudiz.com/codepen/nft-store/image-1.svg"
                      alt="fire-bubble"
                      className="img-fluid fire-image fire-width"
                    />
                    <div className="fire-content fire-width">
                      <h3 className="mb-0">Fire'o Bubble Art</h3>
                      <div className="fire-time d-flex justify-content-between">
                        <div className="current-bid">
                          <h4>Current Bid</h4>
                          <span>0.70 ETH</span>
                        </div>
                        <div className="auction">
                          <h4>Auction Ending in</h4>
                          <span>07h:25m:46s</span>
                        </div>
                        <span className="middle-line"></span>
                      </div>
                      <span className="fire-user">
                        <img
                          src="https://yudiz.com/codepen/nft-store/user-pic1.svg"
                          alt="user"
                        />{" "}
                        Rose Ortega
                      </span>
                      <div className="d-flex fire-links">
                        <a href="/" className="heart flex-shrink-0">
                          <i className="far fa-heart"></i>
                        </a>
                        <a href="/" className="theme-btn">
                          Place a bid
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <figure
                    className="paint-image"
                    style={{
                      backgroundImage:
                        "url('https://yudiz.com/codepen/nft-store/image-2.svg')",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <h1>Paint Art</h1>
                  </figure>
                </div>
              </div>
            </div>
            <div className="trending">
              <div className="trending-title">
                <div className="row justify-content-between align-items-center">
                  <div className="col-6">
                    <h2>Trending blogs</h2>
                  </div>
                  <div className="col-6 text-right">
                    <a href="/" className="theme-btn">
                      {" "}
                      View More{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="trending-grid">
                <div className="row">
                  <div className="col-md-4">
                    <div className="trending-content">
                      <img
                        src="https://yudiz.com/codepen/nft-store/card-1.svg"
                        alt="card-images"
                        className="img-fluid"
                      />
                      <div className="trending-desc">
                        <h4 className="user-title">Wayne Garner</h4>
                        <h3 className="user-position">Flui oriental art</h3>
                        <div className="bid d-flex justify-content-between align-items-center">
                          <div>
                            <h5>current Bid</h5>
                            <span>0.70 ETH</span>
                          </div>
                          <div>
                            <h5>Auctin Ending in</h5>
                            <span>07h:25m:46s</span>
                          </div>
                        </div>
                        <img
                          src="https://yudiz.com/codepen/nft-store/user-pic3.svg"
                          alt="img-fluid"
                          className="user-image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="trending-content">
                      <img
                        src="https://yudiz.com/codepen/nft-store/card-2.svg"
                        alt="card-images"
                        className="img-fluid"
                      />
                      <div className="trending-desc">
                        <h4 className="user-title">cody valdez</h4>
                        <h3 className="user-position">Human Areology</h3>
                        <div className="bid d-flex justify-content-between align-items-center">
                          <div>
                            <h5>current Bid</h5>
                            <span>100.02 ETH</span>
                          </div>
                          <div>
                            <h5>Auctin Ending in</h5>
                            <span>09h:25m:46s</span>
                          </div>
                        </div>
                        <img
                          src="https://yudiz.com/codepen/nft-store/user-pic4.svg"
                          alt="img-fluid"
                          className="user-image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="trending-content">
                      <img
                        src="https://yudiz.com/codepen/nft-store/card-3.svg"
                        alt="card-images"
                        className="img-fluid"
                      />
                      <div className="trending-desc">
                        <h4 className="user-title">Jayden Daniel</h4>
                        <h3 className="user-position">Inko's Art</h3>
                        <div className="bid d-flex justify-content-between align-items-center">
                          <div>
                            <h5>current Bid</h5>
                            <span>0.70 ETH</span>
                          </div>
                          <div>
                            <h5>Auctin Ending in</h5>
                            <span>05h:25m:46s</span>
                          </div>
                        </div>
                        <img
                          src="https://yudiz.com/codepen/nft-store/user-pic5.svg"
                          alt="img-fluid"
                          className="user-image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
