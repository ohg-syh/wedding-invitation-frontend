import { useState } from "react";

import { faComment, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from "@/components/common/Modal";

import weddingData from "@/payloads/wedding";

interface ContactPerson {
  label: string;
  name: string;
  phone?: string;
}

const InvitationSection: React.FC = () => {
  const { groom, bride, messages } = weddingData;
  const [showContactModal, setShowContactModal] = useState(false);

  const groomContacts: ContactPerson[] = [
    { label: "신랑", name: groom.fullName, phone: groom.phone },
    { label: "신랑 아버지", name: groom.father, phone: groom.fatherPhone },
    { label: "신랑 어머니", name: groom.mother, phone: groom.motherPhone },
  ];

  const brideContacts: ContactPerson[] = [
    { label: "신부", name: bride.fullName, phone: bride.phone },
    { label: "신부 아버지", name: bride.father, phone: bride.fatherPhone },
    { label: "신부 어머니", name: bride.mother, phone: bride.motherPhone },
  ];

  const ContactRow = ({ contact }: { contact: ContactPerson }) => (
    <div className="contact-row">
      <div className="contact-info">
        <span className="contact-label">{contact.label}</span>
        <span className="contact-name">{contact.name}</span>
      </div>
      {contact.phone && (
        <div className="contact-actions">
          <a href={`tel:${contact.phone}`} className="action-btn call">
            <FontAwesomeIcon icon={faPhone} />
          </a>
          <a href={`sms:${contact.phone}`} className="action-btn sms">
            <FontAwesomeIcon icon={faComment} />
          </a>
        </div>
      )}
    </div>
  );

  return (
    <section className="invitation-section">
      <div className="section-header">
        <h2 className="section-title">INVITATION</h2>
        <p className="section-subtitle">소중한 분들을 초대합니다</p>
      </div>

      <div className="invitation-message">
        <p className="message-text">{messages.greeting}</p>
      </div>

      <div className="parents-info">
        <div className="family-info groom-family">
          <div className="parents">
            <span className="parent-name">{groom.father}</span>
            <span className="separator">·</span>
            <span className="parent-name">{groom.mother}</span>
            <span className="relation">의</span>
            <span className="child-relation">아들</span>
          </div>
          <div className="child-name">{groom.fullName}</div>
        </div>

        <div className="family-info bride-family">
          <div className="parents">
            <span className="parent-name">{bride.father}</span>
            <span className="separator">·</span>
            <span className="parent-name">{bride.mother}</span>
            <span className="relation">의</span>
            <span className="child-relation">딸</span>
          </div>
          <div className="child-name">{bride.fullName}</div>
        </div>
      </div>

      <div className="contact-button">
        <button className="btn-contact" onClick={() => setShowContactModal(true)}>
          연락하기
        </button>
      </div>

      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title="연락하기">
        <div className="contact-list">
          <div className="contact-group">
            <h4 className="contact-group-title">신랑측</h4>
            {groomContacts.map((c, i) => (
              <ContactRow key={i} contact={c} />
            ))}
          </div>
          <div className="contact-divider" />
          <div className="contact-group">
            <h4 className="contact-group-title">신부측</h4>
            {brideContacts.map((c, i) => (
              <ContactRow key={i} contact={c} />
            ))}
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default InvitationSection;
