import { Link } from "react-router-dom";

function Homepage() {
    return (
        <>

            <main>
                <div className="container">
                    <div className="mt-5 fs-5">
                        <h3> Vision Simulation Tool</h3>
                        <p> choose your option based on your symptons </p>
                        <Link to="without-astigmatism" className="row option_btn text-decoration-none mt-5">
                            <div className="col-md-4">
                                <span>cataract</span>
                            </div>
                            <div className="col-md-4">
                                <span>+presbyopia</span>
                            </div>

                        </Link>
                        <Link to="/with-astigmatism" className="row option_btn  text-decoration-none">
                            <div className="col-md-4">
                                <span>cataract</span>
                            </div>
                            <div className="col-md-4">
                                <span>+presbyopia</span>
                            </div>
                            <div className="col-md-4">
                                <span>+cataract</span>
                            </div>

                        </Link>

                    </div>
                    </div>
            </main>
        
        
        </>
    )
}


export default Homepage;
