import React from "react";

export default function Header({ title, title2, description, imgUrl }) {
  return (
    <>
      <div className="px-5 bg-header rounded-4 m-4 pb-3 ">
        <div className="row">
          <div className="col-md-6 d-flex pt-2 align-items-center">
            <div className="content">
              <div className="d-flex">
                <p className="text-white title">{title}</p>
                <span className="title2 text-white ms-2 fw-light">
                  {title2}
                </span>
              </div>

              <p className="text-white">{description}</p>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-end ">
            <div className="img ">
              <img src={imgUrl} alt="" className="w-100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
