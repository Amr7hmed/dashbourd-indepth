import "./BlogCard.css";

import DeleteBtn from "../DeleteBtn";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="blogCard">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={blog.photo}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body d-flex  align-content-end justify-content-around flex-column h-100">
              <h5 className="card-title">{blog.title}</h5>
              <p className="card-text">{blog.short_description}</p>
              <div>
                <Link to={`/EditBlog/${blog.id}`}>edit</Link>
              </div>

              {/* <button className="mb-3"></button> */}
              {/* <DeleteBtn /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
