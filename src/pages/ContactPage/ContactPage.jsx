import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { URL } from "../../api/api";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    
    await emailjs.send('service_uilziow', 'template_59jhsdl', {
      Name: name,
      email: email,
      Message: message,
      Subject: subject
    }, "1gDD4SSBFV6zLzxVF")
    
    window.location.reload();
  }

  return (
    <div className="ContactPage">
      <Breadcrumbs title={'contact'} />

      <section class="contact">
        <div class="container">
          <div class="contact__inner">
            <div class="contact__info">
              <h3 class="contact__info-title">
                Enter your valid email and we will send you a reply

              </h3>
              <p class="contact__info-text">
                Feel Free Don’t
                Hesitate To
                Contact With Us
              </p>
              <ul class="contact__info-list">
                <li class="contact__info-item">
                  <a class="contact__info-phone" href="tel:+01234567896">+0-123-456-7896</a>
                  <a class="contact__info-phone" href="tel:+01234567896">+0-123-456-7896</a>
                </li>
                <li class="contact__info-item contact__info-item--location">
                  Ranlon Market 789 Road,<br />
                  Market Street, Newyork
                </li>
                <li class="contact__info-item contact__info-item--email">
                  <div>malbo_catalog@outlook.com</div>
                  <div>malbo.catalog@gmail.com</div>
                </li>
              </ul>
            </div>
            <form class="contact__form" onSubmit={onSubmit}>
              <p class="contact__form-title">Contact Form</p>
              <div class="contact__form-box">
                <input value={name} required class="contact__form-input" type="text" name="Name" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
                <input value={email} required class="contact__form-input" type="email" name="email" placeholder="Your E-mail Address" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <input value={subject} required class="contact__form-input" type="text" name="Subject" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
              <textarea value={message} required class="contact__form-textarea" name="Message" placeholder="Message here" onChange={(e) => setMessage(e.target.value)}></textarea>
              <button class="contact__form-btn" type="submit">SEND MESSAGE</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
