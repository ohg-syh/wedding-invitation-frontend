import { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { APP_CONFIG } from "@/config/app";

import Modal from "@/components/common/Modal";

import { GuestbookApiEntry, GuestbookCreateRequest, GuestbookDeleteRequest, GuestbookEntry } from "@/types/guestbook";

const API_BASE = APP_CONFIG.apiBaseUrl;

function mapApiEntry(api: GuestbookApiEntry): GuestbookEntry {
  return {
    id: api.id,
    name: api.name,
    message: api.content,
    createdAt: api.created_at.split("T")[0],
  };
}

const GuestbookSection: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [showAllEntries, setShowAllEntries] = useState(false);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [formName, setFormName] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/v1/guestbook`);
      if (!res.ok) throw new Error(`서버 오류 (${res.status})`);
      const json = await res.json();
      const data: GuestbookApiEntry[] = json.data;
      setEntries(data.map(mapApiEntry));
      setCurrentIndex(0);
    } catch {
      setError("방명록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleNext = () => {
    if (entries.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % entries.length);
  };

  const handlePrev = () => {
    if (entries.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + entries.length) % entries.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    if (!formName.trim()) return setSubmitError("이름을 입력해 주세요.");
    if (!formMessage.trim()) return setSubmitError("메시지를 입력해 주세요.");
    if (formPassword.length < 4) return setSubmitError("비밀번호는 4자 이상이어야 합니다.");

    setIsSubmitting(true);
    try {
      const body: GuestbookCreateRequest = {
        name: formName.trim(),
        password: formPassword,
        content: formMessage.trim(),
      };
      const res = await fetch(`${API_BASE}/api/v1/guestbook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error((errData as { detail?: string })?.detail || `작성 실패 (${res.status})`);
      }
      setFormName("");
      setFormMessage("");
      setFormPassword("");
      setSubmitSuccess(true);
      setShowWriteForm(false);
      await fetchEntries();
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : "작성에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteTargetId(id);
    setDeletePassword("");
    setDeleteError(null);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    if (deletePassword.length < 4) return setDeleteError("비밀번호는 4자 이상이어야 합니다.");

    setIsDeleting(deleteTargetId);
    setDeleteError(null);
    try {
      const body: GuestbookDeleteRequest = { id: deleteTargetId, password: deletePassword };
      const res = await fetch(`${API_BASE}/api/v1/guestbook`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error((errData as { detail?: string })?.detail || `삭제 실패 (${res.status})`);
      }
      setShowDeleteModal(false);
      setDeleteTargetId(null);
      setDeletePassword("");
      await fetchEntries();
    } catch (e: unknown) {
      setDeleteError(e instanceof Error ? e.message : "삭제에 실패했습니다. 비밀번호를 확인해 주세요.");
    } finally {
      setIsDeleting(null);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="guestbook-section">
      <div className="section-header">
        <h2 className="section-title">GUESTBOOK</h2>
        <p className="section-subtitle">방명록</p>
      </div>

      {isLoading ? (
        <div className="guestbook-loading">
          <p>방명록을 불러오는 중...</p>
        </div>
      ) : error ? (
        <div className="guestbook-error">
          <p>{error}</p>
          <button onClick={fetchEntries} className="btn-retry">
            다시 시도
          </button>
        </div>
      ) : entries.length === 0 ? (
        <div className="guestbook-empty">
          <p>아직 방명록이 없습니다. 첫 번째 메시지를 남겨보세요!</p>
        </div>
      ) : (
        <>
          <div
            className="guestbook-carousel"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button className="carousel-btn prev" onClick={handlePrev}>
              ‹
            </button>
            <div className="guestbook-card-wrapper">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  className="guestbook-card"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="card-content">
                    <p className="message">
                      {entries[currentIndex].message.length > 100
                        ? `${entries[currentIndex].message.slice(0, 100)}...`
                        : entries[currentIndex].message}
                    </p>
                    <p className="author">- {entries[currentIndex].name} -</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <button className="carousel-btn next" onClick={handleNext}>
              ›
            </button>
          </div>

          <div className="guestbook-pagination">
            <span className="pagination-text">
              {currentIndex + 1} / {entries.length}
            </span>
          </div>
        </>
      )}

      <div className="guestbook-actions">
        <button className="btn-write" onClick={() => setShowWriteForm(!showWriteForm)}>
          방명록 작성하기
        </button>
        {!isLoading && !error && entries.length > 0 && (
          <button className="btn-view-all" onClick={() => setShowAllEntries(true)}>
            전체보기
          </button>
        )}
      </div>

      {submitSuccess && (
        <div className="guestbook-success">
          <p>방명록이 성공적으로 등록되었습니다!</p>
        </div>
      )}

      {showWriteForm && (
        <div className="guestbook-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="이름 (최대 16자)"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              maxLength={16}
              disabled={isSubmitting}
            />
            <textarea
              placeholder="축하 메시지를 남겨주세요 (최대 1024자)"
              rows={4}
              value={formMessage}
              onChange={(e) => setFormMessage(e.target.value)}
              maxLength={1024}
              disabled={isSubmitting}
            />
            <input
              type="password"
              placeholder="비밀번호 (삭제시 사용, 4자 이상)"
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
              disabled={isSubmitting}
            />
            {submitError && <p className="form-error">{submitError}</p>}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "작성 중..." : "작성하기"}
            </button>
          </form>
        </div>
      )}

      <Modal isOpen={showAllEntries} onClose={() => setShowAllEntries(false)} title="방명록" maxWidth="600px">
        <div className="all-entries">
          {entries.length === 0 ? (
            <p style={{ textAlign: "center", padding: "1rem" }}>방명록이 없습니다.</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="entry-item">
                <div className="entry-header">
                  <span className="entry-name">{entry.name}</span>
                  <div className="entry-header-right">
                    <span className="entry-date">{entry.createdAt}</span>
                    <button
                      className="btn-delete-entry"
                      onClick={() => openDeleteModal(entry.id)}
                      disabled={isDeleting === entry.id}
                    >
                      {isDeleting === entry.id ? "삭제 중..." : "삭제"}
                    </button>
                  </div>
                </div>
                <p className="entry-message">{entry.message}</p>
              </div>
            ))
          )}
        </div>
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="방명록 삭제" maxWidth="400px">
        <div className="delete-confirm">
          <p className="delete-confirm-text">삭제하려면 작성 시 입력한 비밀번호를 입력해 주세요.</p>
          <input
            type="password"
            placeholder="비밀번호 (4자 이상)"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            className="delete-password-input"
          />
          {deleteError && <p className="form-error">{deleteError}</p>}
          <div className="delete-actions">
            <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
              취소
            </button>
            <button className="btn-confirm-delete" onClick={handleDelete} disabled={isDeleting !== null}>
              {isDeleting !== null ? "삭제 중..." : "삭제하기"}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default GuestbookSection;
