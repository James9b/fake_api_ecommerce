import LoadingSpinner from './LoadingSpinner'

function ConfirmModal({
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    isLoading = false,
    variant = 'primary'
}) {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !isLoading) {
            onCancel()
        }
    }

    return (
        <div className="confirm-modal-overlay" onClick={handleBackdropClick}>
            <div className="confirm-modal">
                <div className="confirm-modal-icon">
                    {variant === 'danger' ? (
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9V13M12 17H12.01M4.93 4.93L19.07 19.07M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </div>

                <h3 className="confirm-modal-title">{title}</h3>
                <p className="confirm-modal-message">{message}</p>

                <div className="confirm-modal-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </button>
                    <button
                        className={`btn btn-${variant}`}
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner size="small" />
                                Processing...
                            </>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
