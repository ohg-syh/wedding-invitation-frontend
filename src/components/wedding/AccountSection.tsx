import { useState } from "react";

import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import weddingData from "@/payloads/wedding";

const AccountSection: React.FC = () => {
  const { accounts } = weddingData;
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");

  const currentAccounts = activeTab === "groom" ? accounts.groom : accounts.bride;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("계좌번호가 복사되었습니다.");
  };

  return (
    <section className="account-section">
      <div className="section-header">
        <h2 className="section-title">ACCOUNT</h2>
        <p className="section-subtitle">마음 전하실 곳</p>
      </div>

      <div className="account-description">
        <p>참석이 어려우신 분들을 위해</p>
        <p>계좌번호를 기재하였습니다.</p>
        <p>너그러운 마음으로 양해 부탁드립니다.</p>
      </div>

      <div className="account-tabs">
        <button className={`tab ${activeTab === "groom" ? "active" : ""}`} onClick={() => setActiveTab("groom")}>
          신랑측
        </button>
        <button className={`tab ${activeTab === "bride" ? "active" : ""}`} onClick={() => setActiveTab("bride")}>
          신부측
        </button>
      </div>

      <div className="account-list">
        {currentAccounts.map((account, index) => (
          <div key={`${activeTab}-${index}`} className="account-card">
            <h4 className="account-holder">{account.name}</h4>
            <div className="account-info">
              <div className="account-number-section" onClick={() => copyToClipboard(account.account)}>
                <div className="account-detail">
                  <span className="bank-name">{account.bank}</span>
                  <span className="account-number">{account.account}</span>
                </div>
                <button className="copy-btn">
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>
            </div>

            {account.kakaopay && (
              <a href={account.kakaopay} target="_blank" rel="noopener noreferrer" className="kakaopay-link">
                <div className="kakaopay-btn">카카오페이</div>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccountSection;
