import React, { useEffect } from 'react';

const EmailSent = () => {

  useEffect(() => { document.title = 'Pilot | Confirmation' }, []);


  return (
    <div className="email-sent">
      <h1>Email Sent</h1>
      <p>Check your inbox for instructions to reset your password.</p>
      {
        _mode === 'development'
          ? <p><b>EMAIL WILL LIKELY SHOW IN SPAM IF COMING FROM TEST ACCOUNT (THIS IS NOT VISIBLE IN PRODUCTION)</b></p>
          : null
      }
    </div>
  )
}

export default EmailSent;
