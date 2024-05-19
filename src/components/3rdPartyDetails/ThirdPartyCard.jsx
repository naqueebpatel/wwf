import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { IoMdMailUnread } from "react-icons/io";
import { MdPhone } from "react-icons/md";
import { PiSuitcaseSimpleFill } from "react-icons/pi";

function ThirdPartyCard({ name, mobileno, profession, email }) {
    return (
        <div className='profile-card'>
            <section className="mx-auto profile-section">
                <div className="card testimonial-card mt-2 mb-3">
                    <div className="card-up aqua-gradient"></div>
                    <div className="avatar mx-auto white">
                        <img src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" className="rounded-circle img-fluid" alt="avatar" />
                    </div>
                    <div className="card-body text-center">
                        <h4 className="card-title font-weight-bold">{name}</h4>
                        <hr />
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                                <MdPhone style={{ marginRight: "2.3dvh", fontSize: "1.5rem" }} />
                                Mobile No: {mobileno}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <PiSuitcaseSimpleFill style={{ marginRight: "2.3dvh", fontSize: "1.5rem" }} />
                                Profession: {profession.toUpperCase()}
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
                <div className="glow-wrap">
                    <i className="glow"></i>
                </div>
            </section>
        </div>
    );
}

export default ThirdPartyCard;
