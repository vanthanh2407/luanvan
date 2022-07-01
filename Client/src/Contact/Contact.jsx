import React from 'react';
import PropTypes from 'prop-types';

Contact.propTypes = {

};

function Contact(props) {
    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Contact</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="contact-main-page mt-60 mb-40 mb-md-40 mb-sm-40 mb-xs-40">
                <div className="container mb-60">
                    
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1648.136831967846!2d106.67899830633438!3d10.738175715296903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f31adcc29b9%3A0xc2f5aadb645347ea!2sMEDIA%20TEAM!5e0!3m2!1svi!2s!4v1654786365776!5m2!1svi!2s" width="600" height="450" style={{ border: '0' }} allowfullscreen="" loading="lazy"></iframe>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 offset-lg-1 col-md-12 order-1 order-lg-2">
                            <div className="contact-page-side-content">
                                <h3 className="contact-page-title">Contact Us</h3>
                                <p className="contact-page-message mb-25">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem sapiente ab cum accusantium, incidunt nihil fugit similique? Reiciendis ex dignissimos libero iusto quos, consequuntur nobis tenetur a minima! Voluptatum, ab?
                                </p>
                                <div className="single-contact-block">
                                    <h4><i className="fa fa-fax"></i> Address</h4>
                                    <p>180 Cao Lỗ, Phường 4, Quận 8, Thành phố Hồ Chí Minh</p>
                                </div>
                                <div className="single-contact-block">
                                    <h4><i className="fa fa-phone"></i> Phone</h4>
                                    <p>Mobile: 0123456789</p>
                                    <p>Hotline: 1900100 Biết</p>
                                </div>
                                <div className="single-contact-block last-child">
                                    <h4><i className="fa fa-envelope-o"></i> Email</h4>
                                    <p>vanthanh@gmail.com</p>
                                    <p>anhquoc@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 order-2 order-lg-1">
                            <div className="contact-form-content pt-sm-55 pt-xs-55">
                                <h3 className="contact-page-title">Tell Us Your Message</h3>
                                <div className="contact-form">
                                    <form id="contact-form" action="http://demo.hasthemes.com/limupa-v3/limupa/mail.php" method="post">
                                        <div className="form-group">
                                            <label>Your Name <span className="required">*</span></label>
                                            <input type="text" name="customerName" id="customername" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Your Email <span className="required">*</span></label>
                                            <input type="email" name="customerEmail" id="customerEmail" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Subject</label>
                                            <input type="text" name="contactSubject" id="contactSubject" />
                                        </div>
                                        <div className="form-group mb-30">
                                            <label>Your Message</label>
                                            <textarea name="contactMessage" id="contactMessage" ></textarea>
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Send" className="li-btn-3" name="submit" />
                                        </div>
                                    </form>
                                </div>
                                <p className="form-messege"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;